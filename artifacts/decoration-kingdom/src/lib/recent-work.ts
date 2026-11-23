import { getPackages, type PackageItem } from "@/lib/packages-catalog";

export type RecentWorkItem = Omit<PackageItem, "id"> & {
  slug: string;
  collectionHref: string;
};

const kidsThemeWork: RecentWorkItem[] = getPackages("kids-theme")
  .filter((pkg) => pkg.id !== "kids-theme-3")
  .map((pkg) => ({
    ...pkg,
    slug: pkg.id,
    collectionHref: `/packages/collection/${pkg.category}`,
  }));

export const recentWorkItems: RecentWorkItem[] = kidsThemeWork;
