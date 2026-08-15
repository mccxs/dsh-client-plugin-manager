import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Plugin marketplace tab: browse the repository plugin catalog, filter by
 * function group, and copy the install command for a package. The catalog is
 * generated from the shipped cordis compositions (see scripts/generate-catalog.mjs)
 * because the npm registry search API has no scope filter; installed markers
 * come from the Host inventory snapshot.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { IconCopyOutline16, IconLinkOutline16, IconRefreshOutline16, IconSearchOutline16, writeClipboard, } from '@deepseek-ai/dsh-client-ui-primitives';
import { MARKETPLACE_CATALOG, } from "./marketplace-catalog.js";
import { classifyModule, PLUGIN_GROUP_LABEL_KEY, PLUGIN_GROUP_ORDER, } from "./plugin-groups.js";
import css from './MarketplaceTab.module.css';
/**
 * Project one catalog entry into a display package. The repository URL is
 * normalized to https (manifests carry the git+ scheme) and points at the
 * monorepo root; the npm page is constructed because scoped names encode their
 * own path.
 * @param entry - catalog entry from the generated snapshot.
 * @returns the display package.
 */
function toPackage(entry) {
    return {
        name: entry.name,
        description: entry.description,
        npmUrl: `https://www.npmjs.com/package/${entry.name}`,
        sourceUrl: entry.sourceUrl.replace(/^git\+/, ''),
    };
}
/** The display catalog, projected once. */
const CATALOG = MARKETPLACE_CATALOG.map(toPackage);
/**
 * Project installed Loader module specifiers onto npm package names. A subpath
 * entry like `@deepseek-ai/dsh-web-app/startup` installs the base package
 * (`@deepseek-ai/dsh-web-app`); the package part ends before the second slash.
 * @param moduleNames - installed Loader module specifiers.
 * @returns the set of installed package names.
 */
