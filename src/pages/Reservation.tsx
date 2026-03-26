import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, CheckCircle2, MapPin, Phone, Star, ChevronRight } from "lucide-react";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { useToast } from "@/hooks/use-toast";
import { useCafe } from "@/contexts/CafeContext";
import { features } from "@/config/features";
import { formatWhatsAppReservationMessage, getWhatsAppUrl } from "@/lib/whatsapp";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
];

const reservationFeatures = [
  { icon: "🍛", label: "Authentic Punjabi Cuisine" },
  { icon: "🌶️", label: "Fresh Daily Ingredients" },
  { icon: "✅", label: "100% Authentic Ingredients" },
  { icon: "🎉", label: "Group & Event Bookings" },
];

export default function Reservation() {
  const [success, setSuccess] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const createReservation = useCreateReservation();
  const { toast } = useToast();
  const { cafe } = useCafe();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: 2, specialRequests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) return;

    if (features.whatsapp_only && cafe?.phone) {
      const message = formatWhatsAppReservationMessage(
        cafe.name,
        {
          name: form.name,
          phone: form.phone,
          date: form.date,
          time: selectedTime,
          guests: form.guests,
          specialRequests: form.specialRequests
        }
      );

      const url = getWhatsAppUrl(cafe.phone, message);
      
      // Give a small delay for UX
      setTimeout(() => {
        window.open(url, "_blank");
        setSuccess(true);
        toast({ 
          title: "Reservation request generated!", 
          description: "Please send the message in WhatsApp to complete your booking.",
          style: { backgroundColor: "#D4AF37", color: "black" } 
        });
      }, 800);
      return;
    }

    createReservation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: selectedTime,
      guests: form.guests,
      specialRequests: form.specialRequests
    }, {
      onSuccess: () => {
        setSuccess(true);
      },
      onError: (err: any) => {
        toast({
          title: "Reservation failed",
          description: err.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-3xl max-w-md w-full border border-primary/30"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-primary" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold mb-3">TABLE REQUESTED!</h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Your reservation request has been received. Our team will contact you shortly to confirm your booking.
          </p>
          <p className="text-sm text-primary font-medium mb-8">We look forward to welcoming you!</p>
          <button onClick={() => setSuccess(false)} className="gold-button w-full py-3 rounded-xl">Book Another Table</button>
        </motion.div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background image on right half */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&fit=crop)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 hidden lg:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Reserve Your Seat</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-3 leading-tight">
              BOOK A <span className="gold-gradient-text">TABLE</span>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
            <p className="text-muted-foreground mb-10">
              Reserve a table for dine-in at our England Cluster location. We'll confirm your booking via phone or email within 1 hour.
            </p>

            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name *</label>
                  <input
                    required
                    placeholder="e.g. Ahmed Ali"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+971 ..."
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                      required
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pl-12 focus:border-primary focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Guests *</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <select
                      value={form.guests}
                      onChange={e => setForm({ ...form, guests: Number(e.target.value) })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pl-12 focus:border-primary focus:outline-none appearance-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} /> Preferred Time *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedTime === t
                          ? "bg-primary text-black border-primary"
                          : "border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Special Requests</label>
                <textarea
                  placeholder="Dietary requirements, celebrations, seating preferences..."
                  rows={3}
                  value={form.specialRequests}
                  onChange={e => setForm({ ...form, specialRequests: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary focus:outline-none resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={createReservation.isPending || !selectedTime}
                className="w-full gold-button py-4 rounded-xl text-base disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {createReservation.isPending ? "Submitting..." : (
                  <>Confirm Reservation <ChevronRight size={18} /></>
                )}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                We'll confirm within 1 hour. For immediate assistance call{" "}
                <a href="tel:+971504247836" className="text-primary hover:underline">+971 50 424 7836</a>
              </p>
            </form>
          </motion.div>

          {/* Info Side (hidden on mobile, shown on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-6 pt-20"
          >
            {/* Rating card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-white font-bold">5.0</span>
              </div>
              <p className="text-muted-foreground text-sm italic">"The best Punjabi food in International City. A true taste of home."</p>
              <p className="text-primary text-xs mt-2 font-medium">— Verified Guest</p>
            </div>

            {/* Address */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">Our Location</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Y-20, England-Y Street<br />England Cluster, International City<br />Dubai, UAE
                </p>
                <a
                  href="https://maps.google.com/?q=Daba+Choice+Restaurant+International+City+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs mt-2 hover:underline inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">Call for Reservations</p>
                <a href="tel:+971504247836" className="text-muted-foreground text-sm hover:text-primary transition-colors">+971 50 424 7836</a>
                <p className="text-xs text-white/30 mt-1">Available during restaurant hours</p>
              </div>
            </div>

            {/* Features */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <p className="font-display text-sm font-bold text-white mb-4 uppercase tracking-widest">Why Dine With Us</p>
              <div className="grid grid-cols-2 gap-3">
                {reservationFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-muted-foreground text-xs">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
