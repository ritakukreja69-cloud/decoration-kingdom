import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Heart, MapPin, MessageCircle, Sparkles } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MascotBookingLink } from "@/components/packages/MascotBookingLink";
import { inr } from "@/lib/packages-catalog";
import { recentWorkItems } from "@/lib/recent-work";
import { WHATSAPP_BOOKING_URL } from "@/lib/whatsapp";

export function RecentWorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const work = recentWorkItems.find((item) => item.slug === slug);

  if (!work) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-black text-[color:var(--purple-deep)]">Celebration not found</h1>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-[color:var(--pink)]">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      <section className="bg-gradient-soft py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--purple-deep)] hover:text-[color:var(--pink)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-white shadow-card"
            >
              <img src={work.image} alt={work.name} className="aspect-[3/4] w-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="font-script text-3xl text-[color:var(--pink)]">{work.categoryLabel}</p>
              <h1 className="mt-2 font-display text-3xl font-black leading-tight text-[color:var(--purple-deep)] md:text-5xl">
                {work.name}
              </h1>
              <div className="my-5 flex items-center gap-3 text-[color:var(--gold)]">
                <span className="h-px w-12 bg-current" />
                <Heart className="h-4 w-4 fill-current text-[color:var(--pink)]" />
                <span className="h-px w-12 bg-current" />
              </div>
              <p className="leading-relaxed text-foreground/80">
                {work.description}
              </p>

              <p className="mt-5 text-4xl font-black leading-none text-gradient-primary">{inr(work.price)}</p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5">
                  <Clock className="h-3.5 w-3.5" /> {work.duration}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {work.area}
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-white p-5 shadow-card">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[color:var(--purple-deep)]">
                  <Sparkles className="h-4 w-4 text-[color:var(--gold)]" /> What's included
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {work.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pink)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <MascotBookingLink packageName={work.name} />

              {work.notes && (
                <div className="mt-4 rounded-xl border border-[color:var(--pink)]/20 bg-[color:var(--pink)]/8 px-4 py-3">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[color:var(--pink)]">Note</p>
                  <p className="text-sm text-foreground/80">{work.notes}</p>
                </div>
              )}

              {work.addons.length > 0 && (
                <div className="mt-4 rounded-2xl border border-[color:var(--gold)]/40 bg-white p-5">
                  <h2 className="font-display text-lg font-bold text-[color:var(--purple-deep)]">Available add-ons</h2>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    {work.addons.map((addon) => <li key={addon}>{addon}</li>)}
                  </ul>
                </div>
              )}

              <p className="mt-5 text-sm text-muted-foreground">
                Want a similar setup? Contact us for a quote tailored to your celebration and venue.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-pink"
                >
                  <MessageCircle className="h-4 w-4" /> Ask for a quote
                </a>
                <Link
                  href={work.collectionHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/60 px-6 py-3 text-sm font-semibold text-[color:var(--purple-deep)] hover:bg-white"
                >
                  Browse related packages <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
