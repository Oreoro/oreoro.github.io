import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { DEFAULT_PALETTE, getPaletteScheme, palettes } from "../src/data/palettes.ts";
import { stream, streamKindLabels } from "../src/data/stream.ts";
import { normalizeSearchText } from "../src/scripts/list-filter.ts";
import { buildEmailRequestHref } from "../src/scripts/email-request.ts";
import { products } from "../src/data/products.ts";
import { productSites } from "../src/data/product-sites.ts";
import worker from "../src/worker.js";

test("every product has its own public HTTPS website", () => {
	assert.deepEqual(productSites, {
		urbanevents: "https://urbanevents.focuslab.pk",
		workproof: "https://workproof.focuslab.pk",
		fixer: "https://fixer.focuslab.pk",
	});
	assert.equal(products.length, Object.keys(productSites).length);
	assert.equal(new Set(products.map((product) => product.slug)).size, products.length);
	for (const product of products) {
		assert.equal(product.url, productSites[product.slug]);
		const url = new URL(product.url);
		assert.equal(url.protocol, "https:");
		assert.equal(url.username, "");
		assert.equal(url.password, "");
	}
});

test("product cards, header, and studio link to the internal product pages", () => {
	const header = readFileSync(
		new URL("../src/components/layout/Header.astro", import.meta.url),
		"utf8",
	);
	const card = readFileSync(
		new URL("../src/components/ui/ProductCard.astro", import.meta.url),
		"utf8",
	);
	const studio = readFileSync(new URL("../src/pages/studio/index.astro", import.meta.url), "utf8");
	const detail = readFileSync(
		new URL("../src/pages/products/[slug].astro", import.meta.url),
		"utf8",
	);
	assert.match(header, /products\.map/);
	for (const source of [header, card, studio]) {
		assert.ok(source.includes("/products/${product.slug}/"), "links to the internal detail page");
	}
	assert.match(card, /See the product/);
	assert.ok(
		existsSync(new URL("../src/pages/products/[slug].astro", import.meta.url)),
		"Product detail pages are generated",
	);
	// The detail pages link out to the real product websites.
	assert.match(detail, /href=\{product\.url\} target="_blank" rel="noopener"/);
	// The stream never links to the /products/ routes.
	for (const source of stream.map((entry) => entry.content)) {
		assert.doesNotMatch(source, /\/products\//);
	}
	for (const entry of stream) {
		for (const [tag, href] of entry.content.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
			if (!Object.values(productSites).some((website) => website === href)) continue;
			assert.match(tag, /target="_blank"/);
			assert.match(tag, /rel="noopener"/);
		}
	}
	assert.ok(stream.some((entry) => entry.content.includes(`href="${productSites.fixer}"`)));
});

test("product pages are served by the static build, not redirected", async () => {
	for (const slug of Object.keys(productSites)) {
		for (const suffix of ["", "/", "/index.html"]) {
			const request = new Request(`https://focuslab.pk/products/${slug}${suffix}`, {
				method: "GET",
			});
			let assetCalls = 0;
			const response = await worker.fetch(request, {
				ASSETS: {
					fetch: async (received: Request) => {
						assert.equal(received, request);
						assetCalls += 1;
						return new Response("asset response", { status: 200 });
					},
				},
			});
			assert.equal(response.status, 200);
			assert.equal(response.headers.get("location"), null);
			assert.equal(assetCalls, 1);
			assert.equal(await response.text(), "asset response");
		}
	}
});

test("product redirects leave the listing, unknown paths, and unsafe methods alone", async () => {
	const cases = [
		["/products", "GET"],
		["/products/", "GET"],
		["/products/unknown/", "GET"],
		["/products/fixer/extra", "GET"],
		["/products/__proto__/", "GET"],
		["/products/constructor/", "GET"],
		["/products/fixer/", "POST"],
		["/products/fixer/", "OPTIONS"],
	];
	for (const [path, method] of cases) {
		const request = new Request(`https://focuslab.pk${path}`, { method });
		let assetCalls = 0;
		const response = await worker.fetch(request, {
			ASSETS: {
				fetch: async (received: Request) => {
					assert.equal(received, request);
					assetCalls += 1;
					return new Response("asset response");
				},
			},
		});
		assert.equal(assetCalls, 1);
		assert.equal(response.status, 200);
		assert.equal(response.headers.get("location"), null);
		assert.equal(await response.text(), "asset response");
	}
});

test("the forest canvas and browser metadata use the same dark theme", () => {
	const palette = palettes.find((entry) => entry.id === DEFAULT_PALETTE)!;
	const manifest = JSON.parse(
		readFileSync(new URL("../public/site.webmanifest", import.meta.url), "utf8"),
	);
	assert.equal(palette.themeColor, "#235C43");
	assert.equal(getPaletteScheme(palette), "dark");
	assert.equal(manifest.background_color, palette.themeColor);
	assert.equal(manifest.theme_color, palette.themeColor);
});

test("forest text and control boundaries meet accessible contrast", () => {
	const css = readFileSync(
		new URL("../src/styles/forest-theme.css", import.meta.url),
		"utf8",
	).split("@media print")[0]!;
	const color = (token: string) => {
		const value = css.match(new RegExp(`--${token}:\\s*([^;]+);`))?.[1]?.trim();
		assert.ok(value, `Missing theme token: ${token}`);
		const channels = value.startsWith("#")
			? value
					.slice(1)
					.match(/.{2}/g)!
					.map((channel) => Number.parseInt(channel, 16))
			: value.split(",").map(Number);
		assert.equal(channels.length, 3);
		assert.ok(
			channels.every((channel) => Number.isFinite(channel) && channel >= 0 && channel <= 255),
		);
		return channels;
	};
	const luminance = (channels: number[]) => {
		const [red, green, blue] = channels.map((channel) => {
			const value = channel / 255;
			return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
		});
		return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
	};
	const contrast = (foreground: string, background: string) => {
		const values = [luminance(color(foreground)), luminance(color(background))];
		return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
	};

	for (const background of ["rgb-theme", "rgb-sheet", "color-surface"]) {
		for (const foreground of ["rgb-ink", "color-muted", "rgb-error"]) {
			assert.ok(contrast(foreground, background) >= 4.5, `${foreground} on ${background}`);
		}
		assert.ok(contrast("color-boundary", background) >= 3, `Control boundary on ${background}`);
	}
});

test("self-hosted variable fonts have real weights, italics, and cache-safe filenames", () => {
	const css = readFileSync(new URL("../src/styles/signals-shell.css", import.meta.url), "utf8");
	const faces = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)]
		.map((match) => match[1]!)
		.filter((face) => /font-family:\s*"DM Sans";/.test(face));
	assert.equal(faces.length, 4);
	assert.equal(faces.filter((face) => /font-style:\s*italic;/.test(face)).length, 2);
	assert.equal(faces.filter((face) => /font-style:\s*normal;/.test(face)).length, 2);

	for (const face of faces) {
		assert.match(face, /font-weight:\s*100 1000;/);
		assert.match(face, /font-display:\s*swap;/);
		assert.match(face, /unicode-range:/);
		const path = face.match(/url\("([^"]+\.woff2)"\)/)?.[1];
		assert.ok(path?.startsWith("/assets/fonts/"));
		const data = readFileSync(new URL(`../public${path}`, import.meta.url));
		assert.equal(data.readUInt32BE(0), 0x774f4632, "Valid WOFF2 signature");
		const hash = createHash("sha256").update(data).digest("hex").slice(0, 12);
		assert.ok(path.endsWith(`-v17-${hash}.woff2`), "Filename matches font content");
	}

	assert.match(
		readFileSync(new URL("../public/assets/fonts/DM-Sans-OFL.txt", import.meta.url), "utf8"),
		/SIL OPEN FONT LICENSE Version 1\.1/,
	);
});

