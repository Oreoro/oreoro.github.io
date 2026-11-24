export interface PodcastEpisode {
	title: string;
	url: string;
	note: string;
}

export interface PodcastShow {
	show: string;
	url: string;
	note: string;
	episodes: PodcastEpisode[];
}

export const podcasts: PodcastShow[] = [
	{
		show: "Scalable",
		url: "https://podcasts.apple.com/us/podcast/scalable/id1714965548",
		note: "Startups, founders, and scaling in Pakistan, from COLABS — the closest thing to our own world.",
		episodes: [
			{
				title: "From Private Equity to accelerating Pakistan's startup ecosystem — Omar Shah, Ep. 4",
				url: "https://podcasts.apple.com/us/podcast/from-private-equity-to-accelerating-pakistans-startup/id1714965548?i=1000640030142",
				note: "Where Pakistan's startup capital is actually coming from.",
			},
			{
				title: "Taking Pakistani Fashion to 100+ Global Markets — Arif Iqbal, LAAM, Ep. 3",
				url: "https://podcasts.apple.com/us/podcast/taking-pakistani-fashion-to-100-global-markets-arif/id1714965548?i=1000635684855",
				note: "LAAM's playbook for selling Pakistani fashion abroad.",
			},
			{
				title: "Building a transportation startup with positive unit economics — Maha Shahzad, BusCaro, Ep. 2",
				url: "https://podcasts.apple.com/us/podcast/building-a-transportation-startup-with-positive/id1714965548?i=1000634886420",
				note: "The unit economics of BusCaro, from the founder.",
			},
		],
	},
	{
		show: "The Pakistan Experience",
		url: "https://podcasts.apple.com/us/podcast/the-pakistan-experience/id1475013650",
		note: "Long-form interviews with Pakistanis at home and abroad — the country's flagship podcast.",
		episodes: [
			{
				title: "Content Creation, Influencers and Weight Loss Journey — Baalaaj Khan",
				url: "https://podcasts.apple.com/us/podcast/content-creation-influencers-and-weight-loss-journey/id1475013650?i=1000802042546",
				note: "Baalaaj Khan on the creator economy in Pakistan.",
			},
			{
				title: "Is PTI over? — The history of Youth Politics and the Left — Nadeem Farooq Paracha",
				url: "https://podcasts.apple.com/us/podcast/is-pti-over-the-history-of-youth-politics-and/id1475013650?i=1000801222959",
				note: "Paracha on youth politics — context every Pakistani founder operates in.",
			},
		],
	},
	{
		show: "Pakistonomy",
		url: "https://podcasts.apple.com/us/podcast/pakistonomy/id1495346477",
		note: "Pakistan's economy and public policy, data-first — the context every pricing decision lives in.",
		episodes: [
			{
				title: "Ep 255 — The Rupee is Overvalued",
				url: "https://podcasts.apple.com/us/podcast/ep-255-the-rupee-is-overvalued/id1495346477?i=1000741228586",
				note: "What an overvalued rupee means for importers and exporters.",
			},
			{
				title: "Ep 254 — Unlocking Pakistan's Export Potential",
				url: "https://podcasts.apple.com/us/podcast/ep-254-unlocking-pakistans-export-potential/id1495346477?i=1000737993002",
				note: "What holds Pakistan's exports back, with the numbers.",
			},
			{
				title: "Ep 253 — SECP's Role in Deepening Capital Markets",
				url: "https://podcasts.apple.com/us/podcast/ep-253-secps-role-in-deepening-capital-markets/id1495346477?i=1000730220307",
				note: "How deeper capital markets would fund more startups.",
			},
		],
	},
	{
		show: "Building Pakistan with Benje Williams",
		url: "https://podcasts.apple.com/us/podcast/building-pakistan-with-benje-williams/id1312403611",
		note: "Builders and founders from across Pakistan — how things actually get made here.",
		episodes: [
			{
				title: "E08 — Faisal Edhi & Bilquis Edhi, Edhi Foundation",
				url: "https://podcasts.apple.com/us/podcast/e08-building-pakistan-with-mr-faisal-edhi-ms-bilquis/id1312403611?i=1000398663056",
				note: "Running the world's largest volunteer ambulance network.",
			},
			{
				title: "E07 — Hussain Dawood, Dawood Hercules",
				url: "https://podcasts.apple.com/us/podcast/e07-building-pakistan-with-mr-hussain-dawood-dawood/id1312403611?i=1000397562545",
				note: "Leading a Pakistani conglomerate for decades.",
			},
			{
				title: "E06 — Sultana Siddiqui, HUM Network",
				url: "https://podcasts.apple.com/us/podcast/e06-building-pakistan-with-ms-sultana-siddiqui-hum/id1312403611?i=1000396879827",
				note: "Building HUM Network from the ground up.",
			},
		],
	},
	{
		show: "Karavan Podcast",
		url: "https://podcasts.apple.com/us/podcast/karavan-podcast/id1507906826",
		note: "Amad Mian in conversation with Pakistan's founders — startups from the ground up.",
		episodes: [
			{
				title: "Atif Arif of My Ghar",
				url: "https://podcasts.apple.com/us/podcast/atif-arif-of-my-ghar/id1507906826?i=1000516550659",
				note: "Building My Ghar in Pakistan's housing market.",
			},
			{
				title: "Ali Ahsan of Circle",
				url: "https://podcasts.apple.com/us/podcast/ali-ahsan-of-circle/id1507906826?i=1000513871188",
				note: "Ali Ahsan on building Circle.",
			},
			{
				title: "Usama of Shopsy.pk",
				url: "https://podcasts.apple.com/us/podcast/usama-of-shopsy-pk/id1507906826?i=1000500581774",
				note: "The Shopsy.pk journey, from inside.",
			},
		],
	},
	{
		show: "The Hamza Shoaib Show",
		url: "https://podcasts.apple.com/us/podcast/the-hamza-shoaib-show/id1649978762",
		note: "Real conversations about work, money, and building in Pakistan.",
		episodes: [
			{
				title: "The Realities of Finding Work in Gulf Countries — Ep. 9",
				url: "https://podcasts.apple.com/us/podcast/the-realities-of-finding-work-and-surviving/id1649978762?i=1000613706015",
				note: "What working in the Gulf is actually like for Pakistanis.",
			},
			{
				title: "How Chamber of Commerce Can Help Entrepreneurs — Ep. 50",
				url: "https://podcasts.apple.com/us/podcast/how-chamber-of-commerce-can-help-entrepreneurs-in/id1649978762?i=1000611165901",
				note: "How chambers of commerce actually help founders.",
			},
		],
	},
	{
		show: "SBP Podcast",
		url: "https://podcasts.apple.com/us/podcast/sbp-podcast/id1637628936",
		note: "The State Bank of Pakistan, explaining its own policy in plain language.",
		episodes: [
			{
				title: "Episode 28 — What is Financial Inclusion?",
				url: "https://podcasts.apple.com/us/podcast/episode-28-what-is-financial-inclusion/id1637628936?i=1000650194462",
				note: "The central bank on financial inclusion, from the source.",
			},
			{
				title: "Episode 27 — What is Banking on Equality?",
				url: "https://podcasts.apple.com/us/podcast/episode-27-what-is-banking-on-equality/id1637628936?i=1000648506938",
				note: "The SBP's own explainer on banking on equality.",
			},
			{
				title: "Episode 26 — The December 2023 Monetary Policy Decision",
				url: "https://podcasts.apple.com/us/podcast/episode-26-monetary-policy-decision-on-december-12/id1637628936?i=1000638919171",
				note: "The SBP's read on its own rate decision.",
			},
		],
	},
	{
		show: "Thought Behind Things",
		url: "https://podcasts.apple.com/us/podcast/thought-behind-things/id1532974013",
		note: "Long conversations with Pakistanis on money, careers, and technology.",
		episodes: [
			{
				title: "How an Aga Khan Doctor Built an AI That Detects Disease From a Phone Photo — Dr. Fahad Umer",
				url: "https://podcasts.apple.com/us/podcast/how-an-aga-khan-doctor-built-an-ai-that-detects/id1532974013?i=1000800562696",
				note: "Disease-detection AI from a phone photo.",
			},
			{
				title: "Why Smart Pakistanis Lose Out on Global Jobs (and the 10 Skills That Fix It) — Dr. Sarah Khan",
				url: "https://podcasts.apple.com/us/podcast/why-smart-pakistanis-lose-out-on-global-jobs-and-the/id1532974013?i=1000801211836",
				note: "The ten skills that fix global job prospects.",
			},
		],
	},
	{
		show: "PTI — Pakistan Tech & Innovation",
		url: "https://podcasts.apple.com/us/podcast/pti-pakistan-tech-innovation/id1547417774",
		note: "Pakistan's tech and innovation scene — startups, policy, and the people building it.",
		episodes: [
			{
				title: "PTI — Pakistan Tech & Innovation",
				url: "https://podcasts.apple.com/us/podcast/pti-pakistan-tech-innovation/id1547417774",
				note: "Yamna Naveed Khan in conversation with Pakistan's tech builders.",
			},
		],
	},
	{
		show: "New Wave Pakistan",
		url: "https://podcasts.apple.com/us/podcast/new-wave-pakistan/id1681499717",
		note: "Conversations with the Pakistanis shaping the country's next wave.",
		episodes: [
			{
				title: "Bitcoin: What Is It? How Does It Work? Is It Here to Stay?",
				url: "https://podcasts.apple.com/us/podcast/bitcoin-what-is-it-how-does-it-work-whats-its-worth/id1681499717?i=1000652622877",
				note: "Bitcoin explained — and whether it's here to stay.",
			},
		],
	},
];