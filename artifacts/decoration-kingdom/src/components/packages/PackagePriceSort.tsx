import type { PackageItem } from "@/lib/packages-catalog";

export type PackagePriceSortOrder = "default" | "price-ascending" | "price-descending";

export function sortPackagesByPrice(packages: PackageItem[], order: PackagePriceSortOrder) {
  if (order === "default") return packages;
  return [...packages].sort((a, b) =>
    order === "price-ascending" ? a.price - b.price : b.price - a.price,
  );
}

export function PackagePriceSort({
  value,
  onChange,
}: {
  value: PackagePriceSortOrder;
  onChange: (value: PackagePriceSortOrder) => void;
}) {
  return (
    <div className="mb-6 flex justify-end">
      <label className="flex items-center gap-3 text-sm font-medium text-[color:var(--purple-deep)]">
        <span>Sort by price</span>
        <select
          value={value}
          onChange={(event) => {
            const nextOrder = event.target.value;
            if (
              nextOrder === "default" ||
              nextOrder === "price-ascending" ||
              nextOrder === "price-descending"
            ) {
              onChange(nextOrder);
            }
          }}
          className="rounded-full border border-[color:var(--gold)]/50 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-[color:var(--pink)]"
        >
          <option value="default">Featured</option>
          <option value="price-ascending">Price: Low to High</option>
          <option value="price-descending">Price: High to Low</option>
        </select>
      </label>
    </div>
  );
}
