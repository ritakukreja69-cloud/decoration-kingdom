import ringPackage01Image from "@/assets/pkg/ring-ceremony/_custom/ring-package-01.png";
import ringPackage02Image from "@/assets/pkg/ring-ceremony/_custom/ring-package-02.png";
import ringPackage03Image from "@/assets/pkg/ring-ceremony/_custom/ring-package-03.png";
import ringPackage04Image from "@/assets/pkg/ring-ceremony/_custom/ring-package-04.png";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * CENTRAL PACKAGE + PRICE DATA SOURCE
 * ─────────────────────────────────────────────────────────────────────────
 * Every collection page, sub-collection page and the package modal reads
 * from this single file. To change a price, description, inclusion list,
 * duration, area or add-on — edit it ONCE here and it updates everywhere.
 *
 * Images are auto-loaded from `src/assets/pkg/<category>/<subcategory>/*`
 * (or `src/assets/pkg/<category>/_/*` for categories with no subcategory),
 * so dropping a new photo into the right folder automatically creates a
 * new package card — no code changes required.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type CategoryId =
  | "birthday"
  | "anniversary"
  | "proposal"
  | "baby-shower"
  | "naming-ceremony"
  | "ring-ceremony"
  | "welcome-baby"
  | "sequin-decoration"
  | "kids-theme"
  | "christmas-decoration";

export type SubcategoryDef = { id: string; label: string };

export type CategoryDef = {
  id: CategoryId;
  label: string;
  eyebrow: string;
  tagline: string;
  banner: string;
  subcategories?: SubcategoryDef[];
  basePrice: number;
  priceStep: number;
  duration: string;
  area: string;
  includes: string[];
  addons: string[];
};

export type PackageItem = {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  subcategory?: string;
  subcategoryLabel?: string;
  image: string;
  price: number;
  description: string;
  includes: string[];
  duration: string;
  area: string;
  addons: string[];
  notes?: string;
};

/* ---------------------------------------------------------------------- */
/* Image loading                                                          */
/* ---------------------------------------------------------------------- */

const imageModules = import.meta.glob<string>("/src/assets/pkg/**/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const bannerModules = import.meta.glob<string>("/src/assets/pkg/_banners/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

function bannerFor(categoryId: string): string {
  const entry = Object.entries(bannerModules).find(([path]) => path.includes(`/_banners/${categoryId}.`));
  return entry?.[1] ?? Object.values(bannerModules)[0];
}

/** Returns [path, image] pairs sorted for a given category/subcategory folder, skipping the banners folder. */
function imagesFor(categoryId: string, subId?: string): string[] {
  const folder = `/src/assets/pkg/${categoryId}/${subId ?? "_"}/`;
  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(folder))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, img]) => img);
}

/* ---------------------------------------------------------------------- */
/* Category configuration — edit copy, pricing & inclusions here          */
/* ---------------------------------------------------------------------- */

