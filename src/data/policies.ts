/**
 * Placeholder policies — replace titles and body copy with your own.
 */

export interface Policy {
	slug: string;
	title: string;
	intro: string;
	sections: { id: string; heading: string; body: string[] }[];
}

export const policies: Policy[] = [
	{
		slug: "terms",
		title: "Terms of Service",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "accounts", heading: "Accounts", body: ["Placeholder paragraph. Replace with your own copy."] },
			{ id: "use", heading: "Acceptable use", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "privacy",
		title: "Privacy Policy",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "data", heading: "What we collect", body: ["Placeholder paragraph. Replace with your own copy."] },
			{ id: "retention", heading: "Retention", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "cancellation",
		title: "Cancellation",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "how", heading: "How to cancel", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "refund",
		title: "Refund Policy",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "window", heading: "Refund window", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "security",
		title: "Security",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "practices", heading: "Practices", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "accessibility",
		title: "Accessibility",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "commitment", heading: "Our commitment", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "taxes",
		title: "Taxes",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "vat", heading: "VAT and sales tax", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "ownership",
		title: "Ownership",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "your-data", heading: "Your data is yours", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
	{
		slug: "updates",
		title: "Policy Updates",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{ id: "changes", heading: "How we announce changes", body: ["Placeholder paragraph. Replace with your own copy."] },
		],
	},
];

export const policyLinks = policies.map((policy) => ({
	slug: policy.slug,
	label: policy.title,
	href: `/policies/${policy.slug}`,
}));