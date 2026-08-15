/**
 * Generate the embedded plugin-marketplace catalog for
 * @deepseek-ai/dsh-client-dsh-client-plugin-manager.
 *
 * The npm registry search API has no scope filter, so the marketplace cannot
 * list the @deepseek-ai ecosystem at runtime. Instead this script extracts the
 * real plugin set from the source tree: every package referenced by a shipped
 * cordis composition (cordis yml files under packages and apps) is a plugin
 * the Loader can mount, and its package.json supplies the description.
 *
 * Regenerate with: node packages/client/dsh-client-plugin-manager/scripts/generate-catalog.mjs
 * Output: packages/client/dsh-client-plugin-manager/src/client/marketplace-catalog.ts
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../../../../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const packagesRoot = join(root, 'packages')

/** Collect every name: module specifier from all cordis compositions. */
function collectReferencedNames() {
  const names = new Set()
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (['node_modules', 'lib', 'dist', 'tests'].includes(entry.name)) continue
      const full = join(dir, entry.name)
      if (entry.isDirectory()) { walk(full); continue }
      if (!/^cordis.*\.ya?ml$/.test(entry.name)) continue
      const text = readFileSync(full, 'utf8')
      for (const match of text.matchAll(/name:\s*['\"]([^'\"]+)['\"]/g)) {
        const value = match[1]
        if (value.startsWith('@deepseek-ai/')) names.add(value)
      }
    }
  }
  walk(packagesRoot)
  walk(join(root, 'apps'))
  return names
}

/**
 * Map package name -> manifest for every workspace package. Handles both the
 * packages layout (group/name/package.json) and the vendor layout
 * (name/package.json) plus their nested manifests.
 */
function collectManifests() {
  const manifests = new Map()
  const register = (manifestPath) => {
    let manifest
    try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) } catch { return }
    if (typeof manifest.name !== 'string') return
    manifests.set(manifest.name, {
      name: manifest.name,
      description: manifest.description ?? '',
      sourceUrl: manifest.repository?.url ?? '',
    })
  }
  const scanRoot = (scanRootPath) => {
    for (const group of readdirSync(scanRootPath)) {
      const groupDir = join(scanRootPath, group)
      if (!statSync(groupDir).isDirectory()) continue
      const direct = join(groupDir, 'package.json')
      if (exists(direct)) register(direct)
      for (const pkg of readdirSync(groupDir)) {
        const pkgDir = join(groupDir, pkg)
        if (!statSync(pkgDir).isDirectory()) continue
        const nested = join(pkgDir, 'package.json')
        if (exists(nested)) register(nested)
      }
    }
  }
  scanRoot(packagesRoot)
  scanRoot(join(root, 'vendor'))
  return manifests
}

function exists(file) {
  try { statSync(file); return true } catch { return false }
}

const referenced = collectReferencedNames()
const manifests = collectManifests()
// Subpath Loader specifiers (e.g. '@deepseek-ai/dsh-web-app/startup') are not
// npm packages; keep only names that resolve to a workspace manifest.
const catalog = [...referenced].filter(name => manifests.has(name)).sort().map((name) => {
  const manifest = manifests.get(name)
  return { name, description: manifest?.description ?? '', sourceUrl: manifest?.sourceUrl ?? '' }
})

const lines = [
  '/**',
  ' * GENERATED — do not edit by hand. Regenerate with:',
  ' *   node packages/client/dsh-client-plugin-manager/scripts/generate-catalog.mjs',
  ' *',
  ' * The plugin-marketplace catalog: every @deepseek-ai package referenced by a',
  ' * shipped cordis composition. The npm registry search API has no scope filter,',
  ' * so the marketplace reads this embedded snapshot instead of the registry.',
  ' */',
  '',
  '/** One marketplace catalog entry. */',
  'export interface MarketplaceCatalogEntry {',
  '  /** npm package name. */',
  '  readonly name: string',
  '  /** Short package description from its manifest. */',
  '  readonly description: string',
  '  /** Repository URL from its manifest, when present. */',
  '  readonly sourceUrl: string',
  '}',
  '',
  '/** The complete marketplace catalog, sorted by package name. */',
  'export const MARKETPLACE_CATALOG: readonly MarketplaceCatalogEntry[] = [',
  ...catalog.map(({ name, description, sourceUrl }) => {
    const safeDescription = description.replaceAll('\\', '\\\\').replaceAll('\"', '\\\"')
    const safeSourceUrl = sourceUrl.replaceAll('\\', '\\\\').replaceAll('\"', '\\\"')
    return `  { name: '${name}', description: "${safeDescription}", sourceUrl: "${safeSourceUrl}" },`
  }),
  ']',
  '',
]
writeFileSync(join(packagesRoot, 'client/dsh-client-plugin-manager/src/client/marketplace-catalog.ts'), lines.join('\n'))
console.log(`catalog entries: ${catalog.length}`)