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
import type { PluginInventoryLocaleKey } from './locales.ts';
/** Stable functional group keys, in display order. */
export type PluginGroupKey = 'framework' | 'llm' | 'session' | 'tools' | 'execution' | 'filesystem' | 'web' | 'skills' | 'subagents' | 'workflow' | 'goals' | 'settings' | 'host' | 'client' | 'other';
/** Display order of every group; `other` is always last. */
export declare const PLUGIN_GROUP_ORDER: readonly PluginGroupKey[];
/** Locale key carrying each group's display label. */
export declare const PLUGIN_GROUP_LABEL_KEY: Record<PluginGroupKey, PluginInventoryLocaleKey>;
/**
 * Classify one module specifier into its functional group.
 * @param moduleName - exact Loader module specifier or npm package name.
 * @returns the matching group, or `other` when no rule applies.
 */
export declare function classifyModule(moduleName: string): PluginGroupKey;
//# sourceMappingURL=plugin-groups.d.ts.map