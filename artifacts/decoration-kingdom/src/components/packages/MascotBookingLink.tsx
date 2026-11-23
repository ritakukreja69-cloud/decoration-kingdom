import { ArrowRight } from "lucide-react";

import { mascotGallery } from "@/lib/mascot-gallery";
import { WHATSAPP_BOOKING_URL } from "@/lib/whatsapp";

export function MascotBookingLink({ packageName }: { packageName: string }) {
  const bookingUrl = new URL(WHATSAPP_BOOKING_URL);
  bookingUrl.searchParams.set(
    "text",
    `Hello Decoration Kingdom! I'd like to add a cartoon mascot to the "${packageName}" package. Please share available characters and booking details.`,
  );

  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-orange-700 sm:text-xs">
            🎭 Optional Cartoon Mascot Add-on
          </p>
          <p className="mt-1 text-lg font-black leading-tight text-[color:var(--purple-deep)]">
            ₹4,500 <span className="text-xs font-bold text-slate-600">per mascot</span>
          </p>
          <p className="text-[11px] font-semibold text-slate-600">Up to 3 hours of event service</p>
        </div>
        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-extrabold text-orange-800 shadow-sm">
          EXTRA
        </span>
      </div>

      <p className="mt-2 text-[11px] font-semibold leading-relaxed text-slate-700 sm:text-xs">
        👘 Costume · 👨‍🎨 Artist · 🚆 Transport included in mascot price
      </p>

      <div className="mt-2 flex gap-1.5" aria-label="Available mascot character styles">
        {mascotGallery.map((character) => (
          <div
            key={character.name}
            className="h-10 w-10 overflow-hidden rounded-lg border border-amber-100 bg-white"
          >
            <img
              src={character.image}
              alt={`${character.name} mascot costume`}
              title={character.name}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      <p className="mt-2 border-t border-amber-200/80 pt-2 text-[10px] leading-relaxed text-slate-600 sm:text-[11px]">
        <span className="font-bold text-slate-700">NOTE:</span> After 3 hours: ₹1,000/hour · Service until 10 PM ·
        Outside city limits: additional travel charges apply.
      </p>

      <a
        href={bookingUrl.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-700 underline decoration-orange-300 underline-offset-4 transition-colors hover:text-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:text-sm"
      >
        Explore Mascots &amp; Book Now
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
