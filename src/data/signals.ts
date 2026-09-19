/**
 * Focus Lab signals — the numbered catalog that drives the home page and the
 * signal detail pages, mirroring 37signals.com's `.cluster--index` /
 * `.cluster--signal` structure.
 *
 * The 38 labels below are 37signals' signal titles (short navigational
 * phrases). The `content` bodies are placeholder copy written in the same
 * terse voice — replace them with your own (or the real) text.
 */

export interface Signal {
	num: string;
	label: string;
	content: string;
}

export const signals: Signal[] = [
	{
		num: "00",
		label: "Start here",
		content: `<p>Welcome. This site is a catalog of ideas — signals — that drive how we build and run products. Click the dot at the bottom right to advance, or wander through the numbered list ad hoc. Have fun.</p>`,
	},
	{
		num: "01",
		label: "An obligation to independence",
		content: `<p>Staying independent isn't a preference, it's a responsibility to everyone who depends on us. We answer to customers, not to a board.</p>`,
	},
	{
		num: "02",
		label: "Work isn’t war",
		content: `<p>No armies, no battles, no trenches. Work is something you do, not something you win. Drop the military metaphors and the mindset that comes with them.</p>`,
	},
	{
		num: "03",
		label: "Small teams",
		content: `<p>Small teams move faster, decide better, and stay accountable. Keep them small on purpose — add people only when the work truly demands it.</p>`,
	},
	{
		num: "04",
		label: "Profit motive",
		content: `<p>Profit isn't greed. It's the fuel that keeps a company independent, funds the next bet, and lets you keep your promises without asking permission.</p>`,
	},
	{
		num: "05",
		label: "Err on the side of do",
		content: `<p>When in doubt, do. Deciding late usually costs more than deciding wrong early. Momentum is worth more than a perfect plan.</p>`,
	},
	{
		num: "06",
		label: "Shape Up every six",
		content: `<p>Fixed time, variable scope. Six-week cycles, then a cool-down. No endless projects, no backlogs that grow faster than you can ship.</p>`,
	},
	{
		num: "07",
		label: "We don’t sell you",
		content: `<p>We'd rather earn your business than pressure you into it. No dark patterns, no lock-in, no fine print designed to trap you.</p>`,
	},
	{
		num: "08",
		label: "8/8/8",
		content: `<p>Eight hours of sleep, eight hours of work, eight hours of life. Sustainable beats heroic — every time, over any horizon that matters.</p>`,
	},
	{
		num: "09",
		label: "NOTASAP",
		content: `<p>Everything is not urgent. "As soon as possible" usually means "I didn't plan." Name a real date or admit it can wait.</p>`,
	},
	{
		num: "10",
		label: "The Fortune 5,000,000",
		content: `<p>Small businesses are the real economy. Build for the millions of them, not just the Fortune 500. That's where the durable work is.</p>`,
	},
	{
		num: "11",
		label: "Don’t emulate the office",
		content: `<p>Remote work shouldn't copy the office. Keep the parts that help people do their best work, and drop the theater that never did.</p>`,
	},
	{
		num: "12",
		label: "Hours aren’t equal",
		content: `<p>Not all hours are the same. Protect the ones where real work happens, and stop pretending a calendar full of slots is a day well spent.</p>`,
	},
	{
		num: "13",
		label: "On repeat",
		content: `<p>The best work comes from doing the same thing again and again, a little better each time. Repetition is how craft compounds.</p>`,
	},
	{
		num: "14",
		label: "Meetings aren’t free",
		content: `<p>Every meeting has a cost: the work that didn't happen while you were in it. Spend that budget like it's real money, because it is.</p>`,
	},
	{
		num: "15",
		label: "Bury the hustle",
		content: `<p>Hustle culture is a trap. Consistency and calm outlast burnout. The goal is a long career, not a heroic quarter.</p>`,
	},
	{
		num: "16",
		label: "The trap of marginal thinking",
		content: `<p>Small, sensible trade-offs compound into a worse product. Watch the edges — that's where standards quietly erode.</p>`,
	},
	{
		num: "17",
		label: "Politicking",
		content: `<p>Politics grows where decisions are unclear. Make the call, explain it, and move on. Ambiguity is the soil it feeds on.</p>`,
	},
	{
		num: "18",
		label: "Two tokens of customer service",
		content: `<p>Treat support as a craft, not a cost center. Fast, human answers are a feature — often the one people remember.</p>`,
	},
	{
		num: "19",
		label: "Pay people, not addresses",
		content: `<p>Pay for the work, not the zip code. Location shouldn't set a person's worth or decide who gets to contribute.</p>`,
	},
	{
		num: "20",
		label: "Small tech",
		content: `<p>Small software you own beats big software you rent. Keep the stack humble, the dependencies few, and the exit door open.</p>`,
	},
	{
		num: "21",
		label: "Know no",
		content: `<p>Saying no is the skill. Every yes spends time you can't get back. The default answer to a new idea should be a polite no.</p>`,
	},
	{
		num: "22",
		label: "Stayups",
		content: `<p>The opposite of startups: companies built to last, not to flip. Optimize for decades, not for the next round.</p>`,
	},
	{
		num: "23",
		label: "Thoughting vs. thinking",
		content: `<p>Sharing thoughts isn't thinking. Do the work before you broadcast it. The thinking is the part that takes time.</p>`,
	},
	{
		num: "24",
		label: "Fixed",
		content: `<p>Some things shouldn't be negotiable: time, scope, and the shape of the bet. Fix them up front so the work can vary.</p>`,
	},
	{
		num: "25",
		label: "Disagree and commit",
		content: `<p>Argue fully, then commit fully. Half-hearted execution is the real cost of a decision nobody got behind.</p>`,
	},
	{
		num: "26",
		label: "Kick in the face, kick in the ass",
		content: `<p>Two kinds of feedback: what hurt, and what pushed you forward. Learn from both, and don't confuse honesty with cruelty.</p>`,
	},
	{
		num: "27",
		label: "Broadly speaking",
		content: `<p>Sweeping statements are usually lazy. Get specific. The details are where the truth — and the useful decision — lives.</p>`,
	},
	{
		num: "28",
		label: "Shots on goals",
		content: `<p>Count attempts, not intentions. Progress comes from taking the shot, missing, and taking the next one.</p>`,
	},
	{
		num: "29",
		label: "JOMO not FOMO",
		content: `<p>Joy of missing out. Not every trend is for you. Choosing what to skip is as important as choosing what to build.</p>`,
	},
	{
		num: "30",
		label: "Miscommunication problems",
		content: `<p>Most "communication problems" are really clarity problems. Say what you mean, write it down, and check that it landed.</p>`,
	},
	{
		num: "31",
		label: "Easy?",
		content: `<p>Easy is a trap. The work worth doing is usually the work that's hard. Be suspicious of anything that looks effortless.</p>`,
	},
	{
		num: "32",
		label: "Ruby on Rails",
		content: `<p>Convention over configuration. Boring, sensible defaults that let small teams ship big things without reinventing the basics.</p>`,
	},
	{
		num: "33",
		label: "Planning is guessing",
		content: `<p>Long plans are fiction. Decide what you'll do next, do it, then reassess. The future is too uncertain to schedule in detail.</p>`,
	},
	{
		num: "34",
		label: "Sleep on it",
		content: `<p>Big decisions deserve a night. Momentum is not urgency, and a rested mind makes better calls than a tired one.</p>`,
	},
	{
		num: "35",
		label: "Companies aren’t families",
		content: `<p>Families don't fire each other. Be honest about the relationship: it's a team with a shared goal, and that's enough.</p>`,
	},
	{
		num: "36",
		label: "Context > consistency",
		content: `<p>Rules break under real conditions. Give people context and trust their judgment instead of writing more policy.</p>`,
	},
	{
		num: "37",
		label: "What’s in a name?",
		content: `<p>Names matter less than what you ship. The work earns the name, not the other way around. Pick something and get on with it.</p>`,
	},
];