/**
 * 37signals signals — the numbered catalog that drives the home page and the
 * signal detail pages, mirroring 37signals.com's `.cluster--index` /
 * `.cluster--signal` structure.
 *
 * The labels and bodies are 37signals' own signal titles and text.
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
		content:
			'<p>Welcome. This site is a catalog of ideas — signals — that drive us. We’re best known for making <a href="https://basecamp.com">Basecamp</a>, <a href="https://www.hey.com">HEY</a>, <a href="https://omarchy.org">Omarchy</a> Linux, <a href="https://www.once.com">ONCE</a>, writing business and software books (<a href="https://www.amazon.com/Getting-Real-Smarter-Successful-Application/dp/0578012812">Getting Real</a>, <a href="https://bookshop.org/books/rework-9780307463746/9780307463746">REWORK</a>, <a href="https://bookshop.org/books/remote-office-not-required/9780804137508">REMOTE</a>, <a href="https://bookshop.org/books/it-doesn-t-have-to-be-crazy-at-work/9780062874788">It Doesn’t Have to Be Crazy at Work</a>, and <a href="https://basecamp.com/shapeup">Shape Up</a>), and inventing the <a href="https://rubyonrails.org">Ruby on Rails</a> framework. Click the dot at bottom right to advance, or wander through the numbered list ad hoc. Have fun.</p>',
	},
	{
		num: "01",
		label: "An obligation to independence",
		content:
			"<p>We have no investors, no board of directors, no eyes on an exit. We feel a moral obligation to exercise our independence. To do things no one would give us permission to do. To try things other companies would be afraid to try. To skip safe, and go for original.</p>",
	},
	{
		num: "02",
		label: "Work isn’t war",
		content:
			"<p>Corporate language is filled with metaphors of war. Companies “conquer” the market, they “capture” mindshare, they “target” customers, they employ a sales “force”, they hire “head-hunters”, they “destroy” the competition, they pick their “battles”, and make a “killing”. That’s an awful paradigm and we want nothing to do with it. Work isn’t war. We come in peace.</p>",
	},
	{
		num: "03",
		label: "Small teams",
		content:
			"<p>You can do big things with small teams, but it’s hard to do small things with big teams. And small is often plenty. That’s the power of small — you do what needs to be done rather than overdoing it.</p>",
	},
	{
		num: "04",
		label: "Profit motive",
		content:
			"<p>The tech industry is especially good at losing money. Growth is electric, but profits are elusive. We take an old school, economics 101 approach: Make more than you spend. That’s why we’ve been profitable every year we’ve been in business. It’s the responsible way to be reliable and take care of customers over the long haul.</p>",
	},
	{
		num: "05",
		label: "Err on the side of do",
		content:
			"<p>The tendency to put off, push away, or otherwise delay is strong. No. Act and move on. And act again if you have to — most decisions are temporary, anyway.</p>",
	},
	{
		num: "06",
		label: "Shape Up every six",
		content:
			'<p><a href="https://basecamp.com/shapeup">Shape Up</a> is a methodology we invented to help software teams design, develop, and ship excellent software every six weeks without burning out. Why six? It’s long enough to make meaningful progress, but short enough that you can see the end from the beginning. Plus it gives you about eight chances a year to recalibrate and decide what to work on next. Here’s <a href="https://basecamp.com/shapeup">our free book</a> on it.</p>',
	},
	{
		num: "07",
		label: "We don’t sell you",
		content:
			"<p>They say that if you don’t pay for what you use, then you’re the one that’s for sale. Not here. We don’t sell customer data to anyone, and we don’t use personal information to place targeted advertising either. We make a product, people pay for that product, end of transaction. Our business model is selling products, not selling you.</p>",
	},
	{
		num: "08",
		label: "8/8/8",
		content:
			'<p>8 hours for work, 8 hours for life, 8 hours of sleep. That’s a fair formula. It’s not work/life balance — it’s work/life/sleep balance. A lack of sleep isn’t a badge of honor, it’s a mark of stupidity — literally. Go read Matthew Walker’s <a href="https://bookshop.org/books/why-we-sleep-unlocking-the-power-of-sleep-and-dreams/9781501144325">Why We Sleep</a>.</p>',
	},
	{
		num: "09",
		label: "NOTASAP",
		content:
			"<p>The expectation of immediate response is everywhere. Real-time everything isn’t human-scale, yet that’s how so many work and communicate these days. Not us. We think urgency is overrated, and ASAP is poison. Real-time is the wrong time most of the time.</p>",
	},
	{
		num: "10",
		label: "The Fortune 5,000,000",
		content:
			"<p>Companies are obsessed with battling for huge Fortune 500 customers. That’s boring. We’re more interested in the Fortune 5,000,000 — small and mid-sized companies just like us. They’re underserved, they’re ignored, and they don’t get the respect they deserve. We’re here for them.</p>",
	},
	{
		num: "11",
		label: "Don’t emulate the office",
		content:
			'<p>Work remotely, not locally apart. Don’t just have the same meetings on Zoom, have fewer meetings. Rather than discussing everything in real-time, communicate asynchronously instead. Rather than feel the need to know where everyone is, let go and trust more. Don’t try to emulate the office and everything it stands for — stand against it. We even wrote <a href="https://bookshop.org/books/remote-office-not-required/9780804137508">a book</a> about it.</p>',
	},
	{
		num: "12",
		label: "Hours aren’t equal",
		content:
			"<p>An hour isn’t an hour. It’s a collection of minutes that add up to an hour. And 60 uninterrupted minutes is a higher-quality hour than an hour chopped into four 15-minute sessions. Uninterrupted hours lead to quality time, quality work. Days chunked into tiny blocks of time are a terrible way to work.</p>",
	},
	{
		num: "13",
		label: "On repeat",
		content:
			"<p>If you’re talking about something new or novel, you’ll have to repeat yourself for years before you’re heard.</p>",
	},
	{
		num: "14",
		label: "Meetings aren’t free",
		content:
			"<p>Meetings are the last resort, not the first option. Five people in a room for an hour isn’t a one hour meeting, it’s a five hour meeting. How often was it worth that? Could you have just written it up instead? Be mindful of the costs and tradeoffs.</p>",
	},
	{
		num: "15",
		label: "Bury the hustle",
		content:
			"<p>Hustle mania, hustle porn, the grind, call it what you will. We call it insidious. There’s nothing glamorous about being totally rundown after weeks, months, or years of non-stop whatever-it-takes work. And pumping your mind full of anxiety about whether you’re getting enough, doing enough, or chasing enough is no way to live. Put in a good day’s work, close the damn laptop, and get on with life.</p>",
	},
	{
		num: "16",
		label: "The trap of marginal thinking",
		content:
			"<blockquote>\n<p>If you need a machine and don’t buy it, then you will ultimately find that you have paid for it and don’t have it. (Henry Ford via Clayton Christensen)</p>\n</blockquote>",
	},
	{
		num: "17",
		label: "Politicking",
		content:
			"<p>We respect everyone’s right to participate in political expression and activism, but avoid having political debates on our internal communication systems at work. 37signals as a company does not weigh in on politics publicly, outside of topics directly related to our business.</p>",
	},
	{
		num: "18",
		label: "Two tokens of customer service",
		content:
			'<blockquote>\n<p>When a customer brings a complaint, there are always two tokens on the table: “It’s no big deal” and “It’s the end of the world”. Both tokens are always played, so whoever chooses first forces the other to grab the token that’s left. Don’t force your customer into taking the “It’s the end of the world” one. (<a href="https://world.hey.com/jason/no-big-deal-or-the-end-of-the-world-0b0d8619">Read this story</a>)</p>\n</blockquote>',
	},
	{
		num: "19",
		label: "Pay people, not addresses",
		content:
			"<p>Why do most companies cut your pay if you choose to move from San Francisco to Nashville? Companies hire people, they don’t hire mailing addresses. The same person produces the same work, no matter where they hang their hat. That’s why at 37signals, everyone in the same position gets paid the same, no matter where they live or who they are — anywhere in the world.</p>",
	},
	{
		num: "20",
		label: "Small tech",
		content:
			"<p>Big tech takes. Big tech snoops. Big tech targets. Big tech gouges. Big tech muscles. Big tech tramples. Big tech homogenizes. We’re for small tech.</p>",
	},
	{
		num: "21",
		label: "Know no",
		content: "<p>“No” is no to one thing. “Yes” is no to a lot of things.</p>",
	},
	{
		num: "22",
		label: "Stayups",
		content:
			"<p>The world is obsessed with Startups. We prefer to champion Stayups — companies who’ve proven their worth, figured out their businesses, and strive to stick around for the long term. Companies that endure inspire confidence. Longevity isn’t a fluke. Along those lines, we’re proud that 2025 is our 26th year in business.</p>",
	},
	{
		num: "23",
		label: "Thoughting vs. thinking",
		content:
			"<p>Long-term planning is what you thought. Short-term planning is what you think.</p>",
	},
	{
		num: "24",
		label: "Fixed",
		content:
			"<p>Here’s an easy way to launch on time and on budget: keep them fixed. Don’t throw more time, money, or people at a problem, just scale back the scope.</p>",
	},
	{
		num: "25",
		label: "Disagree and commit",
		content:
			"<p>Consensus is cozy, but broad agreement is not our aim. The right decision is. Which is why we take the time to think, debate, persuade, listen and reconsider and then, someone, decides. If you disagree, that’s fine, but once the decision is made, it’s time to commit and support it completely.</p>",
	},
	{
		num: "26",
		label: "Kick in the face, kick in the ass",
		content:
			"<p>A crisis is a terrible thing to waste. Sometimes events that grind you to a halt are the ones that propel you forward. Adversity helps you grow antifragile.</p>",
	},
	{
		num: "27",
		label: "Broadly speaking",
		content:
			'<p>Between <a href="https://basecamp.com">Basecamp</a> and <a href="https://www.hey.com">HEY</a>, we have paying customers in over 160 countries, and our fully-remote team is spread out across five continents. Our perspective is increasingly global, and intentionally diversified against one worldview, one cultural lens, and one sociopolitical outlook.</p>',
	},
	{
		num: "28",
		label: "Shots on goals",
		content:
			"<blockquote>\n<p>The reason that most of us are unhappy most of the time is that we set our goals — not for the person we’re going to be when we reach them — we set our goals for the person we are when we set them. (Jim Coudal)</p>\n</blockquote>",
	},
	{
		num: "29",
		label: "JOMO not FOMO",
		content:
			"<p>Have you seen? Have you heard? What’s your take on? Can you believe? OMG that tweet. Read that story yet? Seen that video? Finish the second season yet? So much FOMO. We’d rather celebrate JOMO — the Joy of Missing Out. Life’s better when you’re missing the stuff that doesn’t matter anyway.</p>",
	},
	{
		num: "30",
		label: "Miscommunication problems",
		content:
			'<p>Companies don’t have communication problems, they have <a href="https://37signals.com/how-we-communicate">miscommunication problems</a>. The smaller the company, group, or team, the fewer opportunities for miscommunication. As <a href="https://en.wikipedia.org/wiki/Wiio%27s_laws">Osmo Wiio</a> said, “If communication can fail, it will. If a message can be understood in different ways, it will be understood in just that way which does the most harm.”</p>',
	},
	{
		num: "31",
		label: "Easy?",
		content:
			"<p>Easy is a word people use to describe other people’s jobs. Be careful not to assume the things you don’t know, or don’t routinely do, are easy. Would it be fair to call what you do “easy”?</p>",
	},
	{
		num: "32",
		label: "Ruby on Rails",
		content:
			'<p><a href="https://rubyonrails.org">Ruby on Rails</a> was invented here. It’s the free, open-source framework that runs powerhouses like Shopify, Coinbase, GitHub, Airbnb, Kickstarter, Square, Twitch, Basecamp, HEY. In fact, Basecamp is the first Ruby on Rails app ever. Rails continues to launch thousands of programming careers, and has taken companies to millions of users and billions in market valuations.</p>',
	},
	{
		num: "33",
		label: "Planning is guessing",
		content:
			"<p>Plans are guesses. The longer-term the plan, the worse the guess. Replace years with weeks. 3 year plan? Make it a 3 week plan. 10 year plan? 10 week plan. Plan more often, not less often. The nearer-term your plans, the more accurate they’ll be.</p>",
	},
	{
		num: "34",
		label: "Sleep on it",
		content:
			"<p>The end of the day has a way of convincing you what you’ve done is good, but the next morning has a way of telling you the truth. Even if you’re sure, sleep on it.</p>",
	},
	{
		num: "35",
		label: "Companies aren’t families",
		content:
			"<p>When companies say they’re a family, it’s a veiled way of demanding total sacrifice. Nights, weekends, whatever it takes for, you know, “the family”. But great companies aren’t fake families — they’re allies of real families. They don’t eat into people’s personal time, they don’t ask people to dial-in during vacations, and they don’t push them to work Sundays to prep for the meeting on Monday.</p>",
	},
	{
		num: "36",
		label: "Context > consistency",
		content:
			"<p>Following a formula can be comforting, but when it comes to design, we think designing around the current context is better than designing to satisfy prior consistency.</p>",
	},
	{
		num: "37",
		label: "What’s in a name?",
		content:
			'<p>Mankind constantly analyzes radio waves from outer space in the search for extraterrestrial intelligence. Since this analysis started, almost all of the signal sources have been identified. <a href="https://ui.adsabs.harvard.edu/abs/1993ApJ...415..218H/abstract">37 signals</a>, however, remain unexplained.</p>',
	},
];