function installedPackages(moduleNames) {
    const installed = new Set();
    for (const moduleName of moduleNames) {
        installed.add(moduleName);
        if (moduleName.startsWith('@')) {
            const parts = moduleName.split('/');
            if (parts.length > 2)
                installed.add(parts.slice(0, 2).join('/'));
        }
    }
    return installed;
}
/** Render the repository-backed plugin marketplace. */
export function MarketplaceTab({ list, t }) {
    const copiedTimer = useRef(null);
    const [request, setRequest] = useState(0);
    const [query, setQuery] = useState('');
    const [selectedGroups, setSelectedGroups] = useState(() => new Set());
    const [copiedName, setCopiedName] = useState(null);
    const [state, setState] = useState({ status: 'loading' });
    useEffect(() => {
        let current = true;
        void list().then((inventory) => {
            if (current) {
                setState({
                    status: 'ready',
                    catalog: CATALOG,
                    installed: installedPackages(inventory.entries.map(entry => entry.moduleName)),
                });
            }
        }, () => { if (current)
            setState({ status: 'error' }); });
        return () => { current = false; };
    }, [list, request]);
    useEffect(() => () => {
        if (copiedTimer.current !== null)
            clearTimeout(copiedTimer.current);
    }, []);
    const retry = () => {
        setState({ status: 'loading' });
        setRequest(value => value + 1);
    };
    const toggleGroup = (key) => {
        setSelectedGroups((previous) => {
            const next = new Set(previous);
            if (next.has(key)) {
                next.delete(key);
            }
            else {
                next.add(key);
            }
            return next;
        });
    };
    const copyCommand = async (name) => {
        const ok = await writeClipboard(`dsh plugin --profile web add ${name}`);
        if (!ok)
            return;
        if (copiedTimer.current !== null)
            clearTimeout(copiedTimer.current);
        setCopiedName(name);
        copiedTimer.current = setTimeout(() => {
            setCopiedName(current => current === name ? null : current);
        }, 1500);
    };
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const matchesQuery = (pkg) => {
        if (normalizedQuery.length === 0)
            return true;
        return [pkg.name, pkg.description]
            .some(value => value.toLocaleLowerCase().includes(normalizedQuery));
    };
    const groupCounts = useMemo(() => {
        const counts = new Map();
        if (state.status !== 'ready')
            return counts;
        for (const pkg of state.catalog) {
            const key = classifyModule(pkg.name);
            counts.set(key, (counts.get(key) ?? 0) + 1);
        }
        return counts;
    }, [state]);
    const visible = useMemo(() => {
        if (state.status !== 'ready')
            return [];
        return state.catalog.filter((pkg) => {
            const key = classifyModule(pkg.name);
            if (selectedGroups.size > 0 && !selectedGroups.has(key))
                return false;
            return matchesQuery(pkg);
        });
    }, [state, selectedGroups, normalizedQuery]);
    return (_jsxs("div", { className: css.section, "aria-busy": state.status === 'loading', children: [_jsx("p", { className: css.intro, children: t('marketplaceIntro') }), state.status === 'loading' ? _jsx("p", { className: css.status, children: t('marketplaceLoading') }) : null, state.status === 'error' ? (_jsxs("div", { className: css.failure, children: [_jsx("p", { role: "alert", children: t('marketplaceError') }), _jsx("button", { type: "button", onClick: retry, children: t('retry') })] })) : null, state.status === 'ready' ? (_jsxs("div", { className: css.marketplace, children: [_jsxs("label", { className: css.search, children: [_jsx(IconSearchOutline16, { "aria-hidden": "true" }), _jsx("span", { className: css.visuallyHidden, children: t('marketplaceSearch') }), _jsx("input", { type: "search", value: query, placeholder: t('marketplaceSearch'), "aria-label": t('marketplaceSearch'), onChange: (event) => { setQuery(event.currentTarget.value); } })] }), _jsxs("div", { className: css.heading, children: [_jsx("h3", { children: t('catalog') }), _jsx("span", { "data-market-count": visible.length, children: visible.length }), _jsx("button", { className: css.refresh, type: "button", "aria-label": t('marketplaceRefresh'), title: t('marketplaceRefresh'), onClick: retry, children: _jsx(IconRefreshOutline16, { size: 14, "aria-hidden": "true" }) })] }), _jsxs("div", { className: css.chips, role: "group", "aria-label": t('catalog'), children: [_jsx("button", { className: css.chip, type: "button", "aria-pressed": selectedGroups.size === 0, onClick: () => { setSelectedGroups(new Set()); }, children: t('marketplaceAll') }), PLUGIN_GROUP_ORDER.map((key) => {
                                const count = groupCounts.get(key) ?? 0;
                                if (count === 0)
                                    return null;
                                const label = t(PLUGIN_GROUP_LABEL_KEY[key]);
                                return (_jsxs("button", { className: css.chip, type: "button", "aria-pressed": selectedGroups.has(key), "aria-label": label, onClick: () => { toggleGroup(key); }, children: [label, _jsx("span", { "data-group-chip-count": true, children: count })] }, key));
                            })] }), visible.length === 0
                        ? _jsx("p", { className: css.status, children: t('emptySearch') })
                        : null, visible.length > 0 ? (_jsx("ul", { className: css.cards, children: visible.map((pkg) => {
                            const key = classifyModule(pkg.name);
                            const installed = state.installed.has(pkg.name);
                            const copied = copiedName === pkg.name;
                            const copyLabel = copied ? t('marketplaceCopied') : t('marketplaceCopyCommand');
                            return (_jsxs("li", { className: css.card, "data-market-package": pkg.name, children: [_jsxs("div", { className: css.cardHeader, children: [_jsx("code", { className: css.cardName, children: pkg.name }), installed ? (_jsx("span", { className: css.installedTag, "data-installed": true, children: t('marketplaceInstalled') })) : null] }), _jsx("p", { className: css.cardDescription, children: pkg.description || '\u2014' }), _jsxs("div", { className: css.cardFooter, children: [_jsx("span", { className: css.groupTag, "data-market-group": key, children: t(PLUGIN_GROUP_LABEL_KEY[key]) }), _jsxs("span", { className: css.cardActions, children: [_jsxs("button", { className: css.copyButton, type: "button", "aria-label": copyLabel, "data-copied": copied ? 'true' : undefined, onClick: () => { void copyCommand(pkg.name); }, children: [_jsx(IconCopyOutline16, { size: 14, "aria-hidden": "true" }), _jsx("span", { children: copyLabel })] }), _jsxs("a", { className: css.actionLink, href: pkg.npmUrl, target: "_blank", rel: "noreferrer", children: [_jsx(IconLinkOutline16, { size: 14, "aria-hidden": "true" }), _jsx("span", { children: t('marketplaceOpenNpm') })] }), pkg.sourceUrl === '' ? null : (_jsxs("a", { className: css.actionLink, href: pkg.sourceUrl, target: "_blank", rel: "noreferrer", children: [_jsx(IconLinkOutline16, { size: 14, "aria-hidden": "true" }), _jsx("span", { children: t('marketplaceOpenSource') })] }))] })] })] }, pkg.name));
                        }) })) : null] })) : null] }));
}
//# sourceMappingURL=MarketplaceTab.js.map