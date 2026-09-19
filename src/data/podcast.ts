export interface Episode {
	slug: string;
	title: string;
	date: string;
	summary: string;
	body: string[];
}

export const episodes: Episode[] = [
	{
		slug: "one-way-doors",
		title: "One-way Doors",
		date: "2026-08-26",
		summary:
			"Not every decision deserves a long deliberation. In this episode, co-founders Jason Fried and David Heinemeier Hansson look back on 25 years of running 37signals, the handful of decisions that were truly irreversible, and why keeping a loose grip on most business calls has served them better than any spreadsheet ever could.",
		body: [
			"Most business decisions are two-way doors: walk through, and if you don't like what's on the other side, walk back. Jason and David argue that treating nearly every call this way is what lets 37signals move quickly and try more things, while reserving real deliberation for the rare one-way doors that can't be undone.",
			"Looking back over 25 years, they single out selling a small piece of the company to Jeff Bezos in 2006 as one of the few truly irreversible calls they've made. Even then, the decision came together quickly because it preserved independence rather than trading it away.",
			"The bigger lesson is that the sum of many small, reversible choices matters far more than any single one. Keep the stakes low, let reality tell you whether you were right, and don't linger on the calls that didn't pan out.",
		],
	},
	{
		slug: "competing-with-giants",
		title: "Competing with giants, the end of SaaS & other listener questions",
		date: "2026-08-19",
		summary:
			"Fresh listener questions are on the table this week. Jason Fried and David Heinemeier Hansson tackle whether small builders can realistically compete with industry heavyweights, what the AI agent wave actually means for the future of SaaS, and whether mixing your personal social presence with your business is a smart move or a mistake.",
		body: [
			"You don't beat Google or Apple at their own game. Instead, Jason and David say, find the customers you can serve distinctively and build something tight and just right for them. Differentiate, carve out your own distribution, and lean into everything a small company can do that a giant can't.",
			"On AI and the future of SaaS, they're skeptical of the hype but not dismissive. Replacing entrenched, unloved enterprise software is plausible; replacing a $50-a-month tool that people don't want to build or maintain themselves is a much harder sell. Great software is still about a cohesive idea, not just compiled code.",
			"On personal versus corporate social accounts, both recoil at the idea of a manufactured \"personal brand.\" Just talk about what you're interested in, the way you'd talk to a friend, and skip the engagement formulas.",
		],
	},
	{
		slug: "rapid-fire-q-and-a",
		title: "Rapid Fire Q&A",
		date: "2026-08-12",
		summary:
			"No prep, no filters, just questions. Host Kimberly Rhodes puts Jason Fried and David Heinemeier Hansson on the spot with a fresh round of rapid fire questions covering everything from recent reads and AI discoveries to memorable customer service moments and what they've started or stopped doing to make work better.",
		body: [
			"Jason and David answer off the cuff on the books they're reading, the AI tools that keep surprising them, and the customer service moments that stuck with them. A recurring theme: the best interactions are simple, human, and free of unnecessary friction.",
			"Asked what they've started or stopped doing to improve work, they land on the value of protecting focus and ending the day with a clear head. Their favorite part of a typical week is the final stretch before something ships, when the problems get small and the fixes come fast.",
			"It's a looser, more personal episode, but the through-line is the same one that runs through everything 37signals does: stay curious, keep things simple, and don't overcomplicate the work.",
		],
	},
	{
		slug: "do-it-live",
		title: "We'll do it live",
		date: "2026-08-05",
		summary:
			"Showing off your product in real time, with real customers, changes everything. In this episode, Jason Fried and David Heinemeier Hansson walk through why 37signals has been hosting live demos and Q&A sessions since the Basecamp 5 launch, what makes the format work, and why being accessible and unafraid of your customers is underrated.",
		body: [
			"Since launching Basecamp 5, 37signals has been running live Zoom demos where Jason opens up a real company account and lets customers drive the conversation. There's no script and no recording shared afterward, which keeps the sessions spontaneous and the feedback honest.",
			"David compares it to the idea that you can either out-teach or out-spend your competition. Live demos reveal the tacit knowledge behind how a product is used, and the negative space of everything you deliberately don't do, in a way no marketing page or polished video can.",
			"Underneath it all is a simple stance: don't be afraid of your customers. Show the work, take the hard questions, and let people see the humans behind the product.",
		],
	},
	{
		slug: "whats-the-worst-that-could-happen",
		title: "What's the worst that could happen?",
		date: "2026-07-29",
		summary:
			"Many entrepreneurs spend more time worrying about what could go wrong than actually finding out. In this episode, Jason Fried and David Heinemeier Hansson detail how 37signals approaches experimentation, why lowering the stakes on most decisions leads to better ones, and how letting go of outcomes is both a mental discipline and a business strategy.",
		body: [
			"Instead of trying to pre-validate every idea, 37signals ships something low-fidelity as quickly as it can and lets reality do the judging. Most decisions are reversible, so the goal is to lower the stakes until the choice stops feeling like a big deal.",
			"Founder privilege plays a role: Jason and David answer to customers and each other, not to a board or a boss, so they can act on a hunch without building a defensive case first. They also resist the urge to run postmortems on every little thing, since the lessons are often invented after the fact.",
			"Experiments don't always pan out, and that's fine. Products like Basecamp Breeze didn't last, but the work rolled forward into HEY. The point is to keep moving, make peace with the full range of outcomes, and keep playing.",
		],
	},
	{
		slug: "start-here-onboarding",
		title: "Start Here: Building a better onboarding experience",
		date: "2026-07-22",
		summary:
			"Getting a new customer through the door is one thing, but making sure they understand how things work is another. In this episode, Jason Fried and David Heinemeier Hansson break down how (and why) 37signals redesigned the onboarding experience with their latest version of Basecamp, why onboarding is one of the easiest things to overlook, and what it looks like when founders stay personally connected to that first impression.",
		body: [
			"Onboarding is one of the easiest parts of a product to neglect, because the people who built it rarely see it again. With Basecamp 5, 37signals reworked the experience into a guided, picture-in-picture tour that has new customers play inside a real project before they make their own.",
			"The ideal, Jason says, is to recreate what it would be like to sit next to someone and walk them through the product. The new flow also introduces the people behind Basecamp, with a personal letter from Jason and messages from real team members.",
			"David notes that onboarding is reciprocal: it's one of the few chances to watch customers receive the product and learn what actually lands. That direct exposure to reality is something founders should protect rather than delegate away.",
		],
	},
];
