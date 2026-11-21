import { Link, useParams } from "wouter";
import { ArrowRight, Heart, Sparkles as SparkleIcon } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getKidsTheme, slugify } from "@/lib/kids-themes-data";

export function KidsThemePage() {
  const { theme } = useParams<{ theme: string }>();
  const selected = getKidsTheme(theme || "");

  if (!selected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader active="Kids Themes" />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display italic text-4xl text-[color:var(--purple-deep)]">Theme not found</h1>
          <p className="text-muted-foreground mt-3">We couldn't find the theme you're looking for.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 rounded-full px-6 py-3 bg-gradient-primary text-white font-semibold text-sm"
          >
            <Heart className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader active="Kids Themes" />

      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${selected.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--purple-deep)]/90 via-[color:var(--purple-deep)]/70 to-[color:var(--purple-deep)]/40" />
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center relative">
          <p className="font-script text-5xl md:text-6xl text-[color:var(--gold)] drop-shadow">
            Kids Themes
          </p>
          <h1 className="font-display italic text-4xl md:text-6xl tracking-tight mt-3 leading-tight">
            {selected.title}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-16 bg-[color:var(--gold)]/70" />
            <SparkleIcon className="w-4 h-4 text-[color:var(--gold)]" />
            <span className="h-px w-16 bg-[color:var(--gold)]/70" />
          </div>
          <p className="mt-5 max-w-2xl mx-auto text-white/85 text-base md:text-lg font-light">
            Pick a {selected.title} celebration style to explore. Contact us to plan a custom decoration for your party.
          </p>
        </div>
      </section>

      <main className="py-16 md:py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selected.subcategories.map((subcategory) => (
              <Link
                key={subcategory}
                href={`/kids-themes/${selected.id}/${slugify(subcategory)}`}
                className="group rounded-2xl border border-[color:var(--gold)]/30 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/70 hover:shadow-pink"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--pink)]">
                  {selected.title} Theme
                </p>
                <h2 className="mt-3 font-display italic text-2xl text-[color:var(--purple-deep)]">
                  {subcategory}
                </h2>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--purple-deep)]">
                  Explore theme
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <Link
                href="/"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 border border-[color:var(--gold)]/50 text-[color:var(--purple-deep)] font-semibold text-sm hover:bg-[color:var(--gold)]/10"
            >
                <Heart className="w-4 h-4" /> Back to Home
            </Link>
            <a
              href="tel:9971265244"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-gradient-primary text-white font-semibold text-sm shadow-pink"
            >
              Plan a Celebration
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
