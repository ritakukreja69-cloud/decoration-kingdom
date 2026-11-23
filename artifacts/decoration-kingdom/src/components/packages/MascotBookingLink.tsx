import { ArrowRight } from "lucide-react";

import { WHATSAPP_BOOKING_URL } from "@/lib/whatsapp";

export function MascotBookingLink({ packageName }: { packageName: string }) {
  const bookingUrl = new URL(WHATSAPP_BOOKING_URL);
  bookingUrl.searchParams.set(
    "text",
    `Hello Decoration Kingdom! I'd like to add a fun mascot to the "${packageName}" package. Please share available characters and booking details.`,
  );

  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3.5">
      <p className="text-xs font-extrabold leading-snug text-[color:var(--purple-deep)] sm:text-sm">
        🎭 Make Your Celebration Extra Special!
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Add a Fun Mascot to Your Package – Book Now!
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
