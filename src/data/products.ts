/**
 * Focus Lab products — listed at /products/ and linked to their own websites.
 */

import { productSites } from "./product-sites.ts";

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
		summary:
			"Publish a polished event page, sell tickets in PKR, and check guests in from any phone. Built for student societies, MUNs, workshops, and meetups across Pakistan.",
		notFor: [
			"Large conferences with seat maps and multi-tier ticketing.",
			"Online courses or subscriptions. No drip content, no paywall.",
			"Restaurants and shops. This is for events with a door and a guest list.",
		],
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
				body: "Scan QR codes from any phone.",
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
		url: productSites.workproof,
		selfHosted: true,
		blurb:
			"Self-hosted workforce activity analytics. See where the week went, with no content capture and no data leaving your server.",
		pricing: "Pricing on request.",
		summary:
			"Know where the week actually went. Self-hosted workforce activity analytics with real privacy: no content capture, and your data stays on your infrastructure.",
		notFor: [
			"Scoring or ranking people against each other.",
			"Keystrokes, screenshots, or full URLs. None of that is collected.",
			"Phones or tablets you do not own.",
		],
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
		url: productSites.fixer,
		selfHosted: true,
		blurb:
			"Watches your production logs, finds the errors worth a human, and opens a draft pull request with a root cause and a proposed fix.",
		pricing: "Available on request, or ask for a demo.",
		summary:
			"Fixer watches your production logs, reduces them to the handful of exceptions actually worth a human's time, investigates each one against your real code, and opens a draft pull request with a root cause, the evidence behind it, and a proposed fix.",
		notFor: [
			"Fixing and merging on its own. A human reviews and merges every pull request.",
			"Incident triage. It is for recurring errors, not the page that is down right now.",
			"Replacing your logs. It surfaces the exceptions worth a human and leaves the rest.",
		],
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
	},
];
