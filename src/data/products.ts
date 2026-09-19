/**
 * Focus Lab products — one entry per product, rendered at /products/<slug>/.
 */

export interface Product {
	slug: string;
	name: string;
	tagline: string;
	summary: string;
	features: { title: string; body: string }[];
	stack: string[];
}

export const products: Product[] = [
	{
		slug: "urbanevents",
		name: "Urbanevents",
		tagline: "Events, end to end.",
		summary:
			"An events platform for Pakistan. Discovery for attendees, real tooling for organizers, and the booking flow that connects them.",
		features: [
			{
				title: "Discovery",
				body: "Search across cities, categories, and dates. Events are easy to find instead of scattered across group chats and screenshots.",
			},
			{
				title: "Bookings",
				body: "Checkout, QR check-in, and attendee management that work on the night, not just in the demo.",
			},
			{
				title: "Organizer tools",
				body: "Onboarding, dashboards, and payouts so organizers can run the event instead of the spreadsheet.",
			},
			{
				title: "Multi-tenant core",
				body: "Every organizer gets their own space, with data kept separate and permissions that hold up.",
			},
		],
		stack: ["Astro", "React", "Node.js", "PostgreSQL", "Stripe", "Cloudflare"],
	},
	{
		slug: "workproof",
		name: "Workproof",
		tagline: "Show the work.",
		summary:
			"A calm way for teams to show what they shipped — a running record of the work, without another status meeting.",
		features: [
			{
				title: "Daily proof",
				body: "A short, honest note on what moved today. Written in seconds, read in less.",
			},
			{
				title: "Async by default",
				body: "No standups, no roll-calls. The record is there when someone needs it, and out of the way when they don't.",
			},
			{
				title: "A searchable history",
				body: "Every update builds a timeline of the project, so context doesn't leave when a person does.",
			},
			{
				title: "Private by default",
				body: "Your work stays yours. No feeds, no likes, no performance.",
			},
		],
		stack: ["Astro", "React", "TypeScript", "Cloudflare Workers", "Cloudflare D1"],
	},
	{
		slug: "muxo",
		name: "Muxo",
		tagline: "One key for the whole stack.",
		summary:
			"An AI platform that puts web search, scraping, LLM chat, storage, and durable workflows behind a single API key.",
		features: [
			{
				title: "One key",
				body: "Stop juggling keys, SDKs, and dashboards. One credential covers web, LLM, compute, and storage.",
			},
			{
				title: "Capabilities, not vendors",
				body: "Search, scrape, chat, KV, and email as first-class calls — swap the provider underneath without rewriting the app.",
			},
			{
				title: "Durable workflows",
				body: "Scheduled jobs that survive restarts and retries, so long-running work actually finishes.",
			},
			{
				title: "A manifest you can read",
				body: "Declare what a project needs in one file, and an agent can scaffold it in seconds.",
			},
		],
		stack: ["TypeScript", "Cloudflare Workers", "Durable Objects", "OpenAI", "Anthropic", "MCP"],
	},
];
