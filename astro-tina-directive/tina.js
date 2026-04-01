/**
 * Hydrate on first click on the window
 * @type {import('astro').ClientDirective}
 */
/**
 * Hydrate immediately (not just in TinaCMS iframe).
 * Falls back to SSR if-based progressive enhancement ( load → hydrate ).
 * Also provides `client:only` directive for SSR support without TinaCMS iframe.
 */
export default async (load, _options, el) => {
	const hydrate = await load();
	await hydrate();
};
