/** Production site origin — used for canonical URLs and structured data. */
export const SITE_ORIGIN = "https://dabachoice.com";

export const DEFAULT_SEO = {
  title: "Daba Choice – Authentic Punjabi Restaurant in International City, Dubai",
  description:
    "Discover the real taste of Punjab at Daba Choice, Dubai. Authentic Punjabi cuisine, pure ingredients, chef's specials, tiffin plans, catering, and dine-in in International City.",
};

type RouteSeo = {
  title: string;
  description: string;
  /** Keep out of search results */
  noindex?: boolean;
};

const CONTACT_SEO: RouteSeo = {
  title: "Contact & Reservations – Daba Choice | International City, Dubai",
  description:
    "Contact Daba Choice for reservations, takeaway, delivery, and catering. Y-20 England Cluster, International City, Dubai. Call +971 50 424 7836.",
};

function stripQuery(path: string): string {
  const base = path.split("?")[0] || "/";
  return base === "" ? "/" : base;
}

const ROUTES: Record<string, RouteSeo> = {
  "/": DEFAULT_SEO,
  "/menu": {
    title: "Menu – Daba Choice | Punjabi & North Indian Food in Dubai",
    description:
      "Browse Daba Choice menu: authentic Punjabi dishes, chef's specials, tiffin-friendly meals, and North Indian favorites. Order online or visit International City, Dubai.",
  },
  "/contact": CONTACT_SEO,
  /** Client redirect to /contact — align SEO with destination */
  "/reservation": CONTACT_SEO,
  "/gallery": {
    title: "Gallery – Daba Choice Restaurant | Dubai",
    description:
      "Photos from Daba Choice: Punjabi dining in International City, Dubai—dishes, ambiance, and events.",
  },
  "/reviews": {
    title: "Reviews – Daba Choice | Guest Feedback",
    description:
      "Read guest reviews for Daba Choice, Punjabi restaurant in International City, Dubai.",
  },
  "/offers": {
    title: "Special Offers – Daba Choice | Dubai",
    description:
      "Current offers and deals at Daba Choice, International City, Dubai.",
  },
  "/tiffin": {
    title: "Tiffin Service – Daba Choice | Meal Plans in Dubai",
    description:
      "Tiffin and meal plans from Daba Choice—authentic Punjabi home-style food delivered in Dubai. International City and nearby areas.",
  },
  "/catering": {
    title: "Catering – Daba Choice | Punjabi Events in Dubai",
    description:
      "Punjabi and North Indian catering for events in Dubai. Daba Choice, International City—custom menus and premium service.",
  },
  "/about": {
    title: "About Us – Daba Choice | Punjabi Restaurant Dubai",
    description:
      "About Daba Choice: authentic Punjabi food, hospitality, and quality in the heart of International City, Dubai.",
  },
  "/privacy-policy": {
    title: "Privacy Policy – Daba Choice",
    description: "Privacy policy for Daba Choice website and services.",
  },
  "/terms-of-service": {
    title: "Terms of Service – Daba Choice",
    description: "Terms of service for using Daba Choice website and ordering.",
  },
  "/choose": {
    title: "Choose Experience – Daba Choice",
    description: "Preview Daba Choice website styles and layouts.",
    noindex: true,
  },
  "/checkout": {
    title: "Checkout – Daba Choice",
    description: "Complete your Daba Choice order.",
    noindex: true,
  },
  "/order-success": {
    title: "Order Confirmed – Daba Choice",
    description: "Your Daba Choice order was placed successfully.",
    noindex: true,
  },
  "/orders": {
    title: "My Orders – Daba Choice",
    description: "View your Daba Choice orders.",
    noindex: true,
  },
  "/auth": {
    title: "Sign In – Daba Choice",
    description: "Sign in to your Daba Choice account.",
    noindex: true,
  },
  "/profile": {
    title: "Profile – Daba Choice",
    description: "Your Daba Choice profile.",
    noindex: true,
  },
  "/admin": {
    title: "Admin – Daba Choice",
    description: "Administration",
    noindex: true,
  },
};

/** 404 and unknown paths */
const FALLBACK: RouteSeo = {
  title: "Page Not Found – Daba Choice",
  description: DEFAULT_SEO.description,
  noindex: true,
};

export function getSeoForPath(path: string): RouteSeo {
  const p = stripQuery(path);
  if (ROUTES[p]) return ROUTES[p];
  return FALLBACK;
}

export function canonicalUrlForPath(path: string): string {
  const p = stripQuery(path);
  if (p === "/reservation") return `${SITE_ORIGIN}/contact`;
  if (p === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${p}`;
}
