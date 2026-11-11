/**
 * Podcasts we find useful — Pakistan-focused shows we actually listen to,
 * not our own. Each entry links out to the show. The first entry is featured.
 */

export interface PodcastPick {
	show: string;
	title: string;
	url: string;
	note: string;
}

export const podcasts: PodcastPick[] = [
	{
		show: "COLABS",
		title: "Scalable",
		url: "https://podcasts.apple.com/us/podcast/scalable/id1714965548",
		note: "Startups, founders, and scaling in Pakistan — from COLABS, the country's startup community. The closest thing to our own world.",
	},
	{
		show: "The Pakistan Experience",
		title: "The Pakistan Experience",
		url: "https://podcasts.apple.com/us/podcast/the-pakistan-experience/id1475013650",
		note: "Long-form interviews with Pakistanis at home and abroad — builders, artists, academics, and everyone in between. The country's flagship podcast.",
	},
	{
		show: "Tabadlab",
		title: "Pakistonomy",
		url: "https://podcasts.apple.com/us/podcast/pakistonomy/id1495346477",
		note: "Pakistan's economy and public policy, data-first, from the Tabadlab think tank. The context every pricing decision lives in.",
	},
	{
		show: "Yamna Naveed Khan",
		title: "PTI — Pakistan Tech & Innovation",
		url: "https://podcasts.apple.com/us/podcast/pti-pakistan-tech-innovation/id1547417774",
		note: "Pakistan's tech and innovation scene — startups, policy, and the people building it.",
	},
	{
		show: "Amal Academy",
		title: "Building Pakistan with Benje Williams",
		url: "https://podcasts.apple.com/us/podcast/building-pakistan-with-benje-williams/id1312403611",
		note: "Builders and founders from across Pakistan, in conversation with Amal Academy — how things actually get made here.",
	},
	{
		show: "New Wave Global",
		title: "New Wave Pakistan",
		url: "https://podcasts.apple.com/us/podcast/new-wave-pakistan/id1681499717",
		note: "Conversations with the Pakistanis shaping the country's next wave — where the country is going and who is taking it there.",
	},
];
