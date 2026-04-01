import { useEffect } from "react";
import { useLocation } from "wouter";
import { canonicalUrlForPath, getSeoForPath } from "@/lib/seo";

/**
 * Updates document title, meta description, canonical link, and robots per route (SPA).
 */
export function SeoHead() {
  const [location] = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location);
    document.title = seo.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", seo.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrlForPath(location));

    let robots = document.querySelector('meta[name="robots"]');
    if (seo.noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else     if (robots) {
      robots.remove();
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrlForPath(location));
    const twUrl = document.querySelector('meta[property="twitter:url"]');
    if (twUrl) twUrl.setAttribute("content", canonicalUrlForPath(location));
  }, [location]);

  return null;
}
