/**
 * Generate the favicon set and PWA icons from public/favicon.svg.
 *
 * Run with: npm run icons
 *
 * - favicon.ico        16/32/48, rounded corners (browser tabs)
 * - apple-touch-icon   opaque 180, full-bleed (iOS masks it itself)
 * - icon-192 / 512     opaque, full-bleed (PWA / Android)
 * - icon-maskable-512  same art inset into the safe zone for Android masks
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const source = await readFile(path.join(publicDir, "favicon.svg"), "utf8");

const render = (svg: string, size: number): Buffer => {
	const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
	return Buffer.from(resvg.render().asPng());
};

// Opaque, full-bleed variants — touch and PWA icons should not have
// transparent corners (the platform applies its own mask).
const fullBleed = source.replace('rx="14"', "");
const maskable = fullBleed.replace(
	'<g fill="#ffffff">',
	'<g fill="#ffffff" transform="translate(6.4 6.4) scale(0.8)">',
);

await writeFile(path.join(publicDir, "apple-touch-icon.png"), render(fullBleed, 180));
await writeFile(path.join(publicDir, "icon-192.png"), render(fullBleed, 192));
await writeFile(path.join(publicDir, "icon-512.png"), render(fullBleed, 512));
await writeFile(path.join(publicDir, "icon-maskable-512.png"), render(maskable, 512));

const scratch = await mkdtemp(path.join(tmpdir(), "focuslab-icons-"));
try {
	const files = await Promise.all(
		[16, 32, 48].map(async (size) => {
			const file = path.join(scratch, `favicon-${size}.png`);
			await writeFile(file, render(source, size));
			return file;
		}),
	);
	await writeFile(path.join(publicDir, "favicon.ico"), await pngToIco(files));
} finally {
	await rm(scratch, { recursive: true, force: true });
}

console.log(
	"icons: favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png",
);
