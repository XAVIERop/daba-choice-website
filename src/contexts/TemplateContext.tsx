import { createContext, useContext, useEffect, type ReactNode } from "react";

/** Structural preset: drives layout/composition in React, not only CSS tokens. */
export type TemplateLayout = "cinema" | "royal";

export const TEMPLATES = {
  "1": {
    id: "1",
    name: "Cinematic classic",
    layout: "cinema" satisfies TemplateLayout,
    layoutSummary: "Full-bleed hero, centered story, floating accents.",
    description:
      "Immersive video hero, symmetrical sections, and glass cards—the original Daba Choice composition.",
    primary: "#D4AF37",
    accent: "#E85D04",
    previewGradient: "from-amber-900/80 via-amber-950/90 to-black",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab752?q=80&w=800",
  },
  "2": {
    id: "2",
    name: "Copper Warm",
    layout: "cinema" satisfies TemplateLayout,
    layoutSummary: "Same layout as classic; warm copper palette.",
    description: "Cinematic structure with terracotta and copper accents (palette swap on the classic frame).",
    primary: "#B87333",
    accent: "#C2410C",
    previewGradient: "from-amber-800/80 via-orange-950/90 to-black",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?q=80&w=800",
  },
  "3": {
    id: "3",
    name: "Emerald Luxe",
    layout: "cinema" satisfies TemplateLayout,
    layoutSummary: "Same layout as classic; emerald + gold palette.",
    description: "Cinematic structure with deep green and gold highlights (palette swap on the classic frame).",
    primary: "#047857",
    accent: "#D4AF37",
    previewGradient: "from-emerald-900/80 via-emerald-950/90 to-black",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800",
  },
  "4": {
    id: "4",
    name: "Cream Minimal",
    layout: "cinema" satisfies TemplateLayout,
    layoutSummary: "Same layout as classic; forced light surfaces via tokens.",
    description: "Classic composition with a brighter, minimal surface treatment (still the same page structure).",
    primary: "#78716C",
    accent: "#B45309",
    previewGradient: "from-stone-200/90 via-stone-100/95 to-white",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
  },
  "5": {
    id: "5",
    name: "Royal editorial",
    layout: "royal" satisfies TemplateLayout,
    layoutSummary: "Split hero, tiered nav, asymmetric menu grid, editorial blocks.",
    description:
      "Different page architecture: framed media + left-aligned hero copy, two-row navigation, and a featured-dish column layout inspired by fine-dining sites.",
    primary: "#8B2942",
    accent: "#D4AF37",
    previewGradient: "from-rose-950/90 via-red-950/95 to-black",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800",
  },
} as const;

export type TemplateId = keyof typeof TEMPLATES;

const TemplateContext = createContext<TemplateId | null>(null);

export function TemplateProvider({
  children,
  templateId,
}: {
  children: ReactNode;
  templateId: TemplateId;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-template", templateId);
    return () => document.documentElement.removeAttribute("data-template");
  }, [templateId]);

  return (
    <TemplateContext.Provider value={templateId}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate(): TemplateId | null {
  return useContext(TemplateContext);
}
