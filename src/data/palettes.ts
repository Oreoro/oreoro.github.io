/**
 * The palette registry.
 *
 * The colour values themselves live in `src/styles/palette.css`, under
 * `[data-palette="…"]` — CSS stays the one place a colour is written down, which
 * is what lets the picker, the gradients, the menu sheet and the page ground all
 * agree without a build step.
 *
 * What is kept here is the little that has to be known *before* the stylesheet
 * has loaded. The pre-paint script in BaseHead.astro runs while the document is
 * still being parsed and Astro emits `<link rel="stylesheet">` at the end of
 * `<head>`, so it cannot read a single computed value. It needs to know which
 * palettes exist, how many grounds each offers, and whether it is a light or a
 * dark one.
 *
 * ## Choosing a palette
 *
 * `focuslab` is the default: one charcoal ground, soft-white ink, dark surfaces,
 * and restrained forest-green accents. The previous palettes remain available for
 * explicit previews. Three ways to switch, in order of
 * precedence:
 *
 *   1. `?palette=<id>` on any URL — for testing against the running site. The
 *      choice is remembered in localStorage, so it sticks across navigation.
 *      `?palette=reset` clears it.
 *   2. `PUBLIC_PALETTE=<id>` in the environment — sets the default for a whole
 *      build (`PUBLIC_PALETTE=spartan npm run build`).
 *   3. `FALLBACK_PALETTE` below — the shipped default, `focuslab`.
 *
 * An unknown id always falls back rather than breaking the page.
 *
 * `size` counts page grounds, not the additional book-cover tints. `themeColor`
 * must match `--rgb-theme-1`, before CSS can be read.
 */
export interface Palette {
	id: string;
	label: string;
	/** How many grounds this palette offers, as `--rgb-theme-1` … `--rgb-theme-N`. */
	size: number;
	scheme: "light" | "dark";
	/** First ground as a hex string, for the static `theme-color` meta tag. */
	themeColor: string;
}

export const palettes: Palette[] = [
	{ id: "focuslab", label: "Focus Lab", size: 1, scheme: "dark", themeColor: "#101312" },
	{ id: "pastel", label: "Pastel", size: 15, scheme: "light", themeColor: "#ccd5ae" },
	{ id: "apple", label: "Apple", size: 15, scheme: "light", themeColor: "#ffffff" },
	{ id: "notion", label: "Notion", size: 15, scheme: "light", themeColor: "#f6f5f4" },
	{ id: "spartan", label: "Spartan", size: 15, scheme: "light", themeColor: "#ecf2ee" },
	{ id: "ink", label: "Ink", size: 15, scheme: "dark", themeColor: "#1a1a1d" },
];

/** The shipped default when neither a URL override nor PUBLIC_PALETTE is set. */
export const FALLBACK_PALETTE = "focuslab";

/**
 * The palette a fresh visitor gets. `PUBLIC_PALETTE` wins when it names a
 * palette we actually ship; anything else falls back `FALLBACK_PALETTE`.
 */
export const DEFAULT_PALETTE: string = (() => {
	const configured = import.meta.env.PUBLIC_PALETTE;
	if (configured && palettes.some((palette) => palette.id === configured)) {
		return configured;
	}
	return FALLBACK_PALETTE;
})();

/**
 * localStorage key holding the visitor's test override.
 *
 * A new key prevents earlier light or colourful previews from overriding the
 * dark default. Visitors must explicitly opt in with `?palette=<id>` again.
 */
export const PALETTE_STORAGE_KEY = "fl-palette-dark-v2";
