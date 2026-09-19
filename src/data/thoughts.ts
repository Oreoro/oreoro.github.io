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
];
