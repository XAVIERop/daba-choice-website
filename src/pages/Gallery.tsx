import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1565557702975-a4c3b96c9c09?w=900&fit=crop", category: "Food", label: "Chicken Biryani", size: "tall" },
  { src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=900&fit=crop", category: "Food", label: "Dal Makhani", size: "normal" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&fit=crop", category: "Food", label: "Garlic Naan", size: "normal" },
  { src: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=900&fit=crop", category: "BBQ", label: "Chicken Tikka", size: "tall" },
  { src: "https://images.unsplash.com/photo-1585937421612-70a8d5ab6bc9?w=900&fit=crop", category: "Food", label: "Lamb Biryani", size: "normal" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&fit=crop", category: "Ambiance", label: "Restaurant Interior", size: "wide" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&fit=crop", category: "BBQ", label: "Mixed Grill", size: "normal" },
  { src: "https://images.unsplash.com/photo-1573225342350-16731dd9bf83?w=900&fit=crop", category: "Drinks", label: "Mango Lassi", size: "normal" },
  { src: "https://images.unsplash.com/photo-1512058556646-c4da40fba323?w=900&fit=crop", category: "Food", label: "Dal Tadka", size: "normal" },
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&fit=crop", category: "Food", label: "Egg Chana", size: "tall" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&fit=crop", category: "Ambiance", label: "Dining Experience", size: "normal" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&fit=crop", category: "Food", label: "Desi Platter", size: "normal" },
  { src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&fit=crop", category: "BBQ", label: "Lamb Chops", size: "normal" },
  { src: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f5?w=900&fit=crop", category: "Drinks", label: "Kashmiri Chai", size: "normal" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&fit=crop", category: "Food", label: "Fresh Herbs & Spices", size: "normal" },
  { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&fit=crop", category: "Food", label: "Beef Haleem", size: "normal" },
  { src: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&fit=crop", category: "BBQ", label: "Seekh Kebab", size: "normal" },
  { src: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=900&fit=crop", category: "Food", label: "Butter Chicken", size: "normal" },
];

const CATEGORIES = ["All", "Food", "BBQ", "Drinks", "Ambiance"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Experience</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            OUR <span className="gold-gradient-text">GALLERY</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">A glimpse into the colours, textures, and flavours of authentic Punjabi cuisine.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-black"
                  : "border border-white/20 text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-card cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-end pb-6">
                  <ZoomIn size={28} className="text-white mb-3 opacity-80" />
                  <span className="font-display text-white text-sm font-bold tracking-widest text-center px-4">{item.label}</span>
                  <span className="text-primary text-xs tracking-wider mt-1">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-auto px-20"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src.replace("w=900", "w=1400")}
                alt={filtered[lightboxIndex].label}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="text-center mt-4">
                <p className="font-display text-white font-bold text-lg">{filtered[lightboxIndex].label}</p>
                <p className="text-primary text-sm">{filtered[lightboxIndex].category}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
