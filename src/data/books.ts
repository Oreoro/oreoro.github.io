/**
 * Books that shaped how Focus Lab builds. Rendered with the 37signals
 * `.books` layout: a cover, a title, a description, and a list of where to
 * get it. Swap the entries for our own shelf as it grows.
 */

export interface BookLink {
	label: string;
	href: string;
}

export interface Book {
	slug: string;
	title: string;
	author: string;
	description: string;
	links: BookLink[];
	/** Two-letter mark shown on the placeholder cover. */
	mark: string;
	/** Palette index (1-12) used to tint the placeholder cover. */
	tint: number;
}

export const books: Book[] = [
	{
		slug: "inspired",
		title: "Inspired",
		author: "Marty Cagan",
		description:
			"How the best product teams decide what to build and why. The clearest argument we know for putting product before process.",
		mark: "IN",
		tint: 5,
		links: [
			{
				label: "Publisher",
				href: "https://www.svpg.com/inspired-how-to-create-products-customers-love/",
			},
		],
	},
	{
		slug: "the-lean-startup",
		title: "The Lean Startup",
		author: "Eric Ries",
		description:
			"Build, measure, learn. The loop behind every product we ship — and the reason we keep scope small enough to test.",
		mark: "LS",
		tint: 6,
		links: [{ label: "theleanstartup.com", href: "https://theleanstartup.com/" }],
	},
	{
		slug: "the-design-of-everyday-things",
		title: "The Design of Everyday Things",
		author: "Don Norman",
		description:
			"Why some interfaces feel obvious and others fight you. Required reading before we design anything.",
		mark: "DO",
		tint: 4,
		links: [
			{ label: "Publisher", href: "https://www.nngroup.com/books/design-everyday-things-revised/" },
		],
	},
	{
		slug: "refactoring-ui",
		title: "Refactoring UI",
		author: "Adam Wathan & Steve Schoger",
		description:
			"Practical interface design for people who build. Tactics we reach for on every screen.",
		mark: "RU",
		tint: 7,
		links: [{ label: "refactoringui.com", href: "https://www.refactoringui.com/" }],
	},
	{
		slug: "continuous-discovery-habits",
		title: "Continuous Discovery Habits",
		author: "Teresa Torres",
		description:
			"How to stay close to customers every week instead of every quarter. Keeps us honest about what people actually need.",
		mark: "CD",
		tint: 8,
		links: [
			{
				label: "producttalk.org",
				href: "https://www.producttalk.org/continuous-discovery-habits/",
			},
		],
	},
	{
		slug: "shape-up",
		title: "Shape Up",
		author: "Ryan Singer",
		description:
			"Stop running in circles and ship work that matters. The fixed-time, variable-scope method behind how we run a cycle.",
		mark: "SU",
		tint: 9,
		links: [
			{ label: "Read online", href: "https://basecamp.com/shapeup" },
			{ label: "PDF", href: "https://basecamp.com/shapeup/shape-up.pdf" },
		],
	},
];
