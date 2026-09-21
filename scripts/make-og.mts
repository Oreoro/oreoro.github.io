/**
 * Generate the social share image (1200x630) into public/og.png.
 *
 * Run with: node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/make-og.mts
 * It uses system fonts, so it is intended to be run once and the PNG committed.
 */

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const mark = `
	<g fill="#ffffff">
		<circle cx="6" cy="6" r="2" />
		<circle cx="16" cy="6" r="2.7" />
		<circle cx="26" cy="6" r="2" />
		<circle cx="6" cy="16" r="2.7" />
		<circle cx="16" cy="16" r="4.4" />
		<circle cx="26" cy="16" r="2.7" />
		<circle cx="6" cy="26" r="2" />
		<circle cx="16" cy="26" r="2.7" />
		<circle cx="26" cy="26" r="2" />
	</g>`;

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<rect width="1200" height="630" fill="#0f0e0e" />
	<g transform="translate(80,80) scale(2.6)">${mark}</g>
	<text x="80" y="312" font-family="${font}" font-size="94" font-weight="700" letter-spacing="-2" fill="#ffffff">Focus Lab</text>
	<text x="80" y="382" font-family="${font}" font-size="40" fill="rgba(255,255,255,0.82)">A product studio in Islamabad.</text>
	<text x="80" y="540" font-family="${font}" font-size="30" fill="rgba(255,255,255,0.72)">Urban Events · WorkProof · Fixer</text>
	<text x="1120" y="540" text-anchor="end" font-family="${font}" font-size="30" fill="rgba(255,255,255,0.72)">focuslab.pk</text>
</svg>`;

const resvg = new Resvg(svg, {
	font: { loadSystemFonts: true },
	background: "#0f0e0e",
});

const png = resvg.render().asPng();
const out = path.join(root, "public", "og.png");
writeFileSync(out, png);
console.log(`[og] wrote ${out} (${png.length} bytes)`);
