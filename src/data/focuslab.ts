/**
 * Focus Lab content — our own data layer.
 *
 * This is the single source of truth for the site. It intentionally does not
 * depend on Notion at runtime; the Notion CMS was used only as a reference
 * while writing it. Edit here and the site rebuilds.
 */

export type Block =
	| { type: "p"; text: string }
	| { type: "h2"; text: string }
	| { type: "h3"; text: string }
	| { type: "ul"; items: string[] }
	| { type: "ol"; items: string[] }
	| { type: "quote"; text: string }
	| { type: "callout"; text: string; emoji?: string }
	| { type: "image"; src: string; caption?: string }
	| { type: "code"; lang?: string; text: string }
	| { type: "divider" }
	| { type: "stats"; items: { value: string; label: string }[] }
	| { type: "cards"; items: { title: string; text: string }[] };

export type Product = {
	slug: string;
	name: string;
	tagline: string;
	summary: string;
	tags: string[];
	link?: string;
	image?: string;
	accent: string;
	story: Block[];
};

export type Article = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	body: Block[];
};

export type Capability = {
	id: string;
	title: string;
	body: string;
	points: string[];
};

export type StackGroup = { title: string; note: string; items: { name: string; note: string }[] };

export const site = {
	name: "Focus Lab",
	tagline: "A product company.",
	description:
		"A product company in Islamabad. We build and run our own software — AI, SaaS, mobile, ecommerce — and we build it for a few others, too.",
	email: "bilal@focuslab.pk",
	phone: "+92 333 5507394",
	location: "Gulberg, Islamabad",
};

export const capabilities: Capability[] = [
	{
		id: "ai-product-engineering",
		title: "AI product engineering",
		body: "Models are easy now. Products aren't. We ship AI that survives real users — evals, latency budgets, guardrails, and an interface people trust.",
		points: ["Evaluation harnesses", "Latency and cost budgets", "Guardrails and fallbacks", "Human-in-the-loop UX"],
	},
	{
		id: "saas-platform-engineering",
		title: "SaaS platform engineering",
		body: "Multi-tenant, billed, permissioned, observable. The unglamorous parts decide whether a product survives year two. We do those properly.",
		points: ["Multi-tenancy", "Billing and metering", "Permissions and audit logs", "Dashboards that answer questions"],
	},
	{
		id: "mobile-app-development",
		title: "Mobile app development",
		body: "One codebase, native feel. Offline, push, deep links, and store submission — finished when it's in someone's hand, not in a demo.",
		points: ["iOS and Android", "Offline-first sync", "Push and deep links", "Store release pipelines"],
	},
	{
		id: "web-app-development",
		title: "Web app development",
		body: "Fast, accessible, and built to outlast the team that wrote it. Performance budgets over promises.",
		points: ["Performance budgets", "Accessibility", "Design systems", "Edge-first architecture"],
	},
	{
		id: "ecommerce-engineering",
		title: "Ecommerce engineering",
		body: "Faster storefronts convert better, and most of the win is removing weight — not adding features. Like warp-n-woof.com.",
		points: ["Shopify theme engineering", "Checkout and subscriptions", "Core Web Vitals", "Conversion analytics"],
	},
	{
		id: "framer-cms-sites",
		title: "Framer & CMS sites",
		body: "Sites your team edits without breaking the design. Real components, real performance, no ticket to change a headline.",
		points: ["Framer and Webflow", "Headless CMS", "Component systems", "Editing without fear"],
	},
];

export const stackGroups: StackGroup[] = [
	{
		title: "Languages",
		note: "Typed first, boring on purpose.",
		items: [
			{ name: "TypeScript", note: "Frontend, backend, workers, tooling." },
			{ name: "Go", note: "Small, fast services and CLIs." },
			{ name: "Python", note: "AI pipelines, evals, and data." },
			{ name: "SQL", note: "Postgres and SQLite, queried properly." },
		],
	},
	{
		title: "Frontend",
		note: "Fast by default, accessible always.",
		items: [
			{ name: "Astro", note: "Content and marketing that stay fast." },
			{ name: "React", note: "Interactive product surfaces." },
			{ name: "Tailwind CSS", note: "Design systems without drift." },
			{ name: "Framer", note: "Sites teams can edit themselves." },
		],
	},
	{
		title: "Backend & data",
		note: "Edge-first, multi-tenant, observable.",
		items: [
			{ name: "Node.js", note: "The default runtime for product APIs." },
			{ name: "Hono", note: "Tiny routers for edge runtimes." },
			{ name: "Postgres / D1", note: "Relational data in the core and at the edge." },
			{ name: "Vectorize / pgvector", note: "Retrieval that scales with the corpus." },
		],
	},
	{
		title: "AI",
		note: "Models in production, not in demos.",
		items: [
			{ name: "OpenAI", note: "Frontier models behind real features." },
			{ name: "Anthropic", note: "Long-context reasoning and safe tool use." },
			{ name: "Workers AI", note: "Inference at the edge, next to the data." },
			{ name: "MCP", note: "Tools and context for agents, standardized." },
		],
	},
	{
		title: "Infrastructure",
		note: "Global, cheap, reproducible.",
		items: [
			{ name: "Cloudflare Workers", note: "Edge compute, zero cold starts." },
			{ name: "R2 / KV", note: "Object storage and low-latency config." },
			{ name: "Durable Objects", note: "Coordination and state where it matters." },
			{ name: "GitHub Actions", note: "Every change built, tested, shipped." },
		],
	},
	{
		title: "Commerce & CMS",
		note: "Content and checkout that convert.",
		items: [
			{ name: "Shopify", note: "Storefronts engineered for conversion." },
			{ name: "Stripe", note: "Billing, subscriptions, metering." },
			{ name: "Framer / Webflow", note: "Marketing sites with real components." },
			{ name: "Headless CMS", note: "Structured content teams can own." },
		],
	},
];