test("only the primary Latin font is preloaded and matches the stylesheet", () => {
	const head = readFileSync(
		new URL("../src/components/layout/BaseHead.astro", import.meta.url),
		"utf8",
	);
	const css = readFileSync(new URL("../src/styles/signals-shell.css", import.meta.url), "utf8");
	const preloads = [...head.matchAll(/<link\b[^>]*rel="preload"[^>]*\/>/g)].filter(([tag]) =>
		tag.includes('as="font"'),
	);
	assert.equal(preloads.length, 1);
	const path = preloads[0]![0].match(/href="([^"]+)"/)?.[1];
	assert.ok(path?.includes("dm-sans-latin-normal-"));
	assert.ok(css.includes(`url("${path}")`));
	assert.match(preloads[0]![0], /crossorigin/);
	assert.ok(readFileSync(new URL(`../public${path}`, import.meta.url)).length < 65 * 1024);
});

test("stream numerals use a fixed grid gutter and real monospace figures", () => {
	const css = readFileSync(new URL("../src/styles/signals-shell.css", import.meta.url), "utf8");
	const header = css.match(
		/\.signal__header dl,\s*html body\.signals-shell \.signal__header :is\(h1, h2\) \{([^}]+)\}/,
	)?.[1];
	const numerals = css.match(
		/\.signal__header dl dt,\s*html body\.signals-shell \.signal__header :is\(h1, h2\) span \{([^}]+)\}/,
	)?.[1];
	assert.ok(header);
	assert.ok(numerals);
	assert.match(css, /--number-gutter:\s*2\.5em;/);
	assert.match(header, /grid-template-columns:\s*var\(--number-gutter\) minmax\(0, 1fr\);/);
	assert.equal(
		css.match(/grid-template-columns:\s*var\(--number-gutter\) minmax\(0, 1fr\);/g)?.length,
		4,
	);
	assert.match(numerals, /font-family:\s*var\(--font-family-mono\);/);
	assert.match(numerals, /font-variant-numeric:\s*tabular-nums;/);
});

