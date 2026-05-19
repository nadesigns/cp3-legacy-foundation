export interface Ministry {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  details: string[];
}

export const ministries: Ministry[] = [
  {
    title: "Navigator Ministry",
    slug: "navigator",
    tagline: "Guiding families through faith and purpose.",
    description:
      "The Navigator Ministry partners with Navigators Global to disciple individuals and families, equipping them to live out their faith in everyday life.",
    details: [
      "One-on-one discipleship",
      "Bible study resources",
      "Community fellowship",
      "Mentorship programs",
    ],
  },
  {
    title: "1Died4All",
    slug: "1died4all",
    tagline: "Sports ministry built on the foundation of faith.",
    description:
      "1Died4All uses the platform of sports to share the gospel and build character in young athletes across Hampton Roads and beyond.",
    details: [
      "Baseball camp & events",
      "Basketball ministry",
      "Faith-based coaching",
      "Youth leadership development",
    ],
  },
  {
    title: "Paul J. Pittman Fatherhood Award",
    slug: "fatherhood-award",
    tagline: "Honoring fathers who lead with faith and love.",
    description:
      "The Paul J. Pittman Fatherhood Award recognizes men in the community who demonstrate exceptional commitment to fatherhood, family, and faith.",
    details: [
      "Annual recognition event",
      "Community nominations",
      "Legacy celebration",
      "Mentorship spotlight",
    ],
  },
  {
    title: "Widow Ministry",
    slug: "widow-ministry",
    tagline: "Surrounding widows with love, community, and support.",
    description:
      "Our Widow Ministry provides practical support, spiritual encouragement, and community connection for widows in the Hampton Roads area.",
    details: [
      "Community gatherings",
      "Practical assistance",
      "Prayer support",
      "Fellowship events",
    ],
  },
  {
    title: "Kenya Mission Trip",
    slug: "kenya-mission",
    tagline: "Carrying the gospel to Nairobi, Kenya.",
    description:
      "Each year our team travels to Nairobi, Kenya through 1Died4All to serve local communities, share the gospel, and build lasting relationships.",
    details: [
      "August 5–8, 2026",
      "Nairobi, Kenya",
      "Community outreach",
      "Faith-based programs",
    ],
  },
];