export const principles: { title: string; body: string }[] = [
	{ title: "Boring where it counts", body: "Proven tools for the parts you can't debug at 3am." },
	{ title: "Typed end to end", body: "If it crosses a boundary, it has a type." },
	{ title: "Own the whole path", body: "From data model to deploy — no hand-offs." },
];

export const products: Product[] = [
	{
		slug: "muxo-ai",
		name: "Muxo.ai",
		tagline: "One key for the whole stack",
		summary:
			"AI product engineering for a modern SaaS workflow. One API key for web search, scraping, LLM chat, storage, and durable workflows.",
		tags: ["AI", "SaaS"],
		link: "https://muxo.ai",
		image: "https://media.brand.dev/screenshots/cache/a9e36cc5bf4b60d8696754463bb11307.png",
		accent: "rgb(0, 100, 230)",
		story: [
			{
				type: "p",
				text: "Muxo started from a simple annoyance: every new project meant another handful of keys, SDKs, and dashboards. We built one key for the whole stack instead.",
			},
			{
				type: "callout",
				emoji: "🔑",
				text: "One key for web search, scraping, LLM chat, storage, email, and durable workflows.",
			},
			{ type: "h2", text: "What we built" },
			{
				type: "ul",
				items: [
					"A single API key across web, LLM, compute, and storage capabilities.",
					"Durable scheduled workflows that survive restarts.",
					"A muxo.yaml manifest so an agent can scaffold a project in seconds.",
					"Usage metering and cost ceilings built into the runtime.",
				],
			},
			{
				type: "quote",
				text: "Onboard a new project with no signup, call capabilities, and run workflows — all from one manifest.",
			},
			{ type: "h2", text: "How it's built" },
			{
				type: "p",
				text: "Edge-first on Cloudflare Workers, with Durable Objects for workflow state and a typed manifest that doubles as documentation. Small surface area, boring infrastructure.",
			},
			{
				type: "code",
				lang: "bash",
				text: 'muxo run llm.chat --prompt "summarise this repo"\nmuxo run web.search --query "edge workflows"\nmuxo workflow run nightly-sync',
			},
		],
	},
	{
		slug: "urbanevents-pk",
		name: "Urbanevents.pk",
		tagline: "Ticketing for Pakistan",
		summary:
			"Event discovery and booking platform for Pakistan — listings, bookings, and organizer dashboards.",
		tags: ["SaaS", "Engineering"],
		link: "https://urbanevents.pk",
		image: "https://media.brand.dev/screenshots/cache/d89b4c6445b6dbec893d4daed92d606d.png",
		accent: "rgb(190, 82, 255)",
		story: [
			{
				type: "p",
				text: "Event discovery in Pakistan was scattered across group chats and screenshots. Urbanevents gives organizers a real platform and attendees a real place to look.",
			},
			{ type: "h2", text: "What shipped" },
			{
				type: "ul",
				items: [
					"Event discovery and search across cities and categories.",
					"Organizer onboarding, dashboards, and payouts.",
					"Bookings, QR check-in, and attendee management.",
					"A multi-tenant core that keeps each organizer's data separate.",
				],
			},
			{ type: "callout", emoji: "🎟️", text: "A multi-tenant events platform built to run, not to demo." },
			{
				type: "quote",
				text: "The hard part of ticketing isn't the checkout. It's everything after it.",
			},
		],
	},
	{
		slug: "dez",
		name: "Dez",
		tagline: "Product design and build",
		summary: "Product design and build engagement — from first sketch to shipped interface.",
		tags: ["Design", "Engineering"],
		accent: "rgb(41, 152, 80)",
		story: [
			{
				type: "p",
				text: "Dez is where design and engineering meet in the same room. We design the interface and build it, so nothing is lost in the hand-off.",
			},
			{ type: "h2", text: "How we work" },
			{
				type: "ol",
				items: [
					"Short, paid discovery to frame the problem and the scope.",
					"A working slice early, so decisions are made against something real.",
					"Iteration in the open, with the interface and the code in the same repo.",
				],
			},
			{
				type: "callout",
				emoji: "✏️",
				text: "Design systems, interaction models, and interfaces that stay coherent as you grow.",
			},
		],
	},
	{
		slug: "framer-websites",
		name: "Framer Websites",
		tagline: "High-craft marketing sites",
		summary: "High-craft marketing sites designed and shipped in Framer, with a real component system.",
		tags: ["Framer", "Design"],
		accent: "rgb(244, 103, 199)",
		story: [
			{
				type: "p",
				text: "A marketing site is a product too. We design in Framer and ship a system your team can actually edit.",
			},
			{ type: "h2", text: "What you get" },
			{
				type: "ul",
				items: [
					"A real component system, not a pile of one-off frames.",
					"Performance budgets so the design survives contact with the network.",
					"Editing rules your team can follow without breaking the layout.",
				],
			},
			{ type: "quote", text: "If changing a headline needs a developer, the CMS is wrong." },
		],
	},
	{
		slug: "shopify-stores",
		name: "Shopify Stores",
		tagline: "Storefronts engineered for conversion",
		summary: "Ecommerce builds like warp-n-woof.com, engineered for speed, UX, and conversion.",
		tags: ["Shopify", "Ecommerce"],
		link: "https://warp-n-woof.com",
		image: "https://media.brand.dev/screenshots/cache/bcbfba5d26e501e16ae8d3a30752ac84.png",
		accent: "rgb(248, 121, 23)",
		story: [
			{
				type: "p",
				text: "We rebuild Shopify themes around speed, clarity, and checkout — not template tweaks. Most of the conversion win is removing weight.",
			},
			{ type: "h2", text: "What we change" },
			{
				type: "ul",
				items: [
					"Theme architecture that doesn't fight the platform.",
					"Core Web Vitals as a budget, tracked on every deploy.",
					"Product, cart, and checkout flows tuned for real buyers.",
					"Analytics that tell you what actually moved revenue.",
				],
			},
			{
				type: "quote",
				text: "Faster storefronts convert better. Most of the win is removing weight, not adding features.",
			},
		],
	},
];

