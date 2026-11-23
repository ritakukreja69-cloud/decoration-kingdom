import recentTeddyBirthday from "@/assets/recent-work-teddy-first-birthday.png";
import { getPackages } from "@/lib/packages-catalog";

export type RecentWorkItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  includes: string[];
  price?: number;
  collectionHref: string;
};

const kidsThemeWork: RecentWorkItem[] = getPackages("kids-theme")
  .map((pkg) => ({
    slug: pkg.id,
    title: pkg.name,
    category: "Kids Birthday",
    image: pkg.image,
    description: pkg.description,
    includes: pkg.includes,
    price: pkg.price,
    collectionHref: `/packages/collection/${pkg.category}`,
  }));

export const recentWorkItems: RecentWorkItem[] = [
  {
    slug: "teddy-first-birthday",
    title: "Teddy Bear Birthday Celebration",
    category: "Birthday · First Birthday",
    image: recentTeddyBirthday,
    description:
      "Pink, white and rose-gold balloons, a cuddly teddy detail and a shining number one make this celebration extra special.",
    includes: [
      "Pink, white and rose-gold balloon arch",
      "Happy Birthday foil letters and heart accents",
      "Teddy bear detail with a golden number one",
    ],
    collectionHref: "/packages/collection/kids-theme",
  },
  ...kidsThemeWork,
];
