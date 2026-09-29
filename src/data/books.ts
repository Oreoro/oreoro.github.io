/**
 * Books that shaped how Focus Lab builds. Rendered with the 37signals
 * `.books` layout: a cover, a title, a description, and a list of where to
 * get it. Swap the entries for our own shelf as it grows.
 *
 * Every `href` was checked with a plain `curl` and returned 200.
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
			{ label: "Chapter index", href: "https://basecamp.com/shapeup/0.3-chapter-01" },
		],
	},
	{
		slug: "the-effective-executive",
		title: "The Effective Executive",
		author: "Peter Drucker",
		description:
			"What to do with your own time. The first book we hand anyone who joins the studio, and the one we re-read when we take on too much.",
		mark: "EE",
		tint: 10,
		links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/The_Effective_Executive" }],
	},
	{
		slug: "zen-and-the-art-of-motorcycle-maintenance",
		title: "Zen and the Art of Motorcycle Maintenance",
		author: "Robert Pirsig",
		description:
			"The difference between quality and quantity, told as a story about a man taking a bike apart. Changed how we talk about care in a codebase.",
		mark: "ZA",
		tint: 3,
		links: [
			{
				label: "Wikipedia",
				href: "https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance",
			},
		],
	},
	{
		slug: "on-writing-well",
		title: "On Writing Well",
		author: "William Zinsser",
		description:
			"Clutter is the disease of American writing. The book behind every plain sentence on this site.",
		mark: "OW",
		tint: 11,
		links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/On_Writing_Well" }],
	},
	{
		slug: "elements-of-typographic-style",
		title: "Elements of Typographic Style",
		author: "Robert Bringhurst",
		description:
			"The reference we open when the question is about rhythm and hierarchy rather than taste. Chapter 8 is the one that matters.",
		mark: "ET",
		tint: 12,
		links: [
			{
				label: "Wikipedia",
				href: "https://en.wikipedia.org/wiki/Elements_of_Typographic_Style",
			},
		],
	},
	{
		slug: "practical-typography",
		title: "Practical Typography",
		author: "Butterick",
		description:
			"The one book on setting type that changed what we ship. Free to read, and the first thing a new designer is pointed at.",
		mark: "PT",
		tint: 1,
		links: [{ label: "practicaltypography.com", href: "https://practicaltypography.com/" }],
	},
	{
		slug: "seeing-like-a-state",
		title: "Seeing Like a State",
		author: "James C. Scott",
		description:
			"What happens when a system built to be legible to a centre stops being legible to the people living inside it. The best book about products and power we have read.",
		mark: "SS",
		tint: 2,
		links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Seeing_Like_a_State" }],
	},
	{
		slug: "thinking-in-systems",
		title: "Thinking in Systems",
		author: "Donella Meadows",
		description:
			"Stocks, flows, and why the thing you are optimising is rarely the thing you are measuring. Read before any pricing decision.",
		mark: "TS",
		tint: 5,
		links: [{ label: "Author", href: "https://en.wikipedia.org/wiki/Donella_Meadows" }],
	},
	{
		slug: "poor-charlies-almanack",
		title: "Poor Charlie's Almanack",
		author: "Peter Kaufman (ed.)",
		description:
			"The clearest short statement of how to think about almost anything. A hundred pages, and every one of them earns its place.",
		mark: "PC",
		tint: 6,
		links: [
			{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Poor_Charlie%27s_Almanack" },
		],
	},
	{
		slug: "a-timeless-way-of-building",
		title: "A Timeless Way of Building",
		author: "Christopher Alexander",
		description:
			"Where the word pattern came from. Older than the web and still the best framing we have for why a design system is a language, not a kit.",
		mark: "TT",
		tint: 7,
		links: [
			{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/A_Timeless_Way_of_Building" },
			{ label: "The author", href: "https://en.wikipedia.org/wiki/Christopher_Alexander" },
		],
	},
	{
		slug: "bird-by-bird",
		title: "Bird by Bird",
		author: "Anne Lamott",
		description:
			"On short daily writing as the actual mechanism, not as a warm-up for the real work. Read it the week you cannot write a single line.",
		mark: "BB",
		tint: 8,
		links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Bird_by_Bird" }],
	},
	{
		slug: "the-remote-book",
		title: "The Remote Book",
		author: "Jason Fried & David Heinemeier Hansson",
		description:
			"Nine years of working remotely, written down. The longest-running experiment we have on record, and the one we keep re-reading.",
		mark: "RM",
		tint: 9,
		links: [{ label: "basecamp.com", href: "https://basecamp.com/remote" }],
	},
	{
		slug: "how-to-take-smart-notes",
		title: "How to Take Smart Notes",
		author: "Sönke Ahrens",
		description:
			"Notes in your own words, linked to each other. The only note system either of us has kept past the first month.",
		mark: "SN",
		tint: 10,
		links: [{ label: "takesmartnotes.com", href: "https://takesmartnotes.com/" }],
	},
	{
		slug: "notes-on-the-synthesis-of-form",
		title: "Notes on the Synthesis of Form",
		author: "Christopher Alexander",
		description:
			"The dense, difficult original behind the pattern language. Not a book to read for pleasure; a book to read twice and then argue with.",
		mark: "NS",
		tint: 11,
		links: [
			{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Notes_on_the_Synthesis_of_Form" },
		],
	},
	{
		slug: "a-mathematicians-apology",
		title: "A Mathematician's Apology",
		author: "W. H. Auden",
		description:
			"On the difference between what a field thinks it is for and what it is actually for. Short, and it reframes how you talk about your own work.",
		mark: "MA",
		tint: 12,
		links: [
			{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/A_Mathematician%27s_Apology" },
		],
	},
	{
		slug: "the-scout-mindset",
		title: "The Scout Mindset",
		author: "Julia Galef",
		description:
			"Evidence over confidence. The right book to hand someone on the day they are about to defend a decision they have already made.",
		mark: "SC",
		tint: 1,
		links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/The_Scout_Mindset" }],
	},
	{
		slug: "thinking-fast-and-slow",
		title: "Thinking, Fast and Slow",
		author: "Daniel Kahneman",
		description:
			"The source of half the biases we now name out loud before making a call. Heavy, and worth the two hundred pages.",
		mark: "TF",
		tint: 2,
		links: [{ label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow" }],
	},
];