export const articles: Article[] = [
	{
		slug: "shipping-ai-products",
		title: "Shipping AI Products That People Actually Use",
		date: "2026-08-20",
		summary:
			"How we scope, prototype, and ship AI features without letting the demo become the product.",
		tags: ["AI", "Engineering"],
		body: [
			{
				type: "callout",
				emoji: "⚠️",
				text: "The demo is not the product. The product is the demo plus evaluation, latency budgets, cost ceilings, and an interface people trust.",
			},
			{ type: "h2", text: "Start with the eval, not the model" },
			{
				type: "p",
				text: "Pick the model last. Write down what a good answer looks like, then build a small eval set before you write a line of prompt code. If you can't measure it, you're shipping vibes.",
			},
			{
				type: "code",
				lang: "python",
				text: "# a tiny eval harness you can run on every commit\nfor case in evals:\n    out = run(case.input)\n    assert score(out, case.expected) >= 0.8",
			},
			{ type: "h2", text: "Then make it boring" },
			{
				type: "p",
				text: "Latency budgets, cost ceilings, timeouts, and fallbacks. The features people keep using are the ones that behave the same way twice.",
			},
			{ type: "divider" },
			{
				type: "quote",
				text: "Ship the smallest thing that can be trusted, then earn the rest.",
			},
		],
	},
	{
		slug: "shopify-engineering-for-conversion",
		title: "Shopify Engineering for Conversion",
		date: "2026-08-12",
		summary:
			"Store builds like warp-n-woof.com: speed, UX, and the details that move revenue.",
		tags: ["Shopify", "Ecommerce"],
		body: [
			{
				type: "p",
				text: "Conversion work on Shopify is mostly subtraction. Every script, app, and oversized image is a tax on the buyer.",
			},
			{ type: "h2", text: "Measure, then remove" },
			{
				type: "ul",
				items: [
					"Audit third-party scripts and delete what doesn't earn its bytes.",
					"Ship responsive images and a theme that respects the network.",
					"Treat Core Web Vitals as a budget, not a report.",
				],
			},
			{
				type: "callout",
				emoji: "🛒",
				text: "A storefront is a product. Speed is a feature buyers feel before they can name it.",
			},
			{ type: "quote", text: "Faster storefronts convert better." },
		],
	},
	{
		slug: "framer-to-production",
		title: "From Framer to Production: Our Web Workflow",
		date: "2026-08-04",
		summary: "Designing in Framer and handing off a fast, maintainable site your team can edit.",
		tags: ["Framer", "Design"],
		body: [
			{
				type: "p",
				text: "We design in Framer because it makes the interface real early. The trick is shipping it without losing the craft.",
			},
			{ type: "h2", text: "The workflow" },
			{
				type: "ol",
				items: [
					"Design the system first: type, spacing, colour, components.",
					"Build pages from the system, never one-off frames.",
					"Hand off with editing rules and a performance budget.",
				],
			},
			{
				type: "quote",
				text: "A marketing site your team can edit is worth more than a beautiful one they can't.",
			},
		],
	},
];

export const contact = {
	email: site.email,
	phone: site.phone,
	location: site.location,
	note: "Tell us what you're building and what done looks like. We'll reply with a straight answer.",
};