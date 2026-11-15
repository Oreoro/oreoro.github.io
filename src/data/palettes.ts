export interface Palette {
	id: string;
	label: string;
	initialGround?: number;
	scheme: "light" | "dark";
	themeColor: string;
}

export const palettes: Palette[] = [
	{
		id: "noir",
		label: "Noir",
		initialGround: 0,
		scheme: "dark",
		themeColor: "#0C0C0E",
	},
	{
		id: "focuslab",
		label: "Focus Lab",
		initialGround: 0,
		scheme: "dark",
		themeColor: "#235C43",
	},
];

export function getPaletteScheme(palette: Palette) {
	return palette.scheme;
}

export const DEFAULT_PALETTE = "noir";