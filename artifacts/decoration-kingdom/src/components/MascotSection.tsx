import { motion, useReducedMotion } from "framer-motion";
import { Camera, Clock3, MapPin, Shirt, Sparkles, Truck, UsersRound } from "lucide-react";

import { WHATSAPP_BOOKING_URL } from "@/lib/whatsapp";

const mascotBookingUrl = new URL(WHATSAPP_BOOKING_URL);
mascotBookingUrl.searchParams.set(
  "text",
  "Hello Decoration Kingdom,\nI would like to book a mascot for my event. Please share the available characters and confirm date availability.",
);

const mascotNames = [
  "Mickey Mouse",
  "Minnie Mouse",
  "Teddy Bear",
  "Cute Unicorn",
  "Panda",
  "Gorilla",
  "Dinosaur",
  "Lion",
  "Rabbit",
  "Elephant",
  "Tiger",
  "Cute Monkey",
  "Princess Mascot",
  "Superhero Mascot",
  "Donald Duck-style cartoon mascot",
  "Cute Bumblebee",
  "Penguin",
  "Olaf-style Snowman",
  "More colourful characters",
];

const includedServices = [
  { icon: Clock3, label: "Up to 3 hours of service" },
  { icon: Shirt, label: "Costume included" },
  { icon: UsersRound, label: "Professional artist included" },
  { icon: Truck, label: "Transportation included" },
];

const additionalCharges = [
  { label: "Extra hours", detail: "₹1,000 per hour" },
  { label: "Maximum service time", detail: "Until 10 PM" },
];

export function MascotSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="mascot-entertainment"
      aria-labelledby="mascot-section-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#fffaf0_0%,#fff_48%,#fff3d6_100%)] py-16 md:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-4"
      >
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Make the celebration come alive
          </span>
          <h2
            id="mascot-section-title"
            className="mt-5 font-display text-3xl font-black tracking-tight text-[color:var(--purple-deep)] sm:text-4xl md:text-5xl"
          >
            Big smiles.{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Bigger memories.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Add a lively mascot appearance to birthdays, school events and family celebrations.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="rounded-[2rem] border border-orange-100 bg-white/85 p-5 shadow-[0_24px_70px_-42px_rgba(154,75,14,0.42)] backdrop-blur-sm sm:p-8">
            <div className="flex items-start gap-4 rounded-2xl bg-orange-50/80 p-4 sm:p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-orange-600 shadow-sm">
                <Camera className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-[color:var(--purple-deep)]">Mascot photo gallery coming soon</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We’ll add real costume photos here as soon as approved images are available.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600">Pick a party favourite</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-[color:var(--purple-deep)] sm:text-2xl">
                    Characters to ask for
                  </h3>
                </div>
                <span className="hidden rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 sm:inline-flex">
                  18+ choices
                </span>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {mascotNames.map((name, index) => (
                  <li
                    key={name}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-200 hover:border-orange-300 hover:bg-orange-50 sm:text-sm ${
                      index % 3 === 0
                        ? "border-orange-200 bg-orange-50/70 text-orange-900"
                        : index % 3 === 1
                          ? "border-amber-200 bg-amber-50/70 text-amber-900"
                          : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-6 text-white shadow-[0_24px_70px_-30px_rgba(194,65,12,0.65)] sm:p-8">
            <div aria-hidden className="absolute -right-10 -top-12 h-48 w-48 rounded-full border-[24px] border-white/10" />
            <div aria-hidden className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-amber-300/15 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-100">Simple, all-in-one pricing</p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-5xl font-black tracking-tight sm:text-6xl">₹4,500</span>
                <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-orange-100">per mascot</span>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {includedServices.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex min-h-14 items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm">
                    <Icon className="h-5 w-5 shrink-0 text-amber-200" />
                    <span className="text-sm font-semibold leading-5 text-white">{label}</span>
                  </div>
                ))}
              </div>

              <a
                href={mascotBookingUrl.toString()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-white px-5 py-4 text-center text-sm font-black tracking-[0.08em] text-orange-700 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
              >
                BOOK YOUR MASCOT NOW
              </a>
              <p className="mt-3 text-center text-xs text-orange-100">
                Message us to check your date and preferred character.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl border border-amber-200/80 bg-white/90 p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-[color:var(--purple-deep)]">A few helpful details</p>
              <p className="text-xs text-slate-500">For a smooth, on-time appearance</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {additionalCharges.map((item) => (
              <div key={item.label} className="rounded-xl bg-amber-50/80 px-4 py-3">
                <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-extrabold text-orange-800">{item.detail}</p>
              </div>
            ))}
            <div className="rounded-xl bg-amber-50/80 px-4 py-3 sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold text-slate-500">Outside city limits</p>
              <p className="mt-1 text-sm font-extrabold leading-5 text-orange-800">Additional travelling charges apply</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
