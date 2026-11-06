// Industry content for /landscaping. Everything specific to this industry
// lives here; the layout lives in src/industry/IndustryPage.jsx.
//
// Page settings: served at /<slug>/, title and description go into the page's
// <head> at build time, `source` is what form submissions log, `need` is the
// form's fixed answer, and `labels` name the unheaded sections for screen readers.
export const page = {
  slug: 'landscaping',
  title: 'Landscaping and Home Services Marketing, Los Angeles | TWTE Media',
  description: 'Install films, ads, and lead screening for landscaping and home services companies in Los Angeles. Get seen, get booked, and win the street.',
  shareDescription: 'Install films, ads, and lead screening for landscaping and home services companies in Los Angeles.',
  source: 'landscaping',
  need: 'Landscaping / home services',
  labels: { pains: 'What it costs you', pricing: 'Pricing', proof: 'Proof' },
  // Visible section labels (the small spaced capitals with the thin rule, as
  // on /proof). Set in sentence case; the label style capitalizes them.
  sectionLabels: {
    hook: 'For landscapers',
    pains: 'The gap',
    plan: 'The plan',
    pricing: 'The price',
    proof: 'The proof',
    close: 'The call',
  },
};

// Page copy below. LOCKED: transcribed verbatim from the approved brief.
// Do not edit, add to, or reorder. If a line breaks the layout, flag it.
//
// Where a line leads with a figure, `lead` is the first part of the same
// sentence, split only so the number can be set larger. Rendered back to
// back, `lead` + `rest` is the exact approved line.

export const hook = {
  // Second sentence set in the site red, like the homepage's "Book a discovery."
  title: ["Everyone who's hired you knows how good you are. ", 'Everyone else is guessing.'],
  body: "They size you up in seconds, from a screen, before they ever call. Most compare three or fewer. They call the one that shows them their future yard.",
  note: '83% of consumers judge a website\'s credibility in under 20 seconds. Clutch, 2025. 72% looked at three or fewer businesses. BrightLocal, 2026.',
};

export const pains = [
  {
    num: 'i.',
    title: "You'd never let a rookie lead the install. Why let one lead your first impression?",
    body: "Whoever has a phone and a free minute is running your marketing for the day. 44% of small business owners are also their company's marketer.",
    note: 'Adobe Express and Talker Research, 2026.',
  },
  {
    num: 'ii.',
    title: 'Every call you miss is already dialing somebody else.',
    body: "You're on a job site, hands full, phone in the truck. Reach a lead within the hour and you're nearly 7 times more likely to qualify them. Only 52% of calls to home services businesses reach a person.",
    note: 'Harvard Business Review, 2011. Invoca, 2026.',
  },
  {
    num: 'iii.',
    title: 'You build yards worth six figures. Your page makes them look like a weekend job.',
    body: '75% of people choose a local business in under 30 minutes. Your page closes the deal or kills it, and you never hear about the ones it killed.',
    note: 'BrightLocal, 2026.',
  },
  {
    num: 'iv.',
    title: 'Every finished yard is a sales pitch you drive away from.',
    body: 'The whole street watched the build. When your truck pulls away, your name leaves with it.',
    note: '89% of Americans trust recommendations from people they know, the most of any channel. Nielsen, 2021.',
  },
];

export const bridge = 'Three moves. One goal: the homeowner you want, calling you.';

export const plan = [
  {
    title: 'Seen.',
    body: 'I film your installs with the same care you took to build them. Then I put them where homeowners are looking: your Instagram, paid ads, or both.',
  },
  {
    title: 'Booked.',
    body: 'Whether they find you through an ad or your page, every interested homeowner answers five quick questions first. By the time your phone buzzes, you already know the yard, the budget, and the timeline. You stop chasing price shoppers and start calling buyers.',
  },
  {
    title: 'Next door.',
    body: "When your truck pulls away, your name stays on the street. Every finished job becomes a pitch to the homes around it. How it works stays off this page. I'll show you on the call.",
  },
];

export const pricing = {
  // Two cards. On phones they stack with the second (three-month) card first.
  plans: [
    {
      label: 'ONE MONTH',
      price: '$5,000',
      bullets: [
        'One shoot day',
        '12 finished videos',
        'Your Instagram, ads, or both, managed',
        'The five-question lead setup',
        "A lookback on what's working",
      ],
    },
    {
      tag: "THE ONE I'D PICK",
      label: 'THREE MONTHS',
      price: '$6,000 total',
      bullets: [
        '12 finished videos every month (36 total)',
        'Your Instagram, ads, or both, managed for three months',
        'The five-question lead setup',
        'A lookback every month',
        '$3,000 setup fee waived',
      ],
      closing: "I'm here to grow with your business.",
    },
  ],
  // Under both cards, centered. The body line is set in italics.
  body: 'Prices are plus travel and expenses. Ad spend, if any, goes straight from your account to Meta.',
  note: 'Production only: $3,000 plus travel and expenses. One shoot day, 10 finished cuts, ready for your team to post or run.',
};

export const proof = {
  stats: [
    { lead: '26.9 million', rest: ' views across six creator reels in nine weeks, $0 in ad spend.' },
    { lead: '7,490', rest: ' new followers from that push.' },
    { lead: '38 cents', rest: ' per link click on the paid side.' },
  ],
  line: 'I got millions of people to stop scrolling for a health app. Your work has a head start.',
  button: 'See the receipts',
  href: '/proof/',
};

export const close = {
  title: ["Your installs have curb appeal. Give me 30 minutes, ", "and I'll show you how your page earns it too."],
  button: 'Book your call',
  href: '#contact',
  note: "It's free, and it happens on Google Meet.",
};
