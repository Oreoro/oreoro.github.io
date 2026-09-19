export interface Policy {
	slug: string;
	title: string;
	intro: string;
	sections: { id: string; heading: string; body: string[] }[];
}

export const policies: Policy[] = [
	{
		slug: "terms",
		title: "Terms of Service",
		intro:
			"When you use any 37signals products or services, you are agreeing to these latest Terms of Service (“Terms”). Violation of these terms may, at our discretion, result in us terminating your account.",
		sections: [
			{
				id: "definitions",
				heading: "Definitions",
				body: [
					"“Company”, “we”, “our”, or “us” in any of our policies or terms, refers to 37signals LLC.",
					"“Services” refers to our websites, including basecamp.com, hey.com, and 37signals.com, and any product created and maintained by 37signals LLC. That includes Basecamp (all versions), HEY, Highrise, Campfire, Backpack, Ta-da List, and Writeboard, whether delivered within a web browser, desktop application, mobile application, or another format.",
					"Finally, “you” or “your” refers to the people or organizations that own an account with one or more of our Services. We have a specific Account Ownership Policy for our products.",
				],
			},
			{
				id: "account-terms",
				heading: "Account Terms",
				body: [
					"You are responsible for maintaining the security of your account and password and for ensuring that any of your users do the same. The Company cannot and will not be liable for any loss or damage from your failure to comply with this security obligation. We recommend all users set up two-factor authentication for added security. In some of our Services, we may require it.",
					"You are responsible for all content posted to and activity that occurs under your account, including content posted by and activity of any users, agents, or bots in your account.",
				],
			},
			{
				id: "payment-refunds-and-plan-changes",
				heading: "Payment, Refunds, and Plan Changes",
				body: [
					"If you are using a free version of one of our Services, it is really free: we do not ask you for your credit card or sell your data.",
					"For paid Services that offer a free trial, we explain the length of trial when you sign up. After the trial period, you need to pay in advance to keep using the Service. If you do not pay, we will freeze your account and it will be inaccessible until you make payment. If your account has been frozen for a while, we will queue it up for auto-cancellation. See our Cancellation Policy for more details.",
					"If you are upgrading from a free plan to a paid plan, we will charge your card immediately and your billing cycle starts on the day of upgrade. For other upgrades or downgrades in plan level, the new rate starts from the next billing cycle.",
					"All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities. Where required, we will collect those taxes on behalf of the taxing authority and remit those taxes to taxing authorities. See our Taxes Policy for more details. Otherwise, you are responsible for payment of all taxes, levies, or duties.",
					"We process refunds according to our Refund Policy.",
				],
			},
			{
				id: "cancellation-and-termination",
				heading: "Cancellation and Termination",
				body: [
					"You are solely responsible for properly canceling your account. You can find instructions for how to cancel your account in our Cancellation Policy. An email or phone request to cancel your account is not automatically considered cancellation. If you need help canceling your account, you can always contact our Support team.",
					"All of your content will be inaccessible from the Services immediately upon account cancellation. Within 30 days, all content will be permanently deleted from active systems and logs. Within 60 days, all content will be permanently deleted from our backups. We cannot recover this information once it has been permanently deleted. If you want to export any data before your account is canceled, we’ve provided instructions for HEY, Basecamp 5, Basecamp 2, Basecamp Classic, Highrise, Campfire, and Backpack.",
					"If you cancel the Service before the end of your current paid up month, your cancellation will take effect immediately, and you will not be charged again. We do not automatically prorate unused time in the last billing cycle. See our Refund Policy for more details.",
					"We reserve the right to suspend or terminate your account and refuse any and all current or future use of our Services for any reason at any time. Suspension means you and any other users on your account will not be able to access the account or any content in the account. Termination will furthermore result in the deletion of your account or your access to your account, and the deletion of all content in your account. We also reserve the right to refuse the use of the Services to anyone for any reason at any time.",
					"Verbal, physical, written or other abuse (including threats of abuse or retribution) of a Company employee or officer will result in immediate account termination.",
				],
			},
			{
				id: "modifications-to-the-service-and-prices",
				heading: "Modifications to the Service and Prices",
				body: [
					"We intend to support our Services Until the End of the Internet as far as it is possible and reasonable to do so. That means when it comes to security, privacy, and customer support, we will continue to maintain any legacy Services. Sometimes it becomes technically impossible to continue a feature or we redesign a part of our Services because we think it could be better or we decide to close new signups of a product. We reserve the right at any time to modify or discontinue, temporarily or permanently, any part of our Services with or without notice.",
					"Sometimes we change the pricing structure for our products. When we do that, we tend to exempt existing customers from those changes. However, we may choose to change the prices for existing customers. If we do so, we will give at least 30 days notice and will notify you via the email address on record. We may also post a notice about changes on our websites or the affected Services themselves.",
				],
			},
			{
				id: "uptime-security-and-privacy",
				heading: "Uptime, Security, and Privacy",
				body: [
					"Your use of the Services is at your sole risk. We provide these Services on an “as is” and “as available” basis. We do not offer service-level agreements, but do take uptime of our applications seriously. Visit 37status.com to see the status of our Services.",
					"We reserve the right to temporarily disable your account if your usage significantly exceeds the average usage of other customers of the Services. We’ll reach out to the account owner before taking any action except in rare cases where the level of use may negatively impact the performance of the Service for other customers.",
					"We take many measures to protect and secure your data through backups, redundancies, and encryption. We enforce encryption for data transmission from the public Internet. There are some edge cases where we may send your data through our network unencrypted. Please refer to our Security Overview for full details and our Security Response page for how to report a security incident or threat.",
					"You agree that 37signals may process your data as described in our Privacy Policy and for no other purpose. On rare occasion, our staff may access your data for the following reasons:",
					"To help you with support requests you make. We’ll ask for express consent before accessing your account.",
					"On the rare occasions when an error occurs that stops an automated process partway through. We get automated alerts when such errors occur. When we can fix the issue and restart automated processing without looking at any personal data, we do. In rare cases, we have to look at a minimum amount of personal data to fix the issue.",
					"To safeguard 37signals. We’ll look at logs and metadata as part of our work to ensure the security of your data and the Services as a whole. If necessary, we may also access accounts as part of an abuse report investigation.",
					"To the extent required by applicable law. As a U.S. company with its main data infrastructure located in the US, we only preserve or share customer data if compelled by a U.S. government authority with a legally binding order or proper request under the Stored Communications Act, or in limited circumstances in the event of an emergency request. If a non-U.S. authority approaches 37signals for assistance, our default stance is to refuse unless the order has been approved by the U.S. government, which compels us to comply through procedures outlined in an established mutual legal assistance treaty or agreement mechanism. If 37signals is audited by a tax authority, we only share the bare minimum billing information needed to complete the audit.",
					"We use third party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Services. You can see a list of all subprocessors who handle personal data for Basecamp, HEY, Highrise, Campfire, and Backpack, as well as a list of Company Processors.",
					"Under the California Consumer Privacy Act (“CCPA”), 37signals is a “service provider”, not a “business” or “third party”, with respect to your use of the Services. That means we process any data you share with us only for the purpose you signed up for and as described in these Terms, the Privacy Policy, and other policies. We do not retain, use, disclose, or sell any of that information for any other commercial purposes unless we have your explicit permission. Similarly, you agree to comply with your requirements under the CCPA and not use Basecamp’s Services in a way that violates the regulations.",
					"These Terms incorporate the 37signals Data Processing Addendum (“DPA”) when the EU General Data Protection Regulation (“GDPR”) or United Kingdom General Data Protection Regulation (“UK GDPR”) applies to your use of 37signals Services to process Customer Data as defined in the DPA. The DPA linked above supersedes any previously agreed data processing addendum between you and 37signals LLC relating to your use of the 37signals Services.",
				],
			},
			{
				id: "copyright-and-content-ownership",
				heading: "Copyright and Content Ownership",
				body: [
					"All content posted on the Services must comply with U.S. copyright law. We provide details on how to file a copyright infringement claim.",
					"You give us a limited license to use the content posted by you and your users in order to provide the Services to you, but we claim no ownership rights over those materials. All materials you submit to the Services remain yours.",
					"We do not pre-screen content, but we reserve the right (but not the obligation) in our sole discretion to refuse or remove any content that is available via the Service.",
					"The Company or its licensors own all right, title, and interest in and to the Services, including all intellectual property rights therein, and you obtain no ownership rights in the Services as a result of your use. You may not duplicate, copy, or reuse any portion of the HTML, CSS, JavaScript, or visual design elements without express written permission from the Company. You must request permission to use the Company’s logos or any Service logos for promotional purposes. Please email us requests to use logos. We reserve the right to rescind any permissions if you violate these Terms.",
					"You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Services, use of the Services, or access to the Services without the express written permission of the Company.",
				],
			},
			{
				id: "services-adaptations-and-api-terms",
				heading: "Services Adaptations and API Terms",
				body: [
					"We offer Application Program Interfaces (“API”s) for some of our Services (currently Basecamp, Highrise, Campfire, and Backpack). Any use of the API, including through a third-party product that accesses the Services, is bound by these Terms plus the following specific terms:",
					"You expressly understand and agree that we are not liable for any damages or losses resulting from your use of the API or third-party products that access data via the API.",
					"Third parties may not access and employ the API if the functionality is part of an application that remotely records, monitors, or reports a Service user’s activity other than time tracking, both inside and outside the applications. The Company, in its sole discretion, will determine if an integration service violates this bylaw. A third party that has built and deployed an integration for the purpose of remote user surveillance will be required to remove that integration.",
					"Abuse or excessively frequent requests to the Services via the API may result in the temporary or permanent suspension of your account’s access to the API. The Company, in its sole discretion, will determine abuse or excessive usage of the API. If we need to suspend your account’s access, we will attempt to warn the account owner first. If your API usage could or has caused downtime, we may cut off access without prior notice.",
					"Some third-party providers have created integrations between our Services and theirs. You can find some of those integrations for Basecamp at basecamp.com/extras and for Highrise at highrisehq.com/extras. We are not liable or accountable for any of these third-party integrations.",
				],
			},
			{
				id: "liability",
				heading: "Liability",
				body: [
					"You agree that the Company is not liable to you or to any third party for damages of any kind that result from the use of the Services, in ability to access data, or unauthorized access of your data or account. The Company is also not liable for damages of any kind related to actions of any third party that uses the Services, or any other consequences related to the Terms or Services.",
					"If you have a question about any of these Terms, please contact our Support team.",
				],
			},
		],
	},
	{
		slug: "privacy",
		title: "Privacy Policy",
		intro:
			"In this policy, we lay out: what data we collect and why; how your data is handled; and your rights with respect to your data. We never sell your data.",
		sections: [
			{
				id: "what-we-collect-and-why",
				heading: "What we collect and why",
				body: [
					"Our guiding principle is to collect only what we need. Here’s what that means in practice:",
					"Identity and access",
					"When you sign up for a 37signals product, we ask for identifying information such as your name, email address, and maybe a company name. That’s so you can personalize your new account, and we can send you product updates and other essential information. We may also send you optional surveys from time to time to help us understand how you use our products and to make improvements. With your consent, we will send you our newsletter and other updates. We sometimes also give you the option to add a profile picture that displays in our products.",
					"We’ll never sell your personal information to third parties, and we won’t use your name or company in marketing statements without your permission either.",
					"Billing information",
					"If you sign up for a paid 37signals product, you will be asked to provide your payment information and billing address. Credit card information is submitted directly to our payment processor and doesn’t hit 37signals servers. We store a record of the payment transaction, including the last 4 digits of the credit card number, for purposes of account history, invoicing, and billing support. We store your billing address so we can charge you for service, calculate any sales tax due, send you invoices, and detect fraudulent credit card transactions. We occasionally use aggregate billing information to guide our marketing efforts.",
					"Product interactions",
					"We store on our servers the content that you upload or receive or maintain in your 37signals product accounts. This is so you can use our products as intended, for example, to create projects in Basecamp or to receive email in HEY. We keep this content as long as your account is active. If you delete your account, we’ll delete the content within 60 days.",
					"General Geolocation data",
					"For most of our products, we log the full IP address used to sign up a product account and retain that for use in mitigating future spammy signups. We also log all account access by full IP address for security and fraud prevention purposes, and we keep this login data for as long as your product account is active.",
					"Website interactions",
					"We collect information about your browsing activity for analytics and statistical purposes such as conversion rate testing and experimenting with new product designs. This includes, for example, your browser and operating system versions, your IP address, which web pages you visited and how long they took to load, and which website referred you to us. If you have an account and are signed in, these web analytics data are tied to your IP address and user account until your account is no longer active. The web analytics we use are described further in the Advertising and Cookies section.",
					"Anti-bot assessments",
					"We use CAPTCHA across our applications to mitigate brute force logins and as a means of spam protection. We have a legitimate interest in protecting our apps and the broader Internet community from credential stuffing attacks and spam. When you log into your 37signals accounts and when you fill in certain forms in HEY, the CAPTCHA service evaluates various information (e.g., IP address, how long the visitor has been on the app, mouse movements) to try to detect if the activity is from an automated program instead of a human. The CAPTCHA service then provides 37signals with the spam score results; we do not have access to the evaluated information.",
					"Advertising and Cookies",
					"37signals occasionally runs ads on various third-party platforms such as Google. Users who click on one of our ads will be sent to the Basecamp marketing site. Where permissible under law, we may load an ad-company script on their browsers that sets a third-party cookie and sends information to the ad network to enable evaluation of the effectiveness of our ads, e.g., which ad they clicked and which keyword triggered the ad, and whether they performed certain actions such as clicking a button or submitting a form.",
					"We also use persistent first-party cookies and some third-party cookies to store certain preferences, make it easier for you to use our applications, and perform A/B testing as well as support some analytics.",
					"A cookie is a piece of text stored by your browser. It may help remember login information and site preferences. It might also collect information such as your browser type, operating system, web pages visited, duration of visit, content viewed, and other click-stream data. You can adjust cookie retention settings and accept or block individual cookies in your browser settings, although our apps won’t work and other aspects of our service may not function properly if you turn cookies off.",
					"Voluntary correspondence",
					"When you email 37signals with a question or to ask for help, we keep that correspondence, including your email address, so that we have a history of past correspondence to reference if you reach out in the future.",
					"We also store information you may volunteer, for example, written responses to surveys. If you agree to a customer interview, we may ask for your permission to record the conversation for future reference or use. We will only do so with your express consent.",
					"How we approach mobile app permissions",
					"We offer optional desktop and mobile apps for some of our products. Because of how the platforms are designed, our apps typically must request your consent before accessing contacts, calendar, camera, and other privacy-sensitive features of your device. Consent is always optional and our apps will function without it, though some features may be unavailable.",
				],
			},
			{
				id: "when-we-access-or-disclose-your-information",
				heading: "When we access or disclose your information",
				body: [
					"To provide products or services you’ve requested. We use some third-party subprocessors to help run our applications and provide the Services to you. You can view the third-party subprocessors we use for each of our products: Basecamp, HEY, Highrise, Campfire, Backpack. We also use third-party processors for other business functions such as managing newsletter subscriptions, sending customer surveys, and providing our company storefront. You can view the list at Company Processors.",
					"We may disclose your information at your direction if you integrate a third-party service into your use of our products. For example, we may allow you, at your option, to connect your Gmail account to your HEY account so that you can use HEY to receive and respond to your Gmail email. Email that you receive and respond to through HEY from your Gmail address will be stored by both HEY and Google and will be available to you from your Gmail account as well as your HEY account.",
					"No 37signals human looks at your content except for limited purposes with your express permission, for example, if an error occurs that stops an automated process from working and requires manual intervention to fix. These are rare cases, and when they happen, we look for root cause solutions as much as possible to avoid them recurring. We may also access your data if required in order to respond to legal process (see “When required under applicable law” below).",
					"To exclude you from seeing our ads. Where permissible by law and if you have a Basecamp account, we may disclose a one-way hash of your email address with ad companies to exclude you from seeing our ads.",
					"To help you troubleshoot or squash a software bug, with your permission. If at any point we need to access your content to help you with a support case, we will ask for your consent before proceeding.",
					"To investigate, prevent, or take action regarding restricted uses. Accessing a customer’s account when investigating potential abuse is a measure of last resort. We want to protect the privacy and safety of both our customers and the people reporting issues to us, and we do our best to balance those responsibilities throughout the process. If we discover you are using our products for a restricted purpose, we will take action as necessary, including notifying appropriate authorities where warranted.",
					"Aggregated and de-identified data. We may aggregate and/or de-identify information collected through the services. We may use de-identified or aggregated data for any purpose, including marketing or analytics.",
					"When required under applicable law. 37signals is a U.S. company with its main data infrastructure located in the U.S.",
					"Requests for user data. Our policy is to not respond to government requests for user data unless we are compelled by legal process or in limited circumstances in the event of an emergency request. However, if U.S. law enforcement authorities have the necessary warrant, criminal subpoena, or court order requiring us to disclose data, we must comply. Likewise, we will only respond to requests from government authorities outside the U.S. if compelled by the U.S. government through procedures outlined in a mutual legal assistance treaty or agreement. It is 37signals’ policy to notify affected users before we disclose data unless we are legally prohibited from doing so, and except in some emergency cases.",
					"Preservation requests. Similarly, 37signals’ policy is to comply with requests to preserve data only if compelled by the U.S. Federal Stored Communications Act, 18 U.S.C. Section 2703(f), or by a properly served U.S. subpoena for civil matters. We do not disclose preserved data unless required by law or compelled by a court order that we choose not to appeal. Furthermore, unless we receive a proper warrant, court order, or subpoena before the required preservation period expires, we will destroy any preserved copies of customer data at the end of the preservation period.",
					"If we are audited by a tax authority, we may be required to disclose billing-related information. If that happens, we will disclose only the minimum needed, such as billing addresses and tax exemption information.",
					"Finally, if 37signals is acquired by or merges with another company — we don’t plan on that, but if it happens — we’ll notify you well before any of your personal information is transferred or becomes subject to a different privacy policy.",
				],
			},
			{
				id: "artificial-intelligence",
				heading: "Artificial intelligence",
				body: [
					"Our products don’t include built-in AI features that process your content, and we don’t use your content to train AI models. The AI providers we work with are also contractually prohibited from training their models on your content.",
					"We do use AI assistant tools from providers such as Anthropic and OpenAI internally, to help our own staff with work like writing and reviewing software. Because these tools may process personal data in the course of operating our services, we list them as subprocessors and hold them to the same GDPR-compliant data processing agreements as every other subprocessor. They are not part of the products themselves and do not operate on your content.",
					"Some of our products can be used with AI agents that you bring yourself — for example, by connecting your own agent to Basecamp through the command line. When you do, the agent acts with your own account’s permissions and under your own agreement with your AI provider.",
				],
			},
			{
				id: "your-rights-with-respect-to-your-information",
				heading: "Your rights with respect to your information",
				body: [
					"At 37signals, we strive to apply the same data rights to all customers, regardless of their location. Some of these rights include:",
					"Right to Know. You have the right to know what personal information is collected, used, shared or sold. We outline both the categories and specific bits of data we collect, as well as how they are used, in this privacy policy.",
					"Right of Access. This includes your right to access the personal information we gather about you, and your right to obtain information about the sharing, storage, security and processing of that information.",
					"Right to Correction. You have the right to request correction of your personal information.",
					"Right to Erasure / “To Be Forgotten”. This is your right to request, subject to certain limitations under applicable law, that your personal information be erased from our possession and, by extension, from all of our service providers. Fulfillment of some data deletion requests may prevent you from using 37signals services because our applications may then no longer work. In such cases, a data deletion request may result in closing your account.",
					"Right to Complain. You have the right to make a complaint regarding our handling of your personal information with the appropriate supervisory authority.",
					"Right to Restrict Processing. This is your right to request restriction of how and why your personal information is used or processed, including opting out of sale of your personal information. (Again: we never have and never will sell your personal data.)",
					"Right to Object. You have the right, in certain situations, to object to how or why your personal information is processed.",
					"Right to Portability. You have the right to receive the personal information we have about you and the right to transmit it to another party. If you want to export data from your accounts, you can do so directly by following these instructions for HEY, Basecamp 5, Basecamp 2, Basecamp Classic, Highrise, Campfire, and Backpack.",
					"Right to not Be Subject to Automated Decision-Making. You have the right to object to and prevent any decision that could have a legal or similarly significant effect on you from being made solely based on automated processes. This right is limited if the decision is necessary for performance of any contract between you and us, is allowed by applicable law, or is based on your explicit consent.",
					"Right to Non-Discrimination. We do not and will not charge you a different amount to use our products, offer you different discounts, or give you a lower level of customer service because you have exercised your data privacy rights. However, the exercise of certain rights may, by virtue of your exercising those rights, prevent you from using our Services.",
					"Many of these rights can be exercised by signing in and updating your account information. Please note that certain information may be exempt from such requests under applicable law. For example, we need to retain certain information in order to provide our services to you.",
					"In some cases, we also need to take reasonable steps to verify your identity before responding to a request, which may include, at a minimum, depending on the sensitivity of the information you are requesting and the type of request you are making, verifying your name and email address. If we are unable to verify you, we may be unable to respond to your requests. If you have questions about exercising these rights or need assistance, please contact us at privacy@37signals.com or at 37signals LLC, 137 N. Oak Park Avenue, Suite 208, Oak Park, IL 60301 USA. If an authorized agent is corresponding on your behalf, we will need written consent with a signature from the account holder before proceeding.",
					"Depending on applicable law, you may have the right to appeal our decision to deny your request, if applicable. We will provide information about how to exercise that right in our response denying the request. You also have the right to lodge a complaint with a supervisory authority. If you are in the EU or UK, you can contact your data protection authority to file a complaint or learn more about local privacy laws.",
				],
			},
			{
				id: "how-we-secure-your-data",
				heading: "How we secure your data",
				body: [
					"All data is encrypted via SSL/TLS when transmitted from our servers to your browser. The database backups are also encrypted. In addition, we go to great lengths to secure your data at rest. For more information about how we keep your information secure, please review our Security Overview.",
					"With regard to products other than HEY, most data are not encrypted while they live in our database (since they need to be ready to send to you when you need them). With HEY, we go further by encrypting the database at-work. Every field containing personal data is encrypted with its own key. The disks storing the data keys are encrypted as well. Our servers decrypt the data to send it to you when you need it. You can learn more about our approach to security for HEY at hey.com/security.",
				],
			},
			{
				id: "what-happens-when-you-delete-content-in-your-product-accounts",
				heading: "What happens when you delete content in your product accounts",
				body: [
					"In many of our applications, we give you the option to trash content. Anything you trash in your product accounts while they are active will be kept in an accessible trash can for about 25 days (it varies a little by product). After that time, the trashed content cannot be accessed via the application and we are not able to retrieve it for you. The trashed content may remain on our active servers for another 30 days, and copies of the content may be held in backups of our application databases for up to another 30 days after that. Altogether, any content trashed in your product accounts should be purged from all of our systems and logs within 90 days.",
					"If you choose to cancel your account, your content will become immediately inaccessible and should be purged from our systems in full within 60 days. This applies both for cases when an account owner directly cancels and for auto-canceled accounts. Please refer to our Cancellation Policy for more details.",
				],
			},
			{
				id: "data-retention",
				heading: "Data retention",
				body: [
					"We keep your information for the time necessary for the purposes for which it is processed. The length of time for which we retain information depends on the purposes for which we collected and use it and your choices, after which time we may delete and/or aggregate it. We may also retain and use this information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. Through this policy, we have provided specific retention periods for certain types of information.",
				],
			},
			{
				id: "location-of-site-and-data",
				heading: "Location of site and data",
				body: [
					"Our products and other web properties are primarily housed in the United States. If you are located in the European Union, UK, or elsewhere outside of the United States, please be aware that any information you provide to us will be transferred to and stored in the United States. By using our websites or Services and/or providing us with your personal information, you consent to this transfer.",
				],
			},
			{
				id: "when-transferring-personal-data-from-the-eu",
				heading: "When transferring personal data from the EU",
				body: [
					"The European Data Protection Board (EDPB) has issued guidance that personal data transferred out of the EU must be treated with the same level of protection that is granted under EU privacy law. UK law provides similar safeguards for UK user data that is transferred out of the UK. Accordingly, 37signals has adopted a data processing addendum with Standard Contractual Clauses to help ensure this protection. 37signals’ DPA is available as a PDF, HTML, or Markdown.",
					"There are also a few ad hoc cases where EU personal data may be transferred to the U.S. in connection with 37signals operations, for instance, if an EU user signs up for our newsletter or participates in one of our surveys or buys swag from our company online store. Such transfers are only occasional and data is transferred under the Article 49(1)(b) derogation under GDPR and the UK version of GDPR.",
				],
			},
			{
				id: "changes-and-questions",
				heading: "Changes and questions",
				body: [
					"We may update this policy as needed to comply with relevant regulations and reflect any new practices. If we make significant changes, we will refresh the date at the top of this page and notify users who have signed up to our policy updates mailing list.",
					"Have any questions, comments, or concerns about this privacy policy, your data, or your rights with respect to your information? Please get in touch by emailing us at privacy@37signals.com.",
				],
			},
		],
	},
	{
		slug: "cancellation",
		title: "Cancellation Policy",
		intro:
			"We want satisfied customers, not hostages. That’s why we make it easy for you to cancel your account directly in all of our products.",
		sections: [
			{
				id: "what-happens-when-you-cancel-an-account",
				heading: "What happens when you cancel an account?",
				body: [
					"Except for paid HEY accounts, you won’t be able to access your account once you cancel, so make sure you download everything you want to keep beforehand. If you have a paid HEY account, you can cancel your subscription and keep using your account until your paid period expires. Then the account will be automatically canceled and will become inaccessible. You can also choose to cancel your account earlier.",
					"We’ll permanently delete the content in your account from our servers 30 days after cancellation, and from our backups within 60 days. Retrieving content for a single account from a backup isn’t possible, so if you change your mind you’ll need to do it within the first 30 days after cancellation. Content can’t be recovered once it has been permanently deleted.",
					"We won’t bill you again once you cancel. We don’t automatically prorate any unused time you may have left but if you haven’t used your account in months or just started a new billing cycle, contact us for a fair refund. We’ll treat you right.",
				],
			},
			{
				id: "37signals-initiated-cancellations",
				heading: "37signals-initiated cancellations",
				body: [
					"We may cancel accounts if they have been inactive for an extended period:",
					"For trial accounts:",
					"For HEY: 60 days after a trial has expired without being upgraded",
					"For other services: 30 days after a trial has expired without being upgraded",
					"For frozen accounts: 180 days after being frozen due to billing failures",
					"For free accounts: after 365 days of inactivity",
					"We also retain the right to suspend or terminate accounts for any reason at any time, as outlined in our Terms of Service.",
				],
			},
		],
	},
	{
		slug: "refund",
		title: "Refund Policy",
		intro:
			"If you’re ever unhappy with any 37signals Services or products for any reason, contact our support team.",
		sections: [
			{
				id: "hey-for-you",
				heading: "HEY for You",
				body: [
					"With HEY for You, we sell subscriptions on an annual basis only. If you pay for a year of HEY for You and then cancel before the year is up, we make sure you aren’t charged in the future. Your account will be accessible until your paid period ends. After that, your account will become inaccessible but your data will stay safe with us for 60 days. That gives you time to migrate to a new provider, export your data, configure outbound forwarding if you’d like, and change any logins that use your HEY email address. After 60 days, we’ll permanently delete all data from the account except for your credentials, backup email address, 2FA info and outbound forwarding configuration if any. We keep this in case you’d like to reopen your account in the future and to keep outbound forwarding working. You can also choose to delete your account completely, which would also stop any outbound forwarding. For more details, please read our Cancellation Policy.",
					"Here are examples of refunds for HEY for You we’d grant:",
					"You decided HEY wasn’t for you and stopped using it early on but forgot to cancel your account. Then you got the auto-renewal invoice. If you don’t need any extra time to migrate and you don’t need outbound forwarding, let us know and we’ll refund that last payment.",
					"You decide HEY isn’t for you and you finish downloading your data and changing logins so that you don’t need outbound forwarding or keeping your account open well ahead of the end of your paid period. Let us know and we’ll refund back a prorated amount for the remaining whole months.",
					"If you were really not happy with HEY, you can have your money back.",
					"We’ll also consider giving credits for future billing cycles if something goes wrong on our side. For example, if we had extended downtime (multiple hours in a day, or multiple days in a month) or you emailed customer service and it took multiple days to get back to you, we’ll issue a partial credit to your account.",
					"If you cancel and request a refund within the first year, your @hey.com email address will be recycled 30 days after account cancellation and made available to someone else. That’s true for full refunds and prorated refunds, but doesn’t apply for valid consumption tax refunds.",
				],
			},
			{
				id: "hey-for-domains",
				heading: "HEY for Domains",
				body: [
					"HEY for Domains subscriptions are paid on a monthly basis for each user (manager, co-worker) within an account. But we know that change happens, folks join or move on, and sometimes cleaning up email addresses that may no longer be needed might accidentally slip through the cracks.",
					"Here are examples of refunds for HEY for Domains we’d grant:",
					"If you were just charged for the next month of service but you meant to cancel, we’re happy to refund that extra charge.",
					"If you forgot to remove a user from the account a couple months ago, we’ll give you a full refund for a few back months. The email address for a removed user can be re-used later in your account.",
					"If you tried out HEY for Domains for your organization for a couple months and you just weren’t happy with it, you can have your money back.",
				],
			},
			{
				id: "basecamp-highrise-and-other-products",
				heading: "Basecamp, Highrise and other products",
				body: [
					"Examples of full refunds we’d grant:",
					"If you were just charged for your next month of service but you meant to cancel, we’re happy to refund that extra charge.",
					"If you forgot to cancel your account a couple months ago and you haven’t used it since then, we’ll give you a full refund for a few back months.",
					"If you tried one of our products for a couple months and you just weren’t happy with it, you can have your money back.",
					"Examples of partial refunds or credits we’d grant:",
					"If you forgot to cancel your account a year ago, and there’s been activity on your account since then, we’ll review your account usage and figure out a partial refund based on how many months you used it.",
					"If you upgraded your account a few months ago to a higher plan and kept using it in general but you didn’t end up using the extra features, projects, or storage space, we’d consider applying a prorated credit towards future months.",
					"If we had extended downtime (multiple hours in a day, or multiple days in a month) or you emailed customer service and it took multiple days to get back to you, we’d issue a partial credit to your account.",
				],
			},
		],
	},
	{
		slug: "security",
		title: "Security Overview",
		intro: "",
		sections: [
			{
				id: "we-protect-your-data",
				heading: "We protect your data",
				body: [
					"All data are written to multiple disks instantly, backed up daily, and stored in multiple locations. Files that our customers upload are stored on servers that use modern techniques to remove bottlenecks and points of failure.",
				],
			},
			{
				id: "your-data-are-sent-using-https",
				heading: "Your data are sent using HTTPS",
				body: [
					"Whenever your data are in transit between you and us, everything is encrypted, and sent using HTTPS. Within our firewalled private networks, data may be transferred unencrypted.",
					"Any files which you upload to us are stored and are encrypted at rest. Our application databases are generally not encrypted at rest — the information you add to the applications is active in our databases and subject to the same protection and monitoring as the rest of our systems. Our database backups are encrypted using GPG.",
				],
			},
			{
				id: "full-redundancy-for-all-major-systems",
				heading: "Full redundancy for all major systems",
				body: [
					"Our servers — from power supplies to the internet connection to the air purifying systems — operate at full redundancy. Our systems are engineered to stay up even if multiple servers fail.",
				],
			},
			{
				id: "sophisticated-physical-security",
				heading: "Sophisticated physical security",
				body: [
					"Our state-of-the-art servers are protected by biometric locks and round-the-clock interior and exterior surveillance monitoring. Only authorized personnel have access to the data center. 24/7/365 onsite staff provides additional protection against unauthorized entry and security breaches.",
				],
			},
			{
				id: "regularly-updated-infrastructure",
				heading: "Regularly-updated infrastructure",
				body: [
					"Our software infrastructure is updated regularly with the latest security patches. Our products run on a dedicated network which is locked down with firewalls and carefully monitored. While perfect security is a moving target, we work with security researchers to keep up with the state-of-the-art in web security.",
				],
			},
			{
				id: "we-protect-your-billing-information",
				heading: "We protect your billing information",
				body: [
					"All credit card transactions are processed using secure encryption—the same level of encryption used by leading banks. Card information is transmitted, stored, and processed securely on a PCI-Compliant network. Our current PCI DSS Certificate of Compliance (PDF), issued by SecurityMetrics on our SAQ A self-assessment, is renewed annually.",
				],
			},
			{
				id: "constant-monitoring",
				heading: "Constant monitoring",
				body: [
					"We have a team dedicated to maintaining your account’s security on our systems and monitoring tools we’ve set up to alert us to any nefarious activity against our domains. To date, we’ve never had a data breach.",
					"We also audit internal data access. If a 37signals employee wrongly accesses customer data, they will face penalties ranging from termination to prosecution. Again, to our knowledge, this hasn’t happened.",
					"We have processes and defenses in place to keep our streak of 0 data breaches going. But in the unfortunate circumstances someone malicious does successfully mount an attack, we will immediately notify all affected customers.",
				],
			},
			{
				id: "want-to-know-more",
				heading: "Want to know more?",
				body: [
					"We’ve got several pages of additional details in our security overview for you. For HEY, our email service, we have also a dedicated page. Go to hey.com/security to learn more.",
				],
			},
			{
				id: "standardized-security-questionnaires",
				heading: "Standardized security questionnaires",
				body: [
					"For vendor security reviews, we publish our completed CSA Consensus Assessments Initiative Questionnaire (CAIQ) v4.1, also available as a PDF. It answers all 283 questions of the Cloud Security Alliance’s Cloud Controls Matrix v4.1 as a self-assessment. For higher-education reviews, we publish our completed EDUCAUSE Higher Education Community Vendor Assessment Toolkit (HECVAT) 4, also available as a PDF, a CSV, and the filled official workbook. Need a copy of our DPA or another questionnaire completed for your review? Email our Security team.",
				],
			},
			{
				id: "have-a-concern-need-to-report-an-incident",
				heading: "Have a concern? Need to report an incident?",
				body: [
					"Have you noticed abuse, misuse, an exploit, or experienced an incident with your account? Please visit our Security Response page for details on how to securely submit a report.",
				],
			},
		],
	},
	{
		slug: "accessibility",
		title: "Basecamp Accessibility",
		intro:
			"Basecamp is for everyone, whatever their abilities and whatever tools they rely on. We design, build, and test new features with accessibility in mind from the beginning. WCAG 2.2 AA is the standard we aspire to.",
		sections: [
			{
				id: "accessibility-conformance-report",
				heading: "Accessibility Conformance Report",
				body: [
					"Read the Basecamp Accessibility Conformance Report (PDF). Last updated: June 2025.",
					"Our Accessibility Conformance Report (ACR) is an honest scorecard of how Basecamp (including the web app, the iOS and Android apps, and our documentation) does against the main accessibility standards, based on our own testing, not a third-party audit.",
					"We follow the standard VPAT® 2.4Rev (International Edition) format and cover:",
					"WCAG 2.0 and 2.1, Levels A and AA",
					"Section 508 (U.S.)",
					"EN 301 549 (E.U.)",
				],
			},
			{
				id: "questions-or-issues",
				heading: "Questions or issues?",
				body: [
					"Hit an accessibility barrier in Basecamp, or need this report in another format? Email Michael Berger, our Quality & Accessibility Lead, at accessibility@basecamp.com. Hearing what’s not working is how we know what to fix next.",
				],
			},
		],
	},
	{
		slug: "taxes",
		title: "Taxes on Services",
		intro:
			"Where our products are taxable, we collect and remit consumption tax to governments at the local, state, and/or federal levels. If your billing address is in one of the following jurisdictions, you’ll see an additional line item on your invoice for sales tax or VAT. The subscription prices on our product websites are all exclusive of sales tax and VAT.",
		sections: [
			{
				id: "within-the-us",
				heading: "Within the US",
				body: [
					"We collect sales tax from Basecamp, Highrise, Campfire, and Backpack customers based in:",
					"Alaska (only certain jurisdictions charge sales tax)",
					"Arizona",
					"Chicago (Illinois)",
					"Connecticut",
					"District of Columbia",
					"Hawaii",
					"Iowa",
					"Kentucky",
					"Louisiana",
					"Maryland",
					"Massachusetts",
					"New Mexico",
					"Ohio",
					"Pennsylvania",
					"Rhode Island",
					"South Carolina",
					"South Dakota",
					"Tennessee",
					"Texas",
					"Utah",
					"Vermont",
					"Washington",
					"West Virginia",
					"HEY is not subject to sales tax in the US because of the Internet Tax Freedom Act (ITFA). Email service falls under the definition of “Internet access” under the ITFA.",
					"Each US state has their own sales tax exemption rules. If your organization is tax-exempt, please share your state-specific tax exemption documentation with us. Because not all US federal exemptions are recognized by each state, an IRS tax exemption letter is not enough.",
				],
			},
			{
				id: "within-the-eu",
				heading: "Within the EU",
				body: [
					"We collect VAT on any direct-to-consumer sales to EU-based customers. Most of our applications are business products but HEY is a consumer product. If you are a HEY customer with a VAT identification number, let us know and we will apply a reverse charge for VAT to your invoice.",
					"Austria",
					"Belgium",
					"Bulgaria",
					"Croatia",
					"Cyprus",
					"Czechia",
					"Denmark",
					"Estonia",
					"Finland",
					"France",
					"Germany",
					"Greece",
					"Hungary",
					"Ireland",
					"Italy",
					"Latvia",
					"Lithuania",
					"Luxembourg",
					"Malta",
					"Netherlands",
					"Poland",
					"Portugal",
					"Romania",
					"Sweden",
					"Slovakia",
					"Slovenia",
					"Spain",
				],
			},
			{
				id: "within-the-uk",
				heading: "Within the UK",
				body: [
					"We collect VAT on any direct-to-consumer sales to UK-based customers. Most of our applications are business products but HEY is a consumer product. If you are a HEY customer with a VAT identification number, let us know and we will apply a reverse charge for VAT to your invoice.",
				],
			},
			{
				id: "within-canada",
				heading: "Within Canada",
				body: [
					"We collect GST/HST (and PST where applicable) on sales to Canadian customers based in:",
					"Alberta",
					"British Columbia (+ PST)",
					"Manitoba",
					"New Brunswick",
					"Newfoundland and Labrador",
					"Northwest Territories",
					"Nova Scotia",
					"Nunavut",
					"Ontario",
					"Prince Edward Island",
					"Quebec",
					"Saskatchewan",
					"Yukon",
				],
			},
			{
				id: "updating-your-billing-address",
				heading: "Updating your billing address",
				body: [
					"If you need to change your billing information because you don’t actually reside in a taxable jurisdiction, you can easily handle that within your accounts. You may need to re-enter your credit card information as part of the billing address update. Follow these links to see how to your update your credit card in:",
					"Basecamp 5",
					"Basecamp 2",
					"Basecamp Classic",
					"Highrise",
					"Campfire",
					"Backpack",
					"For HEY, click your profile menu, select “Account Setup”, then choose “Billing & Invoices”.",
				],
			},
			{
				id: "we-re-here-to-help",
				heading: "We’re here to help",
				body: [
					"Please contact our Support team if you have trouble or if:",
					"you believe you’re being charged in error.",
					"your organization is tax exempt or has a VAT identification number. Alongside your tax exempt certification or VAT identification number, please include your account ID or domain when you email us. Your account information can typically be found in a URL when you are in the application:",
					"for HEY, just email us from your HEY account",
					"basecamp.com/1234567",
					"domain.basecamphq.com",
					"domain.highrisehq.com",
					"domain.campfirenow.com",
					"domain.backpackit.com",
				],
			},
		],
	},
	{
		slug: "ownership",
		title: "Account Ownership Policy",
		intro: "",
		sections: [
			{
				id: "basecamp-and-hey-for-domains",
				heading: "Basecamp and HEY for Domains",
				body: [
					"Accounts are owned by the organization detailed during signup, if this is a legal entity. If the organization is unincorporated, the account is owned by the individual who signed up for the account.",
					"When you sign up and create a Basecamp account, the person who originally signed up for the account is default designated the primary Account Owner or Manager, but the role can be reassigned. Again, unless the organization is not a legal entity, the account and data held it in, is ultimately owned by the organization.",
					"For information about how to change the owner/manager, and their privileges, please review the Help guide.",
				],
			},
		],
	},
	{
		slug: "updates",
		title: "Policy Updates",
		intro:
			"If you would like to receive policy updates, sign up below. We will never share your email, or use it for any other purpose.",
		sections: [],
	},
];

export const policyLinks = policies.map((policy) => ({
	slug: policy.slug,
	label: policy.title,
	href: `/policies/${policy.slug}`,
}));
