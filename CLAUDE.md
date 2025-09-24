# Common Ad Network

- Ad exchange for indie makers
- Invite only
- Earn karma by getting genuine clicks on ads, earn bonus karma (50%) if you are a smaller site
  - 10 Karma earned per click at 5% CTR, 1 Karma earned at 1% CTR, and 40 Karma earned at 20% CTR - need a smooth scaling between these numbers
- Spend karma by listing your ads on other sites in the network, you pay per click
  - 10 Karma spent per click flat rate
- Some kind of ad quality rating system and maker approval
- Social feed for all advertisers to talk to each other
- How to handle categories? No categories at first, but will add them later for improved CTRs
- “Support Indie Makers with Common Ad Network”?

Spam Prevention:

- Only 1 valid click per ad/IP per day (most effective and easiest to implement)

Tech Stack

- Next.js app router
- Prisma + Postgres
- Tailwind + HeadlessUI
- Phosphor Icons

Brand

- Multiple bright, soft color choices to appeal to indie makers
- Soft corners and plenty of white space
- Inter as font

Requirements

- **Dashboard analytics** for ads displayed on own site and your ads displayed on other sites
- **Social feed** like Twitter / X for advertisers to collaborate
- **Browse Ads** allows you to see all the ads that have been added to the platform in a grid
- **Add Ad** form which puts the user in the queue, when its their turn for their ad to display, it will pick on of the ads belonging to that user and deduct the 10 karma from that user. Accepts image, headline, description, and link.
- **JWT Auth** with no social sign-ins needed. Registering and creating a profile requires adding a company link and a profile picture to get through. That’s enough of an approval for now. Invite Link is needed in order to register.
- **Invite Link** modal where users can copy the special link which they need in order to register.
- **JS Script + HTML code** which is collected from the Embed Ads modal (JS Script will be hosted on Bunny CDN)
- **Integrate IP Location Service** to ensure valid clicks on embedded ads
- **Landing Page** which describes how it works, who its for, and what the bonuses are for certain CTR (so people know how much they could potentially gain)
