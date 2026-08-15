/**
 * Plugin marketplace tab: browse the repository plugin catalog, filter by
 * function group, and copy the install command for a package. The catalog is
 * generated from the shipped cordis compositions (see scripts/generate-catalog.mjs)
 * because the npm registry search API has no scope filter; installed markers
 * come from the Host inventory snapshot.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PluginInventorySnapshot } from '@deepseek-ai/dsh-api-remotes/client'
import {
  IconCopyOutline16,
  IconLinkOutline16,
  IconRefreshOutline16,
  IconSearchOutline16,
  writeClipboard,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import {
  MARKETPLACE_CATALOG,
  type MarketplaceCatalogEntry,
} from './marketplace-catalog.ts'
import {
  classifyModule, PLUGIN_GROUP_LABEL_KEY, PLUGIN_GROUP_ORDER,
  type PluginGroupKey,
} from './plugin-groups.ts'
import css from './MarketplaceTab.module.css'

/** Registration-side Remote face used by the section. */
export interface MarketplaceTabInjected {
  /** Read a current Host inventory snapshot. */
  list: () => Promise<PluginInventorySnapshot>
}

/** Full component props assembled by the Settings slot renderer. */
export type MarketplaceTabProps =
  PropsRuntime<'settings.plugins.tab'>
  & PropsLocale<'settings.pluginManager'>
  & InjectFace<MarketplaceTabInjected>

/** One package projected from a catalog entry. */
interface MarketplacePackage {
  readonly name: string
  readonly description: string
  readonly npmUrl: string
  readonly sourceUrl: string
}

type ViewState =
  | { readonly status: 'loading' }
  | { readonly status: 'error' }
  | {
    readonly status: 'ready'
    readonly catalog: readonly MarketplacePackage[]
    readonly installed: ReadonlySet<string>
  }

/**
 * Project one catalog entry into a display package. The repository URL is
 * normalized to https (manifests carry the git+ scheme) and points at the
 * monorepo root; the npm page is constructed because scoped names encode their
 * own path.
 * @param entry - catalog entry from the generated snapshot.
 * @returns the display package.
 */
function toPackage(entry: MarketplaceCatalogEntry): MarketplacePackage {
  return {
    name: entry.name,
    description: entry.description,
    npmUrl: `https://www.npmjs.com/package/${entry.name}`,
    sourceUrl: entry.sourceUrl.replace(/^git\+/, ''),
  }
}

/** The display catalog, projected once. */
const CATALOG: readonly MarketplacePackage[] = MARKETPLACE_CATALOG.map(toPackage)

/**
 * Project installed Loader module specifiers onto npm package names. A subpath
 * entry like `@deepseek-ai/dsh-web-app/startup` installs the base package
 * (`@deepseek-ai/dsh-web-app`); the package part ends before the second slash.
 * @param moduleNames - installed Loader module specifiers.
 * @returns the set of installed package names.
 */
function installedPackages(moduleNames: readonly string[]): ReadonlySet<string> {
  const installed = new Set<string>()
  for (const moduleName of moduleNames) {
    installed.add(moduleName)
    if (moduleName.startsWith('@')) {
      const parts = moduleName.split('/')
      if (parts.length > 2) installed.add(parts.slice(0, 2).join('/'))
    }
  }
  return installed
}

