import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_SECRET });
const DATA_SOURCE_ID = process.env.DATA_SOURCE_ID;

const t = (content, annotations = {}) => ({
	type: "text",
	text: { content },
	annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, ...annotations },
});
const link = (content, url) => ({ type: "text", text: { content, link: { url } } });

const paragraph = (...rich_text) => ({ object: "block", type: "paragraph", paragraph: { rich_text } });
const heading1 = (text) => ({ object: "block", type: "heading_1", heading_1: { rich_text: [t(text)] } });
const heading2 = (text) => ({ object: "block", type: "heading_2", heading_2: { rich_text: [t(text)] } });
const heading3 = (text) => ({ object: "block", type: "heading_3", heading_3: { rich_text: [t(text)] } });
const bullet = (text) => ({ object: "block", type: "bulleted_list_item", bulleted_list_item: { rich_text: [t(text)] } });
const numbered = (text) => ({ object: "block", type: "numbered_list_item", numbered_list_item: { rich_text: [t(text)] } });
const todo = (text, checked = false) => ({ object: "block", type: "to_do", to_do: { rich_text: [t(text)], checked } });
const quote = (text) => ({ object: "block", type: "quote", quote: { rich_text: [t(text)] } });
const divider = () => ({ object: "block", type: "divider", divider: {} });
const callout = (text, emoji = "💡", color = "gray_background") => ({
	object: "block",
	type: "callout",
	callout: { rich_text: [t(text)], icon: { type: "emoji", emoji }, color },
});
const code = (text, language = "bash") => ({ object: "block", type: "code", code: { rich_text: [t(text)], language } });
const equation = (expression) => ({ object: "block", type: "equation", equation: { expression } });
const bookmark = (url, caption) => ({ object: "block", type: "bookmark", bookmark: { url, ...(caption ? { caption: [t(caption)] } : {}) } });
const embed = (url) => ({ object: "block", type: "embed", embed: { url } });
const image = (url, caption) => ({ object: "block", type: "image", image: { type: "external", external: { url }, ...(caption ? { caption: [t(caption)] } : {}) } });
const video = (url, caption) => ({ object: "block", type: "video", video: { type: "external", external: { url }, ...(caption ? { caption: [t(caption)] } : {}) } });
const audio = (url) => ({ object: "block", type: "audio", audio: { type: "external", external: { url } } });
const pdf = (url, caption) => ({ object: "block", type: "pdf", pdf: { type: "external", external: { url }, ...(caption ? { caption: [t(caption)] } : {}) } });
const file = (url, caption) => ({ object: "block", type: "file", file: { type: "external", external: { url }, ...(caption ? { caption: [t(caption)] } : {}) } });
const toc = () => ({ object: "block", type: "table_of_contents", table_of_contents: { color: "default" } });
const linkToPage = (pageId) => ({ object: "block", type: "link_to_page", link_to_page: { type: "page_id", page_id: pageId } });
const toggle = (text, children = []) => ({ object: "block", type: "toggle", toggle: { rich_text: [t(text)], children } });

const tableRow = (cells) => ({
	object: "block",
	type: "table_row",
	table_row: { cells: cells.map((c) => [t(c)]) },
});
const table = (rows, hasHeader = true) => ({
	object: "block",
	type: "table",
	table: { table_width: rows[0].length, has_column_header: hasHeader, has_row_header: false, children: rows.map(tableRow) },
});

async function append(pageId, children) {
	for (let i = 0; i < children.length; i += 90) {
		await notion.blocks.children.append({ block_id: pageId, children: children.slice(i, i + 90) });
	}
}

async function findEntry(title) {
	let cursor;
	do {
		const res = await notion.dataSources.query({ data_source_id: DATA_SOURCE_ID, start_cursor: cursor, page_size: 100 });
		const hit = res.results.find((p) => {
			const name = Object.values(p.properties).find((x) => x.type === "title")?.title?.map((r) => r.plain_text).join("");
			return name === title;
		});
		if (hit) return hit;
		cursor = res.has_more ? res.next_cursor : undefined;
	} while (cursor);
	return null;
}

