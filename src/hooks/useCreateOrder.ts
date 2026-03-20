import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCafe } from "@/contexts/CafeContext";

export interface OrderItemInput {
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_instructions?: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  orderType?: "delivery" | "pickup" | "table";
  total: number;
  items: OrderItemInput[];
  notes?: string;
}

export interface CreateOrderResult {
  id: string;
  order_number: string;
  total_amount: number;
}

export function useCreateOrder() {
  const { cafeId } = useCafe();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      if (!cafeId) throw new Error("Cafe not selected");
      const { data, error } = await supabase.rpc("create_white_label_order", {
        p_cafe_id: cafeId,
        p_customer_name: input.customerName,
        p_customer_email: input.customerEmail || null,
        p_phone_number: input.customerPhone,
        p_delivery_address: input.deliveryAddress || null,
        p_order_type: input.orderType || "delivery",
        p_total_amount: input.total,
        p_order_items: input.items,
        p_delivery_notes: input.notes || null,
        p_payment_method: "online",
      });
      if (error) throw error;
      return data as CreateOrderResult;
    },
  });
}
