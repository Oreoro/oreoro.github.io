/**
 * Thoughts — writing we find useful, not our own.
 *
 * A curated reading list. Every entry links out to the original. Swap or add
 * as our taste changes.
 */

export interface Thought {
	title: string;
	source: string;
	url: string;
	note: string;
}

export const thoughts: Thought[] = [
	{
		title: "Do Things That Don't Scale",
		source: "Paul Graham",
		url: "https://paulgraham.com/ds.html",
		note: "The case for doing the unscalable, manual work early. We still reread it before every launch.",
	},
	{
		title: "Maker's Schedule, Manager's Schedule",
		source: "Paul Graham",
		url: "https://paulgraham.com/makersschedule.html",
		note: "Why a single meeting can wreck a day of building — and how to protect long blocks of time.",
	},
	{
		title: "An Obligation to Independence",
		source: "37signals",
		url: "https://37signals.com/01",
		note: "No investors, no board, no exit. The clearest argument we know for staying independent.",
	},
	{
		title: "Work Isn't War",
		source: "37signals",
		url: "https://37signals.com/02",
		note: "The language we use about work shapes the work. A reminder to drop the battlefield metaphors.",
	},
	{
		title: "Shape Up",
		source: "Ryan Singer / Basecamp",
		url: "https://basecamp.com/shapeup",
		note: "Fixed time, variable scope, and a real appetite for the work. The method behind our cycles.",
	},
	{
		title: "Choose Boring Technology",
		source: "Dan McKinley",
		url: "https://mcfunley.com/choose-boring-technology",
		note: "Innovation tokens are finite. Spend them on the product, not the plumbing.",
	},
	{
		title: "YAGNI",
		source: "Martin Fowler",
		url: "https://martinfowler.com/bliki/Yagni.html",
		note: "You aren't gonna need it. The shortest argument for cutting scope until it fits.",
	},
	{
		title: "Things You Should Never Do, Part I",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
		note: "Rewriting from scratch is the single worst strategic mistake. Read it before you propose one.",
	},
	{
		title: "Don't Call Yourself A Programmer",
		source: "Patrick McKenzie",
		url: "https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/",
		note: "On the business of software: value, pricing, and why the work is not the point.",
	},
	{
		title: "The Majestic Monolith",
		source: "David Heinemeier Hansson",
		url: "https://m.signalvnoise.com/the-majestic-monolith/",
		note: "Most teams do not need microservices. A well-kept monolith is a competitive advantage.",
	},
	{
		title: "The Twelve-Factor App",
		source: "Heroku",
		url: "https://12factor.net",
		note: "The checklist we run against every service before it goes to production.",
	},
	{
		title: "Why We Choose Profit",
		source: "37signals",
		url: "https://37signals.com/04",
		note: "Profit is not a dirty word. It is what lets you say no and stay in control.",
	},
];
