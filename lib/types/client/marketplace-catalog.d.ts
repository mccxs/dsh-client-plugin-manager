/**
 * GENERATED — do not edit by hand. Regenerate with:
 *   node packages/client/ui-settings-plugin-inventory/scripts/generate-catalog.mjs
 *
 * The plugin-marketplace catalog: every @deepseek-ai package referenced by a
 * shipped cordis composition. The npm registry search API has no scope filter,
 * so the marketplace reads this embedded snapshot instead of the registry.
 */
/** One marketplace catalog entry. */
export interface MarketplaceCatalogEntry {
    /** npm package name. */
    readonly name: string;
    /** Short package description from its manifest. */
    readonly description: string;
    /** Repository URL from its manifest, when present. */
    readonly sourceUrl: string;
}
/** The complete marketplace catalog, sorted by package name. */
export declare const MARKETPLACE_CATALOG: readonly MarketplaceCatalogEntry[];
//# sourceMappingURL=marketplace-catalog.d.ts.map