const MUXO_SHOT = "https://media.brand.dev/screenshots/cache/a9e36cc5bf4b60d8696754463bb11307.png";
const URBAN_SHOT = "https://media.brand.dev/screenshots/cache/d89b4c6445b6dbec893d4daed92d606d.png";
const WARP_SHOT = "https://media.brand.dev/screenshots/cache/bcbfba5d26e501e16ae8d3a30752ac84.png";

async function main() {
	// ---------- 1. Muxo.ai (Product) ----------
	const muxo = await findEntry("Muxo.ai");
	if (muxo) {
		await append(muxo.id, [
			divider(),
			image(MUXO_SHOT, "Muxo.ai — one API key for the whole stack."),
			callout("Muxo gives you a single key for web search, scraping, LLM chat, storage, email, and durable workflows.", "🔑", "blue_background"),
			heading2("Highlights"),
			bullet("One API key across web, LLM, compute, and storage capabilities."),
			bullet("Durable scheduled workflows that survive restarts."),
			bullet("A muxo.yaml manifest so agents can scaffold a project in seconds."),
			bookmark("https://muxo.ai", "Muxo.ai"),
			quote("Onboard a new project with no signup, call capabilities, and run workflows — all from one manifest."),
		]);
		console.log("✓ Muxo.ai enriched");
	}

	// ---------- 2. Urbanevents.pk (Product) ----------
	const urban = await findEntry("Urbanevents.pk");
	if (urban) {
		await append(urban.id, [
			divider(),
			image(URBAN_SHOT, "Urbanevents.pk — event discovery and booking."),
			callout("A multi-tenant events platform: listings, bookings, and organizer dashboards.", "🎟️", "purple_background"),
			heading2("What shipped"),
			todo("Event discovery and search", true),
			todo("Organizer onboarding and dashboards", true),
			todo("Bookings and payments", false),
			bookmark("https://urbanevents.pk", "Urbanevents.pk"),
		]);
		console.log("✓ Urbanevents.pk enriched");
	}

	// ---------- 3. Shopify Stores (Product) ----------
	const shopify = await findEntry("Shopify Stores");
	if (shopify) {
		await append(shopify.id, [
			divider(),
			image(WARP_SHOT, "Warp-n-Woof — Shopify storefront engineered for conversion."),
			callout("We rebuild Shopify themes around speed, clarity, and checkout — not template tweaks.", "🛒", "orange_background"),
			bookmark("https://warp-n-woof.com", "warp-n-woof.com"),
			quote("Faster storefronts convert better. Most of the win is removing weight, not adding features."),
		]);
		console.log("✓ Shopify Stores enriched");
	}

	// ---------- 4. Shipping AI Products (Article) ----------
	const ai = await findEntry("Shipping AI Products That People Actually Use");
	if (ai) {
		await append(ai.id, [
			callout("The demo is not the product. The product is the demo plus evaluation, latency budgets, cost ceilings, and an interface people trust.", "⚠️", "yellow_background"),
			heading2("Start with the eval, not the model"),
			paragraph(t("Pick the model last. Write down what a good answer looks like, then build a small eval set before you write a line of prompt code.")),
			code(`# a tiny eval harness you can run on every commit\nfor case in evals:\n  out = run(case.input)\n  assert score(out, case.expected) >= 0.8`, "python"),
			quote("If you can't measure it, you're shipping vibes."),
			bookmark("https://muxo.ai", "Muxo.ai — one key for the whole stack"),
		]);
		console.log("✓ AI article enriched");
	}

	// ---------- 5. Gallery page ----------
	const existing = await findEntry("Every block Notion can render");
	if (existing) {
		console.log("• Gallery already exists:", existing.id);
		return;
	}

	const work = await findEntry("Work");

	const page = await notion.pages.create({
		parent: { type: "data_source_id", data_source_id: DATA_SOURCE_ID },
		properties: {
			Name: { title: [t("Every block Notion can render")] },
			Type: { select: { name: "Article" } },
			Slug: { rich_text: [t("notion-blocks-gallery")] },
			Date: { date: { start: new Date().toISOString().slice(0, 10) } },
			Summary: {
				rich_text: [
					t("A tour of the native Notion blocks this site renders — text, lists, media, embeds, tables, columns, and more."),
				],
			},
			Tags: { multi_select: [{ name: "Engineering" }, { name: "Design" }] },
			Published: { checkbox: true },
		},
		children: [
			heading1("Every block Notion can render"),
			paragraph(
				t("This page is a live gallery. Everything below is a native Notion block — edit it in Notion and it changes here."),
			),
			toc(),
			divider(),

			heading2("Text"),
			paragraph(t("Plain text, "), t("bold", { bold: true }), t(", "), t("italic", { italic: true }), t(", "), t("underline", { underline: true }), t(", "), t("strikethrough", { strikethrough: true }), t(", "), t("inline code", { code: true }), t(", and a "), link("link", "https://focuslab.pk"), t(".")),
			quote("A quote block, for the things worth setting apart."),
			callout("A callout with an emoji and a coloured background.", "💡", "green_background"),
			divider(),

			heading2("Lists"),
			bullet("Bulleted item one"),
			bullet("Bulleted item two"),
			numbered("Numbered item one"),
			numbered("Numbered item two"),
			todo("A checked task", true),
			todo("An open task", false),
			toggle("A toggle — click to expand", [paragraph(t("Hidden content lives inside the toggle."))]),
			divider(),

			heading2("Code & math"),
			code(`curl --get https://api.context.dev/v1/web/scrape/markdown \\\n  --header "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n  --data-urlencode "url=https://37signals.com"`, "bash"),
			equation("E = mc^2"),
			divider(),

			heading2("Media"),
			image(MUXO_SHOT, "An external image, rendered responsively."),
			video("https://www.youtube.com/watch?v=5qap5aO4i9A", "An external YouTube video."),
			audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"),
			pdf("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "A native PDF block with an inline viewer."),
			file("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "A downloadable file block."),
			divider(),

			heading2("Embeds & links"),
			embed("https://twitter.com/jack/status/20"),
			bookmark("https://muxo.ai", "A bookmark card, built from Open Graph metadata."),
			divider(),

			heading2("Layout"),
			table(
				[
					["Capability", "Status"],
					["Native blocks", "Shipped"],
					["PDF viewer", "Shipped"],
				],
				true,
			),
			divider(),

			heading2("Pages"),
			...(work ? [linkToPage(work.id)] : []),
			paragraph(t("That's the tour. Add any of these blocks in Notion and they render on the site.")),
		],
	});

	console.log("✓ Gallery created:", page.id, "slug: notion-blocks-gallery");

	// Columns must be added in two steps (nesting depth limit).
	const colRes = await notion.blocks.children.append({
		block_id: page.id,
		children: [
			{
				object: "block",
				type: "column_list",
				column_list: { children: [{ object: "block", type: "column", column: { children: [] } }, { object: "block", type: "column", column: { children: [] } }] },
			},
		],
	});
	const columnList = colRes.results[0];
	const cols = columnList.column_list.children;
	await notion.blocks.children.append({
		block_id: cols[0].id,
		children: [heading3("Column one"), paragraph(t("Left column content."))],
	});
	await notion.blocks.children.append({
		block_id: cols[1].id,
		children: [heading3("Column two"), paragraph(t("Right column content."))],
	});
	console.log("✓ Columns added");
}

main().catch((e) => {
	console.error("FAILED:", e.message);
	if (e.body) console.error(JSON.stringify(e.body).slice(0, 500));
	process.exit(1);
});