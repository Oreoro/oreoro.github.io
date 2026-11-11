export type Topic =
	| "Product"
	| "Engineering"
	| "Design"
	| "Working"
	| "Business"
	| "Writing"
	| "Thinking";

export interface Thought {
	title: string;
	source: string;
	url: string;
	note: string;
	topic: Topic;
}

export const topicOrder: Topic[] = [
	"Product",
	"Engineering",
];

export const thoughts: Thought[] = [
	{
		title: "Do Things That Don't Scale",
		source: "Paul Graham",
		url: "https://paulgraham.com/ds.html",
		note: "The case for the unscalable, manual work early. We reread it before every launch.",
		topic: "Product",
	},
	{
		title: "How to Do Great Work",
		source: "Paul Graham",
		url: "https://paulgraham.com/greatwork.html",
		note: "Pick work that is hard, interesting, and important, then follow it past where most people stop.",
		topic: "Product",
	},
	{
		title: "Make Something People Want",
		source: "Paul Graham",
		url: "https://paulgraham.com/makers.html",
		note: "The whole game in four words. Everything downstream of it is bookkeeping.",
		topic: "Product",
	},
	{
		title: "How to Get Startup Ideas",
		source: "Paul Graham",
		url: "https://paulgraham.com/startupideas.html",
		note: "Ideas come from noticing what people are failing at, not from sitting down to brainstorm.",
		topic: "Product",
	},
	{
		title: "Startup = Growth",
		source: "Paul Graham",
		url: "https://paulgraham.com/growth.html",
		note: "Growth is the one thing a startup has that a small business does not. The shortest definition we have.",
		topic: "Product",
	},
	{
		title: "Relentlessly Resourceful",
		source: "Paul Graham",
		url: "https://paulgraham.com/relentless.html",
		note: "On the kind of person who gets a prototype out the door when nobody is helping.",
		topic: "Product",
	},
	{
		title: "Shape Up",
		source: "Ryan Singer / Basecamp",
		url: "https://basecamp.com/shapeup",
		note: "Fixed time, variable scope, and a real appetite for the work. The method behind our cycles.",
		topic: "Product",
	},
	{
		title: "Continuous Discovery Habits",
		source: "Teresa Torres",
		url: "https://www.producttalk.org/continuous-discovery-habits/",
		note: "How to stay close to customers every week instead of every quarter.",
		topic: "Product",
	},
	{
		title: "Inspired",
		source: "Marty Cagan",
		url: "https://www.svpg.com/inspired-how-to-create-products-customers-love/",
		note: "The clearest argument we know for putting product before process.",
		topic: "Product",
	},
	{
		title: "The Lean Startup",
		source: "Eric Ries",
		url: "https://theleanstartup.com/",
		note: "Build, measure, learn. The loop behind everything we ship, and the reason we keep scope testable.",
		topic: "Product",
	},
	{
		title: "Choose Boring Technology",
		source: "Dan McKinley",
		url: "https://mcfunley.com/choose-boring-technology",
		note: "Innovation tokens are finite. Spend them on the product, not the plumbing.",
		topic: "Engineering",
	},
	{
		title: "The Majestic Monolith",
		source: "David Heinemeier Hansson",
		url: "https://m.signalvnoise.com/the-majestic-monolith/",
		note: "Most teams do not need microservices. A well-kept monolith is a competitive advantage.",
		topic: "Engineering",
	},
	{
		title: "MonolithFirst",
		source: "Martin Fowler & Christian Fowler",
		url: "https://martinfowler.com/bliki/MonolithFirst.html",
		note: "A deliberately boring strategy: one thing, and split it only when a boundary is actually hurting.",
		topic: "Engineering",
	},
	{
		title: "YAGNI",
		source: "Martin Fowler",
		url: "https://martinfowler.com/bliki/Yagni.html",
		note: "The shortest argument for cutting scope until it fits, and deleting the abstraction nobody asked for.",
		topic: "Engineering",
	},
	{
		title: "The Twelve-Factor App",
		source: "Adam Wiggins / Heroku",
		url: "https://12factor.net",
		note: "The checklist we run against every service before it goes near production.",
		topic: "Engineering",
	},
	{
		title: "The Grug Brained Developer",
		source: "grugbrain.dev",
		url: "https://grugbrain.dev",
		note: "Funny on the first read, pointed on the second. A case for keeping complexity out of your code.",
		topic: "Engineering",
	},
	{
		title: "The Joel Test",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
		note: "Twelve yes/no questions about how good a team is. We are not at twelve, and we know which ones.",
		topic: "Engineering",
	},
	{
		title: "The Law of Leaky Abstractions",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/",
		note: "A good reason to understand the layer below the one you are working in.",
		topic: "Engineering",
	},
	{
		title: "Simple Made Easy",
		source: "Rich Hickey",
		url: "https://www.infoq.com/presentations/simple-made-easy/",
		note: "On complexity being a property of the problem rather than the solution. Long, worth the hour.",
		topic: "Engineering",
	},
	{
		title: "When To Use SQLite",
		source: "SQLite",
		url: "https://www.sqlite.org/whentouse.html",
		note: "The short answer is 'more often than you think'. The list of exceptions is shorter than you expect.",
		topic: "Engineering",
	},
];

export const thoughtsByTopic: { topic: string; entries: Thought[] }[] = [
	...topicOrder.map((topic) => ({
		topic,
		entries: thoughts.filter((thought) => thought.topic === topic),
	})),
	...(() => {
		const known = new Set<string>(topicOrder);
		const rest = thoughts.filter((thought) => !known.has(thought.topic));
		return rest.length > 0 ? [{ topic: "Other", entries: rest }] : [];
	})(),
].filter((group) => group.entries.length > 0);
