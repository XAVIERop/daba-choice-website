import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCafe } from "@/contexts/CafeContext";
import { features } from "@/config/features";
import { formatWhatsAppCateringMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export default function Catering() {
  const { toast } = useToast();
  const { cafe } = useCafe();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Punjabi Song Shoot",
    guestCount: "",
    date: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (features.whatsapp_only && cafe?.phone) {
      const message = formatWhatsAppCateringMessage(cafe.name, {
        name: form.name,
        phone: form.phone,
        email: form.email,
        eventType: form.eventType,
        guestCount: form.guestCount,
        date: form.date,
        message: form.message
      });

      const url = getWhatsAppUrl(cafe.phone, message);
      
      setTimeout(() => {
        window.open(url, "_blank");
        toast({ 
          title: "Inquiry Prepared!", 
          description: "Please send the message in WhatsApp to connect with our catering team.",
          style: { backgroundColor: "#D4AF37", color: "black" } 
        });
        setForm({ ...form, message: "" });
      }, 800);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&fit=crop)` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Premium Outdoor Catering
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            THE FLAVOR OF <span className="gold-gradient-text">PUNJAB</span> AT YOUR EVENT
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            From grand weddings to high-energy Punjabi song shoots, experience authentic North Indian hospitality wherever you celebrate.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Grid */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Unforgettable Experiences</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Punjabi Song Shoots",
              desc: "Powering high-energy production sets with authentic, hearty Punjabi meals tailored for large crews and artists.",
              image: "https://ik.imagekit.io/foodclub/Daba%20Choice/catering/ab6761610000e5ebaf94287a28816f8bfb8776e1.jpg"
            },
            {
              title: "Corporate Events",
              desc: "Elevate your office gatherings with premium North Indian buffets, offering a perfect blend of rich flavors and professional service.",
              image: "https://ik.imagekit.io/foodclub/Daba%20Choice/catering/closed-metal-pots_1203-2059.avif"
            },
            {
              title: "Weddings & Parties",
              desc: "Bring the royal 'Haveli' experience to your special day with custom menus, live grilling stations, and impeccable hospitality.",
              image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&fit=crop"
            }
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form & Contact Details section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl font-bold mb-4">Let's Plan Your Menu</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether it's an intimate gathering of 20 or a grand celebration of 500, our catering experts will craft a bespoke menu combining the finest North Indian delicacies from Delhi to Bombay. 
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Customized Authentic North Indian Menus",
                "Live Tandoor & BBQ Stations",
                "Professional Staff & Setup Options",
                "Specialized crew catering for shoots and sets"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-primary" />
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-8 glass-card border border-primary/20 rounded-3xl mt-8">
              <h3 className="font-display text-xl font-bold mb-2">Direct Inquiry</h3>
              <p className="text-muted-foreground text-sm mb-4">Need immediate assistance? Speak with our events managed directly.</p>
              <a href="tel:+971504247836" className="inline-flex items-center gap-2 gold-button px-6 py-3 rounded-xl text-sm font-medium">
                Call +971 50 424 7836
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                   <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name *</label>
                   <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone Number *</label>
                   <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                 <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Event Date *</label>
                  <input required min={today} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Approx Guest Count *</label>
                  <input required type="number" placeholder="e.g. 50" value={form.guestCount} onChange={e => setForm({...form, guestCount: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Event Type *</label>
                <select value={form.eventType} onChange={e => setForm({...form, eventType: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none appearance-none">
                  <option value="Punjabi Song Shoot">Punjabi Song Shoot</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Wedding">Wedding / Reception</option>
                  <option value="Private Party">Private Party / Get-together</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Event Details & Requirements</label>
                <textarea rows={4} placeholder="Tell us more about your event..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none resize-none" />
              </div>

              <button type="submit" className="gold-button w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base font-semibold">
                Submit Catering Inquiry <ChevronRight size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
