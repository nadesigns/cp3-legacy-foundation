export interface Event {
  title: string;
  date: string;
  time?: string;
  location?: string;
  address?: string;
  status: "upcoming" | "coming-soon";
  free?: boolean;
  registration?: boolean;
  externalUrl?: string;
  externalCta?: string;
  slug: string;
  description: string;
  tags?: string[];
}

export const events: Event[] = [
  {
    title: "1Died4All Baseball Camp",
    date: "June 16–18, 2026",
    time: "9:00AM – 2:00PM",
    location: "Nansemond River High School, Suffolk VA",
    address: "3301 Nansemond Parkway, Suffolk, VA 23434",
    status: "upcoming",
    free: true,
    registration: true,
    slug: "baseball-camp",
    description:
      "Faith-based baseball camp for boys ages 10–16. All skill levels welcome. Free admission, lunch provided.",
    tags: ["Baseball", "Faith", "Youth", "Free"],
  },
  {
    title: "Paul J. Pittman Fatherhood Award",
    date: "Father's Day · June 21, 2026",
    location: "Hampton Roads, VA",
    status: "upcoming",
    slug: "fatherhood-award",
    description:
      "Annual recognition honoring men in the community who demonstrate exceptional commitment to fatherhood, family, and faith.",
    tags: ["Award", "Fatherhood", "Community", "Faith"],
  },
  {
    title: "MVP Baseball Event",
    date: "July 2026 — TBA",
    status: "upcoming",
    slug: "mvp-baseball",
    description:
      "MVP Baseball Foundation event details and updates are available through the foundation website.",
    externalUrl: "https://www.viableprospects.org/blank",
    externalCta: "Visit MVP Baseball",
    tags: ["Baseball", "Foundation", "Youth"],
  },
  {
    title: "Kenya Mission Trip",
    date: "August 5–8, 2026",
    location: "Nairobi, Kenya",
    status: "upcoming",
    slug: "kenya-mission",
    description:
      "International outreach mission to Nairobi, Kenya through 1Died4All.",
  },
  {
    title: "1Died4All Basketball",
    date: "Coming Soon",
    status: "coming-soon",
    slug: "basketball",
    description: "Details coming soon.",
  },
];
