/**
 * Plugin marketplace tab: browse the repository plugin catalog, filter by
 * function group, and copy the install command for a package. The catalog is
 * generated from the shipped cordis compositions (see scripts/generate-catalog.mjs)
 * because the npm registry search API has no scope filter; installed markers
 * come from the Host inventory snapshot.
 */
import { type ReactNode } from 'react';
import type { PluginInventorySnapshot } from '@deepseek-ai/dsh-api-remotes/client';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
/** Registration-side Remote face used by the section. */
export interface MarketplaceTabInjected {
    /** Read a current Host inventory snapshot. */
    list: () => Promise<PluginInventorySnapshot>;
}
/** Full component props assembled by the Settings slot renderer. */
export type MarketplaceTabProps = PropsRuntime<'settings.plugins.tab'> & PropsLocale<'settings.pluginManager'> & InjectFace<MarketplaceTabInjected>;
/** Render the repository-backed plugin marketplace. */
export declare function MarketplaceTab({ list, t }: MarketplaceTabProps): ReactNode;
//# sourceMappingURL=MarketplaceTab.d.ts.map