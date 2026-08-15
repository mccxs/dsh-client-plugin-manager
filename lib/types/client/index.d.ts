/**
 * dsh-client-plugin-manager, browser half — a drop-in plugin manager for Web
 * Settings. Registers two additional tabs into the existing Plugins section:
 * a function-grouped plugin inventory and a repository-backed marketplace.
 * Both read the Host plugin inventory through the generated Remote; no host
 * changes are required.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import { type PluginInventoryLocaleKey as PluginManagerLocaleKey } from './locales.ts';
export type { GroupedInventoryTabInjected, GroupedInventoryTabProps } from './GroupedInventoryTab.tsx';
export type { MarketplaceTabInjected, MarketplaceTabProps } from './MarketplaceTab.tsx';
export type { PluginInventoryLocaleKey as PluginManagerLocaleKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Plugin-manager copy owned by this package. */
        'settings.pluginManager': PluginManagerLocaleKey;
    }
}
/** Dictionary namespace owned by this plugin. */
export declare const NS = "settings.pluginManager";
/** Services required by the Settings registration and generated Remote face. */
export declare const inject: string[];
/**
 * Contribute the grouped inventory and marketplace tabs to the Plugins section.
 * @param ctx - the browser plugin context.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map