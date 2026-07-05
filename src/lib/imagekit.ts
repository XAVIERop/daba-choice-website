/** Legacy default — override with VITE_IMAGEKIT_BASE_URL when the ImageKit account changes. */
const LEGACY_BASE = "https://ik.imagekit.io/foodclub/Daba%20Choice";

const PATH_MARKERS = ["/Daba%20Choice/", "/Daba Choice/"] as const;

/** Current ImageKit root for the Daba Choice media folder (no trailing slash). */
export function getImageKitBase(): string {
  const fromEnv = import.meta.env.VITE_IMAGEKIT_BASE_URL?.trim();
  return (fromEnv || LEGACY_BASE).replace(/\/$/, "");
}

const LEGACY_FOLDER_PREFIX =
  /^New%20Folder\/(?:New%20Folder\/(?:New%20Folder\/)?)?|^menu\/|^catering\//;

/** Old account used nested folders; new library keeps files at Daba Choice root. */
function normalizeImageKitPath(path: string): string {
  let normalized = path.split("?")[0];
  while (LEGACY_FOLDER_PREFIX.test(normalized)) {
    normalized = normalized.replace(LEGACY_FOLDER_PREFIX, "");
  }
  const query = path.includes("?") ? path.slice(path.indexOf("?")) : "";
  return normalized + query;
}

/**
 * Rewrites any ImageKit URL (or legacy foodclub path) to the configured base.
 * Strips old nested folder prefixes so paths match a flat Daba Choice library.
 */
export function imagekitUrl(urlOrPath: string): string {
  if (!urlOrPath) return urlOrPath;

  const base = getImageKitBase();

  if (urlOrPath.startsWith("http")) {
    for (const marker of PATH_MARKERS) {
      const idx = urlOrPath.indexOf(marker);
      if (idx !== -1) {
        const path = normalizeImageKitPath(urlOrPath.slice(idx + marker.length));
        return `${base}/${path}`;
      }
    }
    return urlOrPath;
  }

  return `${base}/${normalizeImageKitPath(urlOrPath.replace(/^\//, ""))}`;
}

/** Build-time helper (vite.config) — same rewrite for index.html / manifest. */
export function rewriteImageKitUrlsInText(text: string, baseUrl?: string): string {
  const base = (baseUrl || process.env.VITE_IMAGEKIT_BASE_URL?.trim() || LEGACY_BASE).replace(/\/$/, "");
  return text.replaceAll(LEGACY_BASE, base);
}
