/**
 * Placeholder thoughts — replace titles, summaries and body copy with your own.
 */

export interface Thought {
	slug: string;
	title: string;
	intro: string;
	sections: { id: string; heading: string; body: string[] }[];
}

export const thoughts: Thought[] = [
	{
		slug: "shipping-principles",
		title: "Shipping Principles",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{
				id: "we-only-ship-good-work",
				heading: "We only ship good work",
				body: ["Placeholder paragraph. Replace with your own copy."],
			},
			{
				id: "we-ship-when-were-confident",
				heading: "We ship when we're confident",
				body: ["Placeholder paragraph. Replace with your own copy."],
			},
			{
				id: "we-own-what-we-ship",
				heading: "We own what we ship",
				body: ["Placeholder paragraph. Replace with your own copy."],
			},
		],
	},
	{
		slug: "how-we-make-decisions",
		title: "How We Make Decisions",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{
				id: "decide-and-move",
				heading: "Decide and move",
				body: ["Placeholder paragraph. Replace with your own copy."],
			},
		],
	},
	{
		slug: "why-we-choose-profit",
		title: "Why We Choose Profit",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{
				id: "independence",
				heading: "Independence",
				body: ["Placeholder paragraph. Replace with your own copy."],
			},
		],
	},
	{
		slug: "how-we-communicate",
		title: "How We Communicate",
		intro: "Placeholder intro. Replace with your own copy.",
		sections: [
			{
				id: "writing-first",
				heading: "Writing first",
				body: ["Placeholder paragraph. Replace with your own copy."],
			},
		],
	},
];