test("entry navigation allows long titles to wrap on narrow screens", () => {
	const css = readFileSync(new URL("../src/styles/forest-theme.css", import.meta.url), "utf8");
	const navigation = css.match(/\.entry__navigation a \{([^}]+)\}/)?.[1];
	assert.ok(navigation);
	assert.match(navigation, /min-width:\s*0;/);
	assert.match(navigation, /overflow-wrap:\s*anywhere;/);
});

test("reading links wrap without overflowing when text is enlarged", () => {
	const css = readFileSync(new URL("../src/styles/forest-theme.css", import.meta.url), "utf8");
	const links = css.match(/\.content a:not\(\.button\) \{([^}]+)\}/)?.[1];
	assert.ok(links);
	assert.match(links, /overflow-wrap:\s*anywhere;/);
});

test("decorative brand marks yield space for enlarged navigation text", () => {
	const css = readFileSync(new URL("../src/styles/signals-shell.css", import.meta.url), "utf8");
	const brandRule = css.match(/html body\.signals-shell \.brand \{([^}]+)\}/)?.[1];
	const markRule = css.match(/html body\.signals-shell \.brand__mark \{([^}]+)\}/)?.[1];
	const toggleRule = css.match(/html body\.signals-shell \.nav__toggle label \{([^}]+)\}/)?.[1];
	assert.ok(brandRule);
	assert.ok(markRule);
	assert.ok(toggleRule);
	assert.match(brandRule, /--brand-mark-room:\s*calc\(100vw - 11rem\);/);
	assert.match(brandRule, /gap:\s*clamp\(0px, var\(--brand-mark-room\), 0\.45em\);/);
	assert.match(markRule, /width:\s*clamp\(0px, var\(--brand-mark-room\), 1\.25em\);/);
	assert.match(
		toggleRule,
		/padding-inline-end:\s*min\(var\(--spacing\), max\(0\.5rem, calc\(100vw - 12rem\)\)\);/,
	);
	const brand = readFileSync(
		new URL("../src/components/layout/Brand.astro", import.meta.url),
		"utf8",
	);
	assert.match(brand, /class="brand__mark"[^>]*aria-hidden="true"/);
	assert.match(brand, /class="brand__word">Focus Lab<\/span>/);
});

test("every stream entry has a shared human-readable kind label", () => {
	assert.deepEqual(streamKindLabels, {
		note: "Note",
		launch: "Launch",
	});
	for (const entry of stream) assert.ok(streamKindLabels[entry.kind]);
});

test("search ignores case and repeated whitespace", () => {
	assert.equal(normalizeSearchText("  Product   FIRST\n "), "product first");
});

test("search treats curly quotes like typed quotes", () => {
	assert.equal(normalizeSearchText("Maker’s Schedule"), "maker's schedule");
});

test("search matches accented author names without the accent", () => {
	assert.equal(normalizeSearchText("José Müller"), "jose muller");
});

test("an empty search leaves no filtering terms", () => {
	assert.deepEqual(normalizeSearchText("  ").split(" "), [""]);
});

test("email requests encode the subject and body independently", () => {
	const href = buildEmailRequestHref(
		"studio@example.com",
		"Jobs & policy updates",
		"Please send job updates.",
		" reader+jobs@example.com ",
	);
	const url = new URL(href);
	assert.equal(url.protocol, "mailto:");
	assert.equal(url.pathname, "studio@example.com");
	assert.equal(url.searchParams.get("subject"), "Jobs & policy updates");
	assert.equal(
		url.searchParams.get("body"),
		"Please send job updates.\n\nPlease send updates to: reader+jobs@example.com",
	);
});

test("no-JavaScript draft invites the visitor to add their address", () => {
	const url = new URL(
		buildEmailRequestHref("studio@example.com", "Updates", "Please send updates."),
	);
	assert.equal(
		url.searchParams.get("body"),
		"Please send updates.\n\nPlease send updates to: [add your email address]",
	);
});

test("email request contents cannot inject query parameters", () => {
	const url = new URL(
		buildEmailRequestHref(
			"studio@example.com",
			"Updates",
			"Request &cc=elsewhere",
			"a+b@example.com",
		),
	);
	assert.equal(url.searchParams.get("cc"), null);
	assert.equal(
		url.searchParams.get("body"),
		"Request &cc=elsewhere\n\nPlease send updates to: a+b@example.com",
	);
});

test("separate forms produce independent drafts", () => {
	const jobs = new URL(
		buildEmailRequestHref("studio@example.com", "Jobs", "Job notifications", "jobs@example.com"),
	);
	const policies = new URL(
		buildEmailRequestHref(
			"studio@example.com",
			"Policies",
			"Policy updates",
			"policies@example.com",
		),
	);
	assert.equal(jobs.searchParams.get("subject"), "Jobs");
	assert.equal(policies.searchParams.get("subject"), "Policies");
	assert.match(jobs.searchParams.get("body")!, /jobs@example\.com$/);
	assert.match(policies.searchParams.get("body")!, /policies@example\.com$/);
});
