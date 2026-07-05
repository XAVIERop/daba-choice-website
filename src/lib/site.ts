import { imagekitUrl } from "./imagekit";

/** Per-cafe branding — swap when cloning this repo for another restaurant. */
export const SITE_NAME = "Daba Choice";

/** All-caps lockup next to the logo (navbar, footer, etc.) */
export const SITE_WORDMARK = "DABA CHOICE";

/** PNG render of the brand PDF (ImageKit converts PDF → image for web use). */
const LOGO_PDF =
  "https://ik.imagekit.io/foodclub/Daba%20Choice/DABA%20CHOICE%20RESTAURANT%20LOGO%20.pdf/ik-thumbnail.jpg?tr=w-800,f-png";

export const SITE_LOGO_URL = imagekitUrl(LOGO_PDF);

/** Smaller variant for favicon / PWA icons */
export const SITE_LOGO_ICON_URL = imagekitUrl(
  "https://ik.imagekit.io/foodclub/Daba%20Choice/DABA%20CHOICE%20RESTAURANT%20LOGO%20.pdf/ik-thumbnail.jpg?tr=w-512,f-png",
);
