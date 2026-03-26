import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCafe } from "@/contexts/CafeContext";
import { features } from "@/config/features";
import dabaConfig from "@/config/daba.json";


export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_available: boolean;
  spiceLevel: number;
  isFeatured: boolean;
}

function mapDbToMenuItem(row: Record<string, unknown>): MenuItem {
  return {
    id: row.id as string,
    name: row.name as string,
    description: (row.description as string) || "",
    price: Number(row.price),
    category: row.category as string,
    image_url: row.image_url as string | null,
    is_available: row.is_available !== false,
    spiceLevel: 0,
    isFeatured: false,
  };
}

export function useCafeMenu() {
  const { cafeId, isLoading: cafeLoading, error: cafeError } = useCafe();

  return useQuery({
    queryKey: ["menu", cafeId],
    queryFn: async () => {
      if (features.use_local_cafe) {
        return (dabaConfig.menu || []).map((item) => ({
          ...item,
          description: item.description || "",
          image_url: item.image_url || null,
          spiceLevel: 0,
          isFeatured: false,
        }));
      }

      if (!cafeId) return [];
      const { data, error } = await supabase
        .from("menu_items")
        .select("id, name, description, price, category, image_url, is_available")
        .eq("cafe_id", cafeId)
        .order("category")
        .order("name");
      if (error) throw error;
      // Same rule as mapDbToMenuItem: NULL/undefined = show; only drop explicit false.
      return (data || [])
        .filter((row) => row.is_available !== false)
        .map((row) => mapDbToMenuItem(row as Record<string, unknown>));
    },
    enabled: (!!cafeId || features.use_local_cafe) && !cafeLoading,
  });
}
