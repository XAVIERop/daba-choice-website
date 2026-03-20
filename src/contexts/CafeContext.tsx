import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";

export interface CafeConfig {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  phone?: string;
  location?: string;
  primary_color?: string;
  logo_url?: string;
}

const CafeContext = createContext<{
  cafeSlug: string | null;
  cafe: CafeConfig | null;
  cafeId: string | null;
  isLoading: boolean;
  error: string | null;
} | null>(null);

export function CafeProvider({ children, defaultSlug }: { children: ReactNode; defaultSlug?: string }) {
  const [cafeSlug, setCafeSlug] = useState<string | null>(defaultSlug || null);
  const [cafe, setCafe] = useState<CafeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = useMemo(() => {
    if (cafeSlug) return cafeSlug;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("cafe");
    if (q) return q;
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);
    if (parts[0] && !["menu", "checkout", "order-success", "orders", "auth", "profile", "reservation", "gallery", "reviews", "offers", "contact"].includes(parts[0])) {
      return parts[0];
    }
    return "dabachoice";
  }, [cafeSlug]);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }
    const loadCafe = async () => {
      const { supabase } = await import("@/lib/supabase");
      const { data, error: err } = await supabase
        .from("cafes")
        .select("id, name, slug, description, image_url, phone, location")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
    if (err) {
      setError(err.message);
      setCafe(null);
    } else if (data) {
      setCafe(data as CafeConfig);
    } else {
      setError("Cafe not found");
      setCafe(null);
    }
    setIsLoading(false);
    };
    loadCafe();
  }, [slug]);

  const value = useMemo(
    () => ({
      cafeSlug: slug,
      cafe,
      cafeId: cafe?.id ?? null,
      isLoading,
      error,
    }),
    [slug, cafe, isLoading, error]
  );

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export function useCafe() {
  const ctx = useContext(CafeContext);
  if (!ctx) throw new Error("useCafe must be used within CafeProvider");
  return ctx;
}