/* Per-package overrides: index matches the sorted image order in the folder */
type PackageOverride = {
  name: string;
  price: number;
  includes: string[];
  addons: string[];
  image?: string;
  duration?: string;
  area?: string;
  notes?: string;
};
const packageOverrides: Record<string, (PackageOverride | null | undefined)[]> = {
  "christmas-decoration": [
    {
      name: "Candy Cane Balloon Ring Setup",
      price: 7999,
      includes: [
        "1 balloon ring setup made with 200 white latex balloons",
        "2 large-size candy stick foil balloons",
        "6 small-size candy stick balloons",
        "10 red latex balloons",
        "Red ribbon",
      ],
      addons: [],
    },
    {
      name: "Merry Christmas Designer Balloon Arch",
      price: 3999,
      includes: [
        "Designer arch of 80 dark green, red and light green latex balloons",
        "5–6 red polka dot balloons",
        "10–15 balloons scattered on the floor",
        "Merry Christmas foil balloon set",
      ],
      addons: [],
    },
    {
      name: "Christmas Gold Frill Balloon Arch",
      price: 3999,
      includes: [
        "Balloon arch made with green latex, red latex and golden metallic balloons",
        "Golden frill curtain",
        "Red and green Merry Christmas balloons",
        "1 Santa foil balloon",
        "1 deer balloon",
        "1 Christmas tree foil balloon",
        "1 candy foil balloon",
      ],
      addons: [],
    },
    {
      name: "Ho Ho Ho Santa Balloon Decor",
      price: 3999,
      includes: [
        "100 green, light green, red and white balloons",
        "2 green frill curtains",
        "1 red frill curtain",
        "HO HO HO Santa foil balloon",
        "2 balloon pillars with Santa Claus foil balloons",
        "1 balloon pillar with a Christmas tree foil balloon",
        "Red ribbons",
      ],
      addons: [],
    },
    {
      name: "Red-Green Christmas Vibes Balloon Decoration",
      price: 4999,
      includes: [
        "1 Christmas theme flex",
        "Balloon arch made with 200 red, white and dark green latex balloons, with golden chrome balloons",
        "20–25 theme-based balloons scattered on the floor",
      ],
      addons: [],
    },
    {
      name: "Christmas Cheer Balloon Backdrop",
      price: 4999,
      includes: [
        "1 balloon arch with 150 red, green, light pink and white latex balloons",
        "15 green chrome balloons",
        "3 light-pink marble balloons",
        "2 large-size candy stick foil balloons",
        "3 small-size candy stick foil balloons",
        "4 candy foil balloons",
        "1 small Christmas tree made of green and red balloons with a red star foil balloon",
      ],
      addons: [],
    },
  ],
  "kids-theme": [
    {
      name: "Mermaid Pastel Balloon Arch",
      price: 2999,
      includes: [
        "Arch of 250 balloons in pastel blue, pastel green, pastel pink, pastel purple, light pink chrome, purple chrome and pink chrome colors",
        "2 pastel green and light blue fringe curtains",
        "1 sea green Happy Birthday bunting",
        "Any 2 Mermaid theme foil balloons (subject to availability)",
        "2 paper fish cutouts",
      ],
      addons: [],
    },
    {
      name: "Sea Theme Customised Flex",
      price: 3999,
      includes: [
        "7 × 5 ft customised sea flex",
        "Arch of 130 balloons in pastel blue, pastel pink, dark blue, dark pink and pastel green",
        "5 theme paper cutouts",
        "20 theme-based balloons scattered on the floor",
      ],
      addons: [],
    },
    {
      name: "Teddy Bear Birthday Setup",
      price: 4999,
      includes: [
        "6 × 6 ft Teddy customised flex",
        "2 clouds of white latex and pastel blue balloons (40 balloons each)",
        "5 metres of white net cloth",
        "2 blue macron balloons",
        "2 white and pastel blue balloon pillars (28 balloons each)",
        "20 theme-based balloons scattered on the floor",
      ],
      addons: [],
    },
    {
      name: "Carnival Birthday Setup",
      price: 5999,
      includes: [
        "6 × 6 ft flex",
        "Arch of 120 yellow, dark blue, light blue and red latex balloons",
        "Happy Birthday cursive bunting",
        "3 big yellow and blue macron balloons",
        "5 multicolour confetti balloons",
        "1 triangle colourful bunting",
        "1 direction board made with paper cutouts and a balloon stand",
        "3 red and blue rosettes",
        "30 theme-based balloons scattered on the floor",
        "1 LED light",
        "3 paper cutouts",
      ],
      addons: [],
    },
    {
      name: "Jungle Safari Canopy Setup",
      price: 2999,
      includes: [
        "5 ft canopy draped with 6 metres of white net and 2 money plant bells",
        "Arch of 55 balloons: 10 green chrome, 10 light green latex, 10 dark green latex, 10 pastel green, 5 orange latex, 5 brown latex and 5 golden chrome, decorated with 2 artificial leaves",
        "1 silver cursive Happy Birthday bunting",
        "5 animal face foil balloons (22 inches)",
        "1 Jungle Safari sign board made with a balloon stand",
        "2 LED lights",
      ],
      addons: [],
    },
    {
      name: "Aeroplane Theme Birthday Canopy",
      price: 3999,
      includes: [
        "5 ft canopy draped with 6 metres of white net and flag bunting",
        "Arch of 65 balloons: 5 blue pastel, 15 white latex, 15 red metallic, 15 dark blue latex, 10 blue polka dot latex and 10 red polka dot latex balloons",
        "1 silver cursive Happy Birthday bunting",
        "9 aeroplane theme cutouts",
        "1 Welcome Aboard sign board made from a balloon stand",
        "2 LED lights",
        "1 bed sheet",
      ],
      addons: [],
    },
    {
      name: "Colourful Baby Shark Theme Canopy",
      price: 4999,
      includes: [
        "5 ft canopy draped with 6 metres of white net and white artificial flower strings",
        "Arch of 50 balloons: 10 each of blue pastel, yellow pastel, orange pastel, green pastel and blue chrome",
        "Multicolour Happy Birthday bunting",
        "10 Baby Shark theme foil balloons",
        "BABY boxes filled with balloons",
        "3 pixel lights",
        "1 bed sheet",
      ],
      addons: [],
    },
    {
      name: "Racing Car Themed Kids Canopy",
      price: 3999,
      includes: [
        "5 ft canopy draped with 6 metres of white net",
        "Arch of 60 balloons: 20 black latex, 20 red latex, 10 polka dot black latex and 10 yellow latex balloons",
        "1 Happy Birthday cursive bunting",
        "5 car theme foil balloons",
        "3 car theme cutouts",
        "1 car theme sign board made from a balloon stand",
        "2 LED lights",
        "1 bed sheet",
      ],
      addons: [],
    },
    {
      name: "Boss Baby Birthday Decor",
      price: 2999,
      includes: [
        "Arch of 50 metallic blue, white and black latex balloons",
        "1 blue frill curtain",
        "Happy Birthday silver letter foil balloons (16 inches)",
        "1 A3 Baby and 2 A3 Blue Boss Baby logo paper cutouts",
        "4 small Boss Baby paper cutouts and 4 small black tie paper cutouts",
        "1 silver numeric foil balloon (30 inches)",
        "50 metallic blue, black and white latex balloons scattered on the floor",
        "1 LED light",
      ],
      addons: [],
    },
    {
      name: "Elephant Magic Birthday Decor",
      price: 5999,
      includes: [
        "6 × 6 ft ring backdrop with customised text on flex",
        "1 cloud of 50 pink pastel, magenta latex and dark pink chrome balloons, with 3 pink macron balloons",
        "1 LED marquee with 25 balloons and butterflies",
        "3 × 3 ft elephant cutout",
        "25 purple pastel balloons",
        "5 pink and white flower bunches",
        "20 multicolour paper butterflies",
      ],
      addons: [],
    },
    {
      name: "Cute Jungle Safari Theme Birthday Decor",
      price: 5999,
      includes: [
        "1 ring stand",
        "1 Jungle theme customised flex",
        "Arch of 200 theme-based balloons",
        "2 green pastel bladder balloons",
        "4 animal foil balloons",
        "1 Jungle theme direction board",
        "1 Jungle Safari car sunboard cutout (3 × 3 ft)",
        "1 LED marquee decorated with money plant bells",
      ],
      addons: [],
    },
    {
      name: "Sonic Theme Birthday Ring Decoration",
      price: 6999,
      includes: [
        "1 ring stand",
        "1 Sonic theme customised flex backdrop",
        "Sonic theme balloon arch of 250 balloons: 60 dark blue latex, 60 light blue latex, 60 yellow latex, 50 red latex and 20 golden chrome balloons, decorated with 9 golden BT balloons",
        "2 Sonic character sunboard cutouts (2 × 2 ft)",
        "5 Sonic theme foil balloons",
        "1 LED marquee decorated with a balloon arch of 30 balloons",
      ],
      addons: [],
    },
    {
      name: "Spider-Man Theme Kids Birthday Decor",
      price: 1999,
      includes: [
        "90 theme-based balloons scattered on the floor",
        "Happy Birthday golden foil balloon",
        "1 Spider-Man, 2 blue star and 2 round Spider-Man foil balloons",
        "1 LED light",
      ],
      addons: [],
    },
    {
      name: "Rainbow Pop It Theme Birthday Decor",
      price: 7999,
      includes: [
        "1 silver sequin backdrop",
        "Happy Birthday neon sign (design as per availability)",
        "Pop It theme arch of 150 balloons: 25 each of yellow pastel, purple pastel, blue pastel, pink pastel, peach pastel and green pastel, decorated with 2 bubble balloons",
        "5 pastel 18-inch balloons: 2 green, 1 pink, 1 purple and 1 yellow",
        "5 theme paper cutouts",
        "1 customised name pink flex (5 × 2.5 ft)",
        "3 Pop It theme sunboard cutouts",
        "1 LED light",
      ],
      addons: [],
    },
    {
      name: "Magical Unicorn Theme Birthday Ring Decor",
      price: 7999,
      includes: [
        "1 Unicorn themed flex",
        "Rainbow arch of 150 pastel balloons",
        "30 pastel balloons on the floor",
        "2 clouds of 50 white balloons each",
        "1 Unicorn cutout (3 × 2 ft)",
        "1 LED marquee",
        "6 small pink and golden star foil balloons",
        "1 Unicorn foil balloon, 2 round foil balloons and 2 pastel pink star foils",
      ],
      addons: [],
    },
    {
      name: "Kids Decoration",
      price: 3999,
      includes: [
        "Arch of 120 theme-based balloons",
        "Happy Birthday golden foil balloon",
        "2 red and light blue frill curtains",
        "1 big blue macron balloon",
        "5 multicolour macron balloons",
        "1 triangle colourful bunting",
        "5 paper cutouts",
        "30 pastel balloons scattered on the floor",
      ],
      addons: [],
    },
    {
      name: "Dinosaur Theme Balloon Wall Decoration",
      price: 5999,
      includes: [
        "Balloon wall of 300 balloons: 60 green latex, 60 green chrome, 50 silver chrome, 20 orange latex, 80 brown latex and 30 green pastel balloons",
        "4 green paper pom-poms",
        "6 money plant leaves",
        "4 artificial leaves",
        "2 dinosaur print sunboard cutouts (3 × 2 ft)",
        "Happy Birthday neon sign (design as per availability)",
      ],
      addons: [],
    },
    {
      name: "Colourful Navratri Ring Decoration",
      price: 5999,
      includes: [
        "Ring setup with white curtains",
        "2 LED lights",
        "5 red marigold artificial chains",
        "5 yellow marigold artificial chains",
        "4 red bell hangings",
        "2 Rajasthani umbrellas",
        "2 pots with red and yellow marigold chains",
      ],
      addons: [],
    },
    {
      name: "Silver Sequin Barbie Doll Decor",
      price: 6999,
      includes: [
        "1 rectangle stand",
        "6 × 6 ft sequin backdrop",
        "Arch of 200 theme-based balloons",
        "2 big pink and white macron balloons",
        "Happy Birthday neon light",
        "Lipstick foil balloon",
        "3 bubble balloons",
        "2 pink heart foil balloons",
        "4 light pink small star foil balloons",
        "8 Barbie theme paper cutouts",
        "1 photobooth with a stand decorated with a silver frill curtain",
      ],
      addons: [],
    },
    {
      name: "Mermaid Theme Birthday Decor",
      price: 4555,
      includes: [
        "Arch of 200 balloons: 50 each of blue chrome, purple chrome, green chrome and golden chrome",
        "10 blue, green, golden and purple chrome balloons scattered on the floor",
        "4 blue confetti balloons",
        "1 silver foil digit balloon (30 inches)",
        "1 cursive foil Happy Birthday",
        "1 A3-size Ariel Mermaid cutout",
        "1 A3-size sheet including 5 underwater elements",
        "1 A4-size King Triton cutout",
        "5 Mermaid theme foil balloons",
        "2 LED lights",
      ],
      addons: [],
    },
    {
      name: "Barbie Wonderland Birthday Party Decor",
      price: 9999,
      includes: [
        "2 arches of 200 balloons: 50 each of pastel pink, white latex, pink latex and magenta",
        "2 big white and pink macron balloons and 3 disco foil balloons",
        "2 light pink heart foil balloons, 4 light pink small star foil balloons and 1 lipstick foil balloon",
        "10 Barbie theme cutouts",
        "6 × 3 ft photobooth with 2 base stands",
        "2 Barbie sunboard cutouts (5 × 3 ft) with base stands",
        "6 × 3 ft Happy Birthday sunboard panel with base stand",
        "4 × 3 ft Barbie pink sunboard panel cutout with base stand",
        "2 mirror balls",
      ],
      addons: [],
    },
    {
      name: "Avengers Iron Man Birthday Decor",
      price: 3999,
      includes: [
        "Arch of 120 balloons: 20 each of yellow latex, dark blue latex, red latex, green latex, silver chrome and black metallic",
        "3 red, green and dark blue frill curtains",
        "Happy Birthday silver cursive foil",
        "5-piece Iron Man set",
        "6 paper cutouts",
        "20 balloons on the floor",
      ],
      addons: [],
    },
  ],
  "baby-shower": [
    // index 0 — bs-11.png — Package 1
    {
      name: "Gender Neutral Baby Shower Balloon",
      price: 3499,
      includes: [
        "BABY SHOWER Golden Foil Balloon Set",
        "Baby Boy Stroller Foil Balloon",
        "Baby Girl Stroller Foil Balloon",
        "It's a Boy Foot Foil Balloon",
        "It's a Girl Foot Foil Balloon",
        "It's a Boy Bottle Foil Balloon",
        "It's a Girl Bottle Foil Balloon",
        "Golden Moon Foil Balloon",
        "Baby Cartoon Foil Balloons – Boy & Girl",
        "Mom To Be Sash",
        "Pink, Blue, White Latex Balloons for Frame",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 1 — bs-12.png — Package 2
    {
      name: "Oh Baby Orange White Balloon Arch",
      price: 2999,
      includes: [
        "OH BABY Silver Foil Balloon Set",
        "Baby on Moon Foil Balloon",
        "Silver Star Foil Balloons",
        "Orange Latex Balloons",
        "White Latex Balloons",
        "Peach/Pink Latex Balloons",
        "Fairy LED Lights",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 2 — bs-13.png — Package 3
    {
      name: "Oh Baby Gender Reveal Pink Blue Balloon Decor",
      price: 3799,
      includes: [
        "OH BABY Silver Foil Balloon Set",
        "Baby on Moon Foil Balloon",
        "IT'S A GIRL Bottle Foil Balloon",
        "Rainbow Card Cutouts",
        "Baby Stroller Card Cutout",
        "Airplane Card Cutouts",
        "Silver Star Foil Balloon",
        "Blue Tinsel Curtain",
        "Pink Tinsel Curtain",
        "Blue Latex Balloons",
        "Pink Latex Balloons",
        "White Latex Balloons",
        "Fairy LED Lights",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 3 — bs-14.png — Package 4
    {
      name: "Oh Baby Gender Reveal Gold Pink Blue Balloon",
      price: 3999,
      includes: [
        "OH BABY Golden Foil Balloon Set",
        "It's a Girl Foot Foil Balloon",
        "It's a Boy Foot Foil Balloon",
        "Gold Chrome Latex Balloons",
        "Light Blue Latex Balloons",
        "Baby Pink Latex Balloons",
        "White Latex Balloons",
        "Peach Latex Balloon",
        "Confetti Clear Balloons",
        "Fairy LED Lights",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 4 — bs-15.png — Package 5
    {
      name: "Baby Shower Pink Purple Blue Balloon Arch",
      price: 3599,
      includes: [
        "Baby Shower Golden Banner",
        "It's a Boy Round Foil Balloons",
        "It's a Girl Round Foil Balloons",
        "Baby Boy Foil Balloon",
        "Baby Girl Foil Balloon",
        "Pink Latex Balloons",
        "Purple Latex Balloons",
        "Light Blue Latex Balloons",
        "Rose Gold Chrome Latex Balloons",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 5 — bs-16.png — Package 6
    {
      name: "It's A Girl Pink Gold Baby Shower Balloon",
      price: 3299,
      includes: [
        "BABY SHOWER Golden Foil Balloon Set",
        "It's a Girl Bottle Foil Balloon",
        "It's a Girl Foot Foil Balloon",
        "Baby Girl Foil Balloon",
        "Pink Latex Balloons",
        "Baby Pink Latex Balloons",
        "White Latex Balloons",
        "Gold Chrome Latex Balloons",
        "Rose Gold Chrome Latex Balloons",
        "Pink Foil Curtain Backdrop",
        "Artificial Flower Bouquets",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 6 — bs-17.png — Package 7
    {
      name: "Gender Reveal Baby Shower Pink Blue Gold Balloon",
      price: 3499,
      includes: [
        "Baby Shower Golden Banner",
        "Baby Boy Stroller Foil Balloon",
        "Baby Girl Stroller Foil Balloon",
        "It's a Boy Bottle Foil Balloon",
        "It's a Girl Bottle Foil Balloon",
        "It's a Boy Foot Foil Balloon",
        "It's a Girl Foot Foil Balloon",
        "Baby Boy Foil Balloon",
        "Baby Girl Foil Balloon",
        "Mom To Be Sash",
        "Pink Latex Balloons",
        "Light Blue Latex Balloons",
        "Gold Chrome Latex Balloons",
        "Confetti Clear Balloons",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 7 — bs-18.png — Package 8
    {
      name: "Baby Girl Pink Blue Gold Baby Shower Balloon",
      price: 3899,
      includes: [
        "Baby Shower Golden Banner",
        "Baby Girl Heart Foil Balloon",
        "It's a Girl Foot Foil Balloon",
        "Baby Girl Foil Balloon",
        "Pink Latex Balloons",
        "Light Blue Latex Balloons",
        "Gold Chrome Latex Balloons",
        "White Round Backdrop Board",
        "Pink Blue Striped Backdrop",
        "Confetti Clear Balloons",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
    // index 8 — bs-19.png — Package 9
    {
      name: "Royal Baby Shower Gold White Pink Balloon",
      price: 4299,
      includes: [
        "Baby Shower Golden Banner",
        "Baby Girl Heart Foil Balloon",
        "It's a Girl Foot Foil Balloon",
        "Baby Girl Foil Balloon",
        "Pink Latex Balloons",
        "Light Blue Latex Balloons",
        "Gold Chrome Latex Balloons",
        "White Round Backdrop Board",
        "Pink Blue Striped Backdrop",
        "Confetti Clear Balloons",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
    },
  ],
  "birthday-adult": [
    {
      name: "Classic Black & Gold Birthday Decor",
      price: 1499,
      includes: [
        "Black & Gold Chrome Balloon Arch – 8×8 ft",
        "Gold Fringe Curtain Backdrop – Full Wall",
        '"HAPPY BIRTHDAY" Black Banner with Gold Text',
        "Gold & Black Balloon Border – Top Row",
        "Floor Balloon Scatter – Black & Gold Mix",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Royal Balloon Room Decor",
      price: 1699,
      includes: [
        "Red & Gold Chrome Balloon Arch – 8×8 ft",
        "Gold Fringe Curtain Backdrop – 2 Panels",
        '"HAPPY BIRTHDAY" Red Foil Letter Balloons',
        "Gold Star Foil Balloons × 2",
        "Floor Balloon Scatter – Red & Gold Mix",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Royal Butterfly Birthday Decor",
      price: 1999,
      includes: [
        "Purple & Gold Chrome Balloon Arch – 8×8 ft",
        "Golden Foil Fringe Curtain Backdrop – Full Wall",
        "Giant Butterfly Foil Balloon – Purple & Gold",
        '"HAPPY BIRTHDAY" Black Banner with Gold Text',
        "Balloon Clusters – Purple, Lavender & Gold",
        "Floor Scatter Balloons",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Black Gold Mustard 20th Birthday",
      price: 4999,
      includes: [
        "Black, Gold, Mustard & Pearl White Balloon Arch",
        "Black + Gold Fringe Curtain Backdrop",
        "HAPPY BIRTHDAY Silver Foil Letter Balloons",
        "20 Number Silver Foil Balloons",
        "Star Foil Balloons – Gold + Silver",
        "Balloon Flower Bunches – Mustard with Black Center",
        "Decorative Golden Pedestal with Flower Vase",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
    {
      name: "Black White Gold Star Birthday",
      price: 3999,
      includes: [
        "Black, White & Gold Chrome Balloon Arch",
        "Black Fringe Curtain Backdrop with Fairy Lights",
        "Happy Birthday Silver Cursive Foil Balloons",
        "Gold Star Foil Balloons",
        "Silver Star Foil Balloons",
        "Decorative Cylinder Pedestals",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
    {
      name: "Terracotta Boho Birthday",
      price: 5999,
      includes: [
        "Terracotta, Peach, Nude & Cream Balloon Garland",
        "Boho Rainbow Backdrop Panel with 'Happy Birthday' Text",
        "Cluster Balloon Bouquet on Top Right",
        "Floor Balloon Decor",
        "Setup & Installation by Professionals",
      ],
      addons: ["Transparent Balloon Boxes (Add-on – contact team)", "Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Blue Purple Galaxy Birthday",
      price: 3499,
      includes: [
        "Blue, Purple, Light Blue & White Balloon Arch",
        "Silver Fringe Curtain Backdrop",
        "HAPPY BIRTHDAY Paper Banner – Light Blue with Gold Text",
        "Number Foil Balloon on Balloon Column",
        "Star Foil Balloons – Blue",
        "Silver Starburst Foil Balloons",
        "Confetti Balloons – Clear with Blue Dots",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
    {
      name: "Black Gold Silver Classic Birthday",
      price: 2999,
      includes: [
        "Black, Gold, Silver & White Balloon Decor",
        "HAPPY BIRTHDAY Silver Foil Letter Balloons",
        "Fairy Light Curtain Backdrop",
        "Tassel Garland – Black, Gold, Silver & Grey",
        "Heart Shape Silver Foil Balloon Bouquets",
        "Top Balloon Row – Black, Gold, Silver, White",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
    {
      name: "Pink Purple Neon Birthday Wall",
      price: 5499,
      includes: [
        "Full Balloon Wall – Pink, Purple, Lavender & Silver Chrome",
        "Happy Birthday Neon LED Sign",
        "Silver Heart Foil Balloon",
        "Silver Cube Foil Balloon",
        "Balloon Installation Frame",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
    {
      name: "Sage Green Gold Rustic Birthday",
      price: 6499,
      includes: [
        "Sage Green, White, Gold & Rose Gold Balloon Garland",
        "Wooden Panel Backdrop with 'Happy Birthday' White Acrylic Sign",
        "Artificial Green Vine Leaves",
        "Decorative Golden Pedestal with Flower Vase",
        "White & Cream Artificial Flower Arrangement",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
    {
      name: "Pink White Silver Fringe Birthday",
      price: 3999,
      includes: [
        "Pink, Baby Pink & White Balloon Arch",
        "Silver Fringe Curtain Backdrop with Fairy Lights",
        "HAPPY BIRTHDAY Peach Banner with Gold Text",
        "Confetti Balloons – Clear with Silver Confetti",
        "Pink Paper Fan Decor",
        "Large Paper Flower with Pedestal",
        "Mini Teddy + Disco Balls",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
    },
  ],
  "anniversary": [
    // ── index 0 — anniversary-08.png ──
    {
      name: "Royal Blue Gold Anniversary Arch",
      price: 6499,
      includes: [
        "Blue, Gold & White Organic Balloon Arch",
        "Teal + Gold Fringe Curtain Backdrop",
        "Happy Anniversary Gold Foil Banner",
        "Silver Butterfly Cutout Decor",
        "LED Fairy Light Accents",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "LED name board upgrade", "Candlelight dinner setup"],
    },
    // ── index 1 — anniversary-09.png ──
    {
      name: "Budget Balloon Bash Package",
      price: 1499,
      includes: [
        "100 Latex Balloons – Pastel / Metallic / Chrome as per theme",
        '"HAPPY BIRTHDAY" or "HAPPY ANNIVERSARY" Silver Foil – 1 Set',
        "Basic Balloon Arch / Wall – 8 ft to 10 ft",
        "Floor Balloon Scatter – 20–30 pcs",
        "Tape + Setup + Installation by Professionals",
        "Duration: 3–4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "LED name board upgrade", "Candlelight dinner setup"],
    },
    // ── index 2 — anniversary-10.png ──
    {
      name: "Lavender Silver 1st Anniversary",
      price: 5999,
      includes: [
        "Purple, Pink & Silver Chrome Balloon Garland",
        "Happy Anniversary Silver Foil Letter Balloons",
        "'1' Silver Foil Number Balloon",
        "LED Fairy Light Curtain Backdrop",
        "Butterfly & Heart Foil Balloons",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "Champagne table styling", "LED name board upgrade"],
    },
    // ── index 2 — anniversary-10.png ──
    {
      name: "Red Romantic Anniversary Setup",
      price: 7999,
      includes: [
        "Red & Silver Chrome Balloon Arch",
        "Shimmer Sequin Panel Backdrop",
        "Happy Anniversary Neon LED Sign",
        "Artificial Rose Flower Clusters",
        "Silver Butterfly Cutout Decor",
        "Decorative Cake Pedestal",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh rose bouquet", "Champagne table styling", "Extra neon sign upgrade"],
    },
    // ── index 3 — anniversary-11.png ──
    {
      name: "Mint Green Better Together",
      price: 6999,
      includes: [
        "Mint Chrome, White & Lavender Balloon Arch",
        "LED Fairy Light Curtain Backdrop",
        "'Better Together' Neon LED Sign",
        "Artificial Flower Bunches",
        "2 Decorative Cylinder Pedestals with Florals",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "Champagne table styling", "Candlelight dinner setup"],
    },
    // ── index 4 — anniversary-12.png ──
    {
      name: "Golden Peach 25th Anniversary",
      price: 8999,
      includes: [
        "Peach, Gold & White Balloon Ring Hoop",
        "Happy Anniversary Neon LED Sign",
        "'25' LED Marquee Number Lights",
        "Golden Palm Leaf Decor",
        "Decorative Lanterns",
        "LED Fairy Light Strings",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "Champagne table styling", "Premium neon sign upgrade"],
    },
    // ── index 5 — anniversary-13.png ──
    {
      name: "White Gold Elegant Anniversary",
      price: 4999,
      includes: [
        "White & Gold Balloon Arch",
        "Golden Fringe Curtain Backdrop",
        "Happy Anniversary Gold Foil Banner",
        "LED Fairy Light Accents",
        "Confetti Balloons",
        "Golden Palm Leaf Decor",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "Cake (1 kg, on request)", "Candlelight dinner setup"],
    },
    // ── index 6 — anniversary-14.png ──
    {
      name: "Rose Gold Black Anniversary",
      price: 5499,
      includes: [
        "Rose Gold, Black & White Balloon Garland",
        "Rose Gold Fringe Curtain Backdrop",
        "Happy Anniversary Foil Letter Balloons",
        "Confetti Balloons",
        "Fairy Light Accents",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "LED name board upgrade", "Candlelight dinner setup"],
    },
    // ── index 7 — anniversary-15.png ──
    {
      name: "Pink Rose Anniversary Balloons",
      price: 3499,
      includes: [
        "Pink & Silver Ceiling Balloons",
        "Happy Anniversary Foil Balloons",
        "Star Foils",
        "Fairy Lights",
        "Floor Balloon Pool",
      ],
      notes: "Simple & Cute Setup. Best for Room Decoration",
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "Premium cake table styling", "Candlelight dinner setup"],
    },
    // ── index 8 — anniversary-16.png ──
    {
      name: "Red Hearts Romantic Night",
      price: 6999,
      includes: [
        "Red Balloon Arch",
        "Heart Foil Balloons",
        "Ring Foil Balloon",
        "Happy Anniversary Foil Letter Balloons",
        "LED Fairy Light Strings",
        "Rose Petal + T-Light Double Heart Floor Art",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh rose bouquet", "Champagne table styling", "Candlelight dinner upgrade"],
    },
    // ── index 9 — anniversary-17.png ──
    {
      name: "Black Gold Silver 25th Anniversary",
      price: 7499,
      includes: [
        "Black, Gold & Silver Balloon Arch",
        "Black Fringe Curtain Backdrop",
        "Happy Anniversary Gold Foil Letter Balloons",
        "25 Number Gold Foil Balloons",
        "Champagne Bottle Foil Balloon",
        "Star Balloon Pillars",
        "Floor Balloon Bunches",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Champagne table styling", "Fresh flower bouquet"],
    },
    // ── index 10 — anniversary-18.png ──
    {
      name: "Rose Gold Shimmer Anniversary",
      price: 4999,
      includes: [
        "Rose Gold, Peach & White Balloon Garland",
        "Rose Gold Shimmer Curtain Backdrop",
        "Happy Anniversary Rose Gold Foil Letter Balloons",
        "Star & Round Foil Balloons",
        "Confetti Balloons",
        "LED Fairy Lights",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Fresh flower bouquet", "Premium cake table styling", "Candlelight dinner setup"],
    },
  ],
  "birthday-baby-boy": [
    {
      name: "Royal Blue & Silver Classic 1st Birthday",
      price: 3499,
      includes: [
        "Blue + Silver Chrome Balloon Arch",
        "Silver Fringe Curtain Backdrop",
        '"HAPPY BIRTHDAY" Blue Banner with Gold Text',
        "Blue Star Foil Balloons",
        "Gift Box Props – Blue",
        "Floor Confetti Scatter – Blue & Silver",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
    {
      name: "Classic Black & Gold Birthday Decor",
      price: 1499,
      includes: [
        "Black & Gold Chrome Balloon Arch – 8×8 ft",
        "Gold Fringe Curtain Backdrop – Full Wall",
        '"HAPPY BIRTHDAY" Black Banner with Gold Text',
        "Gold & Black Balloon Border – Top Row",
        "Floor Balloon Scatter – Black & Gold Mix",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Royal Balloon Room Decor",
      price: 1699,
      includes: [
        "Red & Gold Chrome Balloon Arch – 8×8 ft",
        "Gold Fringe Curtain Backdrop – 2 Panels",
        '"HAPPY BIRTHDAY" Red Foil Letter Balloons',
        "Gold Star Foil Balloons × 2",
        "Floor Balloon Scatter – Red & Gold Mix",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Royal Butterfly Birthday Decor",
      price: 1999,
      includes: [
        "Purple & Gold Chrome Balloon Arch – 8×8 ft",
        "Golden Foil Fringe Curtain Backdrop – Full Wall",
        "Giant Butterfly Foil Balloon – Purple & Gold",
        '"HAPPY BIRTHDAY" Black Banner with Gold Text',
        "Balloon Clusters – Purple, Lavender & Gold",
        "Floor Scatter Balloons",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Construction / JCB Theme Birthday",
      price: 3899,
      includes: [
        "Yellow, Black, Orange, Peach Balloon Arch + Floor Scatter",
        "Gold Fringe Curtain Backdrop",
        '"HAPPY BIRTHDAY" Silver Foil Letter Balloons',
        "Crane Foil Balloon + Excavator Foil Balloon",
        "Construction Vehicle Round Foils ×2",
        "Blue Star Foil Balloon",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
    {
      name: "Dinosaur Jungle Theme Birthday",
      price: 3799,
      includes: [
        "Green, Teal, Orange, Gold Balloon Garland",
        "Green Fringe Curtain Backdrop",
        '"HAPPY BIRTHDAY" Gold Foil Letter Balloons',
        "T-Rex Dinosaur Foil Balloon",
        "Dinosaur Printed Round Foils ×2",
        "Green Star Foil Balloons ×2 + Leopard Print Balloons",
        "Gold Tassels + Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
    {
      name: "Wild One Jungle Safari Theme",
      price: 3799,
      includes: [
        "Green, Light Green, Gold Balloon Arch",
        '"WILD" Gold Foil + "One" Silver Foil Letter Balloons',
        "Giraffe, Lion, Tiger, Zebra, Monkey Animal Foil Balloons ×5",
        "Artificial Green Vine Curtain Backdrop",
        "Green Leaf Props + Fairy Lights",
        'Cake Table with "One" Topper',
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
    {
      name: "Cocomelon Pastel Theme Birthday",
      price: 3499,
      includes: [
        "Pastel Balloon Wall – Mint, Yellow, Orange, Lavender, Blue",
        '"HAPPY BIRTHDAY" Cocomelon Printed Banner',
        "JJ Foil Balloon + 2 Cocomelon Round Foils",
        "Rainbow Star Foil + 2 Silver Star Foils",
        "Traffic Light Prop",
        "Small Balloon Clusters + Cloud Balloons",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
    {
      name: "Mickey Mouse Classic Theme Birthday",
      price: 3599,
      includes: [
        "Red, Black, Yellow Balloon Arch + Floor Scatter",
        "Mickey Mouse Printed Backdrop – Red",
        '"HAPPY BIRTHDAY" Text on Backdrop',
        "Mickey Mouse Standing Foil Balloon",
        'Number "2" Silver Foil Balloon',
        "Polka Dot Balloons – Red & Black",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
    {
      name: "Sonic The Hedgehog Theme Birthday",
      price: 3799,
      includes: [
        "Blue, Light Blue Balloon Arch",
        "Silver + Blue Fringe Curtain Backdrop",
        '"Happy Birthday" Silver Foil Letters',
        "Sonic Foil Balloon",
        'Number "7" Silver Foil Balloon',
        "Blue Heart Foil Balloons + Red & Silver Star Foils",
        "Gold Ring Props + Fairy Lights",
        "Floor Balloon Clusters",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Number foil balloon upgrade", "LED name board", "Extra balloon garland"],
    },
  ],
  "birthday-baby-girl": [
    {
      name: "Barbie Glam Wall Theme",
      price: 3599,
      includes: [
        "Pink, Hot Pink, Rose Gold, White, Silver Chrome Balloon Wall",
        '"Happy Birthday" Silver Foil Letter Balloons',
        "Barbie Logo Foils ×4 + Barbie Car Foils",
        "Pink Heart Foil Balloon ×2 + Pink Star Foil Balloons ×3",
        "Barbie Lipstick Foil Balloon",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Cake table styling", "Extra foil character balloons"],
    },
    {
      name: "Classic Black & Gold Birthday Decor",
      price: 1499,
      includes: [
        "Black & Gold Chrome Balloon Arch – 8×8 ft",
        "Gold Fringe Curtain Backdrop – Full Wall",
        '"HAPPY BIRTHDAY" Black Banner with Gold Text',
        "Gold & Black Balloon Border – Top Row",
        "Floor Balloon Scatter – Black & Gold Mix",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Royal Balloon Room Decor",
      price: 1699,
      includes: [
        "Red & Gold Chrome Balloon Arch – 8×8 ft",
        "Gold Fringe Curtain Backdrop – 2 Panels",
        '"HAPPY BIRTHDAY" Red Foil Letter Balloons',
        "Gold Star Foil Balloons × 2",
        "Floor Balloon Scatter – Red & Gold Mix",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Royal Butterfly Birthday Decor",
      price: 1999,
      includes: [
        "Purple & Gold Chrome Balloon Arch – 8×8 ft",
        "Golden Foil Fringe Curtain Backdrop – Full Wall",
        "Giant Butterfly Foil Balloon – Purple & Gold",
        '"HAPPY BIRTHDAY" Black Banner with Gold Text',
        "Balloon Clusters – Purple, Lavender & Gold",
        "Floor Scatter Balloons",
        "Professional Setup & Installation",
        "Duration: 4 Hours",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling"],
    },
    {
      name: "Princess Castle Theme",
      price: 4299,
      includes: [
        "Pastel Balloon Arch – Yellow, Pink, Light Blue, Lavender",
        "Silver Fringe Curtains ×2 with Fairy Lights Backdrop",
        '"Happy Birthday" Silver Foil Letters',
        'Number "1" Silver Foil Balloon',
        "Aurora Princess Cutout + Snow White Princess Cutout",
        "Castle Tower Prop Boxes ×2 with Balloons Inside",
        "Butterfly Stickers + Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Cake table styling", "Extra foil character balloons"],
    },
    {
      name: "Barbie Dream Theme",
      price: 3699,
      includes: [
        "Pink, Light Pink, Silver, Purple Balloon Arch",
        "Purple + Silver Fringe Curtains",
        '"Happy Birthday" Silver Foil Letters',
        "Barbie Face Cutout + Barbie Logo Foils ×4",
        "Barbie Lipstick Foil Balloon",
        "Pink Heart Foil + Pink Star Foil + Silver Star Foil",
        "Butterfly Stickers + Fairy Lights",
        "Floor Balloon Scatter",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Cake table styling", "Extra foil character balloons"],
    },
    {
      name: "Cocomelon Rainbow Theme",
      price: 3499,
      includes: [
        "Rainbow Gradient Balloon Wall – Yellow, Green, Blue, Purple, Pink",
        '"Happy Birthday" Cocomelon Printed Banner',
        "JJ Foil Balloon + Cocomelon Round Foil",
        'Number "1" LED Light',
        "Silver Star Foil Balloons ×2",
        "Traffic Light Prop",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Cake table styling", "Extra foil character balloons"],
    },
    {
      name: "Pink Purple Neon Birthday Wall",
      price: 5499,
      includes: [
        "Full Balloon Wall – Pink, Purple, Lavender & Silver Chrome",
        "Happy Birthday Neon LED Sign",
        "Silver Heart Foil Balloon",
        "Silver Cube Foil Balloon",
        "Balloon Installation Frame",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Cake table styling", "Extra foil character balloons"],
    },
    {
      name: "Mickey Mouse Classic Theme Birthday",
      price: 3599,
      includes: [
        "Red, Black, Yellow Balloon Arch + Floor Scatter",
        "Mickey Mouse Printed Backdrop – Red",
        '"HAPPY BIRTHDAY" Text on Backdrop',
        "Mickey Mouse Standing Foil Balloon",
        'Number "2" Silver Foil Balloon',
        "Polka Dot Balloons – Red & Black",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Cake table styling", "Extra foil character balloons"],
    },
  ],
  "welcome-baby": [
    // index 0 — wb-01.png — Welcome Baby Girl Decoration
    {
      name: "Welcome Baby Girl Decoration",
      price: 3499,
      includes: [
        "Backdrop: Pink + Silver Foil Curtains",
        "Balloon Arch: Pink + White + Silver Chrome Balloons",
        "WELCOME Silver Foil Balloon Set",
        "BABY GIRL Rose Gold Foil Balloon Set",
        "Pink Star Foil Balloons",
        "Golden Baby Face Foil Balloon",
        "A New Little Princess Round Foil Balloons",
        "Pink It's A Girl Latex Balloons",
        "LED Fairy Lights",
        "Floor Base: Pink + White Balloon Cluster",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 1 — wb-02.png — Welcome Babies Decoration
    {
      name: "Welcome Babies Decoration",
      price: 3499,
      includes: [
        "Backdrop: Pink + Blue Curtain with LED Fairy Lights",
        "Balloon Arch: Blue + Pink + White Balloon Garland - Both Sides",
        "WELCOME BABIES Silver Foil Balloon Set",
        "Baby Boy Face Foil Balloon",
        "Baby Girl Face Foil Balloon",
        "Foot Shape Foil Balloons - It's a Boy + It's a Girl",
        "Floor Decor: Blue + Pink + White Balloon Scatter",
        "Jumbo Pink + Blue Balloons for height",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 2 — wb-03.png — Welcome Baby Boy Decoration
    {
      name: "Welcome Baby Boy Decoration",
      price: 3299,
      includes: [
        "Backdrop: Blue + Silver Foil Curtains",
        "Balloon Arch: Light Blue + White + Dark Blue Chrome Balloon Garland",
        "WELCOME BABY BOY Silver Foil Balloon Set",
        "Golden Baby Boy Face Foil Balloon",
        "Dark Blue Star Foil Balloons",
        "A New Little Prince Round Foil Balloons",
        "Blue It's A Boy Latex Balloons",
        "Floor Base: Light Blue + White Balloon Cluster",
        "LED Fairy Lights",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 3 — wb-04.png — Oh Baby Butterfly Theme Decoration
    {
      name: "Oh Baby Butterfly Theme Decoration",
      price: 4299,
      includes: [
        "Backdrop: White Curtain with Warm LED Fairy Lights",
        "Balloon Arch: Pink + White + Rose Gold Chrome + Confetti Balloon Garland - Full Frame",
        "Oh Baby Gold Text on White Round Board",
        "Butterfly Cutouts on Balloons",
        "Floor Decor: Pink + Rose Gold Balloon Cluster",
        "Clear Confetti Balloons",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 4 — wb-05.png — It's A Girl Colorful Theme Decoration
    {
      name: "It's A Girl Colorful Theme Decoration",
      price: 3899,
      includes: [
        "Backdrop: Warm LED Fairy Lights",
        "Balloon Arch: Yellow + Purple + Pink + White Balloon Garland",
        "Banner: IT'S A GIRL Pink-Gold Bunting",
        "baby Silver Foil Balloon Set",
        "Baby Girl Face Foil Balloon",
        "Baby Stroller Foil Balloon - Baby Girl",
        "Foot Shape Foil Balloon - It's a Girl!",
        "Round It's a Girl Foil Balloon",
        "Silver Moon Foil Balloon",
        "Butterfly Cutouts",
        "Floor Base: Yellow + Purple + Pink Balloon Cluster",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 5 — wb-06.png — Princess Baby Girl Decoration
    {
      name: "Princess Baby Girl Decoration",
      price: 3399,
      includes: [
        "Balloon Arch: Light Pink + White + Clear Confetti Balloon Garland - Half Circle",
        "Silver Palm Leaf Cutouts",
        "Princess Round Foil Balloons",
        "Baby Girl Face Foil Balloon",
        "Baby Bottle Foil Balloon - It's a Girl",
        "Foot Shape Foil Balloon - It's a Girl!",
        "Floor Decor: Light Pink + White + Clear Balloon Scatter",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 6 — wb-07.png — Prince Baby Boy Decoration
    {
      name: "Prince Baby Boy Decoration",
      price: 3399,
      includes: [
        "Balloon Arch: Light Blue + White Balloon Garland - Half Circle",
        "Prince Round Foil Balloons",
        "Green Palm Leaf Cutouts",
        "Custom Frame Posters with Baby Name - JAMES Foil Balloons",
        "Baby Boy Face Foil Balloon",
        "Baby Bottle Foil Balloon - It's A Boy",
        "Foot Shape Foil Balloon - It's a Boy!",
        "Floor Decor: Light Blue + White + Big Balloons Cluster",
        "Add-ons: Flower Vase with Fresh Flowers, White Wire Balloon Stands",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 7 — wb-08.png — Royal Oh Baby Decoration
    {
      name: "Royal Oh Baby Decoration",
      price: 3599,
      includes: [
        "Backdrop: Silver + Purple Foil Curtains",
        "OH Silver Foil Balloon Set",
        "BABY Silver Foil Balloon Set",
        "Balloon Garland: Purple + Lavender + White + Gold Chrome + Pearl White Balloon Arch - Both Sides",
        "Floor Decor: White + Gold Balloon Scatter",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 8 — wb-09.png — Welcome Baby Boy Decoration (Golden)
    {
      name: "Welcome Baby Boy Decoration",
      price: 3599,
      includes: [
        "Backdrop: LED Fairy Lights with hanging setup",
        "WELCOME BABY BOY Golden Foil Balloon Set",
        "Blue Baby Foot Shape Foil Balloons",
        "Silver Star Foil Balloons",
        "Balloon Decor: Blue + White + Silver Chrome Balloon Frame/Arch",
        "Floor Base: White + Blue Balloon Cluster",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
    // index 9 — wb-10.png — Welcome Home Baby Girl Room Decoration
    {
      name: "Welcome Home Baby Girl Room Decoration",
      price: 4299,
      includes: [
        "WELCOME HOME Silver Foil Balloon Set",
        "Pink Baby Bottle Foil Balloon - It's a Girl",
        "Baby Girl Face Foil Balloon with Bow",
        "Bed Decor: Pink + White Latex Balloon Scatter in Heart Shape",
        "Floor Decor: Pink + White Balloon Scatter",
        "Table Accents: Pink + White Balloon Bouquets for Side Tables",
        "Prop: BABY Transparent Boxes with Lights + Balloons Inside",
        "Setup & Labour included",
      ],
      addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
    },
  ],
  "proposal": [
    // index 0 — proposal-08.png — I Love You Balloon Frame
    {
      name: "I Love You Balloon Frame",
      price: 2999,
      includes: [
        "Balloon Frame: Red + White Latex Balloon Square Arch",
        "I LOVE YOU Red Foil Balloon Set - Vertical",
        "Big Red Heart Foil Balloon",
        "Floor Accents: Red + White Balloon Scatter",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 1 — proposal-09.png — Romantic Love Balloon Backdrop
    {
      name: "Romantic Love Balloon Backdrop",
      price: 3699,
      includes: [
        "Balloon Arch: Red + White Latex Balloon Arch - Full Frame",
        "Backdrop: Warm LED Fairy Light Curtain",
        "Love Red Script Foil Balloon",
        "Big Red Heart Foil Balloon - Center",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 9 — proposal-10.png — Cute Teddy Love Decoration
    {
      name: "Cute Teddy Love Decoration",
      price: 2899,
      includes: [
        "I LOVE YOU Golden Foil Balloon Set",
        "Big Brown Teddy Bear Foil Balloon with Love You Heart",
        "Red Heart Shape Foil Balloons - Top Border + Side Bouquets",
        "Heart balloons top border + side bouquets with weights + Center Teddy setup",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 10 — proposal-11.png — Pink Red Love Glam Decoration
    {
      name: "Pink Red Love Glam Decoration",
      price: 3899,
      includes: [
        "Backdrop: Red Shimmer Foil Curtains",
        "Balloon Garland: Red + Pink + Baby Pink + White Balloon Arch with Heart Print Balloons - L Shaped",
        "love Silver Script Foil Balloon - Center",
        "Heart Stack Foil Balloons with Confetti - Right Side",
        "Floor Decor: Pink + Red + White Balloon Scatter",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 11 — proposal-12.png — Peach Gold Love Aesthetic Decoration
    {
      name: "Peach Gold Love Aesthetic Decoration",
      price: 4299,
      includes: [
        "Balloon Garland: Peach + Baby Pink + White + Gold Chrome Balloon Arch - L Shape",
        "love Golden Script Foil Balloon - Center",
        "Peach Square Boxes + Vase with Pampas Grass",
        "Floor Decor: Peach + Baby Pink Balloon Cluster near boxes",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 12 — proposal-13.png — Circle Ring Valentine Decoration
    {
      name: "Circle Ring Valentine Decoration",
      price: 4999,
      includes: [
        "Frame: Golden Circle Ring Stand - 7ft",
        "Balloon Garland: Red + Pink + Baby Pink + White + Gold Chrome Balloon Arch on one side of ring",
        "BE MY VALENTINE Golden Foil Balloon Set - Center",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 13 — proposal-14.png — Proposal Room Decoration
    {
      name: "Proposal Room Decoration",
      price: 2999,
      includes: [
        "Ceiling Decor: Maroon + Peach + White + Rose Gold Balloon Mix with Ribbons + Curlies",
        "WILL YOU MARRY ME Rose Gold Foil Balloon Set - Wall Hanging",
        "Bed Decor: Red Rose Petals Scatter on Bed",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 14 — proposal-15.png — Red Heart LED Walkway Decoration
    {
      name: "Red Heart LED Walkway Decoration",
      price: 4299,
      includes: [
        "I LOVE U Red Foil Balloon Set - Wall",
        "Red Heart Shape Foil Balloons on Sticks - on each side",
        "Floor Decor: Red Latex Balloon Border - Lines",
        "Rose Petals Walkway - Pink/Red Mix",
        "LED Tea Light Candles",
        "Backdrop: Warm LED Fairy Light Curtain",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 15 — proposal-16.png — Marry Me LED Walkway Decoration
    {
      name: "Marry Me LED Walkway Decoration",
      price: 4299,
      includes: [
        "MARRY ME Golden Foil Balloon Set - Wall",
        "Red Heart Shape Foil Balloons on Sticks with LED - on each side",
        "Floor Decor: Red Latex Balloon Border - Lines",
        "Rose Petals Walkway - Pink/Red Mix",
        "LED Tea Light Candles",
        "Backdrop: Warm LED Fairy Light Curtain",
        "Setup & Labour included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
    // index 16 — proposal-17.png — LED Marquee Proposal Setup
    {
      name: "LED Marquee Proposal Setup",
      price: 6999,
      includes: [
        "Props: MARRY ME LED Marquee Letters - 3ft Height, Warm White Bulbs",
        "Floor Decor: Rose Petals Scatter - Full Area",
        "I ♥ U Rose Petals Art - Center",
        "Setup + Labour + Power Extension included",
      ],
      notes: "Final setup is subject to material availability at time of booking — our team will confirm and adjust all items accordingly.",
      addons: ["Photographer (2 hrs)", "Rose petals upgrade", "Candle pathway add-on", "Extra foil balloons"],
    },
  ],
  "sequin-decoration": [
    {
      name: "70s Disco Birthday Setup",
      price: 13499,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "HAPPY BIRTHDAY Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Pink, Blue, Yellow, Green, White",
        "Foil Balloons: 4x Disco Ball Foils, Vinyl Record Foils, Retro Phone Foils, Sneaker Foils, Squiggly Balloons",
        "Theme Props: Giant Boombox Cutout - 3 ft, Directional Signboard - 8 signs",
        "Floor Decor: Balloon Clusters - Theme colors",
        "Lighting: Basic LED lights",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Glitter Shimmer Birthday Setup",
      price: 11999,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Purple, Lilac, Pink, Silver, White, Orange, Yellow",
        "Floral Accents: Artificial Flower Bunches in Arch",
        "Floor Decor: Balloon Scatter - Purple, Pink, Silver, Orange, White, Rose Gold, Mint",
        "Side Pillar: Balloon Column - Purple + Silver",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Golden Shimmer Birthday Setup",
      price: 11999,
      includes: [
        "Backdrop: Golden Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Gold Chrome, Orange, Silver Chrome, White",
        "Add-ons: Golden Palm Leaves",
        "Floor Decor: Balloon Scatter - Gold Chrome, Orange, Silver, White",
        "Side Pillar: Balloon Column - Gold + Silver with Golden Palm Leaf",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Golden Teal 18th Birthday Setup",
      price: 12999,
      includes: [
        "Backdrop: Golden Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Garland - Gold Chrome, Teal Chrome, White",
        "Add-ons: Golden Palm Leaves",
        "Prop: LED Marquee Numbers 18 - 3 ft",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Multicolor Shimmer Birthday Setup",
      price: 10999,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Purple, Lavender, Pink, Silver, Rose Gold",
        "Add-ons: 2x Disco Ball Foils",
        "Floor Decor: Balloon Scatter - Purple, Lavender, Pink, Silver, Rose Gold",
        "Side Decor: 2x Golden Planters with Artificial Flowers",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Unicorn Rainbow Birthday Setup",
      price: 13999,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Pastel Green, Yellow, Lavender, Pink, Peach, White",
        "Foil Balloons: 1x Large Unicorn Head Foil, 2x Unicorn Circle Foils, 2x Star Foils",
        "Add-ons: Butterfly Cutouts",
        "Prop: LED Marquee Number 1 - 3 ft with Mini Balloon Garland",
        "Floor Decor: Balloon Scatter - Pastel Theme",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Pink Ombre Shimmer Birthday Setup",
      price: 9999,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Hot Pink, Magenta, Blush Pink, Pearl Pink",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Blue Silver Shimmer Birthday Setup",
      price: 9599,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Baby Blue, White, Silver Chrome",
        "Floor Decor: Balloon Scatter - Baby Blue, White, Silver Chrome",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Cocomelon Rainbow Shimmer Birthday Setup",
      price: 19999,
      includes: [
        "Backdrop: Silver Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Birthday Warm White LED Neon Sign",
        "Foil Letters: RIO Gold Chrome Foil Balloons",
        "Balloon Garland: Organic Balloon Arch - Rainbow Colors - Blue, Teal, Yellow, Purple, Pink, Mint",
        "Theme Cutouts: 4x Cocomelon Character Cutouts + 1x Elephant Cutout",
        "Props: LED Marquee Number 1 - 3 ft, ONE Block Set",
        "Balloon Pillars: 4x Theme Balloon Columns with Foil Toppers",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
    },
    {
      name: "Lavender Gold Anniversary Shimmer Setup",
      price: 16999,
      includes: [
        "Backdrop: Golden Shimmer Sequin Wall - 8x8 ft",
        "Neon Sign: Happy Anniversary Warm White + Red Heart LED Neon Sign",
        "Balloon Garland: Organic Balloon Arch - Lavender, Lilac, White, Gold Chrome, Silver Chrome",
        "Add-ons: Floral Accents + Pampas Grass in Garland",
        "Props: LED Marquee Numbers 25 - 3 ft, Golden Cylinder Pedestal - 2 ft",
        "Setup + Labour included",
      ],
      addons: ["Photographer (2 hrs)", "Cake table styling", "Custom anniversary sign", "Extra balloon garland"],
    },
  ],
  "ring-ceremony": [
    {
      name: "Rose Gold Anniversary Ring Stand Decoration",
      price: 7499,
      image: ringPackage01Image,
      duration: "2–4 Hours",
      area: "Indoor / Home Venue",
      includes: [
        "1 Ring Stand",
        "Happy Anniversary Neon Sign (design as per availability)",
        "15 Multi-colour Flowers",
        "3 Green Palm Leaves",
        "Organic Balloon Arch of 120 Balloons: 40 White Latex, 30 Golden Chrome, and 50 Rose Gold Chrome",
        "2 Rose Gold 4D Balloons",
        "2 Big White Pastel Balloons (18 Inches)",
        "Setup & Installation by Professionals",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Pastel Birthday Ring Stand Decoration",
      price: 5499,
      image: ringPackage02Image,
      includes: [
        "1 Ring Stand",
        "1 Happy Birthday Neon Sign (design as per availability)",
        "Arch of 250 Balloons: 70 Purple Pastel, 70 Green Pastel, 50 Pink Pastel, and 50 White Pastel",
        "2 Purple, 1 White, and 1 Green Balloons (18 Inches)",
        "10 Silver Confetti Balloons",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Rose Gold & Silver Birthday Ring Decoration",
      price: 9500,
      image: ringPackage03Image,
      includes: [
        "1 Ring Stand",
        "1 Happy Birthday Neon Light",
        "Arch of 200 Balloons: 70 Rose Gold Chrome, 70 Silver Chrome, and 60 White Latex Balloons",
        "5 Silver Butterflies",
        "2 Silver 4-D and 2 Rose Gold 4-D Balloons",
        "7 Artificial Flower Bunches",
        "30 Balloons Scattered on Floor",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Barbie Theme Ring Decoration",
      price: 8499,
      image: ringPackage04Image,
      includes: [
        "1 Barbie Printed Flex arranged on a ring setup",
        "Circular balloon arch using theme-based balloons",
      ],
      notes: "Balloons will be filled with normal air, not helium or any other gas that could be harmful. Please provide a stool or ladder to the decorator. The ring is rented and will be collected after 24 hours.",
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    null,
    {
      name: "Starry Birthday Ring Decoration",
      price: 8499,
      includes: [
        "1 Ring Setup Decorated with Theme-Based Balloons",
        "Happy Birthday Neon Sign",
        "1 3D Star Foil Balloon",
        "3 Cake Tables",
        "Numeric LED Number",
        "1 Cake Stand",
        "1 LED Heart",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Mickey Minnie Colourful Ring Decoration",
      price: 9499,
      includes: [
        "1 Colourful Ring Setup using Theme-Based Balloons",
        "15–20 Silver-Golden Chrome Balloon Bunches",
        "4 Mickey-Minnie Mouse Foil Balloons",
        "1 Happy Birthday Neon Sign",
        "1 Numeric LED",
        "20–25 Balloons Scattered on Floor",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Carnation Floral Ring Birthday Decoration",
      price: 6399,
      includes: [
        "1 Ring Setup Decorated with Balloons",
        "350 Pink-Purple-Blue Latex Balloons",
        "Beautiful Carnation Bunches Arranged on Balloon Ring Stand",
        "Happy Birthday Cutout",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Red Gold Silver I Love You Ring Decoration",
      price: 6499,
      includes: [
        "Balloon ring made with 300–350 Golden-Silver Chrome and Red Latex Balloons",
        "50 Golden-Silver Chrome and Red Latex Balloons scattered on floor",
        "9 Artificial Butterflies",
        "1 I Love You Banner in Centre",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Pastel Baby Shower Ring Decoration",
      price: 5999,
      includes: [
        "1 Ring Setup Decorated with Balloons",
        "250–300 Pink-Blue Pastel Balloons",
        "2 Baby Foil Balloons",
        "2 Frill Curtains",
        "1 Baby Shower Banner",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Red and White Birthday Ring Pathway",
      price: 7499,
      includes: [
        "1 Ring Setup Decorated with Balloons",
        "250 Red-White Latex Balloons",
        "20–30 Balloons Arranged to Make a Pathway",
        "1 Happy Birthday Neon Sign",
        "2–3 LED Lights",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Colourful Love Birthday Ring Decoration",
      price: 6499,
      includes: [
        "1 Ring Setup Decorated with Balloons",
        "350 Theme-Based Balloons",
        "Love Cursive Foil Arranged on Balloon Stand",
        "1 Happy Birthday Neon Sign",
        "Red Colour Frill Curtains",
        "3–4 Ribbons",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
    {
      name: "Blue and Gold Birthday Ring Decoration",
      price: 5999,
      includes: [
        "1 Ring Setup Decorated with Balloons",
        "130–140 Blue, Dark Blue, and Golden Chrome Balloons",
        "80–90 White Latex Balloons",
        "1 Circular Printed Cutout",
      ],
      addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
    },
  ],
};

const nameThemes: Record<string, string[]> = {
  "birthday-baby-girl": ["Barbie Glam Wall Theme", "Classic Black & Gold Birthday Decor", "Royal Balloon Room Decor", "Royal Butterfly Birthday Decor", "Princess Castle Theme", "Barbie Dream Theme", "Cocomelon Rainbow Theme", "Pink Purple Neon Birthday Wall", "Mickey Mouse Classic Theme Birthday"],
  "birthday-baby-boy": ["Royal Blue & Silver Classic 1st Birthday", "Classic Black & Gold Birthday Decor", "Royal Balloon Room Decor", "Royal Butterfly Birthday Decor", "Construction / JCB Theme Birthday", "Dinosaur Jungle Theme Birthday", "Wild One Jungle Safari Theme", "Cocomelon Pastel Theme", "Mickey Mouse Classic Theme", "Sonic The Hedgehog Theme"],
  "birthday-adult": ["Classic Black & Gold Birthday Decor", "Royal Balloon Room Decor", "Royal Butterfly Birthday Decor", "Black Gold Mustard 20th Birthday", "Black White Gold Star Birthday", "Terracotta Boho Birthday", "Blue Purple Galaxy Birthday", "Black Gold Silver Classic Birthday", "Pink Purple Neon Birthday Wall", "Sage Green Gold Rustic Birthday", "Pink White Silver Fringe Birthday"],
  anniversary: ["Heart Canopy Anniversary Decor", "Budget Balloon Bash Package", "Rose Petal Anniversary Setup", "Golden Glow Anniversary Theme", "Romantic Fairy-light Anniversary", "Elegant Floral Anniversary Decor", "Premium Anniversary Balloon Setup"],
  proposal: ["Marry Me Marquee Proposal", "Heart Balloon Proposal Setup", "Rooftop Rose Proposal Decor", "Candlelight Proposal Backdrop", "Garden Proposal Floral Arch", "Rose Petal Proposal Pathway", "Grand Ring Proposal Decor"],
  "baby-shower": ["Oh Baby Girl Balloon Setup", "Pink Floral Baby Shower Decor", "Little Princess Baby Shower Theme", "Pastel Cloud Baby Shower Decor", "Oh Baby Boy Balloon Setup", "Blue Floral Baby Shower Decor", "Little Prince Baby Shower Theme", "Sky Blue Cloud Baby Shower Decor", "Rainbow Baby Shower Decor", "Pastel Balloon Baby Shower"],
  "naming-ceremony": ["Pink Naming Ceremony Decor", "Floral Naming Ceremony Setup", "Elegant Girl Naming Backdrop", "Blue Naming Ceremony Decor", "Royal Naming Ceremony Setup", "Elegant Boy Naming Backdrop", "Pastel Naming Ceremony Decor", "Grand Naming Ceremony Setup", "Balloon Naming Ceremony Theme", "Floral Naming Backdrop"],
  "ring-ceremony": ["Glittering Ring Ceremony Backdrop", "Royal Gold Ring Ceremony Decor", "Floral Ring Ceremony Stage", "Elegant Ring Ceremony Setup"],
  "welcome-baby": ["Welcome Baby Girl Pink Balloon Setup", "Little Princess Welcome Decor", "Pink Silver Welcome Baby Girl Theme", "Welcome Baby Boy Blue Balloon Setup", "Little Prince Welcome Decor", "Blue Silver Welcome Baby Boy Theme", "Pastel Welcome Baby Decor", "Sweet Welcome Home Setup"],
  "sequin-decoration": ["70s Disco Birthday Setup", "Glitter Shimmer Birthday Setup", "Golden Shimmer Birthday Setup", "Golden Teal 18th Birthday Setup", "Multicolor Shimmer Birthday Setup", "Unicorn Rainbow Birthday Setup", "Pink Ombre Shimmer Birthday Setup", "Blue Silver Shimmer Birthday Setup", "Cocomelon Rainbow Shimmer Birthday Setup", "Lavender Gold Anniversary Shimmer Setup"],
};

const descThemes: Record<string, string> = {
  birthday: "A joyful, premium balloon setup styled with themed props, a personalised banner and photo-ready styling.",
  "christmas-decoration": "Festive Christmas balloon arches and backdrops styled with seasonal colours, foil balloons and holiday details.",
  "kids-theme": "Kids birthday setups with custom balloon arches, themed backdrops and playful details.",
  anniversary: "A romantic anniversary setup with heart canopy, fresh floral touches and warm ambient lighting.",
  proposal: "A grand, camera-ready proposal moment styled with balloons, petals and marquee lighting.",
  "baby-shower": "A dreamy baby shower setup with pastel balloon garlands, floral touches and a personalised banner.",
  "naming-ceremony": "A traditional yet elegant naming ceremony backdrop styled with balloons, drapes and personalised signage.",
  "ring-ceremony": "A statement ring ceremony backdrop styled with balloons, florals and premium stage lighting.",
  "welcome-baby": "A sweet welcome home setup for the newest family member — balloons, foil letters and pastel decor to celebrate the little one's arrival.",
  "sequin-decoration": "Statement shimmer sequin backdrops paired with custom balloon garlands, neon signs and photo-ready celebration props.",
};

export const categories: CategoryDef[] = [
  {
    id: "birthday",
    label: "Birthday Decoration",
    eyebrow: "Birthday Celebrations",
    tagline: "Themed balloon setups for every little (and big) birthday star.",
    banner: bannerFor("birthday"),
    subcategories: [
      { id: "baby-girl", label: "Baby Girl" },
      { id: "baby-boy", label: "Baby Boy" },
      { id: "adult", label: "Adult" },
    ],
    basePrice: 4499,
    priceStep: 550,
    duration: "2–4 hours",
    area: "Indoor / home venue, up to 200 sq.ft",
    includes: [
      "150+ premium latex & foil balloons",
      "Personalised “Happy Birthday” foil banner",
      "Curtain / fabric backdrop styling",
      "LED fairy light accents",
      "Cake table & prop styling",
      "Themed props and confetti balloons",
    ],
    addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra character cutouts"],
  },
  {
    id: "christmas-decoration",
    label: "Christmas Decoration",
    eyebrow: "Christmas Celebrations",
    tagline: "Festive balloon arches and holiday backdrops for a merry Christmas celebration.",
    banner: imagesFor("christmas-decoration")[0] ?? bannerFor("birthday"),
    basePrice: 3999,
    priceStep: 0,
    duration: "2–4 hours",
    area: "Indoor / home venue",
    includes: [],
    addons: [],
  },
  {
    id: "kids-theme",
    label: "Kids Theme",
    eyebrow: "Kids Birthday Celebrations",
    tagline: "Playful birthday setups with mermaid, sea, teddy bear, carnival, jungle safari and more themes.",
    banner: imagesFor("kids-theme")[0] ?? bannerFor("birthday"),
    basePrice: 2999,
    priceStep: 0,
    duration: "2–4 hours",
    area: "Indoor / home venue",
    includes: [],
    addons: [],
  },
  {
    id: "anniversary",
    label: "Anniversary Decoration",
    eyebrow: "Anniversary Celebrations",
    tagline: "Romantic, elegant setups to celebrate every year of love.",
    banner: bannerFor("anniversary"),
    basePrice: 4999,
    priceStep: 600,
    duration: "2–3 hours",
    area: "Bedroom / hall, up to 150 sq.ft",
    includes: [
      "Heart-shaped balloon canopy",
      "Rose petal pathway & bed art",
      "Fresh floral & mood lighting",
      "Personalised name / date banner",
      "Curtain backdrop with LED accents",
      "Cake / champagne table styling",
    ],
    addons: ["Fresh flower bouquet", "Photographer (2 hrs)", "Cake (1kg, on request)", "Candlelight dinner setup"],
  },
  {
    id: "proposal",
    label: "Proposal Decoration",
    eyebrow: "Proposal Moments",
    tagline: "Say it with a moment they'll never forget.",
    banner: bannerFor("proposal"),
    basePrice: 6999,
    priceStep: 700,
    duration: "2–3 hours",
    area: "Indoor / rooftop / outdoor, up to 200 sq.ft",
    includes: [
      "Giant heart / ring balloon backdrop",
      "Rose petal 'Marry Me' floor art",
      "LED marquee sign styling",
      "Floral aisle & pathway petals",
      "Champagne & ring table styling",
      "Fairy light ambience",
    ],
    addons: ["Photographer coordination", "LED 'Marry Me' marquee upgrade", "Fresh rose bouquet", "Live violinist (on request)"],
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    eyebrow: "Baby Shower Celebrations",
    tagline: "Dreamy pastel setups to celebrate the mother-to-be.",
    banner: bannerFor("baby-shower"),
    basePrice: 4499,
    priceStep: 550,
    duration: "2–4 hours",
    area: "Indoor / home venue, up to 200 sq.ft",
    includes: [
      "Full balloon garland backdrop",
      "“Oh Baby / Mom-to-be” foil banner",
      "Themed cake table styling",
      "Fresh floral touches",
      "Photo booth props & sash",
      "Custom sign board (name / date)",
    ],
    addons: ["Photographer (2 hrs)", "Mom-to-be sash & crown upgrade", "Games & props kit", "Premium cake table styling"],
  },
  {
    id: "naming-ceremony",
    label: "Naming Ceremony",
    eyebrow: "Naming Ceremony",
    tagline: "Traditional, elegant backdrops to welcome the little one's name.",
    banner: bannerFor("naming-ceremony"),
    basePrice: 4499,
    priceStep: 550,
    duration: "3–4 hours",
    area: "Indoor hall / home venue, up to 250 sq.ft",
    includes: [
      "Balloon garland backdrop with name signage",
      "Traditional cradle / stage styling",
      "Fresh floral touches",
      "LED fairy light accents",
      "Photo booth props",
      "Personalised name banner",
    ],
    addons: ["Photographer (2 hrs)", "Cradle floral styling upgrade", "Premium name board", "Return-gift table styling"],
  },
  {
    id: "welcome-baby",
    label: "Welcome Baby Decoration",
    eyebrow: "Welcome Baby Celebrations",
    tagline: "Sweet balloon setups to welcome the newest member of the family.",
    banner: bannerFor("welcome-baby"),
    basePrice: 3999,
    priceStep: 500,
    duration: "2–3 hours",
    area: "Indoor / home venue, up to 150 sq.ft",
    includes: [
      "Welcome Baby foil letter balloons",
      "Balloon arch / garland backdrop",
      "Fringe curtain backdrop",
      "Star foil balloons",
      "Baby character foil balloon",
      "Floor balloon scatter",
      "Setup & installation by professionals",
    ],
    addons: ["Photographer (2 hrs)", "LED name board upgrade", "Premium cake table styling", "Extra foil balloons"],
  },
  {
    id: "ring-ceremony",
    label: "Ring Decorations",
    eyebrow: "Ring Decorations",
    tagline: "Statement ring backdrops for engagements, ceremonies and the perfect 'yes'.",
    banner: bannerFor("ring-ceremony"),
    basePrice: 7499,
    priceStep: 800,
    duration: "3–4 hours",
    area: "Indoor hall / banquet, up to 300 sq.ft",
    includes: [
      "Giant ring-shaped balloon backdrop (6ft+)",
      "Custom foil name / initials",
      "Floral & fairy light accents",
      "Rose petal pathway",
      "Stage & seating styling",
      "Cake / ring platform styling",
    ],
    addons: ["Photographer (2 hrs)", "Stage lighting upgrade", "Fresh floral arch", "Premium ring platform styling"],
  },
  {
    id: "sequin-decoration",
    label: "Sequin Decoration",
    eyebrow: "Sequin Celebrations",
    tagline: "Reflective shimmer walls, balloon artistry and statement props for unforgettable celebrations.",
    banner: imagesFor("sequin-decoration")[0] ?? bannerFor("birthday"),
    basePrice: 9599,
    priceStep: 500,
    duration: "3–4 hours",
    area: "Indoor / venue setup, up to 300 sq.ft",
    includes: [
      "Premium shimmer sequin wall backdrop",
      "Organic balloon garland in your chosen colour palette",
      "Neon sign or marquee prop as shown",
      "Floor decor and theme accents as listed",
      "Setup + Labour included",
    ],
    addons: ["Photographer (2 hrs)", "Cake table styling", "Custom name or age sign", "Extra balloon garland"],
  },
];

export const categoryMap = new Map(categories.map((c) => [c.id, c]));

/* ---------------------------------------------------------------------- */
/* Build the full package list from images + category config              */
/* ---------------------------------------------------------------------- */

function buildPackages(): PackageItem[] {
  const items: PackageItem[] = [];

  for (const cat of categories) {
    const subs: (SubcategoryDef | undefined)[] = cat.subcategories?.length ? cat.subcategories : [undefined];

    for (const sub of subs) {
      const imgs = imagesFor(cat.id, sub?.id);
      const themeKey = sub ? `${cat.id}-${sub.id}` : cat.id;
      const names = nameThemes[themeKey] ?? [];
      const desc = descThemes[cat.id] ?? "A premium themed decoration setup styled by Decoration Kingdom.";

      const overrideList = packageOverrides[themeKey];

      imgs.forEach((image, i) => {
        if (overrideList?.[i] === null) return;
        const id = sub ? `${cat.id}-${sub.id}-${i + 1}` : `${cat.id}-${i + 1}`;
        const ov = overrideList?.[i];
        items.push({
          id,
          name: ov?.name ?? names[i % Math.max(names.length, 1)] ?? `${cat.label} Package ${i + 1}`,
          category: cat.id,
          categoryLabel: cat.label,
          subcategory: sub?.id,
          subcategoryLabel: sub?.label,
          image: ov?.image ?? image,
          price: ov?.price ?? cat.basePrice + i * cat.priceStep,
          description: desc,
          includes: ov?.includes ?? cat.includes,
          duration: ov?.duration ?? cat.duration,
          area: ov?.area ?? cat.area,
          addons: ov?.addons ?? cat.addons,
          notes: ov?.notes,
        });
      });
    }
  }

  return items;
}

export const allPackages: PackageItem[] = buildPackages();

export function getCategory(categoryId: string) {
  return categories.find((c) => c.id === categoryId);
}

export function getSubcategories(categoryId: string) {
  return getCategory(categoryId)?.subcategories ?? [];
}

export function getPackages(categoryId: string, subId?: string) {
  return allPackages.filter((p) => p.category === categoryId && (subId ? p.subcategory === subId : true));
}

export function findPackageById(id: string) {
  return allPackages.find((p) => p.id === id);
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
