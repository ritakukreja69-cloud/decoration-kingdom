import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Shirt, Sparkles, Truck, UserRound } from "lucide-react";

import { mascotGallery } from "@/lib/mascot-gallery";
import { WHATSAPP_BOOKING_URL } from "@/lib/whatsapp";

const inclusions = [
  { icon: Shirt, label: "Costume included in mascot price" },
  { icon: UserRound, label: "Artist included in mascot price" },
  { icon: Truck, label: "Transport included in mascot price" },
];

export function HomeMascotSection() {
  const reduceMotion = useReducedMotion();
  const bookingUrl = new URL(WHATSAPP_BOOKING_URL);
  bookingUrl.searchParams.set(
    "text",
    "Hello Decoration Kingdom! I would like to book a cartoon mascot for my event. Please share available characters and booking details.",
  );

  return (
    <section
      aria-labelledby="home-mascot-title"
      className="relative isolate overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-100 py-16 md:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-4"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              A little extra party magic
            </span>
            <h2
              id="home-mascot-title"
              className="mt-5 max-w-2xl font-display text-3xl font-black leading-tight tracking-tight text-[color:var(--purple-deep)] sm:text-4xl md:text-5xl"
            >
              Make Your Celebration{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Extra Special!
              </span>
            </h2>
            <p className="mt-3 text-base font-semibold text-slate-600 sm:text-lg">
              Mascot booking is an optional add-on and is charged separately from your decoration package.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {inclusions.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-orange-600" />
                  {label}
                </span>
              ))}
            </div>

            <a
              href={bookingUrl.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
            >
              Explore Mascots &amp; Book Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-[2rem] border border-orange-100 bg-white/90 p-5 shadow-[0_24px_70px_-42px_rgba(154,75,14,0.42)] backdrop-blur-sm sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600">Cartoon Mascot Price</p>
                <p className="mt-2 font-display text-4xl font-black tracking-tight text-[color:var(--purple-deep)] sm:text-5xl">
                  ₹4,500
                </p>
                <p className="mt-1 text-sm font-bold text-slate-600">per mascot · up to 3 hours</p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-orange-700">
                  Optional extra — not included in package price
                </p>
              </div>
              <span className="rounded-2xl bg-amber-100 p-3 text-3xl" aria-hidden>🎭</span>
            </div>

            <div className="mt-5 border-t border-orange-100 pt-5">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Meet our mascot characters
              </p>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Available mascot characters">
                {mascotGallery.map((character, index) => (
                  <motion.li
                    key={character.name}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-orange-900/10"
                  >
                    <div className={`aspect-[4/3] overflow-hidden ${index % 2 === 0 ? "bg-orange-50" : "bg-amber-50"}`}>
                      <img
                        src={character.image}
                        alt={`${character.name} mascot costume`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="px-2 py-2 text-center text-xs font-extrabold text-[color:var(--purple-deep)] sm:text-sm">
                      {character.name}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-5 grid gap-2 rounded-2xl bg-orange-50/80 p-4 text-xs leading-relaxed text-slate-600 sm:grid-cols-2 sm:text-sm">
              <p className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <span><strong className="text-slate-800">After 3 hours:</strong> ₹1,000 per extra hour</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <span><strong className="text-slate-800">Service ends:</strong> by 10 PM</span>
              </p>
              <p className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <span>Additional travelling charges apply outside city limits.</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
