import { PROOF_CONTACT_HREF } from '../links';

// Page copy for /proof, transcribed from the approved reference page.
// Numbers that live in metrics-data.json (hero stats, reels, audience,
// chart) are read from there; this file holds the prose around them.
//
// `side` marks which half of the story a figure belongs to, so the page can
// color it: 'organic' uses the site's red, 'paid' uses cream.

export const hero = {
  title: ['Organic builds ', 'legitimacy', ', paid brings leads.'],
  eyebrow: 'Case study · Consumer health app · 14 months · Kameron Lucas, content and strategy',
  lede: "I ran a pre-launch health app's social for fourteen months, from the strategy to the final cut. Its own account data shows both halves of that sentence, and how to stack them.",
  statSides: ['organic', null, 'paid'],
};

export const wins = {
  label: 'The wins',
  title: 'What the work actually did',
  intro: "Every number here comes from the brand's own Meta and Instagram exports. The client and creator stay unnamed; the results don't need them.",
  items: [
    { big: '26.9M', text: 'Six creator collab reels added up to 26.9 million views in nine weeks, led by one at 12.5 million.', small: 'Post views across partner accounts', receipt: 'rc-reels' },
    { big: '21×', text: 'Follower growth ran 21 times faster than the month before, with $0 in ad spend.', small: '7,490 in two months vs 175 in one', receipt: 'rc-follows' },
    { big: '10×', text: 'Profile visits jumped more than tenfold as people went looking for the brand.', small: '28,007 in two months vs 1,320 in one', receipt: 'rc-visits' },
    { big: '85.1K', text: 'Viewers shared the six reels 85,100 times combined, so the audience did the distribution.', small: 'About one share per 300 views', receipt: 'rc-reels' },
    { big: '$0.38', side: 'paid', text: 'One boosted reel drove 4,310 link clicks at 38 cents each, a 5.70% click-through rate.', small: '$1,650 spend over 16 days', receipt: 'rc-paid' },
    { big: '5×', text: 'The creator push left a higher floor behind it: about 28 new follows a day for the next month, against about 5 after the paid weeks.', small: 'Daily follows after each push ended', receipt: 'rc-full' },
    { big: '$8K+', text: 'Buying those organic followers at the paid rate would have cost $8,000 to $8,500.', small: '7,490 follows at $1.07 to $1.14 each', receipt: 'rc-paid' },
    { big: '18,683', text: 'Over the full engagement the account earned 9.45 million views and 18,683 new followers.', small: 'Fourteen months, start to finish', receipt: 'rc-full' },
  ],
};

const R = '/images/proof/receipts/';

