/**
 * Thoughts — writing we find useful, not our own.
 *
 * A curated reading list, grouped by the question each piece helps answer.
 * Every entry links out to the original; none of it is ours. Swap or add as
 * our taste changes, and keep the note to one line — the note is a reason to
 * click, not a summary.
 *
 * Every URL in this file was checked with a plain `curl` and returned 200. If
 * you add one, check it before the commit.
 */

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

/** Group order on /thoughts. Not alphabetical — this is the order we would
 *  want to read them in if we were starting from nothing. */
export const topicOrder: Topic[] = [
	"Product",
	"Engineering",
];

export const thoughts: Thought[] = [
	/* ---------------------------------------------------------------- Product */
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
		title: "Startups in 13 Sentences",
		source: "Paul Graham",
		url: "https://paulgraham.com/13sentences.html",
		note: "Thirteen sentences that say more than most books. Pinned above the desk.",
		topic: "Product",
	},
	{
		title: "What You'll Wish You'd Known",
		source: "Paul Graham",
		url: "https://paulgraham.com/wish.html",
		note: "The things founders only learn by doing them. A fair warning before you start.",
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
		title: "How to Start a Startup",
		source: "Paul Graham",
		url: "https://paulgraham.com/start.html",
		note: "Two halves: find something worth doing, then convince people to do it with you.",
		topic: "Product",
	},
	{
		title: "Founder as Salesman",
		source: "Paul Graham",
		url: "https://paulgraham.com/sales.html",
		note: "If you are not talking to users you are not running a company. The bit that stings is the bit that helps.",
		topic: "Product",
	},
	{
		title: "Design and Research",
		source: "Paul Graham",
		url: "https://paulgraham.com/design.html",
		note: "On doing your own research, and why taste is not a substitute for talking to people.",
		topic: "Product",
	},
	{
		title: "Some Companies That People Love",
		source: "Paul Graham",
		url: "https://paulgraham.com/love.html",
		note: "What the companies people are loyal to have in common. It is not scale.",
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
		title: "Set Boundaries",
		source: "Basecamp / Shape Up",
		url: "https://basecamp.com/shapeup/1.2-chapter-03",
		note: "An appetite is a time budget and a rough idea, not a backlog. The chapter worth reading twice.",
		topic: "Product",
	},
	{
		title: "Find the Elements",
		source: "Basecamp / Shape Up",
		url: "https://basecamp.com/shapeup/1.3-chapter-04",
		note: "Sizing is a judgement call made by whoever will build it, not an estimate handed down to them.",
		topic: "Product",
	},
	{
		title: "Risks and Rabbit Holes",
		source: "Basecamp / Shape Up",
		url: "https://basecamp.com/shapeup/1.4-chapter-05",
		note: "Deciding what is hardest before deciding what is next. Not the order you would guess.",
		topic: "Product",
	},
	{
		title: "Write the Pitch",
		source: "Basecamp / Shape Up",
		url: "https://basecamp.com/shapeup/1.5-chapter-06",
		note: "One page, written for someone deciding whether to bet six weeks on it.",
		topic: "Product",
	},
	{
		title: "Bets, Not Backlogs",
		source: "Basecamp / Shape Up",
		url: "https://basecamp.com/shapeup/2.1-chapter-07",
		note: "A backlog is a list of things somebody wants. A bet is a decision somebody made.",
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
		title: "Opportunity Solution Tree",
		source: "Teresa Torres",
		url: "https://www.producttalk.org/opportunity-solution-tree/",
		note: "Keeps discovery connected to what you actually shipped, instead of two separate ceremonies.",
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
		title: "Shape Up Every Six",
		source: "37signals",
		url: "https://37signals.com/06",
		note: "Why a six-week cycle with a real deadline beats a sprint that can be extended.",
		topic: "Product",
	},
	{
		title: "We Don't Sell You",
		source: "37signals",
		url: "https://37signals.com/07",
		note: "On the difference between selling people software and giving them a way out.",
		topic: "Product",
	},
	{
		title: "Shots on Goals",
		source: "37signals",
		url: "https://37signals.com/28",
		note: "Take more shots rather than trying to be right every time. The strategy in one line.",
		topic: "Product",
	},
	{
		title: "The Fortune 5,000,000",
		source: "37signals",
		url: "https://37signals.com/10",
		note: "There are more than enough people who want what you make. Stop shrinking your ambition to fit a spreadsheet.",
		topic: "Product",
	},
	{
		title: "Err on the Side of Do",
		source: "37signals",
		url: "https://37signals.com/05",
		note: "When a decision is close, make it and live with it. Waiting has a cost too.",
		topic: "Product",
	},

	/* ------------------------------------------------------------- Engineering */
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
		title: "Microservices",
		source: "Martin Fowler & James Lewis",
		url: "https://martinfowler.com/articles/microservices.html",
		note: "The actual costs, written by the people who built the hype and the correction to it.",
		topic: "Engineering",
	},
	{
		title: "Technical Debt",
		source: "Martin Fowler",
		url: "https://martinfowler.com/bliki/TechnicalDebt.html",
		note: "A metaphor worth using carefully, with a real explanation of when not to use it.",
		topic: "Engineering",
	},
	{
		title: "Is Design Dead?",
		source: "Martin Fowler",
		url: "https://martinfowler.com/articles/designDead.html",
		note: "A fair, non-tribal answer from someone who had to sit on both sides of the argument.",
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
		title: "Write Code That Is Easy to Delete",
		source: "programming is terrible",
		url: "https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to",
		note: "Code is a liability, not an asset. Changes how you draw every boundary.",
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
		title: "Things You Should Never Do, Part I",
		source: "Joel Spolsky",
		url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
		note: "Rewriting from scratch is the worst strategic mistake you can propose. Read it before you do.",
		topic: "Engineering",
	},
	{
		title: "Worse is Better",
		source: "Richard P. Gabriel",
		url: "https://www.dreamsongs.com/WorseIsBetter.html",
		note: "Simpler, slightly-less-correct software often wins by being easier to adopt and evolve.",
		topic: "Engineering",
	},
	{
		title: "The Cathedral and the Bazaar",
		source: "Eric S. Raymond",
		url: "https://en.wikipedia.org/wiki/Cathedral_and_the_Bazaar",
		note: "Why open, iterative development beats the closed model. Still the best line ever written about bugs.",
		topic: "Engineering",
	},
	{
		title: "The Unix Pipe",
		source: "Linux man-pages",
		url: "https://man7.org/linux/man-pages/man7/pipe.7.html",
		note: "A hundred words on why composable tools beat integrated ones. Read it and you will design differently.",
		topic: "Engineering",
	},
	{
		title: "Pro Git",
		source: "Scott Chacon & Ben Straub",
		url: "https://git-scm.com/book/en/v2",
		note: "Free, complete, and the only Git reference we trust. Chapter 10 pays for the whole book.",
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
		title: "Everything Is Broken",
		source: "Dan Luu",
		url: "https://danluu.com/everything-is-broken/",
		note: "A tour of how the systems we rely on are actually held together. Humbling in the right way.",
		topic: "Engineering",
	},
	{
		title: "Simple Architectures",
		source: "Dan Luu",
		url: "https://danluu.com/simple-architectures/",
		note: "How the most reliable systems are built out of the least interesting components.",
		topic: "Engineering",
	},
	{
		title: "The Essential Complexity of High-Performance Systems",
		source: "Dan Luu",
		url: "https://danluu.com/essential-complexity/",
		note: "Every extra moving part is a bet that someone will still understand it in two years.",
		topic: "Engineering",
	},
	{
		title: "Nothing Works",
		source: "Dan Luu",
		url: "https://danluu.com/nothing-works/",
		note: "On the parts of our own infrastructure we barely understand and keep running anyway.",
		topic: "Engineering",
	},
	{
		title: "Bad Decisions",
		source: "Dan Luu",
		url: "https://danluu.com/bad-decisions/",
		note: "Stories of expensive calls that looked reasonable at the time. A good antidote to hindsight.",
		topic: "Engineering",
	},
	{
		title: "The OWASP Top Ten",
		source: "OWASP Foundation",
		url: "https://owasp.org/www-project-top-ten/",
		note: "The list we design against for anything touching auth, payments, or a QR scanner.",
		topic: "Engineering",
	},
	{
		title: "OWASP Cheat Sheet Series",
		source: "OWASP Foundation",
		url: "https://cheatsheetseries.owasp.org/",
		note: "Short, specific, copy-pasteable. Session handling, input validation, and the rest, done properly.",
		topic: "Engineering",
	},
	{
		title: "Falsehoods Programmers Believe About Names",
		source: "Patrick McKenzie",
		url: "https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/",
		note: "Every assumption in here has cost somebody a production incident. Including the two we still make.",
		topic: "Engineering",
	},
	{
		title: "When To Use SQLite",
		source: "SQLite",
		url: "https://www.sqlite.org/whentouse.html",
		note: "The short answer is 'more often than you think'. The list of exceptions is shorter than you expect.",
		topic: "Engineering",
	},
	{
		title: "HTML Living Standard",
		source: "WHATWG",
		url: "https://html.spec.whatwg.org/multipage/",
		note: "The reference we open when a framework's idea of a valid attribute and the browser's disagree.",
		topic: "Engineering",
	},
	{
		title: "Ruby on Rails",
		source: "37signals",
		url: "https://37signals.com/32",
		note: "Why a framework with strong opinions was worth the bet, written years after it was safe to say so.",
		topic: "Engineering",
	},
	{
		title: "Context > Consistency",
		source: "37signals",
		url: "https://37signals.com/36",
		note: "When to break a pattern across a codebase because one site needs to read like the others.",
		topic: "Engineering",
	},

	/* ------------------------------------------------------------------ Design */

	/* ----------------------------------------------------------------- Working */

	/* ---------------------------------------------------------------- Business */

	/* ----------------------------------------------------------------- Writing */

	/* ---------------------------------------------------------------- Thinking */
];

/** Thoughts bucketed by topic, in `topicOrder`, with the order inside each
 *  bucket preserved. Anything tagged with an unknown topic lands in a trailing
 *  "Other" bucket rather than disappearing. */
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
