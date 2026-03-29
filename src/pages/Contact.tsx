import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Send, ExternalLink, 
  Calendar, Users, Clock, CheckCircle2, ChevronRight 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact } from "@/hooks/useSubmitContact";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { useCafe } from "@/contexts/CafeContext";
import { features } from "@/config/features";
import { 
  formatWhatsAppContactMessage, 
  formatWhatsAppReservationMessage, 
  getWhatsAppUrl 
} from "@/lib/whatsapp";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
];



export default function Contact() {
  const { toast } = useToast();
  const { cafe } = useCafe();
  const submitContact = useSubmitContact();
  const createReservation = useCreateReservation();

  // Contact State
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  
  // Reservation State
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservationForm, setReservationForm] = useState({
    name: "", email: "", phone: "", date: "", guests: 2, specialRequests: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (features.whatsapp_only && cafe?.phone) {
      const message = formatWhatsAppContactMessage(cafe.name, contactForm);
      window.open(getWhatsAppUrl(cafe.phone, message), "_blank");
      toast({ title: "WhatsApp Message Ready!", description: "Send it via WhatsApp.", style: { backgroundColor: "#D4AF37", color: "black" } });
      setContactForm({ name: "", email: "", subject: "", message: "" });
      return;
    }

    submitContact.mutate(contactForm, {
      onSuccess: () => {
        toast({ title: "Message Sent", description: "We will get back to you shortly.", style: { backgroundColor: "#D4AF37", color: "black" } });
        setContactForm({ name: "", email: "", subject: "", message: "" });
      }
    });
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) return;

    if (features.whatsapp_only && cafe?.phone) {
      const message = formatWhatsAppReservationMessage(cafe.name, {
        ...reservationForm,
        time: selectedTime
      });
      window.open(getWhatsAppUrl(cafe.phone, message), "_blank");
      setReservationSuccess(true);
      toast({ title: "Booking Request Prepared!", description: "Please send via WhatsApp.", style: { backgroundColor: "#D4AF37", color: "black" } });
      return;
    }

    createReservation.mutate({
      ...reservationForm,
      time: selectedTime
    }, {
      onSuccess: () => setReservationSuccess(true)
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Premium background accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center opacity-10 hidden lg:block pointer-events-none" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&fit=crop)` }} />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Reservation & Inquiries</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 uppercase">
            BOOK & <span className="gold-gradient-text">CONTACT</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Reserve your table for an authentic Punjabi feast or reach out for catering and group inquiries. We are here to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ----- RESERVATION SECTION (COLUMN 1-7) ----- */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {reservationSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-12 rounded-3xl text-center border-2 border-primary/20"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-3 uppercase">Table Requested!</h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    We've received your booking request. Our team will contact you shortly to confirm.
                  </p>
                  <button onClick={() => setReservationSuccess(false)} className="gold-button w-full py-4 rounded-xl text-lg uppercase tracking-widest font-bold">
                    Book Another Table
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card p-8 md:p-10 rounded-3xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Calendar size={24} />
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-widest">Reserve a Table</h3>
                  </div>

                  <form onSubmit={handleReservationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Guest Name</label>
                        <input required placeholder="Your Full Name" value={reservationForm.name} onChange={e => setReservationForm({...reservationForm, name: e.target.value})} className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-4 text-foreground focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Phone Number</label>
                        <input required type="tel" placeholder="+971 ..." value={reservationForm.phone} onChange={e => setReservationForm({...reservationForm, phone: e.target.value})} className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-4 text-foreground focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 shadow-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Select Date</label>
                        <input required type="date" min={today} value={reservationForm.date} onChange={e => setReservationForm({...reservationForm, date: e.target.value})} className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-4 text-foreground focus:border-primary focus:outline-none transition-all shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Guests</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                          <select value={reservationForm.guests} onChange={e => setReservationForm({...reservationForm, guests: Number(e.target.value)})} className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-4 pl-12 text-foreground focus:border-primary focus:outline-none appearance-none transition-all shadow-sm">
                            {[1,2,4,6,8,10,12].map(n => <option key={n} value={n}>{n} Guests</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock size={14} /> Available Slots
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                        {timeSlots.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${
                              selectedTime === t
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                : "border-amber-200/20 text-muted-foreground hover:border-primary/50 hover:text-primary"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button type="submit" disabled={createReservation.isPending || !selectedTime} className="gold-button w-full py-4 rounded-xl text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 group">
                      {createReservation.isPending ? "Booking..." : <>Confirm Table <ChevronRight className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ----- INFO & CONTACT SECTION (COLUMN 8-12) ----- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl flex items-start gap-5 group hover:border-primary/30 transition-all border border-transparent">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg mb-1 uppercase tracking-wider">Our Punjabi Haven</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Y-20, England-Y Street, England Cluster<br />
                    International City, Dubai, UAE
                  </p>
                  <a href="https://maps.google.com/?q=Daba+Choice+Restaurant" target="_blank" className="inline-flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-widest mt-2 hover:underline">
                    Find on Map <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl flex items-start gap-5 group hover:border-primary/30 transition-all border border-transparent">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg mb-1 uppercase tracking-wider">Call Directly</h4>
                  <a href="tel:+971504247836" className="text-muted-foreground text-sm block hover:text-primary transition-colors">+971 50 424 7836 (Mobile)</a>
                  <a href="tel:+97145770225" className="text-muted-foreground text-sm block hover:text-primary transition-colors">+971 4 577 0225 (Landline)</a>
               </div>
              </div>
            </div>

            {/* Simple Contact Form */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Send size={18} />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-widest">Send a Message</h3>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                 <input required placeholder="Your Name" value={contactForm.name} onChange={e=>setContactForm({...contactForm, name:e.target.value})} className="w-full bg-white/80 border border-amber-200/40 rounded-xl px-4 py-3 placeholder:text-muted-foreground/50 text-sm focus:border-primary focus:outline-none transition-all shadow-sm" />
                 <input required type="email" placeholder="Email Address" value={contactForm.email} onChange={e=>setContactForm({...contactForm, email:e.target.value})} className="w-full bg-white/80 border border-amber-200/40 rounded-xl px-4 py-3 placeholder:text-muted-foreground/50 text-sm focus:border-primary focus:outline-none transition-all shadow-sm" />
                 <textarea required placeholder="How can we help?" rows={4} value={contactForm.message} onChange={e=>setContactForm({...contactForm, message:e.target.value})} className="w-full bg-white/80 border border-amber-200/40 rounded-xl px-4 py-4 placeholder:text-muted-foreground/50 text-sm focus:border-primary focus:outline-none resize-none transition-all shadow-sm" />
                 <button type="submit" className="gold-button w-full py-3 rounded-xl uppercase tracking-[0.2em] text-xs font-bold">
                   Message Us
                 </button>
              </form>
            </div>


          </div>
        </div>

        {/* Map Header */}
        <div className="mt-24 text-center mb-8">
           <h3 className="font-display text-2xl font-bold uppercase tracking-[0.3em]">LOCATE <span className="gold-gradient-text">US</span></h3>
        </div>

        {/* Full Width Map */}
        <div className="glass-card rounded-[2rem] overflow-hidden h-80 border-4 border-white/50 shadow-2xl relative">
          <iframe
            title="Daba Choice Restaurant Location"
            src="https://maps.google.com/maps?q=Daba+Choice+Restaurant+International+City+Dubai&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
