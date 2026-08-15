/**
 * Functional grouping for Loader plugin entries and marketplace packages.
 *
 * A group is derived from the module specifier: every Harness package is
 * `@deepseek-ai/dsh-<role>-<name>` (or a vendored `@deepseek-ai/cordis*`
 * package), so the role segment maps to a stable function category. Unmapped
 * packages (third-party plugins, fixtures) fall into `other`. The mapping is
 * prefix-ordered: the first matching rule wins, so `dsh-tool-*` outranks the
 * domains its tools wrap (`dsh-tool-web` is a tool, not web capability).
 */

import type { PluginInventoryLocaleKey } from './locales.ts'

/** Stable functional group keys, in display order. */
export type PluginGroupKey =
  | 'framework'
  | 'llm'
  | 'session'
  | 'tools'
  | 'execution'
  | 'filesystem'
  | 'web'
  | 'skills'
  | 'subagents'
  | 'workflow'
  | 'goals'
  | 'settings'
  | 'host'
  | 'client'
  | 'other'

/** Display order of every group; `other` is always last. */
export const PLUGIN_GROUP_ORDER: readonly PluginGroupKey[] = [
  'framework',
  'llm',
  'session',
  'tools',
  'execution',
  'filesystem',
  'web',
  'skills',
  'subagents',
  'workflow',
  'goals',
  'settings',
  'host',
  'client',
  'other',
]

/** Locale key carrying each group's display label. */
export const PLUGIN_GROUP_LABEL_KEY: Record<PluginGroupKey, PluginInventoryLocaleKey> = {
  framework: 'groupFramework',
  llm: 'groupLlm',
  session: 'groupSession',
  tools: 'groupTools',
  execution: 'groupExecution',
  filesystem: 'groupFilesystem',
  web: 'groupWeb',
  skills: 'groupSkills',
  subagents: 'groupSubagents',
  workflow: 'groupWorkflow',
  goals: 'groupGoals',
  settings: 'groupSettings',
  host: 'groupHost',
  client: 'groupClient',
  other: 'groupOther',
}

/**
 * Exact module specifiers whose group is not implied by a prefix. Kept apart
 * from the prefix rules so a future package can extend either side without
 * re-reading the whole table.
 */
const EXACT_GROUPS: Readonly<Record<string, PluginGroupKey>> = {
  '@deepseek-ai/dsh-commands': 'framework',
  '@deepseek-ai/dsh-system-prompt': 'framework',
  '@deepseek-ai/dsh-tools': 'framework',
  '@deepseek-ai/dsh-message-feedback': 'session',
  '@deepseek-ai/dsh-command-feedback': 'session',
  '@deepseek-ai/dsh-user-questions': 'session',
  '@deepseek-ai/dsh-token-meter': 'llm',
  '@deepseek-ai/dsh-repeat-tool-reminder': 'tools',
  '@deepseek-ai/dsh-command-compact': 'tools',
  '@deepseek-ai/dsh-plan-mode': 'goals',
  '@deepseek-ai/dsh-command-goal': 'goals',
  '@deepseek-ai/dsh-workspace': 'host',
}

/**
 * Prefix rules, first match wins. A prefix without a trailing dash also
 * catches the bare package (`@deepseek-ai/dsh-llm` and `dsh-llm-*`).
 */
const PREFIX_GROUPS: ReadonlyArray<readonly [prefix: string, group: PluginGroupKey]> = [
  // Framework and kernel: vendored Cordis, the type/RPC system, the agent
  // spine, and the shared registries. `cordis:` is the Loader spec prefix for
  // in-tree vendored packages, not a scoped npm name.
  ['@deepseek-ai/cordis', 'framework'],
  ['cordis', 'framework'],
  ['@deepseek-ai/dsh-cordis-', 'framework'],
  ['@deepseek-ai/dsh-typert-', 'framework'],
  ['@deepseek-ai/dsh-api-', 'framework'],
  ['@deepseek-ai/dsh-agent', 'framework'],
  // LLM providers and context metering.
  ['@deepseek-ai/dsh-llm', 'llm'],
  // Session log, projection, persistence, query, titles, telemetry.
  ['@deepseek-ai/dsh-session', 'session'],
  ['@deepseek-ai/dsh-attachment-', 'session'],
  // Agent tools and result compaction.
  ['@deepseek-ai/dsh-tool-', 'tools'],
  ['@deepseek-ai/dsh-compaction-', 'tools'],
  // Shell, sandbox, subprocess, spill, code runtime, background jobs.
  ['@deepseek-ai/dsh-bash-', 'execution'],
  ['@deepseek-ai/dsh-pwsh-', 'execution'],
  ['@deepseek-ai/dsh-shell-', 'execution'],
  ['@deepseek-ai/dsh-subprocess-', 'execution'],
  ['@deepseek-ai/dsh-sandbox-', 'execution'],
  ['@deepseek-ai/dsh-spill-', 'execution'],
  ['@deepseek-ai/dsh-code-runtime-', 'execution'],
  ['@deepseek-ai/dsh-jobs-', 'execution'],
  // Filesystem capability and policy.
  ['@deepseek-ai/dsh-fs-', 'filesystem'],
  // Web search/fetch capability and the web surface.
  ['@deepseek-ai/dsh-web', 'web'],
  // Skill registry, providers, and loader.
  ['@deepseek-ai/dsh-skill', 'skills'],
  // Subagent registry and providers.
  ['@deepseek-ai/dsh-subagent', 'subagents'],
  // Workflow worker and tool.
  ['@deepseek-ai/dsh-workflow-', 'workflow'],
  // Goal service, driver, and tool.
  ['@deepseek-ai/dsh-goal', 'goals'],
  // User settings, credentials, permissions, and approval.
  ['@deepseek-ai/dsh-settings-', 'settings'],
  ['@deepseek-ai/dsh-credentials-', 'settings'],
  ['@deepseek-ai/dsh-permission-', 'settings'],
  ['@deepseek-ai/dsh-user-', 'settings'],
  // Host-side services exposed to the browser.
  ['@deepseek-ai/dsh-host-', 'host'],
  ['@deepseek-ai/dsh-storage', 'host'],
  // Browser plugins and the client runtime.
  ['@deepseek-ai/dsh-client-', 'client'],
]

/**
 * Classify one module specifier into its functional group.
 * @param moduleName - exact Loader module specifier or npm package name.
 * @returns the matching group, or `other` when no rule applies.
 */
export function classifyModule(moduleName: string): PluginGroupKey {
  const exact = EXACT_GROUPS[moduleName]
  if (exact !== undefined) return exact
  for (const [prefix, group] of PREFIX_GROUPS) {
    if (moduleName.startsWith(prefix)) return group
  }
  return 'other'
}