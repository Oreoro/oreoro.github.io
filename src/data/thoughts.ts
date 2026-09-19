export interface Thought {
	slug: string;
	title: string;
	intro: string;
	sections: { id: string; heading: string; body: string[] }[];
}

export const thoughts: Thought[] = [
	{
		slug: "why-we-are-product-led",
		title: "Why We're Product-Led",
		intro: "We build and run our own software, and that changes how we work with everyone else.",
		sections: [
			{
				id: "we-run-what-we-build",
				heading: "We run what we build",
				body: [
					"Focus Lab is a product-led studio. We design, build, and operate our own software. Urbanevents handles events and ticketing. Workproof handles work and proof. Muxo gives teams one key for the whole stack.",
					"Running our own products is not a side project. It is the core of the studio. Every decision we make for a partner is informed by decisions we have to live with ourselves.",
				],
			},
			{
				id: "the-work-has-to-survive-contact",
				heading: "The work has to survive contact",
				body: [
					"A product in production teaches you things a prototype never will. Real users, real load, real support tickets. We carry those lessons into every engagement.",
					"We do not hand over a deck and leave. We stay close to the systems we build, because we know what happens after launch.",
				],
			},
			{
				id: "a-few-partners-not-many-clients",
				heading: "A few partners, not many clients",
				body: [
					"We partner with a small number of teams. That is deliberate. It keeps senior people on the work and keeps the feedback loop short.",
					"When we say we can do something, it is because we have already done it for ourselves.",
				],
			},
		],
	},
	{
		slug: "shipping-is-the-point",
		title: "Shipping Is the Whole Point",
		intro: "Ideas are cheap. Shipping is the whole point.",
		sections: [
			{
				id: "working-software-over-perfect-plans",
				heading: "Working software over perfect plans",
				body: [
					"We plan enough to start and no more. The plan is a hypothesis. The release is the test.",
					"A long specification is a way of delaying the moment when the work meets reality. We prefer to meet it early.",
				],
			},
			{
				id: "small-releases-compound",
				heading: "Small releases compound",
				body: [
					"We ship in small pieces, often. Each release is a chance to learn something and correct course.",
					"Momentum matters. A team that ships weekly makes better calls than a team that ships quarterly, because it has more data.",
				],
			},
			{
				id: "done-means-in-production",
				heading: "Done means in production",
				body: [
					"Done is not a branch, a demo, or a ticket marked complete. Done means running in production for real users.",
					"We own what we ship. If it breaks, we fix it. That is the deal.",
				],
			},
		],
	},
	{
		slug: "small-teams-short-cycles",
		title: "Small Teams, Short Cycles",
		intro: "Small teams move faster, talk less, and make better calls.",
		sections: [
			{
				id: "two-to-five-people",
				heading: "Two to five people",
				body: [
					"Our teams are small on purpose. A small team can hold the whole problem in its head. It does not need status meetings to stay aligned.",
					"We staff with senior people who can work across design, front end, back end, and infrastructure. Fewer handoffs, fewer gaps.",
				],
			},
			{
				id: "six-week-cycles",
				heading: "Six-week cycles",
				body: [
					"We work in short cycles. Six weeks is enough to ship something meaningful and short enough to stay honest about scope.",
					"At the end of a cycle, the work goes out. There is no carrying it over. The deadline forces the trade-offs that keep quality high.",
				],
			},
			{
				id: "no-death-marches",
				heading: "No death marches",
				body: [
					"Short cycles protect the team. Nobody works nights for a quarter. A sustainable pace is not a perk, it is how good work gets made.",
					"If something cannot fit the cycle, we cut scope, not sleep.",
				],
			},
		],
	},
	{
		slug: "designing-for-year-two",
		title: "Designing for the Second Year",
		intro:
			"The first year is easy to design for. The second year is where products are won or lost.",
		sections: [
			{
				id: "the-cost-of-the-first-draft",
				heading: "The cost of the first draft",
				body: [
					"Anyone can make a product look good on launch day. The hard part is the second year, when the feature list is long, the data has grown, and the original team has moved on.",
					"We design for that version of the product from the start. Clean data models, boring technology, and clear boundaries.",
				],
			},
			{
				id: "boring-technology-ages-well",
				heading: "Boring technology ages well",
				body: [
					"We choose tools we can still hire for in three years. PostgreSQL, TypeScript, React, Node.js, Stripe. Proven, documented, and widely understood.",
					"Novelty has a maintenance cost that shows up later. We spend it only when it buys something real.",
				],
			},
			{
				id: "leave-the-codebase-readable",
				heading: "Leave the codebase readable",
				body: [
					"Every change should make the next change easier. We write for the person who inherits the work, because that person is often us.",
					"A codebase is a long relationship. We treat it that way.",
				],
			},
		],
	},
	{
		slug: "how-we-work-with-clients",
		title: "How We Work With Clients",
		intro: "We take on a small number of partners and work with them directly.",
		sections: [
			{
				id: "direct-access-to-seniors",
				heading: "Direct access to the people doing the work",
				body: [
					"There is no account layer between you and the people building your product. You talk to the designers and engineers doing the work.",
					"That keeps feedback fast and decisions grounded. It also means fewer surprises.",
				],
			},
			{
				id: "one-team-one-backlog",
				heading: "One team, one backlog",
				body: [
					"We work in the open with a shared backlog and a shared board. You can see what is in progress and what is next at any time.",
					"We plan in short cycles and review the work together. Priorities can change between cycles, not in the middle of one.",
				],
			},
			{
				id: "what-we-need-from-you",
				heading: "What we need from you",
				body: [
					"A decision maker who is available. Clear priorities. Access to real users where it helps. That is usually enough.",
					"If something is not working, tell us early. We would rather fix it than defend it.",
				],
			},
			{
				id: "how-to-start",
				heading: "How to start",
				body: [
					"Send a short note to hello@focuslab.pk. Tell us what you are building and what is in the way. If we are a fit, we will say so. If we are not, we will say that too.",
				],
			},
		],
	},
	{
		slug: "working-in-the-open",
		title: "Working in the Open",
		intro: "We default to sharing: our code, our decisions, and our reasoning.",
		sections: [
			{
				id: "open-by-default",
				heading: "Open by default",
				body: [
					"Most of what we do is visible to the people we work with. Repositories, boards, and notes are shared unless there is a reason not to.",
					"Openness is a practical way to catch mistakes early and keep trust. It is not a posture, it is a habit.",
				],
			},
			{
				id: "decisions-come-with-reasons",
				heading: "Decisions come with reasons",
				body: [
					"When we make a call, we write down why. A decision without context becomes a mystery six months later.",
					"Writing it down also forces clarity. If we cannot explain it plainly, we probably do not understand it yet.",
				],
			},
			{
				id: "the-work-speaks",
				heading: "The work speaks for itself",
				body: [
					"We publish what we build. Our own products are the clearest statement of how we think.",
					"You can judge the studio by the software it runs. That is the point of working in the open.",
				],
			},
		],
	},
	{
		slug: "pricing-the-work",
		title: "Pricing the Work",
		intro: "We price the work, not the hours it takes to do it.",
		sections: [
			{
				id: "a-price-for-the-outcome",
				heading: "A price for the outcome",
				body: [
					"Hours are an input. The outcome is what you are buying. We quote a fixed price for a defined piece of work, so the risk of a slow week sits with us, not you.",
					"That forces both sides to be clear about scope before anyone starts. Clarity up front is cheaper than renegotiation later.",
				],
			},
			{
				id: "scope-is-the-real-variable",
				heading: "Scope is the real variable",
				body: [
					"When the work changes, the price changes. We do not pretend otherwise. We will show you what a change costs before we make it.",
					"A fixed price is not a promise to do everything. It is a promise to do what we agreed, well.",
				],
			},
			{
				id: "no-surprise-invoices",
				heading: "No surprise invoices",
				body: [
					"You should never open a bill and wonder where it came from. We invoice against the plan you already approved.",
					"If something is going to cost more, you hear it from us first. Every time.",
				],
			},
		],
	},
	{
		slug: "why-we-say-no",
		title: "Why We Say No",
		intro: "Saying no is how we keep the work good.",
		sections: [
			{
				id: "no-is-a-filter",
				heading: "No is a filter",
				body: [
					"We turn down most of what comes to us. Not because it is bad, but because we can only run a small number of things at once.",
					"Every yes spends the same attention. We would rather spend it on work we can stand behind.",
				],
			},
			{
				id: "when-we-are-not-a-fit",
				heading: "When we are not a fit",
				body: [
					"If the problem is not one we understand, we say so. If the timeline is not real, we say so. If the budget and the ambition do not match, we say so.",
					"That conversation is faster and kinder than a project that was never going to work.",
				],
			},
			{
				id: "the-cost-of-a-bad-yes",
				heading: "The cost of a bad yes",
				body: [
					"A wrong yes costs everyone: you pay for work that stalls, and we lose the time we could have spent on something better.",
					"A clear no leaves you free to find the right team. That is a real outcome too.",
				],
			},
		],
	},
	{
		slug: "the-boring-stack",
		title: "The Boring Stack",
		intro: "We pick tools that will still be here when the product is.",
		sections: [
			{
				id: "chosen-for-the-long-run",
				heading: "Chosen for the long run",
				body: [
					"Our stack is deliberately unremarkable. TypeScript, React, Node.js, PostgreSQL, Stripe. Shopify, Cloudflare, Framer, and Astro where they fit.",
					"None of it is exciting. All of it is documented, hireable, and understood by a lot of people. That is the point.",
				],
			},
			{
				id: "novelty-has-a-price",
				heading: "Novelty has a price",
				body: [
					"New tools can be faster to start and slower to own. The cost shows up in maintenance, onboarding, and the day the maintainer moves on.",
					"We pay that price only when it buys something real, like a genuine step change in what the product can do.",
				],
			},
			{
				id: "boring-is-a-feature",
				heading: "Boring is a feature",
				body: [
					"A stack nobody has to think about is one less thing between you and your users. Reliability is not glamorous, but it compounds.",
					"We would rather be interesting in the product than in the plumbing.",
				],
			},
		],
	},
	{
		slug: "writing-things-down",
		title: "Writing Things Down",
		intro: "If it is not written down, it did not happen.",
		sections: [
			{
				id: "memory-is-not-a-system",
				heading: "Memory is not a system",
				body: [
					"Teams forget. People leave. A decision that lives only in someone's head dies when they walk out the door.",
					"Writing it down is the cheapest way to keep a project from depending on any one person.",
				],
			},
			{
				id: "short-notes-beat-long-docs",
				heading: "Short notes beat long docs",
				body: [
					"We write short notes, not manuals. A paragraph on why we chose something is worth more than a page that nobody reads.",
					"The goal is a future reader who has none of our context. If the note works for them, it works.",
				],
			},
			{
				id: "writing-forces-clarity",
				heading: "Writing forces clarity",
				body: [
					"You cannot write a fuzzy idea down without noticing it is fuzzy. The act of writing finds the gaps.",
					"So we write early and often. It is how we think, not just how we record.",
				],
			},
		],
	},
];