/** Render the repository-backed plugin marketplace. */
export function MarketplaceTab({ list, t }: MarketplaceTabProps): ReactNode {
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [request, setRequest] = useState(0)
  const [query, setQuery] = useState('')
  const [selectedGroups, setSelectedGroups] = useState<ReadonlySet<PluginGroupKey>>(() => new Set())
  const [copiedName, setCopiedName] = useState<string | null>(null)
  const [state, setState] = useState<ViewState>({ status: 'loading' })

  useEffect(() => {
    let current = true
    void list().then(
      (inventory) => {
        if (current) {
          setState({
            status: 'ready',
            catalog: CATALOG,
            installed: installedPackages(inventory.entries.map(entry => entry.moduleName)),
          })
        }
      },
      () => { if (current) setState({ status: 'error' }) },
    )
    return () => { current = false }
  }, [list, request])

  useEffect(() => () => {
    if (copiedTimer.current !== null) clearTimeout(copiedTimer.current)
  }, [])

  const retry = (): void => {
    setState({ status: 'loading' })
    setRequest(value => value + 1)
  }

  const toggleGroup = (key: PluginGroupKey): void => {
    setSelectedGroups((previous) => {
      const next = new Set(previous)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const copyCommand = async (name: string): Promise<void> => {
    const ok = await writeClipboard(`dsh plugin --profile web add ${name}`)
    if (!ok) return
    if (copiedTimer.current !== null) clearTimeout(copiedTimer.current)
    setCopiedName(name)
    copiedTimer.current = setTimeout(() => {
      setCopiedName(current => current === name ? null : current)
    }, 1500)
  }

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const matchesQuery = (pkg: MarketplacePackage): boolean => {
    if (normalizedQuery.length === 0) return true
    return [pkg.name, pkg.description]
      .some(value => value.toLocaleLowerCase().includes(normalizedQuery))
  }
  const groupCounts = useMemo(() => {
    const counts = new Map<PluginGroupKey, number>()
    if (state.status !== 'ready') return counts
    for (const pkg of state.catalog) {
      const key = classifyModule(pkg.name)
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return counts
  }, [state])
  const visible = useMemo(() => {
    if (state.status !== 'ready') return []
    return state.catalog.filter((pkg) => {
      const key = classifyModule(pkg.name)
      if (selectedGroups.size > 0 && !selectedGroups.has(key)) return false
      return matchesQuery(pkg)
    })
  }, [state, selectedGroups, normalizedQuery])

  return (
    <div className={css.section} aria-busy={state.status === 'loading'}>
      <p className={css.intro}>{t('marketplaceIntro')}</p>
      {state.status === 'loading' ? <p className={css.status}>{t('marketplaceLoading')}</p> : null}
      {state.status === 'error' ? (
        <div className={css.failure}>
          <p role="alert">{t('marketplaceError')}</p>
          <button type="button" onClick={retry}>{t('retry')}</button>
        </div>
      ) : null}
      {state.status === 'ready' ? (
        <div className={css.marketplace}>
          <label className={css.search}>
            <IconSearchOutline16 aria-hidden="true" />
            <span className={css.visuallyHidden}>{t('marketplaceSearch')}</span>
            <input
              type="search"
              value={query}
              placeholder={t('marketplaceSearch')}
              aria-label={t('marketplaceSearch')}
              onChange={(event) => { setQuery(event.currentTarget.value) }}
            />
          </label>
          <div className={css.heading}>
            <h3>{t('catalog')}</h3>
            <span data-market-count={visible.length}>{visible.length}</span>
            <button
              className={css.refresh}
              type="button"
              aria-label={t('marketplaceRefresh')}
              title={t('marketplaceRefresh')}
              onClick={retry}
            >
              <IconRefreshOutline16 size={14} aria-hidden="true" />
            </button>
          </div>
          <div className={css.chips} role="group" aria-label={t('catalog')}>
            <button
              className={css.chip}
              type="button"
              aria-pressed={selectedGroups.size === 0}
              onClick={() => { setSelectedGroups(new Set()) }}
            >
              {t('marketplaceAll')}
            </button>
            {PLUGIN_GROUP_ORDER.map((key) => {
              const count = groupCounts.get(key) ?? 0
              if (count === 0) return null
              const label = t(PLUGIN_GROUP_LABEL_KEY[key])
              return (
                <button
                  className={css.chip}
                  type="button"
                  key={key}
                  aria-pressed={selectedGroups.has(key)}
                  aria-label={label}
                  onClick={() => { toggleGroup(key) }}
                >
                  {label}
                  <span data-group-chip-count>{count}</span>
                </button>
              )
            })}
          </div>
          {visible.length === 0
            ? <p className={css.status}>{t('emptySearch')}</p>
            : null}
          {visible.length > 0 ? (
            <ul className={css.cards}>
              {visible.map((pkg) => {
                const key = classifyModule(pkg.name)
                const installed = state.installed.has(pkg.name)
                const copied = copiedName === pkg.name
                const copyLabel = copied ? t('marketplaceCopied') : t('marketplaceCopyCommand')
                return (
                  <li className={css.card} key={pkg.name} data-market-package={pkg.name}>
                    <div className={css.cardHeader}>
                      <code className={css.cardName}>{pkg.name}</code>
                      {installed ? (
                        <span className={css.installedTag} data-installed>{t('marketplaceInstalled')}</span>
                      ) : null}
                    </div>
                    <p className={css.cardDescription}>{pkg.description || '\u2014'}</p>
                    <div className={css.cardFooter}>
                      <span className={css.groupTag} data-market-group={key}>{t(PLUGIN_GROUP_LABEL_KEY[key])}</span>
                      <span className={css.cardActions}>
                        <button
                          className={css.copyButton}
                          type="button"
                          aria-label={copyLabel}
                          data-copied={copied ? 'true' : undefined}
                          onClick={() => { void copyCommand(pkg.name) }}
                        >
                          <IconCopyOutline16 size={14} aria-hidden="true" />
                          <span>{copyLabel}</span>
                        </button>
                        <a className={css.actionLink} href={pkg.npmUrl} target="_blank" rel="noreferrer">
                          <IconLinkOutline16 size={14} aria-hidden="true" />
                          <span>{t('marketplaceOpenNpm')}</span>
                        </a>
                        {pkg.sourceUrl === '' ? null : (
                          <a className={css.actionLink} href={pkg.sourceUrl} target="_blank" rel="noreferrer">
                            <IconLinkOutline16 size={14} aria-hidden="true" />
                            <span>{t('marketplaceOpenSource')}</span>
                          </a>
                        )}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}