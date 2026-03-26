import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCafe } from "@/contexts/CafeContext";

export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function useSubmitContact() {
  const { cafeId } = useCafe();

  return useMutation({
    mutationFn: async (input: ContactInput) => {
      if (!cafeId) throw new Error("Cafe not selected");
      const { data, error } = await supabase
        .from("contact_messages")
        .insert({
          cafe_id: cafeId,
          customer_name: input.name,
          customer_email: input.email,
          subject: input.subject || null,
          message: input.message,
          is_read: false,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}
