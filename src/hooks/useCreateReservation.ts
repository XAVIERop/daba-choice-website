import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCafe } from "@/contexts/CafeContext";

export interface CreateReservationInput {
  name: string;
  email?: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export function useCreateReservation() {
  const { cafeId } = useCafe();

  return useMutation({
    mutationFn: async (input: CreateReservationInput) => {
      if (!cafeId) throw new Error("Cafe not selected");
      const { data, error } = await supabase
        .from("reservations")
        .insert({
          cafe_id: cafeId,
          customer_name: input.name,
          customer_email: input.email || null,
          phone_number: input.phone,
          reservation_date: input.date,
          reservation_time: input.time,
          num_guests: input.guests,
          special_requests: input.specialRequests || null,
          status: "pending",
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}
