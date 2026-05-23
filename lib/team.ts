export interface TeamMember {
  name: string;
  title: string;
  phone?: string;
  bio: string;
  slug: string;
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: "Paul Pittman",
    title: "Founder & Board President",
    phone: "757-217-5427",
    bio: "30+ years at PepsiCo as General Manager. Visionary founder of the CP3 Family Legacy Foundation, dedicated to connecting families through faith, sports, and purpose.",
    slug: "paul-pittman",
  },
  {
    name: "Cameron Pittman",
    title: "Board Director",
    phone: "757-535-9539",
    bio: "Nansemond River HS graduate. Former Division I baseball standout at Radford University and Virginia Tech. Bachelor's degree recipient Fall 2025. Camp Director, 1Died4All Baseball.",
    slug: "cam-pittman",
    image: "/images/IMG_2501.jpeg",
  },
  {
    name: "Chanda Pittman",
    title: "Board Director & Licensed Counselor",
    bio: "Licensed counselor dedicated to helping youth build strong minds and healthy futures through faith-based support and guidance.",
    slug: "chanda-pittman",
  },
  {
    name: "Ben Stanley",
    title: "Board Member · Director of Operations, 1Died4All",
    phone: "443-630-3695",
    bio: "Hampton University and Xavier University men's basketball alumnus. Director of Operations for 1Died4All Sports Ministry.",
    slug: "ben-stanley",
    image: "/images/IMG_2631.jpeg",
  },
  {
    name: 'Pastor Ronnie "Mack" McAdoo',
    title: "Board Member & Spiritual Advisor",
    bio: "Former Old Dominion University basketball star and ODU's all-time leading scorer and rebounder. ODU Hall of Fame inductee. Founder & CEO of 1Died4All Sports Ministry. Gave his life to Christ in 1993.",
    slug: "ronnie-mcadoo",
    image: "/images/IMG_2498.jpeg",
  },
  {
    name: "Janet McAdoo",
    title: "Board Member · Co-Founder & CEO, 1Died4All",
    bio: "Former ODU basketball standout and Parade All-American. Played professionally in France, Japan, and Spain. Co-Founder and CEO of 1Died4All alongside her husband, Mack.",
    slug: "janet-mcadoo",
    image: "/images/IMG_2499.jpeg",
  },
  {
    name: "Mannie Upton",
    title: "Board Member",
    bio: "Father of former MLB All-Stars BJ & Justin Upton — the only brothers in professional sports history drafted 1st and 2nd overall. Norfolk State University alumni in baseball and football.",
    slug: "mannie-upton",
    image: "/images/IMG_2500.jpeg",
  },
];
