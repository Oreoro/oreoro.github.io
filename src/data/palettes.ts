/**
 * The palette registry.
 *
 * The colour values themselves live in `src/styles/theme-picker.css`, under
 * `[data-palette="…"]` — CSS stays the one place a colour is written down, which
 * is what lets the picker, the gradients, the menu sheet and the page ground all
 * agree without a build step.
 *
 * What is kept here is the little that has to be known *before* the stylesheet
 * has loaded. The pre-paint script in BaseHead.astro runs while the document is
 * still being parsed and Astro emits `<link rel="stylesheet">` at the end of
 * `<head>`, so it cannot read a single computed value. It needs to know which
 * palette is in play, how many grounds that palette has, and whether it is a
 * light or a dark one.
 *
 * `size` must match the number of `--rgb-theme-N` entries in theme-picker.css.
 */
export interface Palette {
	id: string;
	label: string;
	/** How many grounds this palette offers, as `--rgb-theme-1` … `--rgb-theme-N`. */
	size: number;
	scheme: "light" | "dark";
}

export const palettes: Palette[] = [
	{ id: "pastel", label: "Pastel", size: 15, scheme: "light" },
	{ id: "notion", label: "Notion", size: 9, scheme: "light" },
	{ id: "signal", label: "Signal", size: 9, scheme: "dark" },
	{ id: "ink", label: "Ink", size: 4, scheme: "dark" },
];

export const DEFAULT_PALETTE = "pastel";

/** localStorage key holding the visitor's palette choice. */
export const PALETTE_STORAGE_KEY = "fl-palette";
