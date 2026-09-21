/**
 * Focus Lab products — one entry per product, rendered at /products/<slug>/.
 */

export interface Product {
	slug: string;
	name: string;
	tagline: string;
	summary: string;
	/** Public product site, if there is one. */
	url?: string;
	/** True for products that run in the customer's own environment. */
	selfHosted?: boolean;
	/** One-line pricing note, shown under the summary. */
	pricing?: string;
	features: { title: string; body: string }[];
	stack?: string[];
}

export const products: Product[] = [
	{
		slug: "urbanevents",
		name: "Urban Events",
		tagline: "Every great event starts here.",
		url: "https://urbanevents.pk",
		pricing: "Free for free events. Pay only when you sell tickets.",
		summary:
			"Publish a polished event page, sell tickets in PKR, and check guests in from any phone. Built for student societies, MUNs, workshops, and meetups across Pakistan.",
		features: [
			{
				title: "Publish",
				body: "A fast event page with your branding — live before your chai goes cold.",
			},
			{
				title: "Sell tickets",
				body: "JazzCash, Easypaisa, and bank transfer, priced in PKR with no dollar surprises.",
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
	},
	{
		slug: "workproof",
		name: "WorkProof",
		tagline: "See the work, not the worker.",
		url: "https://workproof.focuslab.pk",
		selfHosted: true,
		pricing: "Pricing on request.",
		summary:
			"Know where the week actually went. Self-hosted workforce activity analytics with real privacy: no content capture, and your data stays on your infrastructure.",
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
	},
	{
		slug: "fixer",
		name: "Fixer",
		tagline: "The errors worth a human's time.",
		selfHosted: true,
		pricing: "Available on request, or ask for a demo.",
		summary:
			"Fixer watches your production logs, reduces them to the handful of exceptions actually worth a human's time, investigates each one against your real code, and opens a draft pull request with a root cause, the evidence behind it, and a proposed fix.",
		features: [
			{
				title: "It cuts the noise",
				body: "Most logs are the same handful of errors on repeat. Fixer groups them and surfaces only what is new, newsworthy, or getting worse.",
			},
			{
				title: "It investigates against your code",
				body: "Each surviving exception is traced through your actual repository, not guessed at in the abstract. The proposed fix comes with the evidence behind it.",
			},
			{
				title: "A draft pull request, not a merge",
				body: "You get a root cause, the evidence, and a proposed fix as a draft PR — ready to review, never already done.",
			},
			{
				title: "A human is always in the loop",
				body: "A human reviews it. A human merges it. Fixer cannot — the GitHub App is never granted a permission that would allow a merge, and no code path calls one.",
			},
			{
				title: "Self-hosted",
				body: "Fixer runs in your own environment, against your own logs and repositories. Your code and your data stay where they are.",
			},
		],
	},
];
