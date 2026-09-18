import { Client } from "@notionhq/client";

const token = process.env.NOTION_API_SECRET;
const parentRaw = process.env.NOTION_PARENT_PAGE_ID;

function parseId(input) {
	if (!input) return "";
	const match = input.trim().replace(/-/g, "").match(/([0-9a-f]{32})/i);
	return match ? match[1] : input.trim();
}

if (!token) {
	console.error("Missing NOTION_API_SECRET. Add it to .env first.");
	process.exit(1);
}

const notion = new Client({ auth: token, notionVersion: "2026-03-11" });

const text = (content) => ({ type: "text", text: { content } });
const heading = (content, level = 2) => ({
	object: "block",
	type: `heading_${level}`,
	[`heading_${level}`]: { rich_text: [text(content)] },
});
const paragraph = (content) => ({
	object: "block",
	type: "paragraph",
	paragraph: { rich_text: [text(content)] },
});
const bullet = (content) => ({
	object: "block",
	type: "bulleted_list_item",
	bulleted_list_item: { rich_text: [text(content)] },
});

// General-purpose, NOT blog-shaped. The content adapter auto-detects these.
const properties = {
	Name: { title: {} },
	Slug: { rich_text: {} },
	Type: {
		select: {
			options: [
				{ name: "Page", color: "gray", description: "Static / marketing page" },
				{ name: "Product", color: "red", description: "Product or service" },
				{ name: "Article", color: "blue", description: "Blog post" },
				{ name: "Update", color: "green", description: "Short update" },
			],
		},
	},
	Date: { date: {} },
	Summary: { rich_text: {} },
	Tags: {
		multi_select: {
			options: [
				{ name: "AI", color: "purple" },
				{ name: "SaaS", color: "blue" },
				{ name: "Mobile", color: "orange" },
				{ name: "Ecommerce", color: "green" },
				{ name: "Framer", color: "pink" },
				{ name: "Shopify", color: "yellow" },
				{ name: "Design", color: "brown" },
				{ name: "Engineering", color: "gray" },
			],
		},
	},
	Image: { files: {} },
	Link: { url: {} },
	Order: { number: { format: "number" } },
	Featured: { checkbox: {} },
	Published: { checkbox: {} },
	// Anything else you add to this DB lands in `entry.fields` automatically.
};

function props({ name, slug, type, summary, tags = [], link, order, featured = false, date }) {
	const out = {
		Name: { title: [text(name)] },
		Type: { select: { name: type } },
		Published: { checkbox: true },
		Date: { date: { start: date || new Date().toISOString().slice(0, 10) } },
	};
	if (slug) out.Slug = { rich_text: [text(slug)] };
	if (summary) out.Summary = { rich_text: [text(summary)] };
	if (tags.length) out.Tags = { multi_select: tags.map((name) => ({ name })) };
	if (link) out.Link = { url: link };
	if (typeof order === "number") out.Order = { number: order };
	if (featured) out.Featured = { checkbox: true };
	return out;
}

