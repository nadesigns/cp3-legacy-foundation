export interface Sponsor {
  name: string;
  type: "church" | "foundation" | "business";
  contact?: string;
  logo?: string;
}

export const sponsors: Sponsor[] = [
  { name: "Mount Suffolk Community Church", type: "church" },
  { name: "Upton Foundation", type: "foundation" },
  { name: "Aspire Personal Gym", type: "business" },
  { name: "Porter Young Custom Homes", type: "business" },
  { name: "Trinity Church", type: "church" },
];
