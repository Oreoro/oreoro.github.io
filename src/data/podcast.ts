export interface Episode {
	slug: string;
	title: string;
	date: string;
	summary: string;
	body: string[];
}

export const episodes: Episode[] = [
	{
		slug: "why-product-led",
		title: "Why product-led",
		date: "2026-09-16",
		summary:
			"Focus Lab is a product-led studio. We design, build, and run our own software, then partner with a small number of teams to do the same. In this episode we explain what that means and why we chose it.",
		body: [
			"Being product-led means we own the outcome. We ship software, watch how people use it, and fix what does not work. We are not a body shop that bills hours and walks away.",
			"That changes how we work. We keep the studio small, we run the products ourselves, and we only take on a handful of partners at a time. Urbanevents, Workproof, and Muxo are proof of the approach, not side projects.",
			"The constraint is deliberate. Fewer partners means more attention per partner, and running our own products keeps us honest about what shipping actually takes.",
		],
	},
	{
		slug: "building-urbanevents",
		title: "Building Urbanevents",
		date: "2026-09-02",
		summary:
			"Urbanevents handles events and ticketing end to end. We talk through the parts that were harder than expected and the parts we deliberately left out.",
		body: [
			"Ticketing looks simple until you deal with inventory, holds, refunds, and the moment a popular event sells out in seconds. We spent most of the early work on the booking path and the database underneath it.",
			"We run Urbanevents on Cloudflare, Node.js, and PostgreSQL, with Stripe for payments. Keeping the stack boring lets us move quickly and sleep at night.",
			"The harder call was what not to build. We skipped a dozen features that other platforms have. Every one we left out made the core product clearer.",
		],
	},
	{
		slug: "shipping-muxo",
		title: "Shipping Muxo",
		date: "2026-08-19",
		summary:
			"Muxo is one key for the whole stack: web search, scraping, LLM calls, storage, and email behind a single API. This episode is about the design decisions behind it.",
		body: [
			"Muxo started as an internal tool. We were wiring the same few capabilities into every project, so we built one key that covers all of them. Then we realized other teams had the same problem.",
			"We kept the interface small. One key, a short manifest, and a set of named capabilities. The work goes into reliability, not into a long list of options.",
			"Running an AI product means being plain about limits. Models fail, providers change, and costs move. We design for retries and clear errors instead of pretending the stack is stable.",
		],
	},
	{
		slug: "workproof-in-the-open",
		title: "Workproof in the open",
		date: "2026-08-05",
		summary:
			"Workproof is our work and proof tooling. We build it in the open with a small set of partners, and we share what that loop looks like.",
		body: [
			"Workproof came from a simple frustration: it is hard to show what actually happened on a project. We wanted a tool that records the work as it happens, not a report written after the fact.",
			"We build it alongside partners. They use early versions, tell us what is missing, and we ship the next cut. It is a tight loop, and it keeps the product honest.",
			"Building in the open also means saying no in public. Partners see the roadmap and see the tradeoffs. That trust is worth more than a polished launch.",
		],
	},
	{
		slug: "the-stack-we-chose",
		title: "The stack we chose",
		date: "2026-07-22",
		summary:
			"We use Shopify, Cloudflare, Framer, Astro, React, TypeScript, Node.js, PostgreSQL, Stripe, and OpenAI and Anthropic. This episode explains why.",
		body: [
			"Every tool in our stack earns its place. Shopify for commerce, Cloudflare for hosting and edge work, Astro and React for the front end, Node.js and PostgreSQL for the back end.",
			"We pick tools that are stable, well documented, and easy to hand over. A stack you can explain to a partner in an afternoon is worth more than a clever one.",
			"For AI we use OpenAI and Anthropic behind our own interfaces. We keep providers swappable so a model change is a config change, not a rewrite.",
		],
	},
	{
		slug: "working-with-a-small-studio",
		title: "Working with a small studio",
		date: "2026-07-08",
		summary:
			"What does it look like to partner with Focus Lab? We walk through how engagements start, how we scope, and what we expect from each other.",
		body: [
			"Most engagements start with a short conversation about the problem, not the feature list. We want to know what the product has to do and how we will know it works.",
			"We scope in small pieces. Each piece ships, gets used, and informs the next. You see progress early instead of waiting for a big reveal.",
			"We ask partners to stay close. Fast decisions come from direct access to the people who own the outcome, not from layers of handoffs.",
		],
	},
	{
		slug: "designing-for-year-two",
		title: "Designing for the Second Year",
		date: "2026-06-24",
		summary:
			"Launch is the easy part. This episode is about designing for the second year, when the novelty is gone and the product has to hold up.",
		body: [
			"Most products are designed for the first day: the empty state, the onboarding, the demo. The second year is different. Data has piled up, the edge cases are real, and the people using it are no longer patient.",
			"We plan for that early. Naming, permissions, search, and export all matter more after a year of use than they do on launch day. Skipping them is a loan you pay back with interest.",
			"Designing for year two is a constraint, not a feature list. It keeps us from shipping things that only look good in a screenshot.",
		],
	},
	{
		slug: "the-boring-stack",
		title: "The Boring Stack",
		date: "2026-06-10",
		summary:
			"We like boring tools. This episode makes the case for choosing technology you can hand over, debug, and still understand in five years.",
		body: [
			"Boring does not mean outdated. It means proven. A relational database, a typed language, and a host you trust will outlast most of what is trending this year.",
			"Boring tools are easier to hire for, easier to document, and easier to walk away from. When a partner takes over, they inherit something they can read.",
			"We spend our novelty budget on the product, not the plumbing. The interesting part should be what we build, not how obscure the stack is.",
		],
	},
	{
		slug: "working-with-clients",
		title: "Working With Clients",
		date: "2026-05-27",
		summary:
			"Partnership is a two-way deal. We talk about what we need from clients and what they should expect from us, in plain terms.",
		body: [
			"The best work comes from clients who own the outcome. That means one decision maker, direct access, and a willingness to cut scope when the evidence says so.",
			"We are honest about what we will not do. We do not pad timelines, we do not sell hours, and we do not take work we cannot stand behind.",
			"The relationship is small on purpose. A handful of partners at a time means we know the product, the constraints, and the people we are building it for.",
		],
	},
	{
		slug: "pricing-products",
		title: "Pricing Products",
		date: "2026-05-13",
		summary:
			"Pricing is a product decision, not a spreadsheet exercise. This episode covers how we think about it for the software we run.",
		body: [
			"Price is a signal. It tells people who the product is for and what it is worth. Getting it wrong is worse than getting a feature wrong, because it is harder to undo.",
			"We start from the value, not the cost. What does this save or earn for the person paying? Then we pick the simplest model that captures a fair share of that.",
			"We keep pricing legible: few tiers, clear limits, no traps. If a customer cannot explain the bill to themselves, the model is too clever.",
		],
	},
];
