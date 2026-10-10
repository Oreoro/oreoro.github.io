/**
 * Static metadata for the stable reading ground in refined-shell.css.
 * There is no page-load picker or stored preview override.
 */
export interface Palette {
	id: string;
	label: string;
	/** Static ground index, retained in the shell's data attributes. */
	initialGround?: number;
	scheme: "light" | "dark";
	/** Starting ground as a hex string, for the static `theme-color` meta tag. */
	themeColor: string;
}

export const palettes: Palette[] = [
	{
		id: "focuslab",
		label: "Focus Lab",
		initialGround: 0,
		scheme: "light",
		themeColor: "#F4F6F3",
	},
];

/** Native controls and static metadata use the same reading scheme. */
export function getPaletteScheme(palette: Palette) {
	return palette.scheme;
}

export const DEFAULT_PALETTE = "focuslab";
