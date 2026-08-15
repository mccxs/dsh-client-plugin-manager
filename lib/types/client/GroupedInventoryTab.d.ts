import { type ReactNode } from 'react';
import type { PluginInventorySnapshot } from '@deepseek-ai/dsh-api-remotes/client';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
/** Registration-side Remote face used by the section. */
export interface GroupedInventoryTabInjected {
    /** Read a current Host inventory snapshot. */
    list: () => Promise<PluginInventorySnapshot>;
}
/** Full component props assembled by the Settings slot renderer. */
export type GroupedInventoryTabProps = PropsRuntime<'settings.plugins.tab'> & PropsLocale<'settings.pluginManager'> & InjectFace<GroupedInventoryTabInjected>;
/** Render the grouped, searchable current Loader inventory. */
export declare function GroupedInventoryTab({ list, t }: GroupedInventoryTabProps): ReactNode;
//# sourceMappingURL=GroupedInventoryTab.d.ts.map