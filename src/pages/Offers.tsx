import { AnimatePresence, motion } from "framer-motion";
import { TicketPercent, Clock, Tag, ChevronRight, Sparkles, Maximize2, X, Star } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { imagekitUrl } from "@/lib/imagekit";

function Countdown({ validUntil }: { validUntil: string | null }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!validUntil) return;
    const update = () => {
      const diff = new Date(validUntil).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [validUntil]);

  if (!validUntil) return null;

  return (
    <div className="flex items-center gap-3 mt-4">
      <Clock size={14} className="text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground uppercase tracking-wider">Ends in</span>
      <div className="flex gap-2">
        {[
          { val: time.days, label: "d" },
          { val: time.hours, label: "h" },
          { val: time.mins, label: "m" },
          { val: time.secs, label: "s" },
        ].map(({ val, label }) => (
          <div key={label} className="bg-amber-50 border border-amber-200/60 rounded-lg px-2 py-1 min-w-[2.5rem] text-center">
            <span className="font-display font-bold text-primary text-sm">{String(val).padStart(2, "0")}</span>
            <span className="text-foreground/50 text-xs ml-0.5">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const staticOffers = [
  {
    id: "s0",
    title: "Ganpati Special Thali",
    description: "Satvik, pure, and delicious — 2 Puri/Roti, Aloo Jeera, Dal Tadka, Sahi Paneer, Jeera Rice, Dahi, Cucumber Tomato Salad, and Ras Malai. All made with no onion, no garlic. The perfect thali for Ganpati Puja & blessings.",
    discount: null,
    imageUrl: imagekitUrl("https://ik.imagekit.io/xavierop/Daba%20Choice/WhatsApp%20Image%202026-08-23%20at%2022.08.04.jpeg"),
    validUntil: null,
    isActive: true,
    badge: "Only 25 AED",
    color: "from-amber-500/20 to-primary/10",
    featured: true,
  },
];

export default function Offers() {
  const allOffers = staticOffers;
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxImage]);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Limited Time Deals</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            EXCLUSIVE <span className="gold-gradient-text">OFFERS</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enjoy special discounts and seasonal deals at Daba Choice — authentic Punjabi cuisine at unbeatable value.
          </p>
        </div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="text-primary" size={22} />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">New Customer Offer</p>
              <p className="text-muted-foreground text-sm">Get 10% off your first order — order online below</p>
            </div>
          </div>
          <Link href="/menu" className="gold-button px-6 py-3 rounded-xl text-sm shrink-0 flex items-center gap-2">
            Order Online <ChevronRight size={16} />
          </Link>
        </motion.div>

        {/* Offers Cards */}
        <div className="space-y-8">
          {allOffers.map((offer: any, i: number) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className={`glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row relative ${
                offer.featured ? "ring-2 ring-primary/50 shadow-[0_0_40px_-10px_rgba(212,160,23,0.45)]" : ""
              }`}
            >
              {/* Decorative bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.color || "from-primary/10 to-accent/5"} pointer-events-none`} />
              <div className="absolute -right-10 -top-10 text-foreground/[0.03] pointer-events-none">
                <TicketPercent size={250} />
              </div>

              {/* Featured ribbon */}
              {offer.featured && (
                <div className="absolute top-5 -left-11 z-20 rotate-[-45deg] w-40 py-1.5 text-center bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                  <span className="inline-flex items-center gap-1">
                    <Star size={11} fill="currentColor" /> Featured
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {offer.discount && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/20 text-primary border border-primary/40 rounded-full text-sm font-bold uppercase tracking-wider">
                      <Tag size={13} />
                      {offer.discount} OFF
                    </span>
                  )}
                  {offer.badge && (
                    <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {offer.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{offer.title}</h3>
                <p className="text-muted-foreground text-base mb-4 leading-relaxed max-w-xl">{offer.description}</p>

                {offer.validUntil && <Countdown validUntil={offer.validUntil} />}

                <div className="flex flex-wrap gap-3 mt-6">
                  <Link href="/menu" className="gold-button px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
                    Order Now <ChevronRight size={16} />
                  </Link>
                  <Link href="/reservation" className="outline-button px-6 py-2.5 rounded-xl text-sm">
                    Book a Table
                  </Link>
                </div>
              </div>

              {/* Image */}
              {offer.imageUrl && (
                <button
                  type="button"
                  onClick={() => setLightboxImage({ url: offer.imageUrl, title: offer.title })}
                  className="group w-full md:w-96 h-72 md:h-auto shrink-0 relative overflow-hidden cursor-zoom-in bg-black/5"
                  aria-label={`View full ${offer.title} poster`}
                >
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-contain md:object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-overlay/20 md:to-card/60 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Maximize2 size={15} /> View Full Poster
                    </span>
                  </div>
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass-card p-10 rounded-3xl border border-primary/20"
        >
          <h2 className="font-display text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">Follow us on Instagram <a href="https://instagram.com/daba_choice" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@daba_choice</a> to never miss a deal or seasonal special.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://instagram.com/daba_choice" target="_blank" rel="noopener noreferrer" className="outline-button px-8 py-3 rounded-xl text-sm">
              Follow on Instagram
            </a>
            <Link href="/contact" className="px-8 py-3 rounded-xl text-sm border border-primary/40 text-primary hover:border-primary hover:bg-primary hover:text-white transition-all">
              Contact Us
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Lightbox */}
      {createPortal(
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setLightboxImage(null)}
            >
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close"
                className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
              <motion.img
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                src={lightboxImage.url}
                alt={lightboxImage.title}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