export const receipts = {
  label: 'The receipts',
  title: 'Straight from Meta',
  intro: 'Screenshots from Meta Business Suite and Ads Manager. Axis dates, captions and account names are covered, and nothing else is touched.',
  groups: [
    {
      id: 'rc-reels',
      label: 'The six creator reels',
      side: 'organic',
      figures: [
        {
          wide: true,
          src: R + 'reels-six.jpg', w: 1968, h: 606,
          tallSrc: R + 'reels-six-tall.jpg', tallW: 1316, tallH: 903,
          alt: 'Instagram reel insights for six collab reels: views, accounts reached, likes, comments, reposts, shares and saves',
          caption: "Instagram's own insights for each reel, cropped to the numbers. Views add up to 26,901,008 and shares (the paper-plane column) to about 85,100. Reel 1 carried the reach at 12.5 million on its own.",
        },
      ],
    },
    {
      label: 'The creator push · no ads running',
      side: 'organic',
      figures: [
        { id: 'rc-noads', wide: true, src: R + 'org-no-ads.jpg', w: 1300, h: 530, alt: 'Meta Ads Manager showing no ads found', caption: 'Ads Manager across the window around the creator push: no ads found. Every follow in it was organic.' },
        { id: 'rc-follows', src: R + 'org-follows.jpg', w: 554, h: 392, alt: 'Meta Business Suite follows chart, 8.6K', caption: 'Follows across that window: 8.6K, and the three spikes are the creator reels landing.' },
        { id: 'rc-visits', src: R + 'org-profile-visits.jpg', w: 554, h: 392, alt: 'Meta Business Suite profile visits chart, 32.9K', caption: 'Profile visits: 32.9K, up 112.7% on the window before.' },
        { src: R + 'org-views.jpg', w: 554, h: 390, alt: 'Meta Business Suite views chart, 6.6M', caption: "Views on the brand's own account: 6.6M, up 942.3%. Collab views on the partner's account come on top of this." },
        { src: R + 'org-link-clicks.jpg', w: 554, h: 392, alt: 'Meta Business Suite link clicks chart, 21', caption: 'Link clicks in the same window: 21. Organic built the audience and captured almost no leads, which is why the playbook pairs it with paid.' },
      ],
    },
    {
      id: 'rc-paid',
      label: 'The paid boost',
      side: 'paid',
      figures: [
        { src: R + 'paid-details.jpg', w: 900, h: 452, alt: 'Meta ad details showing $1,649.89 spent over 16 days', caption: 'The boost: $1,649.89 over 16 days on Facebook and Instagram, goal set to profile visits.' },
        { src: R + 'paid-overview.jpg', w: 1475, h: 286, alt: 'Meta ad overview, 4.2K profile visits at $0.39', caption: '4.2K profile visits at $0.39 each, and 89.8K views.' },
        { wide: true, src: R + 'paid-clicks.jpg', w: 1472, h: 495, alt: 'Meta ad results, 4.3K link clicks, 5.70% CTR, 1.5K follows', caption: '4,310 link clicks at a 5.70% click-through rate, plus 1.5K Instagram follows.' },
      ],
    },
    {
      id: 'rc-full',
      label: 'The whole engagement',
      figures: [
        { src: R + 'full-follows.jpg', w: 982, h: 658, alt: 'Meta Business Suite follows chart, 18.7K', caption: 'Follows across the engagement: 18.7K. The first hump is the paid weeks, the spikes are the creator reels, and the floor after them sits higher.' },
        { src: R + 'full-views.jpg', w: 990, h: 666, alt: 'Meta Business Suite views chart, 9.5M', caption: 'Views across the engagement: 9,450,144 on Instagram.' },
      ],
    },
  ],
};

export const timeline = {
  label: '01 · The timeline',
  title: 'Fourteen months, two kinds of spike',
  // Reference copy named the old palette (orange bands, green ticks). The
  // colors now follow the site, so the sentence names what is on screen.
  intro: 'Shaded bands mark paid boosts. Red ticks mark the six creator reels. Watch what happens after each one ends: paid growth stops when the money does, and the creator push leaves a higher floor behind it.',
  tabs: [
    ['follows', 'Follows'],
    ['visits', 'Profile visits'],
    ['views', 'Account views'],
  ],
};

export const compare = {
  label: '02 · Paid vs organic',
  title: 'One boost with a receipt, one creator push with none',
  paid: {
    label: 'Paid · boosted reel',
    title: 'A founder-led reel on the cost of healthcare',
    when: '16 days · Facebook + Instagram · goal: profile visits',
    spend: '$1,650',
    rows: [
      ['Instagram follows', '1.5K', 'about $1.10 each'],
      ['Link clicks', '4,310', '$0.38 each · 5.70% CTR'],
      ['Profile visits', '4.2K', '$0.39 each'],
      ['Views', '89.8K', '60.2K viewers · 12s avg play'],
      ['Who saw it', '72% women', 'largest band 35 to 44'],
    ],
    foot: 'Other posts were boosted in the same weeks. Across that stretch the account logged 7,273 follows and 10,518 link clicks.',
  },
  organic: {
    label: 'Organic · creator collabs',
    title: 'Six reels with an established comedy creator',
    when: 'Nine weeks · no ads running',
    spend: '$0',
    rows: [
      ['Follows, first two months', '7,490', 'the month before: 175'],
      ['Profile visits, same window', '28,007', 'the month before: 1,320'],
      ['Shares across six reels', '85.1K', 'about one for every 300 views'],
      ['Best single day', '1,168 follows', 'the day after Reel 5'],
      ['Accounts reached', '5.3M', 'across the six reels'],
    ],
    foot: 'Collab views count every view of the post across all partner accounts and the Facebook crosspost.',
  },
  value: {
    big: '$8,000 to $8,500',
    text: "What 7,490 followers would have cost at the boost's $1.07 to $1.14 per follow. Treat it as replacement cost, since a creator's audience and a paid audience don't behave the same way after they follow.",
  },
};

