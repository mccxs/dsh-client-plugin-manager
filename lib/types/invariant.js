/** Package-owned invariant companion. @module @deepseek-ai/dsh-client-plugin-manager/invariant */
const PACKAGE_NAME = '@deepseek-ai/dsh-client-plugin-manager';
/** Cordis companion plugin name. */
export const name = 'dsh-client-plugin-manager-invariant';
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants'];
/** No runtime invariant: this package owns a read-only Settings contribution. */
const install = () => { };
/** Register this package's invariant companion. */
export const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
/* jscpd:ignore-end */
//# sourceMappingURL=invariant.js.map