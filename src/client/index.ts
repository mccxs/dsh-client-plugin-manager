/**
 * dsh-client-plugin-manager, browser half — a drop-in plugin manager for Web
 * Settings. Registers two additional tabs into the existing Plugins section:
 * a function-grouped plugin inventory and a repository-backed marketplace.
 * Both read the Host plugin inventory through the generated Remote; no host
 * changes are required.
 */

import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { GroupedInventoryTab, type GroupedInventoryTabInjected } from './GroupedInventoryTab.tsx'
import { MarketplaceTab, type MarketplaceTabInjected } from './MarketplaceTab.tsx'
import { en, zh, type PluginInventoryLocaleKey as PluginManagerLocaleKey } from './locales.ts'

export type { GroupedInventoryTabInjected, GroupedInventoryTabProps } from './GroupedInventoryTab.tsx'
export type { MarketplaceTabInjected, MarketplaceTabProps } from './MarketplaceTab.tsx'
export type { PluginInventoryLocaleKey as PluginManagerLocaleKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Plugin-manager copy owned by this package. */
    'settings.pluginManager': PluginManagerLocaleKey
  }
}

/** Dictionary namespace owned by this plugin. */
export const NS = 'settings.pluginManager'

/** Services required by the Settings registration and generated Remote face. */
export const inject = ['slots', 'locale', 'remote', 'remote.pluginInventory']

/**
 * Contribute the grouped inventory and marketplace tabs to the Plugins section.
 * @param ctx - the browser plugin context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-client-plugin-manager: dictionaries')

  const t = ctx.locale.bind(NS)
  const list: GroupedInventoryTabInjected['list'] = async () => {
    const result = await ctx.remote.pluginInventory.list()
    if (!result.ok) {
      throw new Error(`pluginInventory.list failed: ${result.error.code}: ${result.error.message}`)
    }
    return result.value
  }
  const injected = (): MarketplaceTabInjected => ({ list })

  ctx.slots.inject('settings.plugins.tab', () => ctx.slots.register({
    name: 'settings.plugins.tab',
    id: 'grouped',
    order: 11,
    label: () => t('groupedTab'),
    locale: NS,
    inject: injected,
  }, GroupedInventoryTab))

  ctx.slots.inject('settings.plugins.tab', () => ctx.slots.register({
    name: 'settings.plugins.tab',
    id: 'market',
    order: 20,
    label: () => t('marketplaceTab'),
    locale: NS,
    inject: injected,
  }, MarketplaceTab))
}