export const playbook = {
  label: '03 · The playbook',
  title: 'Creators build the trust. Paid collects on it.',
  pull: ['After the paid weeks, new follows fell back to ', 'about 5 a day', '. After the creator push they held near ', '28 a day', ' for the next month.'],
  points: [
    'Creator reels buy reach and trust at zero media cost, and the lift outlasts the posts.',
    'Paid turns attention into action. The boost ran a 5.70% link CTR at $0.38 a click, several times the category average.',
    'The two work best stacked: launch the creator reels, then retarget everyone who watched with a paid offer while the reel is still fresh.',
  ],
};

export const reelsSection = {
  label: '04 · The reels',
  title: 'Six collabs in nine weeks',
  intro: "Post views count every view across partner accounts and the Facebook crosspost. Reach, shares and saves come from the brand's own insights.",
  after: "Reel 5 is the sleeper. It had the highest share rate of the set and close to three in four viewers in the buyer's age range, and the account's best follow day came the day after it posted. Reel 1 got the reach, and Reel 5 brought in the right people.",
};

export const commentsSection = {
  label: '05 · What people said',
  title: 'The comments asked for more',
  intro: 'Real comments from the reels, names and photos blurred. Viewers started treating the two leads as a storyline, which is the case for building creator content as a series instead of one-offs.',
  // Transcribed from each screenshot. Names, photos and comment ages stay out.
  alts: {
    'comment_reel3_love-story_20.3K.jpg': 'Instagram comment, name and photo blurred: "This feels like a love story unfolding," with a laughing emoji. 20.3K likes.',
    'comment_reel3_single-mom_13.9K.jpg': 'Instagram comment, name and photo blurred: "\'You\'re a single mom?\' the excitement in her voice," with laughing emojis. 13.9K likes.',
    'comment_reel1_feel-so-seen_7899.jpg': 'Instagram comment, name and photo blurred, liked by the creator: "\'Yah, and one was discontinued in 2022 so we\'re back to two.\' I FEEL SO SEEN. I want conversations like this," with a crying emoji and a heart. 7,899 likes.',
    'comment_reel3_ship-them_7026.jpg': 'Instagram comment, name and photo blurred: "As much as i would love to ship them, adult friendships are also a thing." 7,026 likes.',
  },
  // Intrinsic heights (all 900 wide) so the lazy images reserve their space.
  heights: {
    'comment_reel1_feel-so-seen_7899.jpg': 260,
    'comment_reel3_love-story_20.3K.jpg': 151,
    'comment_reel3_ship-them_7026.jpg': 168,
    'comment_reel3_single-mom_13.9K.jpg': 171,
  },
};

export const audienceSection = {
  label: '06 · Who stayed',
  title: 'The audience the work built',
};

export const cta = {
  label: '07 · For your business',
  title: 'The same two halves, built for you',
  intro: 'Content people actually share builds the trust before anyone calls. Paid campaigns turn that trust into booked customers, and both get tracked from day one, so we can see what every dollar brought back.',
  pitch: "If your work is better than the way it shows up online, that gap is the job. Tell me about your business and I'll tell you where I'd start.",
  button: 'Start a conversation',
  href: PROOF_CONTACT_HREF,
};

export const method = {
  label: '08 · Method',
  title: 'Where the numbers come from',
  lists: [
    [
      "Daily follows, profile visits, link clicks and views: Meta Business Suite exports for the brand's Instagram account.",
      'Reel views, reach, shares, saves, rates and viewer ages: Instagram Reel insights.',
      'Boost spend and results: Meta ad results for the boosted reel.',
      "No ads ran during the creator push, confirmed in Meta's Ads page.",
    ],
    [
      "The client's name, the creator's name and post dates are withheld. Months count from the start of the engagement.",
      'Instagram reports zero follows on collab posts, so follows are tied to reels by posting day against the daily follow curve.',
      'The original exports and screenshots can be walked through on a call.',
    ],
  ],
};
