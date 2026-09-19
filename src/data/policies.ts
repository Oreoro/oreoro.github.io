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
		intro:
			"These Terms cover your use of Focus Lab products and services. By using them, you agree to these Terms.",
		sections: [
			{
				id: "definitions",
				heading: "Definitions",
				body: [
					"“Focus Lab”, “we”, “our”, and “us” refer to Focus Lab. “Services” refers to our products — Urbanevents, Workproof, and Muxo — and to focuslab.pk.",
					"“You” and “your” refer to the person or organization that owns an account with one or more of our Services.",
				],
			},
			{
				id: "accounts-and-payment",
				heading: "Accounts and payment",
				body: [
					"You are responsible for keeping your account and password secure, and for the activity and content under your account, including content posted by your users.",
					"Paid plans are billed in advance. Upgrades take effect immediately and downgrades take effect at the next billing cycle. Fees exclude taxes. See our Taxes and Refund policies for details.",
				],
			},
			{
				id: "cancellation",
				heading: "Cancellation",
				body: [
					"You can cancel your account at any time from within the product. Your content becomes inaccessible at cancellation and is permanently deleted within 60 days. See our Cancellation Policy for details.",
				],
			},
			{
				id: "changes-and-liability",
				heading: "Changes and liability",
				body: [
					"We may modify or discontinue any part of the Services at any time. We provide the Services on an “as is” and “as available” basis, and we are not liable for damages resulting from their use.",
					"If you have a question about these Terms, email hello@focuslab.pk.",
				],
			},
		],
	},
	{
		slug: "privacy",
		title: "Privacy Policy",
		intro:
			"This policy explains what data we collect, why we collect it, and the rights you have over it. We never sell your data.",
		sections: [
			{
				id: "what-we-collect",
				heading: "What we collect",
				body: [
					"We collect only what we need to run the Services: your name, email address, company name, and billing details. We store the content you put into our products, and we log IP addresses for security and spam prevention.",
					"Card details are submitted directly to our payment processor and never reach our servers.",
				],
			},
			{
				id: "how-we-use-it",
				heading: "How we use it",
				body: [
					"We use your data to provide the Services, send essential account updates, and fix problems. We do not use your content to train AI models, and our AI providers are contractually prohibited from training on it.",
					"We share data with subprocessors only as needed to run the Services, and only under data processing agreements.",
				],
			},
			{
				id: "your-rights",
				heading: "Your rights",
				body: [
					"You can access, correct, export, or delete your personal data, and you can object to how it is processed. We apply the same rights to all customers regardless of location.",
					"Email privacy@focuslab.pk to exercise a right or ask a question.",
				],
			},
			{
				id: "retention-and-security",
				heading: "Retention and security",
				body: [
					"We keep your data while your account is active and delete it within 60 days of cancellation. Data is encrypted in transit and our backups are encrypted.",
				],
			},
		],
	},
	{
		slug: "cancellation",
		title: "Cancellation Policy",
		intro:
			"You can cancel your account at any time, directly in our products. We want satisfied customers, not hostages.",
		sections: [
			{
				id: "what-happens-when-you-cancel",
				heading: "What happens when you cancel",
				body: [
					"Your account becomes inaccessible as soon as you cancel, so export anything you want to keep beforehand. We permanently delete your content from active systems within 30 days and from backups within 60 days. We cannot recover it after it is deleted.",
				],
			},
			{
				id: "billing",
				heading: "Billing",
				body: [
					"We will not bill you again after you cancel. We do not automatically prorate unused time, but if you just started a new billing cycle, contact us and we will make it right.",
				],
			},
			{
				id: "inactive-accounts",
				heading: "Inactive accounts",
				body: [
					"We may cancel trial accounts 30 days after a trial ends without an upgrade, and free accounts after 365 days of inactivity.",
					"We also reserve the right to suspend or terminate accounts for any reason at any time, as described in our Terms of Service.",
				],
			},
		],
	},
	{
		slug: "refund",
		title: "Refund Policy",
		intro:
			"If you are unhappy with a Focus Lab product for any reason, contact us. We will make it right.",
		sections: [
			{
				id: "monthly-plans",
				heading: "Monthly plans",
				body: [
					"If you were charged for another month but meant to cancel, we refund that charge. If you forgot to cancel a few months back and have not used the product since, we refund those months too.",
				],
			},
			{
				id: "annual-plans",
				heading: "Annual plans",
				body: [
					"If you cancel an annual plan, you keep access until your paid period ends. We can refund a prorated amount for any remaining whole months.",
				],
			},
			{
				id: "credits",
				heading: "Credits",
				body: [
					"If we have extended downtime, or support takes multiple days to respond, we will issue a credit to your account.",
				],
			},
		],
	},
	{
		slug: "security",
		title: "Security Overview",
		intro: "We take the security of your data seriously. Here is how we protect it.",
		sections: [
			{
				id: "data-at-rest",
				heading: "Data at rest",
				body: [
					"Data is written to multiple disks, backed up daily, and stored in multiple locations. Uploads and database backups are encrypted.",
				],
			},
			{
				id: "data-in-transit",
				heading: "Data in transit",
				body: [
					"All traffic between you and us is encrypted and sent over HTTPS. Within our private networks, data may be transferred unencrypted.",
				],
			},
			{
				id: "infrastructure-and-billing",
				heading: "Infrastructure and billing",
				body: [
					"We run on Cloudflare and managed PostgreSQL. Systems are patched regularly and monitored for unusual activity.",
					"Card details are processed by Stripe and never touch our servers.",
				],
			},
			{
				id: "reporting-an-issue",
				heading: "Reporting an issue",
				body: [
					"To report a vulnerability or an incident, email security@focuslab.pk. We will confirm receipt and keep you updated as we investigate.",
				],
			},
		],
	},
	{
		slug: "accessibility",
		title: "Accessibility",
		intro:
			"Our products are for everyone, whatever their abilities and whatever tools they use. We design and test with accessibility in mind from the start. WCAG 2.2 AA is the standard we aim for.",
		sections: [
			{
				id: "our-standard",
				heading: "Our standard",
				body: [
					"We build against WCAG 2.2 AA. Before we ship, we test with keyboard navigation and screen readers, and we treat accessibility issues as bugs.",
				],
			},
			{
				id: "questions-or-issues",
				heading: "Questions or issues?",
				body: [
					"If you hit an accessibility barrier in one of our products, email accessibility@focuslab.pk. Hearing what is not working is how we know what to fix next.",
				],
			},
		],
	},
	{
		slug: "taxes",
		title: "Taxes on Services",
		intro:
			"Where our products are taxable, we collect and remit consumption tax. Prices on our product sites exclude sales tax and VAT.",
		sections: [
			{
				id: "how-tax-is-calculated",
				heading: "How tax is calculated",
				body: [
					"We calculate tax from the billing address on your account. If you are in a taxable jurisdiction, your invoice shows a separate line for sales tax or VAT.",
				],
			},
			{
				id: "tax-exempt-organizations",
				heading: "Tax-exempt organizations",
				body: [
					"If your organization is tax-exempt or holds a VAT identification number, send us your documentation and we will update your account.",
					"Not every jurisdiction recognizes a federal exemption, so a tax exemption letter alone may not be enough.",
				],
			},
			{
				id: "updating-your-billing-address",
				heading: "Updating your billing address",
				body: [
					"You can change your billing address in your account settings. You may need to re-enter your card as part of the update.",
				],
			},
			{
				id: "we-re-here-to-help",
				heading: "We’re here to help",
				body: [
					"Email billing@focuslab.pk if you believe you were charged in error, or if you need help with tax on your account.",
				],
			},
		],
	},
	{
		slug: "ownership",
		title: "Account Ownership Policy",
		intro: "This policy explains who owns a Focus Lab account and the data in it.",
		sections: [
			{
				id: "who-owns-the-account",
				heading: "Who owns the account",
				body: [
					"If a legal entity signed up, that organization owns the account and the data in it. If the organization is unincorporated, the individual who signed up owns the account.",
				],
			},
			{
				id: "transferring-ownership",
				heading: "Transferring ownership",
				body: [
					"The person who signed up is the default account owner. Ownership can be reassigned to another member from your account settings.",
				],
			},
		],
	},
	{
		slug: "updates",
		title: "Policy Updates",
		intro:
			"If you would like to receive policy updates, sign up below. We will never share your email, or use it for any other purpose.",
		sections: [],
	},
];

export const policyLinks = policies.map((policy) => ({
	slug: policy.slug,
	label: policy.title,
	href: `/policies/${policy.slug}`,
}));
