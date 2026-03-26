import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact } from "@/hooks/useSubmitContact";
import { useCafe } from "@/contexts/CafeContext";
import { features } from "@/config/features";
import { formatWhatsAppContactMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const submitContact = useSubmitContact();
  const { cafe } = useCafe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (features.whatsapp_only && cafe?.phone) {
      const message = formatWhatsAppContactMessage(
        cafe.name,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        }
      );

      const url = getWhatsAppUrl(cafe.phone, message);
      
      // Small UX delay
      setTimeout(() => {
        window.open(url, "_blank");
        toast({ 
          title: "Message prepared!", 
          description: "Please send the message in WhatsApp to reach out to us.",
          style: { backgroundColor: "#D4AF37", color: "black" } 
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 800);
      return;
    }

    submitContact.mutate({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message
    }, {
      onSuccess: () => {
        toast({ title: "Message Sent", description: "We will get back to you shortly.", style: { backgroundColor: "#D4AF37", color: "black" } });
        setForm({ name: "", email: "", subject: "", message: "" });
      },
      onError: (err: any) => {
        toast({
          title: "Failed to send message",
          description: err.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">We'd Love to Hear From You</span>
          <h1 className="font-display text-5xl font-bold mb-4">GET IN <span className="gold-gradient-text">TOUCH</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Visit us at International City, Dubai, or reach out anytime for reservations, inquiries, and catering.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-6">
            {/* Address */}
            <div className="glass-card p-7 rounded-3xl flex items-start gap-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Our Location</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Y-20, England-Y Street<br />
                  England Cluster, International City<br />
                  Dubai, UAE
                </p>
                <a
                  href="https://maps.google.com/?q=Daba+Choice+Restaurant+International+City+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-sm mt-3 hover:underline"
                >
                  Open in Google Maps <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-card p-7 rounded-3xl flex items-start gap-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Call Us</h3>
                <a href="tel:+971504247836" className="text-muted-foreground hover:text-primary transition-colors leading-relaxed block">
                  +971 50 424 7836
                </a>
                <p className="text-xs text-muted-foreground/60 mt-1">Available during restaurant hours</p>
              </div>
            </div>

            {/* Order Online */}
            <div className="glass-card p-7 rounded-3xl flex items-start gap-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Order Online</h3>
                <p className="text-muted-foreground text-sm mb-3">We deliver to International City and Dubai Silicon Oasis.</p>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-xl text-sm hover:bg-primary hover:text-black transition-all"
                >
                  Order Now <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Instagram */}
            <div className="glass-card p-7 rounded-3xl flex items-start gap-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Follow Us</h3>
                <a
                  href="https://instagram.com/daba_choice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors leading-relaxed"
                >
                  @daba_choice on Instagram
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-10 rounded-3xl space-y-6">
            <h3 className="font-display text-2xl font-bold mb-6">Send a Message</h3>
            <input required placeholder="Your Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:outline-none" />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:outline-none" />
            <input required placeholder="Subject" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:outline-none" />
            <textarea required placeholder="Your Message" rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 focus:border-primary focus:outline-none resize-none" />
            
            <button type="submit" disabled={submitContact.isPending} className="gold-button w-full py-4 rounded-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50">
              <Send size={18} /> {submitContact.isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map Embed */}
        <div className="glass-card rounded-3xl overflow-hidden h-80">
          <iframe
            title="Daba Choice Restaurant Location"
            src="https://maps.google.com/maps?q=International+City+England+Cluster+Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
