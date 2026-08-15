window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-plugin-manager",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/plugin-groups.ts
		/** Display order of every group; `other` is always last. */
		const PLUGIN_GROUP_ORDER = [
			"framework",
			"llm",
			"session",
			"tools",
			"execution",
			"filesystem",
			"web",
			"skills",
			"subagents",
			"workflow",
			"goals",
			"settings",
			"host",
			"client",
			"other"
		];
		/** Locale key carrying each group's display label. */
		const PLUGIN_GROUP_LABEL_KEY = {
			framework: "groupFramework",
			llm: "groupLlm",
			session: "groupSession",
			tools: "groupTools",
			execution: "groupExecution",
			filesystem: "groupFilesystem",
			web: "groupWeb",
			skills: "groupSkills",
			subagents: "groupSubagents",
			workflow: "groupWorkflow",
			goals: "groupGoals",
			settings: "groupSettings",
			host: "groupHost",
			client: "groupClient",
			other: "groupOther"
		};
		/**
		* Exact module specifiers whose group is not implied by a prefix. Kept apart
		* from the prefix rules so a future package can extend either side without
		* re-reading the whole table.
		*/
		const EXACT_GROUPS = {
			"@deepseek-ai/dsh-commands": "framework",
			"@deepseek-ai/dsh-system-prompt": "framework",
			"@deepseek-ai/dsh-tools": "framework",
			"@deepseek-ai/dsh-message-feedback": "session",
			"@deepseek-ai/dsh-command-feedback": "session",
			"@deepseek-ai/dsh-user-questions": "session",
			"@deepseek-ai/dsh-token-meter": "llm",
			"@deepseek-ai/dsh-repeat-tool-reminder": "tools",
			"@deepseek-ai/dsh-command-compact": "tools",
			"@deepseek-ai/dsh-plan-mode": "goals",
			"@deepseek-ai/dsh-command-goal": "goals",
			"@deepseek-ai/dsh-workspace": "host"
		};
		/**
		* Prefix rules, first match wins. A prefix without a trailing dash also
		* catches the bare package (`@deepseek-ai/dsh-llm` and `dsh-llm-*`).
		*/
		const PREFIX_GROUPS = [
			["@deepseek-ai/cordis", "framework"],
			["cordis", "framework"],
			["@deepseek-ai/dsh-cordis-", "framework"],
			["@deepseek-ai/dsh-typert-", "framework"],
			["@deepseek-ai/dsh-api-", "framework"],
			["@deepseek-ai/dsh-agent", "framework"],
			["@deepseek-ai/dsh-llm", "llm"],
			["@deepseek-ai/dsh-session", "session"],
			["@deepseek-ai/dsh-attachment-", "session"],
			["@deepseek-ai/dsh-tool-", "tools"],
			["@deepseek-ai/dsh-compaction-", "tools"],
			["@deepseek-ai/dsh-bash-", "execution"],
			["@deepseek-ai/dsh-pwsh-", "execution"],
			["@deepseek-ai/dsh-shell-", "execution"],
			["@deepseek-ai/dsh-subprocess-", "execution"],
			["@deepseek-ai/dsh-sandbox-", "execution"],
			["@deepseek-ai/dsh-spill-", "execution"],
			["@deepseek-ai/dsh-code-runtime-", "execution"],
			["@deepseek-ai/dsh-jobs-", "execution"],
			["@deepseek-ai/dsh-fs-", "filesystem"],
			["@deepseek-ai/dsh-web", "web"],
			["@deepseek-ai/dsh-skill", "skills"],
			["@deepseek-ai/dsh-subagent", "subagents"],
			["@deepseek-ai/dsh-workflow-", "workflow"],
			["@deepseek-ai/dsh-goal", "goals"],
			["@deepseek-ai/dsh-settings-", "settings"],
			["@deepseek-ai/dsh-credentials-", "settings"],
			["@deepseek-ai/dsh-permission-", "settings"],
			["@deepseek-ai/dsh-user-", "settings"],
			["@deepseek-ai/dsh-host-", "host"],
			["@deepseek-ai/dsh-storage", "host"],
			["@deepseek-ai/dsh-client-", "client"]
		];
		/**
		* Classify one module specifier into its functional group.
		* @param moduleName - exact Loader module specifier or npm package name.
		* @returns the matching group, or `other` when no rule applies.
		*/
		function classifyModule(moduleName) {
			const exact = EXACT_GROUPS[moduleName];
			if (exact !== void 0) return exact;
			for (const [prefix, group] of PREFIX_GROUPS) if (moduleName.startsWith(prefix)) return group;
			return "other";
		}
		//#endregion
		//#region \0dsh-css:F:\OS\deepseek-harness-master\packages\client\dsh-client-plugin-manager\src\client\GroupedInventoryTab.module.css.mjs
		const css$1 = ".e09F9q_section{width:100%;max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:14px;display:flex}.e09F9q_catalogHeading h3,.e09F9q_status,.e09F9q_failure p{margin:0}.e09F9q_status,.e09F9q_failure{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}.e09F9q_failure{color:var(--dsw-alias-state-error-primary);align-items:center;gap:10px;display:flex}.e09F9q_failure button{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 10px}.e09F9q_catalog{flex-direction:column;gap:12px;display:flex}.e09F9q_search{width:100%;color:var(--dsw-alias-label-tertiary);align-items:center;display:flex;position:relative}.e09F9q_search>svg{pointer-events:none;position:absolute;left:12px}.e09F9q_search input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;height:36px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;outline:none;padding:0 34px 0 36px;font-size:13px}.e09F9q_search input::placeholder{color:var(--dsw-alias-label-tertiary)}.e09F9q_search input:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 18%, transparent)}.e09F9q_catalogHeading{align-items:baseline;gap:7px;padding:0 2px;display:flex}.e09F9q_catalogHeading h3{font-size:13px;font-weight:600;line-height:20px}.e09F9q_catalogHeading span{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.e09F9q_cards{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:10px;margin:0;padding:0;list-style:none;display:grid}.e09F9q_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:10px;min-width:0;overflow:hidden}.e09F9q_card[data-open=true]{border-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-shadow-lv1)}.e09F9q_cardContent{box-sizing:border-box;width:100%;min-height:52px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;display:flex}.e09F9q_cardContent:hover,.e09F9q_card[data-open=true]>.e09F9q_cardContent{background:var(--dsw-alias-interactive-bg-hover)}.e09F9q_cardContent:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.e09F9q_cardTitle{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:14px;font-weight:600;line-height:20px;overflow:hidden}.e09F9q_cardTrailing{color:var(--dsw-alias-label-tertiary);flex:none;align-items:center;gap:7px;display:inline-flex}.e09F9q_statusDot{background:var(--dsw-alias-label-tertiary);border-radius:999px;flex:none;width:7px;height:7px;display:inline-block}.e09F9q_statusDot[data-phase=active]{background:var(--dsw-alias-state-success-primary)}.e09F9q_statusDot[data-phase=failed]{background:var(--dsw-alias-state-error-primary)}.e09F9q_statusDot[data-phase=loading]{background:var(--dsw-alias-state-business-primary)}.e09F9q_configTag{background:var(--dsw-alias-bg-layer-1);min-height:20px;color:var(--dsw-alias-label-secondary);white-space:nowrap;border-radius:5px;align-items:center;padding:1px 6px;font-size:11px;line-height:16px;display:inline-flex}.e09F9q_configTag[data-enabled=true]{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent);color:var(--dsw-alias-state-success-primary)}.e09F9q_chevron{color:var(--dsw-alias-label-tertiary);flex:none}.e09F9q_card[data-open=true] .e09F9q_chevron{transform:rotate(180deg)}.e09F9q_cardDetails{border-top:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);padding:10px 14px 12px}.e09F9q_entryValue{overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code);font-size:12px;line-height:18px;display:block}.e09F9q_details{grid-template-columns:76px minmax(0,1fr);gap:6px 10px;margin:8px 0 0;display:grid}.e09F9q_details div{display:contents}.e09F9q_details dt{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:17px}.e09F9q_details dd{overflow-wrap:anywhere;min-width:0;color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;line-height:17px}.e09F9q_visuallyHidden{clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}.e09F9q_groupControls{gap:6px;margin-left:auto;display:inline-flex}.e09F9q_groupControls button{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:3px 9px;font-size:12px;line-height:18px}.e09F9q_groupControls button:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.e09F9q_groupControls button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.e09F9q_groups{flex-direction:column;gap:10px;display:flex}.e09F9q_group{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:10px;flex-direction:column;gap:8px;padding:6px;display:flex}.e09F9q_groupToggle{width:100%;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:8px;align-items:center;gap:7px;padding:8px 10px;display:flex}.e09F9q_groupToggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.e09F9q_groupToggle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.e09F9q_groupChevron{color:var(--dsw-alias-label-tertiary);transition:transform .14s var(--ds-ease-in-out);flex:none}.e09F9q_group[data-collapsed=true] .e09F9q_groupChevron{transform:rotate(-90deg)}.e09F9q_groupName{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:13px;font-weight:600;line-height:20px;overflow:hidden}.e09F9q_groupCount{background:var(--dsw-alias-bg-layer-1);min-height:18px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap;border-radius:5px;align-items:center;margin-left:auto;padding:0 7px;font-size:11px;line-height:16px;display:inline-flex}@media (prefers-reduced-motion:no-preference){.e09F9q_chevron{transition:transform .14s var(--ds-ease-in-out)}}@media (width<=680px){.e09F9q_cards{grid-template-columns:minmax(0,1fr)}}";
		const tagId$1 = "@deepseek-ai/dsh-client-plugin-manager/GroupedInventoryTab.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-plugin-manager";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var GroupedInventoryTab_module_css_default = {
			"status": "e09F9q_status",
			"catalog": "e09F9q_catalog",
			"visuallyHidden": "e09F9q_visuallyHidden",
			"section": "e09F9q_section",
			"cardTrailing": "e09F9q_cardTrailing",
			"statusDot": "e09F9q_statusDot",
			"configTag": "e09F9q_configTag",
			"chevron": "e09F9q_chevron",
			"cardContent": "e09F9q_cardContent",
			"groups": "e09F9q_groups",
			"groupToggle": "e09F9q_groupToggle",
			"groupName": "e09F9q_groupName",
			"failure": "e09F9q_failure",
			"card": "e09F9q_card",
			"cardDetails": "e09F9q_cardDetails",
			"entryValue": "e09F9q_entryValue",
			"cards": "e09F9q_cards",
			"groupCount": "e09F9q_groupCount",
			"details": "e09F9q_details",
			"group": "e09F9q_group",
			"groupChevron": "e09F9q_groupChevron",
			"search": "e09F9q_search",
			"groupControls": "e09F9q_groupControls",
			"catalogHeading": "e09F9q_catalogHeading",
			"cardTitle": "e09F9q_cardTitle"
		};
		//#endregion
		//#region src/client/GroupedInventoryTab.tsx
		const PHASE_KEYS = {
			pending: "pending",
			loading: "loadingPhase",
			active: "active",
			failed: "failed",
			unloading: "unloading"
		};
		/** Localized accessible label for one root Fiber phase. */
		function phaseLabel(phase, t) {
			return phase === null ? t("unobserved") : t(PHASE_KEYS[phase]);
		}
		/** Compact a module specifier without guessing whether its Loader id was generated. */
		function moduleShortName(moduleName) {
			return (moduleName.startsWith("@") ? moduleName.slice(moduleName.indexOf("/") + 1) : moduleName).replace(/^cordis:/, "").replace(/^cordis-plugin-/, "").replace(/^dsh-(?:host-|client-)?/, "");
		}
		/** Whether an inventory row matches the local catalog query. */
		function matches(entry, normalizedQuery) {
			if (normalizedQuery.length === 0) return true;
			return [entry.moduleName, entry.entryId].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
		}
		/** Group a filtered entry list in display order, skipping empty groups. */
		function groupEntries(entries) {
			const byGroup = /* @__PURE__ */ new Map();
			for (const entry of entries) {
				const key = classifyModule(entry.moduleName);
				const bucket = byGroup.get(key);
				if (bucket === void 0) byGroup.set(key, [entry]);
				else bucket.push(entry);
			}
			return PLUGIN_GROUP_ORDER.flatMap((key) => {
				const group = byGroup.get(key);
				return group === void 0 ? [] : [{
					key,
					entries: group
				}];
			});
		}
		/** Render the grouped, searchable current Loader inventory. */
		function GroupedInventoryTab({ list, t }) {
			const catalogId = (0, react.useId)();
			const [request, setRequest] = (0, react.useState)(0);
			const [query, setQuery] = (0, react.useState)("");
			const [expanded, setExpanded] = (0, react.useState)(null);
			const [collapsedGroups, setCollapsedGroups] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			const [state, setState] = (0, react.useState)({ status: "loading" });
			(0, react.useEffect)(() => {
				let current = true;
				Promise.resolve().then(() => list()).then((snapshot) => {
					if (current) setState({
						status: "ready",
						snapshot
					});
				}, () => {
					if (current) setState({ status: "error" });
				});
				return () => {
					current = false;
				};
			}, [list, request]);
			const normalizedQuery = query.trim().toLocaleLowerCase();
			const filteredEntries = (0, react.useMemo)(() => state.status === "ready" ? state.snapshot.entries.filter((entry) => matches(entry, normalizedQuery)) : [], [normalizedQuery, state]);
			const groups = (0, react.useMemo)(() => groupEntries(filteredEntries), [filteredEntries]);
			(0, react.useEffect)(() => {
				if (expanded !== null && !filteredEntries.some((entry) => entry.entryId === expanded)) setExpanded(null);
			}, [expanded, filteredEntries]);
			const retry = () => {
				setState({ status: "loading" });
				setRequest((value) => value + 1);
			};
			const toggleGroup = (key) => {
				setCollapsedGroups((previous) => {
					const next = new Set(previous);
					if (next.has(key)) next.delete(key);
					else next.add(key);
					return next;
				});
			};
			const expandAll = () => {
				setCollapsedGroups(/* @__PURE__ */ new Set());
			};
			const collapseAll = () => {
				setCollapsedGroups(new Set(groups.map((group) => group.key)));
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: GroupedInventoryTab_module_css_default.section,
				"aria-busy": state.status === "loading",
				children: [
					state.status === "loading" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: GroupedInventoryTab_module_css_default.status,
						children: t("loading")
					}) : null,
					state.status === "error" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: GroupedInventoryTab_module_css_default.failure,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							children: t("error")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: retry,
							children: t("retry")
						})]
					}) : null,
					state.status === "ready" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: GroupedInventoryTab_module_css_default.catalog,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: GroupedInventoryTab_module_css_default.search,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, { "aria-hidden": "true" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: GroupedInventoryTab_module_css_default.visuallyHidden,
										children: t("search")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "search",
										value: query,
										placeholder: t("search"),
										"aria-label": t("search"),
										onChange: (event) => {
											setQuery(event.currentTarget.value);
										}
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: GroupedInventoryTab_module_css_default.catalogHeading,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("catalog") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										"data-plugin-count": filteredEntries.length,
										children: filteredEntries.length
									}),
									groups.length > 1 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: GroupedInventoryTab_module_css_default.groupControls,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: expandAll,
											children: t("expandAll")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: collapseAll,
											children: t("collapseAll")
										})]
									}) : null
								]
							}),
							state.snapshot.entries.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: GroupedInventoryTab_module_css_default.status,
								children: t("empty")
							}) : null,
							state.snapshot.entries.length > 0 && filteredEntries.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: GroupedInventoryTab_module_css_default.status,
								children: t("emptySearch")
							}) : null,
							groups.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: GroupedInventoryTab_module_css_default.groups,
								children: groups.map((group) => {
									const collapsed = collapsedGroups.has(group.key);
									const groupLabel = t(PLUGIN_GROUP_LABEL_KEY[group.key]);
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: GroupedInventoryTab_module_css_default.group,
										"data-group": group.key,
										"data-collapsed": collapsed ? "true" : void 0,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: GroupedInventoryTab_module_css_default.groupToggle,
											type: "button",
											"aria-expanded": !collapsed,
											"aria-label": groupLabel,
											onClick: () => {
												toggleGroup(group.key);
											},
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
													className: GroupedInventoryTab_module_css_default.groupChevron,
													size: 12,
													"aria-hidden": "true"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: GroupedInventoryTab_module_css_default.groupName,
													children: groupLabel
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: GroupedInventoryTab_module_css_default.groupCount,
													"data-group-count": group.key,
													children: group.entries.length
												})
											]
										}), collapsed ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
											className: GroupedInventoryTab_module_css_default.cards,
											children: group.entries.map((entry) => {
												const status = phaseLabel(entry.fiberPhase, t);
												const title = moduleShortName(entry.moduleName);
												const configuration = t(entry.enabled ? "enabledTag" : "disabledTag");
												const open = expanded === entry.entryId;
												const detailId = `${catalogId}-details-${encodeURIComponent(entry.entryId)}`;
												return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
													className: GroupedInventoryTab_module_css_default.card,
													"data-plugin-entry": entry.entryId,
													"data-open": open ? "true" : void 0,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
														className: GroupedInventoryTab_module_css_default.cardContent,
														type: "button",
														"aria-expanded": open,
														"aria-controls": detailId,
														"aria-label": entry.enabled ? `${title}, ${status}, ${configuration}` : `${title}, ${configuration}`,
														onClick: () => {
															setExpanded((current) => current === entry.entryId ? null : entry.entryId);
														},
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
															className: GroupedInventoryTab_module_css_default.cardTitle,
															title: entry.moduleName,
															children: title
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
															className: GroupedInventoryTab_module_css_default.cardTrailing,
															children: [
																entry.enabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																	className: GroupedInventoryTab_module_css_default.statusDot,
																	"data-phase": entry.fiberPhase ?? "unobserved",
																	role: "img",
																	"aria-label": status,
																	title: status
																}) : null,
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																	className: GroupedInventoryTab_module_css_default.configTag,
																	"data-enabled": entry.enabled ? "true" : "false",
																	children: configuration
																}),
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
																	className: GroupedInventoryTab_module_css_default.chevron,
																	size: 12,
																	"aria-hidden": "true"
																})
															]
														})]
													}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: GroupedInventoryTab_module_css_default.cardDetails,
														id: detailId,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
															className: GroupedInventoryTab_module_css_default.entryValue,
															"data-loader-entry": true,
															children: entry.entryId
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
															className: GroupedInventoryTab_module_css_default.details,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("configuration") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: configuration })] }), entry.enabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("cordis") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: status })] }) : null]
														})]
													}) : null]
												}, entry.entryId);
											})
										})]
									}, group.key);
								})
							}) : null
						]
					}) : null
				]
			});
		}
		//#endregion
		//#region src/client/marketplace-catalog.ts
		/** The complete marketplace catalog, sorted by package name. */
		const MARKETPLACE_CATALOG = [
			{
				name: "@deepseek-ai/cordis-plugin-hmr",
				description: "Hot Module Replacement Plugin for Cordis",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/cordis-plugin-timer",
				description: "Timer service for cordis",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-agent",
				description: "Agent interface, registry, initiator scope, and event vocabulary for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-agent-default-model",
				description: "Default model selection shared by Agent entry points",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-agent-instructions",
				description: "Workspace context loader for AGENTS.md/CLAUDE.md instruction files",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-agent-loop",
				description: "The concrete agent loop plugin for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-agent-presets",
				description: "Per-session agent composition from preset cordis.yml files for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-api-gateway",
				description: "Typert Remote Host dispatcher and Client API endpoint",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-api-remotes",
				description: "Remote BFF assembly and Host Agent/Session lookup policy",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-attachment-local",
				description: "Private content-addressed DSH_HOME attachment storage",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-bash-sandbox",
				description: "Sandbox-consuming implementation of the DeepSeek Harness bash executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-connection",
				description: "Wire consumer layer: HTTP-up/WebSocket-down client, ConnectionController dual streams with reconnect, and fixture api",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-hmr",
				description: "Dev-only hot-reload driver for script-loaded client entries: SSE rebuilt frames → invalidate/prefetch → fiber swap through the vendored Loader entry",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-locale",
				description: "Locale plugin: Host-backed zh/en preference, browser-derived fallback, locale snapshots, and typed namespace dictionaries",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-modules",
				description: "Client module system, dual-face: node half composes the __DSH_BOOT__ entry graph (incremental dsh.client scan, bundle route, index tap, webPlugins service); browser half is the lazy-CJS module table the vendored cordis Loader consumes as its internal seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-runtime",
				description: "Client core services: SlotRegistry, SessionRuntime (scope tree + object layer)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-agent-preset",
				description: "Agent-preset surfaces: the default for later sessions, this session's seat, and the composition editor",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-commands",
				description: "Client command surface: global directory cache, '/' source, three command UI kinds, popupSelect registry",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-conversation",
				description: "Conversation domain: skeleton, ordered chat flow, composer with the Host-backed busy-Enter preference, and details host",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-cordis",
				description: "Cordis dynamic-plugin definition card: the keyed cordis_define tool row with its run/stop switch",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-deliverables",
				description: "Produced-files turn tail and clickable final-response file references for Web",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-goal",
				description: "Session goal surface: GoalBar docked above the composer, read from the goal session projection",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-input-trigger",
				description: "Input trigger pipeline: '/' and '@' detection, candidate menu, pick routing to registered sources",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-jobs",
				description: "Session-header background-job list: live registry state mirrored from session/jobs frames",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-layout",
				description: "Shell plugin: three-column AppFrame with drag handles, ctx.layout viewing-state service (navigation + panels)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-message-feedback",
				description: "Per-message feedback controls contributed to the assistant-message action strip, backed by the messageFeedback Host Remote",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-model-selection",
				description: "Model selection: the /model popupSelect over session.models / session.selectModel",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-permission-presets",
				description: "Permission surfaces: a new-session default in General settings and a current-session /permission popup over the permissions projection",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-plan",
				description: "Plan-mode composer control: the conversation.input.plan seat over the plan projection and the /plan command channel",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-settings",
				description: "Settings domain base plugin: the settings-namespace scope service and the canonical settings slot-type contract",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-settings-general",
				description: "Settings ownerless-copy and product onboarding plugin: the General section, shell trigger/header chrome content, settings dictionaries, and the versioned welcome notice",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-settings-models",
				description: "Models settings and shared product-onboarding dialogs over existing settings and credential joins",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-settings-plugin-inventory",
				description: "Read-only Cordis Loader inventory tab in Web Plugins settings",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-settings-plugins",
				description: "Plugins settings section with feature-owned tabs and configurable host-plane plugin cards",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-sidebar",
				description: "Sidebar plugin: session multi-level tree, search, grouping, state dots",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-skill",
				description: "Web skill references and the dedicated skill tool row",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-subagent",
				description: "Subagent conversation catalog, continuation routing UI, and '@' reference source",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-theme",
				description: "Theme plugin: Host bootstrap for the pre-plugin palette; DOM-free ThemeRuntime for light/dark/system state; --dsw-* token styles and Appearance settings row",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-tool",
				description: "Client Tool call-tree renderer and keyed per-tool presentation slot",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-trajectory",
				description: "Trajectory event ledger with an interactive timing overview: pure-consumer plugin registering into the conversation ViewMap (no service)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-user-questions",
				description: "Web ask_user_question feature: host tool mount plus composer-takeover question UI",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-workflow-run",
				description: "Durable workflow-run Conversation Node and nested member disclosure for dsh web",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-client-ui-workspace",
				description: "Workspace picker plugin: one WorkspacePicker registered into the sidebar and empty-state workspace slots",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-code-runtime-worker-thread",
				description: "Worker-thread implementation of the DeepSeek Harness code-execution seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-command-compact",
				description: "Human-facing slash command for explicit session compaction",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-command-feedback",
				description: "Log-only session feedback producer and human-facing slash command",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-command-goal",
				description: "Human-facing slash command for persisted same-session goals",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-commands",
				description: "Plugin-owned human command registry for DeepSeek Harness UIs",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-compaction-basic",
				description: "Token-meter-driven compaction policy and LLM summarization backend for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-compaction-tool-result-pruner",
				description: "Replay-safe model-free head/middle/tail pruning for tool-result surface nodes",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-cordis-client-runner",
				description: "Browser half of dynamic dual-half plugin packages: event subscription, closure evaluation, guard facade, and loader entries",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-cordis-host-runner",
				description: "Dynamic package definition registry, host-half sandbox lifecycle, and invoke handler table for model-mounted dual-half packages",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-credentials-local",
				description: "File-backed credentials provider ($DSH_HOME/.env under the live process environment) for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-fs-observation-policy",
				description: "File-context policy plugin for the DeepSeek Harness — observed-state, read-before-edit, and version-guarded write/edit added over the ctx.fs provider seam through the fs/* event gate (no service API)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-fs-sandbox",
				description: "Sandbox-enforcing implementation of the DeepSeek Harness filesystem seam: fences write/edit by the per-call sandbox mode (read-only denies mutation, workspace-write contains it to the workspace + temp roots) while reads pass through",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-goal",
				description: "Event-sourced same-session goal state and lifecycle service for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-goal-round-driver",
				description: "Race-fenced same-session goal-round driver",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-headless",
				description: "The dsh one-shot bundle: a direct core Agent/Session runner over dsh-base with no Host, HTTP, or browser layer",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-host-apiproxy",
				description: "API gateway: the ApiProxy contract (api/), the fetch carrier pair (fetch/), and the host-side gateway plugin providing ctx.apiProxy",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-host-directory-picker-auto",
				description: "Adaptive chooser of the directory-picker seam: resolves the host situation at boot and mounts the native or browse backend for the DeepSeek Harness web GUI host",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-host-plugin-inventory",
				description: "Read-only Remote projection of current Cordis Loader plugin state",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-host-webserver",
				description: "Web route-registration plugin: HTTP and upgrade routes, index transform taps, and static dist fallback; knows no harness concepts",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-jobs-local",
				description: "Process-local implementation of the DeepSeek Harness background job registry seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-llm",
				description: "Provider-neutral LLM service interface for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-llm-deepseek",
				description: "DeepSeek chat-completions adapter for the DeepSeek Harness LLM seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-llm-pi-ai",
				description: "pi-ai-backed DeepSeek adapter for the DeepSeek Harness LLM seam (design-verification twin of dsh-llm-deepseek)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-llm-retry",
				description: "Provider-routed LLM request retry policy for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-message-feedback",
				description: "Lifecycle-bound per-message rating and note sidecar for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-permission-presets",
				description: "User-facing permission presets (ctx.permissionPresets) for the DeepSeek Harness: one product-level Permissions select bundling the sandbox-mode and approval-policy knobs, written through to their own session events",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-plan-mode",
				description: "Logged per-agent plan mode with deployment guidance, a direct slash command, and a user-reviewed exit",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-pwsh-sandbox",
				description: "Sandbox-consuming implementation of the DeepSeek Harness PowerShell executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-repeat-tool-reminder",
				description: "Repeat-tool-call guard plugin: advisory reminders when an agent loops on identical tool calls",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-sandbox-local",
				description: "Local process-sandbox backends for the DeepSeek Harness sandbox seam: bwrap, the npm-distributed landlock-run launcher, macOS Seatbelt, or the Windows ACL restricted-token runner — functionally probed, fail-closed",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-sandbox-policy",
				description: "Per-call sandbox policy resolver and current model context: deployment fallbacks plus each session's mode and workspace root, shared by every enforcing capability family",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session",
				description: "Event-sourced session store for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-checkpoint-policy",
				description: "Semantic session durability checkpoints before model requests and tool side effects",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-log-export",
				description: "Web Session-log export command and shared download dialog",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-persistence-jsonl",
				description: "JSONL durable session persistence backend for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-projection",
				description: "Session-projection seam: the merge-extensible projection type table, the provider contract, and the ctx.sessionProjections registry serving whole current values of log-derived per-session state",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-projection-cache",
				description: "Persisted projection cache (ctx.sessionProjectionCache): durable per-session projection checkpoints over the domain data form, throttled write-behind, and the cold-read ladder (cache row + persistence tail replay)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-query-sqlite",
				description: "Concrete ctx.sessionQuery backend with SQLite FTS5 search",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-stats",
				description: "Whole-log conversation counts and wall times projection (sessionStats) for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-telemetry-otel",
				description: "OpenTelemetry backend for the DeepSeek Harness telemetry seam: hands captured session records to the OTel JS SDK's log pipeline",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-title",
				description: "Log-backed session title service and provider registry for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-session-title-first-prompt-llm",
				description: "First-message LLM provider plugin for DeepSeek Harness session titles",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-settings-file",
				description: "File-backed settings provider (settings.yaml) for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-shell-env",
				description: "Tool-independent managed DSH_* shell environment registry",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-skill",
				description: "Agent skill provider registry for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-skill-badge",
				description: "Bundled dsh badge skill provider for DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-skill-filesystem",
				description: "Local filesystem skill provider for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-spill-local",
				description: "Local-filesystem implementation of the DeepSeek Harness spill storage seam (private session-scoped files)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-spill-policy",
				description: "Tool-result spill policy for the DeepSeek Harness — replaces oversized plain-text tool results with a retained preview plus a spill-file path (no service API)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-storage",
				description: "Storage hub (ctx.storage): named backend registry plus mounted data-form facilities for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-storage-domain",
				description: "Domain data form (ctx.storage.domain): schema-validated, event-emitting KV domains over storage backends for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-storage-json",
				description: "JSON file KV storage backend for the DeepSeek Harness storage hub",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-subagent",
				description: "Abstract subagent seam (ctx.subagents): named-provider registry for delegating to child agents",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-subagent-fork-in-process",
				description: "In-process fork subagent backend: runs a child agent seeded with a prefix of the parent's log",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-subagent-spawn-in-process",
				description: "In-process spawn subagent backend: runs a fresh child agent on ctx.agents",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-subprocess-local",
				description: "Local-subprocess implementation of the DeepSeek Harness subprocess seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-system-prompt",
				description: "System prompt assembly registry for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-token-meter",
				description: "Replay-aware token measurement service (ctx.tokenMeter) for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-bash",
				description: "Model-facing bash tool with optional generic background-job and sandbox-escalation support",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-call-timeout-policy",
				description: "Tool-call timeout policy: a tools/execute wrapper that arms a per-tool deadline on exec.signal and returns TOOL_TIMEOUT when it wins",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-fs",
				description: "Model-facing filesystem tools (read, write, edit) over the DeepSeek Harness filesystem seam (ctx.fs)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-fs-search",
				description: "Model-facing filesystem discovery tools (glob, grep) backed by the packaged ripgrep binary (@vscode/ripgrep)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-goal",
				description: "Model-facing same-session goal tools with execution-time authority checks",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-jobs",
				description: "Model-facing background job control tools (job_output, job_list, job_kill) over the ctx.jobs registry",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-pwsh",
				description: "Model-facing pwsh tool over the bash executor seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-ralph",
				description: "Model-facing fresh-agent Ralph loop over the workflow and subagent seams",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-skill",
				description: "Model-facing skill loading tool for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-str-replace-editor",
				description: "Model-facing view, create, literal replace, and line insert tool over the Harness filesystem service",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-subagent",
				description: "Model-facing subagent delegation tool over the ctx.subagents seam",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-subagent-control",
				description: "Globally named send_message, interrupt_agent, and list_agents tools over ctx.subagents continuations",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-subagent-report",
				description: "Child-scoped report tool over ctx.subagents continuations",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-todo",
				description: "Model-facing todo_write tool over the DeepSeek Harness event-sourced session log",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-web",
				description: "Model-facing web tools (web_search, web_fetch) over the DeepSeek Harness web capability seam (ctx.web)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tool-workflow",
				description: "Model-facing workflow tool: run a JavaScript orchestration script over ctx.workflowEngine",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-tools",
				description: "Tool registry and execution pipeline for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-typert-loader",
				description: "Loader integration for generated Typert package contributions",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-typert-registry",
				description: "Runtime registry for generated package reflection and Zod schemas",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-user-approval",
				description: "User-approval seam (ctx.approval) for the DeepSeek Harness: one-shot permission decisions dispatched to composed answerers over the approval/request waterfall, fail-closed by default",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-user-questions",
				description: "Abstract user-questions seam (ctx.userQuestions) for asking the human during agent runs",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-web",
				description: "Abstract web access capability seam (ctx.web) for the DeepSeek Harness — search/fetch provider registry, registration-order-independent selection, request/result vocabulary, and the WebError taxonomy",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-web-app",
				description: "The dsh browser-surface bundle: the web patch layer over dsh-base plus the runtime glue plugin (frontend dist serving, web-surface prompt, bash runtime variables, URL line)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-web-search-deepseek",
				description: "DeepSeek-backed search provider (native web_search via the Anthropic-compatible API) for the DeepSeek Harness web capability seam (ctx.web)",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-workflow-worker-thread",
				description: "worker-thread workflow engine: executes model-written orchestration scripts off the host event loop, bridging agent() calls back to ctx.subagents",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			},
			{
				name: "@deepseek-ai/dsh-workspace",
				description: "Workspace entity registry (ctx.workspaceRegistry): durable workspace records with validated session attachment over the domain data form for the DeepSeek Harness",
				sourceUrl: "git+https://github.com/deepseek-ai/deepseek-harness.git"
			}
		];
		//#endregion
		//#region \0dsh-css:F:\OS\deepseek-harness-master\packages\client\dsh-client-plugin-manager\src\client\MarketplaceTab.module.css.mjs
		const css = ".AjJfcW_section{width:100%;max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:12px;display:flex}.AjJfcW_intro,.AjJfcW_status{margin:0}.AjJfcW_intro{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}.AjJfcW_status{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}.AjJfcW_failure{color:var(--dsw-alias-state-error-primary);align-items:center;gap:10px;font-size:13px;line-height:20px;display:flex}.AjJfcW_failure p{margin:0}.AjJfcW_failure button{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 10px;font-size:13px;text-decoration:none}.AjJfcW_marketplace{flex-direction:column;gap:12px;display:flex}.AjJfcW_search{width:100%;color:var(--dsw-alias-label-tertiary);align-items:center;display:flex;position:relative}.AjJfcW_search>svg{pointer-events:none;position:absolute;left:12px}.AjJfcW_search input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;height:36px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;outline:none;padding:0 34px 0 36px;font-size:13px}.AjJfcW_search input::placeholder{color:var(--dsw-alias-label-tertiary)}.AjJfcW_search input:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 18%, transparent)}.AjJfcW_heading{align-items:baseline;gap:7px;padding:0 2px;display:flex}.AjJfcW_heading h3{margin:0;font-size:13px;font-weight:600;line-height:20px}.AjJfcW_heading>span{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.AjJfcW_refresh{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:6px;justify-content:center;align-items:center;margin-left:auto;padding:0;display:inline-flex}.AjJfcW_refresh:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.AjJfcW_refresh:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.AjJfcW_chips{flex-wrap:wrap;gap:6px;display:flex}.AjJfcW_chip{border:1px solid var(--dsw-alias-border-l2);min-height:24px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:999px;align-items:center;gap:6px;padding:2px 10px;font-size:12px;line-height:18px;display:inline-flex}.AjJfcW_chip:hover{background:var(--dsw-alias-interactive-bg-hover)}.AjJfcW_chip[aria-pressed=true]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent);color:var(--dsw-alias-state-business-primary)}.AjJfcW_chip[aria-pressed=true] span{color:inherit}.AjJfcW_chip:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.AjJfcW_chip span{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:11px}.AjJfcW_cards{grid-template-columns:minmax(0,1fr);gap:10px;margin:0;padding:0;list-style:none;display:grid}.AjJfcW_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:10px;flex-direction:column;gap:8px;min-width:0;padding:12px 14px;display:flex}.AjJfcW_cardHeader{align-items:center;gap:8px;min-width:0;display:flex}.AjJfcW_cardName{min-width:0;color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code);text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;line-height:19px;overflow:hidden}.AjJfcW_cardVersion{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;flex:none;font-size:11px;line-height:17px}.AjJfcW_installedTag{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent);min-height:18px;color:var(--dsw-alias-state-success-primary);white-space:nowrap;border-radius:5px;flex:none;align-items:center;padding:0 6px;font-size:11px;line-height:16px;display:inline-flex}.AjJfcW_cardDescription{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}.AjJfcW_cardFooter{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.AjJfcW_groupTag{background:var(--dsw-alias-bg-layer-1);min-height:20px;color:var(--dsw-alias-label-secondary);white-space:nowrap;border-radius:5px;flex:none;align-items:center;padding:1px 7px;font-size:11px;line-height:16px;display:inline-flex}.AjJfcW_cardActions{flex-wrap:wrap;align-items:center;gap:8px;margin-left:auto;display:inline-flex}.AjJfcW_copyButton,.AjJfcW_actionLink{border:1px solid var(--dsw-alias-border-l2);min-height:26px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;align-items:center;gap:5px;padding:2px 9px;font-size:12px;line-height:18px;text-decoration:none;display:inline-flex}.AjJfcW_copyButton:hover,.AjJfcW_actionLink:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.AjJfcW_copyButton:focus-visible,.AjJfcW_actionLink:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.AjJfcW_copyButton[data-copied=true]{border-color:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}.AjJfcW_visuallyHidden{clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}";
		const tagId = "@deepseek-ai/dsh-client-plugin-manager/MarketplaceTab.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-plugin-manager";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var MarketplaceTab_module_css_default = {
			"installedTag": "AjJfcW_installedTag",
			"cardActions": "AjJfcW_cardActions",
			"cardHeader": "AjJfcW_cardHeader",
			"visuallyHidden": "AjJfcW_visuallyHidden",
			"cardDescription": "AjJfcW_cardDescription",
			"failure": "AjJfcW_failure",
			"cards": "AjJfcW_cards",
			"refresh": "AjJfcW_refresh",
			"groupTag": "AjJfcW_groupTag",
			"cardVersion": "AjJfcW_cardVersion",
			"chips": "AjJfcW_chips",
			"intro": "AjJfcW_intro",
			"search": "AjJfcW_search",
			"section": "AjJfcW_section",
			"cardFooter": "AjJfcW_cardFooter",
			"cardName": "AjJfcW_cardName",
			"card": "AjJfcW_card",
			"status": "AjJfcW_status",
			"actionLink": "AjJfcW_actionLink",
			"heading": "AjJfcW_heading",
			"chip": "AjJfcW_chip",
			"marketplace": "AjJfcW_marketplace",
			"copyButton": "AjJfcW_copyButton"
		};
		//#endregion
		//#region src/client/MarketplaceTab.tsx
		/**
		* Plugin marketplace tab: browse the repository plugin catalog, filter by
		* function group, and copy the install command for a package. The catalog is
		* generated from the shipped cordis compositions (see scripts/generate-catalog.mjs)
		* because the npm registry search API has no scope filter; installed markers
		* come from the Host inventory snapshot.
		*/
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
				sourceUrl: entry.sourceUrl.replace(/^git\+/, "")
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
			const installed = /* @__PURE__ */ new Set();
			for (const moduleName of moduleNames) {
				installed.add(moduleName);
				if (moduleName.startsWith("@")) {
					const parts = moduleName.split("/");
					if (parts.length > 2) installed.add(parts.slice(0, 2).join("/"));
				}
			}
			return installed;
		}
		/** Render the repository-backed plugin marketplace. */
		function MarketplaceTab({ list, t }) {
			const copiedTimer = (0, react.useRef)(null);
			const [request, setRequest] = (0, react.useState)(0);
			const [query, setQuery] = (0, react.useState)("");
			const [selectedGroups, setSelectedGroups] = (0, react.useState)(() => /* @__PURE__ */ new Set());
			const [copiedName, setCopiedName] = (0, react.useState)(null);
			const [state, setState] = (0, react.useState)({ status: "loading" });
			(0, react.useEffect)(() => {
				let current = true;
				list().then((inventory) => {
					if (current) setState({
						status: "ready",
						catalog: CATALOG,
						installed: installedPackages(inventory.entries.map((entry) => entry.moduleName))
					});
				}, () => {
					if (current) setState({ status: "error" });
				});
				return () => {
					current = false;
				};
			}, [list, request]);
			(0, react.useEffect)(() => () => {
				if (copiedTimer.current !== null) clearTimeout(copiedTimer.current);
			}, []);
			const retry = () => {
				setState({ status: "loading" });
				setRequest((value) => value + 1);
			};
			const toggleGroup = (key) => {
				setSelectedGroups((previous) => {
					const next = new Set(previous);
					if (next.has(key)) next.delete(key);
					else next.add(key);
					return next;
				});
			};
			const copyCommand = async (name) => {
				if (!await (0, _deepseek_ai_dsh_client_ui_primitives.writeClipboard)(`dsh plugin --profile web add ${name}`)) return;
				if (copiedTimer.current !== null) clearTimeout(copiedTimer.current);
				setCopiedName(name);
				copiedTimer.current = setTimeout(() => {
					setCopiedName((current) => current === name ? null : current);
				}, 1500);
			};
			const normalizedQuery = query.trim().toLocaleLowerCase();
			const matchesQuery = (pkg) => {
				if (normalizedQuery.length === 0) return true;
				return [pkg.name, pkg.description].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
			};
			const groupCounts = (0, react.useMemo)(() => {
				const counts = /* @__PURE__ */ new Map();
				if (state.status !== "ready") return counts;
				for (const pkg of state.catalog) {
					const key = classifyModule(pkg.name);
					counts.set(key, (counts.get(key) ?? 0) + 1);
				}
				return counts;
			}, [state]);
			const visible = (0, react.useMemo)(() => {
				if (state.status !== "ready") return [];
				return state.catalog.filter((pkg) => {
					const key = classifyModule(pkg.name);
					if (selectedGroups.size > 0 && !selectedGroups.has(key)) return false;
					return matchesQuery(pkg);
				});
			}, [
				state,
				selectedGroups,
				normalizedQuery
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: MarketplaceTab_module_css_default.section,
				"aria-busy": state.status === "loading",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: MarketplaceTab_module_css_default.intro,
						children: t("marketplaceIntro")
					}),
					state.status === "loading" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: MarketplaceTab_module_css_default.status,
						children: t("marketplaceLoading")
					}) : null,
					state.status === "error" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: MarketplaceTab_module_css_default.failure,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							children: t("marketplaceError")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: retry,
							children: t("retry")
						})]
					}) : null,
					state.status === "ready" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: MarketplaceTab_module_css_default.marketplace,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: MarketplaceTab_module_css_default.search,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, { "aria-hidden": "true" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: MarketplaceTab_module_css_default.visuallyHidden,
										children: t("marketplaceSearch")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "search",
										value: query,
										placeholder: t("marketplaceSearch"),
										"aria-label": t("marketplaceSearch"),
										onChange: (event) => {
											setQuery(event.currentTarget.value);
										}
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: MarketplaceTab_module_css_default.heading,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("catalog") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										"data-market-count": visible.length,
										children: visible.length
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: MarketplaceTab_module_css_default.refresh,
										type: "button",
										"aria-label": t("marketplaceRefresh"),
										title: t("marketplaceRefresh"),
										onClick: retry,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, {
											size: 14,
											"aria-hidden": "true"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: MarketplaceTab_module_css_default.chips,
								role: "group",
								"aria-label": t("catalog"),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: MarketplaceTab_module_css_default.chip,
									type: "button",
									"aria-pressed": selectedGroups.size === 0,
									onClick: () => {
										setSelectedGroups(/* @__PURE__ */ new Set());
									},
									children: t("marketplaceAll")
								}), PLUGIN_GROUP_ORDER.map((key) => {
									const count = groupCounts.get(key) ?? 0;
									if (count === 0) return null;
									const label = t(PLUGIN_GROUP_LABEL_KEY[key]);
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: MarketplaceTab_module_css_default.chip,
										type: "button",
										"aria-pressed": selectedGroups.has(key),
										"aria-label": label,
										onClick: () => {
											toggleGroup(key);
										},
										children: [label, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											"data-group-chip-count": true,
											children: count
										})]
									}, key);
								})]
							}),
							visible.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: MarketplaceTab_module_css_default.status,
								children: t("emptySearch")
							}) : null,
							visible.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: MarketplaceTab_module_css_default.cards,
								children: visible.map((pkg) => {
									const key = classifyModule(pkg.name);
									const installed = state.installed.has(pkg.name);
									const copied = copiedName === pkg.name;
									const copyLabel = copied ? t("marketplaceCopied") : t("marketplaceCopyCommand");
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
										className: MarketplaceTab_module_css_default.card,
										"data-market-package": pkg.name,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: MarketplaceTab_module_css_default.cardHeader,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
													className: MarketplaceTab_module_css_default.cardName,
													children: pkg.name
												}), installed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: MarketplaceTab_module_css_default.installedTag,
													"data-installed": true,
													children: t("marketplaceInstalled")
												}) : null]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
												className: MarketplaceTab_module_css_default.cardDescription,
												children: pkg.description || "—"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: MarketplaceTab_module_css_default.cardFooter,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: MarketplaceTab_module_css_default.groupTag,
													"data-market-group": key,
													children: t(PLUGIN_GROUP_LABEL_KEY[key])
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													className: MarketplaceTab_module_css_default.cardActions,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
															className: MarketplaceTab_module_css_default.copyButton,
															type: "button",
															"aria-label": copyLabel,
															"data-copied": copied ? "true" : void 0,
															onClick: () => {
																copyCommand(pkg.name);
															},
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, {
																size: 14,
																"aria-hidden": "true"
															}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: copyLabel })]
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("a", {
															className: MarketplaceTab_module_css_default.actionLink,
															href: pkg.npmUrl,
															target: "_blank",
															rel: "noreferrer",
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconLinkOutline16, {
																size: 14,
																"aria-hidden": "true"
															}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("marketplaceOpenNpm") })]
														}),
														pkg.sourceUrl === "" ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("a", {
															className: MarketplaceTab_module_css_default.actionLink,
															href: pkg.sourceUrl,
															target: "_blank",
															rel: "noreferrer",
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconLinkOutline16, {
																size: 14,
																"aria-hidden": "true"
															}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("marketplaceOpenSource") })]
														})
													]
												})]
											})
										]
									}, pkg.name);
								})
							}) : null
						]
					}) : null
				]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** Copy dictionaries for the plugin inventory Settings section. */
		/** Simplified Chinese dictionary and key source of truth. */
		const zh = {
			tab: "插件列表",
			groupedTab: "分组视图",
			loading: "正在读取插件…",
			error: "暂时无法读取插件。",
			retry: "重试",
			search: "搜索插件",
			catalog: "插件列表",
			empty: "暂无插件。",
			emptySearch: "没有匹配的插件。",
			enabledTag: "已启用",
			disabledTag: "已停用",
			configuration: "配置状态",
			cordis: "Cordis 状态",
			unobserved: "未挂载",
			pending: "等待依赖",
			loadingPhase: "加载中",
			active: "已挂载",
			failed: "挂载失败",
			unloading: "卸载中",
			expandAll: "全部展开",
			collapseAll: "全部收起",
			groupToggle: "切换分组",
			marketplaceTab: "插件市场",
			marketplaceIntro: "浏览本仓库可用的插件目录；复制安装命令后在终端中运行即可安装到当前部署。",
			marketplaceLoading: "正在读取插件目录…",
			marketplaceError: "暂时无法读取插件目录。",
			marketplaceSearch: "搜索插件市场",
			marketplaceRefresh: "刷新",
			marketplaceInstalled: "已安装",
			marketplaceCopyCommand: "复制安装命令",
			marketplaceCopied: "已复制",
			marketplaceOpenNpm: "打开 npm 页面",
			marketplaceOpenSource: "查看源码",
			marketplaceAll: "全部",
			groupFramework: "框架与内核",
			groupLlm: "大模型",
			groupSession: "会话与记忆",
			groupTools: "工具",
			groupExecution: "终端与沙箱",
			groupFilesystem: "文件系统",
			groupWeb: "网络",
			groupSkills: "技能",
			groupSubagents: "子代理",
			groupWorkflow: "工作流",
			groupGoals: "目标与计划",
			groupSettings: "设置与权限",
			groupHost: "主机服务",
			groupClient: "客户端界面",
			groupOther: "其他"
		};
		/** English dictionary checked against the Chinese key set. */
		const en = {
			tab: "Plugin list",
			groupedTab: "Grouped view",
			loading: "Reading plugins…",
			error: "Plugins are temporarily unavailable.",
			retry: "Retry",
			search: "Search plugins",
			catalog: "Plugin list",
			empty: "No plugins are available.",
			emptySearch: "No matching plugins.",
			enabledTag: "Enabled",
			disabledTag: "Disabled",
			configuration: "Configuration",
			cordis: "Cordis status",
			unobserved: "Not mounted",
			pending: "Waiting for dependencies",
			loadingPhase: "Loading",
			active: "Mounted",
			failed: "Mount failed",
			unloading: "Unloading",
			expandAll: "Expand all",
			collapseAll: "Collapse all",
			groupToggle: "Toggle group",
			marketplaceTab: "Plugin marketplace",
			marketplaceIntro: "Browse the plugin catalog shipped with this source tree; copy an install command and run it in a terminal to install into this deployment.",
			marketplaceLoading: "Loading plugin catalog…",
			marketplaceError: "The plugin catalog is temporarily unavailable.",
			marketplaceSearch: "Search marketplace",
			marketplaceRefresh: "Refresh",
			marketplaceInstalled: "Installed",
			marketplaceCopyCommand: "Copy install command",
			marketplaceCopied: "Copied",
			marketplaceOpenNpm: "Open on npm",
			marketplaceOpenSource: "View source",
			marketplaceAll: "All",
			groupFramework: "Framework & core",
			groupLlm: "LLM",
			groupSession: "Session & memory",
			groupTools: "Tools",
			groupExecution: "Shell & sandbox",
			groupFilesystem: "Filesystem",
			groupWeb: "Web",
			groupSkills: "Skills",
			groupSubagents: "Subagents",
			groupWorkflow: "Workflow",
			groupGoals: "Goals & planning",
			groupSettings: "Settings & permissions",
			groupHost: "Host services",
			groupClient: "Client UI",
			groupOther: "Other"
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.pluginManager";
		/** Services required by the Settings registration and generated Remote face. */
		const inject = [
			"slots",
			"locale",
			"remote",
			"remote.pluginInventory"
		];
		/**
		* Contribute the grouped inventory and marketplace tabs to the Plugins section.
		* @param ctx - the browser plugin context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-client-plugin-manager: dictionaries");
			const t = ctx.locale.bind(NS);
			const list = async () => {
				const result = await ctx.remote.pluginInventory.list();
				if (!result.ok) throw new Error(`pluginInventory.list failed: ${result.error.code}: ${result.error.message}`);
				return result.value;
			};
			const injected = () => ({ list });
			ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
				name: "settings.plugins.tab",
				id: "grouped",
				order: 11,
				label: () => t("groupedTab"),
				locale: NS,
				inject: injected
			}, GroupedInventoryTab));
			ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
				name: "settings.plugins.tab",
				id: "market",
				order: 20,
				label: () => t("marketplaceTab"),
				locale: NS,
				inject: injected
			}, MarketplaceTab));
		}
		//#endregion
		exports.NS = NS;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map