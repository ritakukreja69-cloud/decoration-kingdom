import recentTeddyBirthday from "@/assets/recent-work-teddy-first-birthday.png";
import { getPackages, type PackageItem } from "@/lib/packages-catalog";

export type RecentWorkItem = Omit<PackageItem, "id"> & {
  slug: string;
  collectionHref: string;
};

const kidsThemeWork: RecentWorkItem[] = getPackages("kids-theme")
  .map((pkg) => ({
    ...pkg,
    slug: pkg.id === "kids-theme-3" ? "teddy-first-birthday" : pkg.id,
    image: pkg.id === "kids-theme-3" ? recentTeddyBirthday : pkg.image,
    collectionHref: `/packages/collection/${pkg.category}`,
  }));

export const recentWorkItems: RecentWorkItem[] = kidsThemeWork;
