import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import recentTeddyBirthday from "@/assets/recent-work-teddy-first-birthday.png";
import { WHATSAPP_BOOKING_URL } from "@/lib/whatsapp";

export function RecentWorkDetailPage() {
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
              <img
                src={recentTeddyBirthday}
                alt="Teddy bear first birthday backdrop decorated with pink, white and rose-gold balloons"
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="font-script text-3xl text-[color:var(--pink)]">A recent celebration</p>
              <h1 className="mt-2 font-display text-3xl font-black leading-tight text-[color:var(--purple-deep)] md:text-5xl">
                Teddy Bear First Birthday Decoration
              </h1>
              <div className="my-5 flex items-center gap-3 text-[color:var(--gold)]">
                <span className="h-px w-12 bg-current" />
                <Heart className="h-4 w-4 fill-current text-[color:var(--pink)]" />
                <span className="h-px w-12 bg-current" />
              </div>
              <p className="leading-relaxed text-foreground/80">
                A warm first-birthday setup featuring a pink and white balloon garland, rose-gold accents, a cute teddy bear detail, and a golden number one.
              </p>

              <div className="mt-6 rounded-2xl border border-border/60 bg-white p-5 shadow-card">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[color:var(--purple-deep)]">
                  <Sparkles className="h-4 w-4 text-[color:var(--gold)]" /> Details in this setup
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  <li>Pink, white and rose-gold balloon arch</li>
                  <li>Happy Birthday foil letters and heart accents</li>
                  <li>Teddy bear detail with a golden number one</li>
                </ul>
              </div>

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
                  href="/packages/collection/kids-theme"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/60 px-6 py-3 text-sm font-semibold text-[color:var(--purple-deep)] hover:bg-white"
                >
                  Browse kids packages <ArrowRight className="h-4 w-4" />
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
