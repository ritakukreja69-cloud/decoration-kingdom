import { useState } from "react";
import { Link } from "wouter";
import { Heart, Sparkles as SparkleIcon } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { PackageCard } from "@/components/packages/PackageCard";
import { PackageModal } from "@/components/packages/PackageModal";
import { getPackages, type PackageItem } from "@/lib/packages-catalog";

const kidsPackages = getPackages("kids-theme");

export function KidsThemesPage() {
  const [active, setActive] = useState<PackageItem | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader active="Kids Themes" />

      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, oklch(0.65 0.24 350 / 0.55), transparent 40%), radial-gradient(circle at 85% 65%, oklch(0.82 0.15 85 / 0.45), transparent 42%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center relative">
          <p className="font-script text-5xl md:text-6xl text-[color:var(--gold)] drop-shadow">
            Little Wonders
          </p>
          <h1 className="font-display italic text-4xl md:text-5xl tracking-tight mt-3 leading-tight">
            Kids Birthday Packages
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-16 bg-[color:var(--gold)]/70" />
            <SparkleIcon className="w-4 h-4 text-[color:var(--gold)]" />
            <span className="h-px w-16 bg-[color:var(--gold)]/70" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto text-white/85 text-base md:text-lg font-light">
            Pick a ready-to-book setup for a magical little celebration.
          </p>
        </div>
      </section>

      <main className="py-16 md:py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kidsPackages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} onView={setActive} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/50 px-6 py-3 text-sm font-semibold text-[color:var(--purple-deep)] hover:bg-[color:var(--gold)]/10"
            >
              <Heart className="h-4 w-4" /> Browse All Collections
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
      <PackageModal pkg={active} onClose={() => setActive(null)} />
    </div>
  );
}