async function main() {
	const parentPageId = parseId(parentRaw);
	if (!parentPageId) {
		console.error(
			"Missing NOTION_PARENT_PAGE_ID. Paste the URL of a Notion page shared with the integration into .env.",
		);
		process.exit(1);
	}

	console.log("Creating 'Focus Lab' page...");
	const focusLabPage = await notion.request({
		path: "pages",
		method: "post",
		body: {
			parent: { type: "page_id", page_id: parentPageId },
			properties: { title: [text("Focus Lab")] },
			icon: { type: "emoji", emoji: "🎯" },
		},
	});
	console.log(`  page_id = ${focusLabPage.id}`);

	console.log("Creating 'Focus Lab CMS' database...");
	const db = await notion.request({
		path: "databases",
		method: "post",
		body: {
			parent: { type: "page_id", page_id: focusLabPage.id },
			title: [text("Focus Lab CMS")],
			description: [text("General content for focuslab.pk and blog.focuslab.pk.")],
			initial_data_source: { properties },
		},
	});

	const databaseId = db.id;
	const dataSourceId = db.data_sources?.[0]?.id || "";
	if (!databaseId || !dataSourceId) {
		throw new Error(`Unexpected create response: ${JSON.stringify(db)}`);
	}
	console.log(`  database_id    = ${databaseId}`);
	console.log(`  data_source_id = ${dataSourceId}`);

	const seed = async ({ name, slug, type, summary, tags, link, order, featured, children }) => {
		const page = await notion.request({
			path: "pages",
			method: "post",
			body: {
				parent: { type: "data_source_id", data_source_id: dataSourceId },
				properties: props({ name, slug, type, summary, tags, link, order, featured }),
				children,
			},
		});
		console.log(`  + [${type}] ${name}${slug ? ` (/${slug})` : ""}`);
		return page;
	};

	console.log("Seeding content...");

	await seed({
		name: "Home",
		slug: "home",
		type: "Page",
		order: 0,
		summary:
			"Focus Lab is a software studio in Islamabad building AI products, SaaS platforms, and high-converting ecommerce experiences.",
		children: [
			heading("Focus Lab", 2),
			paragraph(
				"Focus Lab is a software studio based in Gulberg, Islamabad. We design and build AI products, SaaS platforms, mobile apps, and high-converting ecommerce experiences.",
			),
			heading("What we do", 2),
			bullet("AI product engineering"),
			bullet("SaaS platform engineering"),
			bullet("Mobile app development"),
			bullet("UI/UX product systems"),
			bullet("Web app development"),
			bullet("Shopify ecommerce engineering"),
			bullet("Framer & Webflow CMS"),
		],
	});

	await seed({
		name: "Services",
		slug: "services",
		type: "Page",
		order: 1,
		summary: "What we do: AI, SaaS, mobile, web, ecommerce, and Framer builds.",
		children: [
			heading("Services", 1),
			paragraph(
				"We partner with founders and teams to design, build, and ship digital products end to end.",
			),
			heading("AI product engineering", 2),
			paragraph("From model selection to production UX, we ship AI features that hold up."),
			heading("SaaS platform engineering", 2),
			paragraph("Multi-tenant platforms, billing, dashboards, and the boring parts done right."),
			heading("Ecommerce engineering", 2),
			paragraph("Shopify builds engineered for speed, UX, and conversion."),
			heading("Framer & Webflow CMS", 2),
			paragraph("Marketing sites your team can edit without breaking the design."),
		],
	});

	await seed({
		name: "Work",
		slug: "work",
		type: "Page",
		order: 2,
		summary: "Selected products and client work.",
		children: [heading("Work", 1), paragraph("A selection of products and client engagements.")],
	});

	await seed({
		name: "Contact",
		slug: "contact",
		type: "Page",
		order: 3,
		summary: "Talk to Focus Lab.",
		children: [
			heading("Contact", 1),
			paragraph("Email: bilal@focuslab.pk"),
			paragraph("Phone: +92 333 5507394"),
			paragraph("Location: Gulberg, Islamabad"),
		],
	});

	const products = [
		["Urbanevents.pk", "urbanevents-pk", "Event discovery and booking platform for Pakistan.", ["SaaS", "Engineering"], "https://urbanevents.pk"],
		["Muxo.ai", "muxo-ai", "AI product engineering for a modern SaaS workflow.", ["AI", "SaaS"], "https://muxo.ai"],
		["Dez", "dez", "Product design and build engagement.", ["Design", "Engineering"], ""],
		["Framer Websites", "framer-websites", "High-craft marketing sites designed and shipped in Framer.", ["Framer", "Design"], ""],
		["Shopify Stores", "shopify-stores", "Ecommerce builds like warp-n-woof.com, engineered for conversion.", ["Shopify", "Ecommerce"], "https://warp-n-woof.com"],
	];
	for (const [i, [name, slug, summary, tags, link]] of products.entries()) {
		await seed({
			name,
			slug,
			type: "Product",
			summary,
			tags,
			link,
			order: i,
			featured: i < 3,
			children: [heading(name, 1), paragraph(summary)],
		});
	}

	const articles = [
		["Shipping AI Products That People Actually Use", "shipping-ai-products", "How we scope, prototype, and ship AI features without letting the demo become the product.", ["AI", "Engineering"]],
		["From Framer to Production: Our Web Workflow", "framer-to-production", "Designing in Framer and handing off a fast, maintainable site your team can edit.", ["Framer", "Design"]],
		["Shopify Engineering for Conversion", "shopify-engineering-for-conversion", "Store builds like warp-n-woof.com: speed, UX, and the details that move revenue.", ["Shopify", "Ecommerce"]],
	];
	for (const [name, slug, summary, tags] of articles) {
		await seed({
			name,
			slug,
			type: "Article",
			summary,
			tags,
			children: [heading(name, 1), paragraph(summary)],
		});
	}

	console.log("\nDone. Put these in .env:");
	console.log(`DATABASE_ID=${databaseId}`);
	console.log(`DATA_SOURCE_ID=${dataSourceId}`);
	console.log(`NOTION_CONTENT_PAGE_ID=${focusLabPage.id}`);
}

main().catch((error) => {
	console.error("\nSetup failed:", error?.body || error?.message || error);
	process.exit(1);
});