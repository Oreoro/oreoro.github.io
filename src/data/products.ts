/**
 * Focus Lab products — listed at /products/, with full pages at
 * /products/<slug>/ and their own websites at productSites[slug].
 *
 * Product copy is grounded in the live product sites (features, pricing,
 * security pages); keep it in step when the sites change.
 */

import { productSites } from "./product-sites.ts";

export interface ProductPlan {
	name: string;
	price: string;
	note?: string;
	includes: string[];
}

export interface ProductSection {
	heading: string;
	intro?: string;
	items: string[];
}

export interface Product {
	slug: keyof typeof productSites;
	name: string;
	tagline: string;
	summary: string;
	url: string;
	/** Runs in the customer's own environment. */
	selfHosted?: boolean;
	pricing?: string;
	blurb: string;
	features: { title: string; body: string }[];
	notFor: string[];
	stack?: string[];
	/** Real pricing plans from the product's own pricing page. */
	plans?: ProductPlan[];
	/** Additional detail sections: how it works, security, sources, ... */
	sections?: ProductSection[];
}

export const products: Product[] = [
	{
		slug: "urbanevents",
		name: "Urban Events",
		tagline: "Every great event starts here.",
		url: productSites.urbanevents,
		blurb:
			"Publish a polished event page, sell tickets in PKR, and check guests in from any phone. Built for Pakistan.",
		pricing: "Free for free events. Pay only when you sell tickets.",
		features: [
			{
				title: "Publish",
				body: "A fast event page with your branding — live before your chai goes cold.",
			},
			{
				title: "Sell tickets",
				body: "JazzCash, Easypaisa, and bank transfer. Priced in PKR.",
			},
			{
				title: "Check in",
				body: "Scan QR codes from any phone and watch the counts sync live at the door.",
			},
			{
				title: "Live analytics",
				body: "Sales, page views, and check-ins as they happen, with daily reports and CSV exports.",
			},
		],
		summary:
			"Publish a polished event page, sell tickets in PKR, and check guests in from any phone. Built for student societies, MUNs, workshops, and meetups across Pakistan.",
		plans: [
			{
				name: "Free events",
				price: "Rs 0 forever",
				note: "Free events stay free — no listing costs, no platform fees, no surprises.",
				includes: ["Unlimited tickets", "Custom event page", "QR check-in tool", "Basic analytics"],
			},
			{
				name: "Paid events",
				price: "5% per paid ticket",
				note: "A simple 5% added at checkout and settled in PKR. You never pay to list.",
				includes: [
					"Everything in Free",
					"Local payment gateways",
					"Automated payouts",
					"Priority email support",
				],
			},
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"Publish — a fast event page with your branding, live before your chai goes cold.",
					"Sell tickets — JazzCash, Easypaisa, and bank transfer, priced in PKR.",
					"Check in — scan QR codes from any phone and watch the counts sync live at the door.",
				],
			},
			{
				heading: "Built to run the whole event",
				items: [
					"Event pages that sell — ticket tiers, sale windows, and sold-out states.",
					"Attendees & messaging — message by ticket type, capture registration questions, add attendees by hand.",
					"Your brand, not ours — your colors and logo carry across the event page, checkout, and tickets.",
					"Live analytics — sales, page views, and check-ins as they happen, plus daily reports and CSV exports.",
				],
			},
			{
				heading: "Payments",
				intro: "Attendees pay the way Pakistan pays.",
				items: ["JazzCash", "Easypaisa", "Bank transfer — payouts processed weekly to your bank account or mobile wallet"],
			},
		],
		notFor: [
			"Large conferences with seat maps and multi-tier ticketing.",
			"Online courses or subscriptions. No drip content, no paywall.",
			"Restaurants and shops. This is for events with a door and a guest list.",
		],
	},
	{
		slug: "workproof",
		name: "WorkProof",
		tagline: "See the work, not the worker.",
		url: productSites.workproof,
		selfHosted: true,
		blurb:
			"Self-hosted workforce activity analytics. See where the week went, with no content capture and no data leaving your server.",
		pricing: "Pricing on request. Per person, billed annually.",
		features: [
			{
				title: "See the week",
				body: "Active vs. idle, focus ratio, and per-person rollups — the whole picture on one screen.",
			},
			{
				title: "Rules enforced",
				body: "Working hours and filters applied on your own server, not someone else's.",
			},
			{
				title: "Enrolled in a minute",
				body: "One command on the laptop. No MDM, no accounts to create, no toolchain to install.",
			},
			{
				title: "Privacy by design",
				body: "No keystrokes, no message contents, no credentials. Domains, never full URLs.",
			},
		],
		summary:
			"Know where the week actually went. Self-hosted workforce activity analytics with real privacy: no content capture, and your data stays on your infrastructure.",
		plans: [
			{
				name: "Self-hosted",
				price: "On request",
				note: "Per person, billed annually. You run it on your own infrastructure — your data never leaves.",
				includes: [
					"Unlimited devices and retention window",
					"All capture policies, presets and filters",
					"Screenshots with S3 or local storage",
					"Audit log + CSV exports",
				],
			},
			{
				name: "Cloud",
				price: "On request",
				note: "We run it for you. Same software, zero ops.",
				includes: ["Everything in Self-hosted", "Managed Postgres + R2", "Automatic updates"],
			},
			{
				name: "Enterprise",
				price: "On request",
				note: "Annual agreement for regulated teams.",
				includes: ["SSO / SAML + SCIM", "DPA & security review", "Priority SLA"],
			},
		],
		sections: [
			{
				heading: "Enrollment",
				intro: "Under a minute to enroll on macOS and Windows. No MDM, no accounts to create.",
				items: [
					"Create a workspace — get an owner key.",
					"Send one command — they paste it and are enrolled.",
					"See the week — per person, per device, per day.",
				],
			},
			{
				heading: "Captured",
				intro: "The short list of what the software records, enforced in code.",
				items: [
					"Focused app name",
					"Window titles (optional)",
					"Website domains — never full URLs",
					"Active vs. idle time",
					"Keystroke, click & scroll counts",
					"Screenshots (opt-in, AFK-aware)",
				],
			},
			{
				heading: "Never captured",
				intro: "What anyone types, reads, or says stays off the record. Always.",
				items: [
					"What anyone types",
					"Passwords or credentials",
					"Message or document contents",
					"Clipboard contents, audio, or microphone",
					"Anything from unenrolled devices",
				],
			},
			{
				heading: "Security controls",
				items: [
					"Server-side policy enforcement — a tampered or custom agent cannot bypass them.",
					"Hashed credentials everywhere — device tokens and API keys stored as SHA-256 hashes with a server-side pepper.",
					"Roles and least privilege — owner, admin, manager, viewer, and employee, enforced per route.",
				],
			},
		],
		notFor: [
			"Scoring or ranking people against each other.",
			"Keystrokes, screenshots, or full URLs. None of that is collected.",
			"Phones or tablets you do not own.",
		],
	},
	{
		slug: "fixer",
		name: "Fixer",
		tagline: "The errors worth a human's time.",
		url: productSites.fixer,
		selfHosted: true,
		blurb:
			"Watches your production logs, finds the errors worth a human, and opens a draft pull request with a root cause and a proposed fix.",
		pricing: "Available on request, or ask for a demo.",
		features: [
			{
				title: "It cuts the noise",
				body: "Groups repeated errors and surfaces only what is new or getting worse.",
			},
			{
				title: "It investigates against your code",
				body: "Traces each exception through your actual repository, not guessed at in the abstract.",
			},
			{
				title: "A draft pull request, not a merge",
				body: "A root cause, the evidence, and a proposed fix — ready for review, never already done.",
			},
			{
				title: "A human is always in the loop",
				body: "A human reviews and merges. Fixer has no merge permission.",
			},
			{
				title: "Self-hosted",
				body: "Fixer runs in your own environment, against your own logs and repositories. Your code and your data stay where they are.",
			},
		],
		summary:
			"Fixer watches your production logs, reduces them to the handful of exceptions actually worth a human's time, investigates each one against your real code, and opens a draft pull request with a root cause, the evidence behind it, and a proposed fix.",
		plans: [
			{
				name: "Trial",
				price: "Free for 14 days",
				includes: ["5 investigations a day", "Up to 3 repositories", "Bring your own model key", "You approve and merge"],
			},
			{
				name: "Starter",
				price: "On request",
				includes: ["20 investigations a day", "Up to 5 repositories", "Bring your own model key", "You approve and merge"],
			},
			{
				name: "Pro",
				price: "On request",
				includes: ["60 investigations a day", "Up to 25 repositories", "Bring your own model key", "You approve and merge"],
			},
			{
				name: "Scale",
				price: "On request",
				includes: ["300 investigations a day", "Up to 200 repositories", "Bring your own model key", "You approve and merge"],
			},
			{
				name: "Self-hosted",
				price: "Your Cloudflare account",
				note: "You run Fixer on your own Cloudflare account. No plan limits.",
				includes: ["Unlimited investigations", "Unlimited repositories", "Bring your own model key", "You approve and merge"],
			},
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"Find — catch new errors and focus on new issues, not repeated alerts.",
					"Investigate — see what went wrong and the code involved.",
					"Fix — review the proposed fix and the test results.",
					"Review — approve a draft pull request, create a ticket, or dismiss the issue.",
				],
			},
			{
				heading: "Sources",
				intro: "Reads from the 24 log sources you already use.",
				items: [
					"Sentry, Datadog, Loki, Grafana, CloudWatch",
					"Splunk, New Relic, Honeycomb, Elasticsearch, OpenSearch",
					"Azure Monitor, Kubernetes, Vercel, Railway, PostHog",
					"…and nine more",
				],
			},
			{
				heading: "Bring your own model",
				intro: "Your provider, your key, your budget. Set a spend limit per day.",
				items: [
					"Anthropic, OpenAI, Gemini, OpenRouter",
					"DeepSeek, Groq, MiniMax, NVIDIA NIM",
					"GLM (Zhipu AI), Ollama",
				],
			},
			{
				heading: "Staying in control",
				items: [
					"Draft pull requests only — no proposed change is pushed before you approve it.",
					"Set a budget — limit daily usage and investigations.",
					"Check the evidence — review the diagnosis, log trail, and test commands before deciding.",
					"Track follow-up work — GitHub Issues, Jira, Linear, or Azure Boards, plus Slack notifications.",
				],
			},
		],
		notFor: [
			"Fixing and merging on its own. A human reviews and merges every pull request.",
			"Incident triage. It is for recurring errors, not the page that is down right now.",
			"Replacing your logs. It surfaces the exceptions worth a human and leaves the rest.",
		],
	},
];