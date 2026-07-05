import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { imagekitUrl } from "@/lib/imagekit";

const rawGalleryItems = [
  // --- LATEST MULTIMEDIA ---
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQMf32EfS4XoUDrWE4c8hZRGxi8q6lX0e0yneI2DtZmGScHgicnfkyTnkeqIkMdp7dHlPHxAHEQ3nT-nx32x6N84.mp4", category: "Trending", label: "Heritage Cooking", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQNNTx0rZ9caHmkFdEVNziSfocvmVoYVxs1YXye-oG8rm3em1_J55McII7D1BFZ5omiB4No5fQRsGLvRccSjaZbFpPzC1d91f2aGEv8.mp4", category: "Trending", label: "Daba Spirit", size: "wide" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQN1h4s-sY2oRfetJB21jqTtmJyTazZCnzGW38vhnHjb-DdxOWjvYFBOSO0D5OKRjbVCJQC81K2pa9EHq_-03H8IexAQBoqgndkCXPc.mp4", category: "Trending", label: "Sizzle & Flame", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQN1Mb_Gk_4NZt93bGrHULrcdoOwsSwMwK81C7UUY07n48ymtkeTBkS3wu8N92AqEBjK8gUutdlz1DVu0XVuRUFwE7xdF2MKy6XzcKI.mp4", category: "Trending", label: "Kitchen Beats", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQOmtW93AetW5T8TYLnlDk3FVNA4FTOj_GjoWSRSIAIIrtLMnGUA7l-9cHUkBYsAUZUaW92K56uxyBRPJF27LrpPXO--GkZcW5Z_H-A.mp4", category: "Trending", label: "Master Chef", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQOiZ2SI_m82et4HRtKIhsMIU39EjvONdkS7jOPyZw3x9ecDoQ-z8kAl4qgbKWUS3f-oU3ejbJoya-SFJH4CcHrDe8jjaRJoRrvqTsw.mp4", category: "Trending", label: "Joy of Punjab", size: "wide" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQN64QETxdkICpj9A0_kfi0tAxvkY9QEA2wcpEZObUSAznSj38EHTgGnH0-uNoeTL-Q8O4IjdmDzZyYwiBFBHj77.mp4", category: "Trending", label: "Authentic Methods", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQN1SXAvOVzxE9a2vjbk8isD98kUop8HsyQyGEPVCZSdQhpab4UrfKGSx-7J3m0qJ0avaqyjn7-u7cpWLIvilwn8zZr8PPQl7z7sCxU.mp4", category: "Trending", label: "Community Tables", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/AQOr7HjrArZpsJev7E-HkR-bPcLUDMySlxB5BP3-Cqv7ln65hsjSCHexm6XoTiqGNv-ozs6Ln0Hb0M5mkwvRnl15TcT1KzIrSKakC-U.mp4", category: "Trending", label: "Signature Finish", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/562551040_17908094682252352_7450174214795450809_n.jpg", category: "Food", label: "Fresh Platter", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/New%20Folder/566023398_17908094658252352_8411408286332952190_n.jpg", category: "Ambiance", label: "Daba Interior", size: "wide" },

  // --- NEW WEBPS ---
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/roti.webp", category: "Food", label: "Tandoori Roti", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/makhni.webp", category: "Food", label: "Dal Makhani Special", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/daba%20choice%20outside%20photo.webp", category: "Ambiance", label: "Daba Choice Frontage", size: "wide" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/combo.webp", category: "Food", label: "Lunch Combo", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/outside.webp", category: "Ambiance", label: "Outdoor Vibes", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/thali.webp", category: "Food", label: "Executive Thali", size: "wide" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/halwa.webp", category: "Food", label: "Moong Dal Halwa", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/paani.webp", category: "Drinks", label: "Refreshing Jaljeera", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/fryums.webp", category: "Food", label: "Crunchy Fryums", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/shake.webp", category: "Drinks", label: "Thick Shakes", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/golgappe.webp", category: "Food", label: "GolGappe Shots", size: "wide" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/unnamed.webp", category: "Food", label: "Punjabi Staples", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/unnamed%20(1).webp", category: "Food", label: "Freshly Prepared", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/New%20Folder/unnamed%20(2).webp", category: "Food", label: "Authentic Flavours", size: "normal" },

  // --- NEW VIDEOS ---
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/AQMuIts-Rn5SEjiRoCHrvb05C2X3D-2IWsAYr4oZJm0TMCaLhLxX3zI_sMxxHqkHM82nZItReaxcINXPwieYSe3z.mp4", category: "Trending", label: "Catering Excellence", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/AQPTZjddbx725XfFZ3xhxymI29kpJFL2P6qH5V4phM08CYLDwiA6531yp49qMDLhC9rKafvhreUzGoKwmeLayudY_ZMSj9PXeImW50g.mp4", category: "Vibes", label: "Kitchen Energy", size: "wide" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/AQM4fQCYGC7auLwEdo4-3TqR_IFcBY2G7xrYExNHiuAGjwYzHDu8HucWHtTmF2VvAFq81qW45P2P9JLPc2XzRABx-ii8ef9uXlcbU3E.mp4", category: "Catering", label: "Event Highlights", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/AQP0x_G8poxopi_wwGC3tj0dtvx3ooUIgdQHfn6eelh148eqY_VogH4eWjuBAu2PjIbvg46lzF4o5YNFdknEmXhD62tgwpICH0ujLKI.mp4", category: "Vibes", label: "Daba Experience", size: "tall" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/AQMueEMr43dTdLYfdnGLJp5Eb2G-HJkfosI-HlHlEkPD8n8EGppK_UyP_03HMPImV_vcQjwT-btCEgeRF7fddId3IOJbv71NYFqQrjw.mp4", category: "Food", label: "Food Crafting", size: "normal" },
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/AQO9hjpZvH0iKu4SX1qvh_9J7I1rj68Y9a-YP8GNjZYkL1kojU4O-xdVgUDE2NdOiLndEeMpbM-mFx3vhl4zvbkIZ1BUVBnfI6SG1wc.mp4", category: "Trending", label: "Heritage Recipes", size: "wide" },

  // --- NEW IMAGES ---
  { src: "https://ik.imagekit.io/foodclub/Daba%20Choice/New%20Folder/586788706_18319996105171567_2699830781182895935_n.jpg", category: "Ambiance", label: "Authentic Decor", size: "wide" },

  // --- LEGACY ---
  { src: "https://ik.imagekit.io/xavierop/Daba%20Choice/istockphoto-1292436403-612x612.jpg", category: "Food", label: "Chicken Tikka Biryani", size: "tall" },
  { src: "https://ik.imagekit.io/xavierop/Daba%20Choice/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg", category: "Food", label: "Chicken Dum Biryani", size: "normal" },
];

const galleryItems = rawGalleryItems.map((item) => ({
  ...item,
  src: imagekitUrl(item.src),
}));

const CATEGORIES = ["All", "Trending", "Food", "Catering", "Vibes", "Ambiance"];

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

  const isVideo = (url: string) => url.toLowerCase().endsWith(".mp4") || url.toLowerCase().endsWith(".webm");

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
                  ? "bg-primary text-primary-foreground"
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
                {isVideo(item.src) ? (
                  <video 
                    src={item.src} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 muted"
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-overlay/80 via-overlay/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-end pb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-white mb-3">
                    {isVideo(item.src) ? (
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    ) : (
                      <ZoomIn size={24} />
                    )}
                  </div>
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
            className="fixed inset-0 z-[100] bg-overlay/95 backdrop-blur-xl flex items-center justify-center"
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

            {/* Image/Video */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-auto px-20"
              onClick={e => e.stopPropagation()}
            >
              {isVideo(filtered[lightboxIndex].src) ? (
                <video 
                  src={filtered[lightboxIndex].src} 
                  controls 
                  autoPlay 
                  className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl"
                />
              ) : (
                <img
                  src={filtered[lightboxIndex].src.replace("w=900", "w=1400")}
                  alt={filtered[lightboxIndex].label}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                />
              )}
              <div className="text-center mt-6">
                <p className="font-display text-white font-bold text-xl drop-shadow-sm">{filtered[lightboxIndex].label}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="w-8 h-px bg-primary/50" />
                  <p className="text-primary text-sm uppercase tracking-widest">{filtered[lightboxIndex].category}</p>
                  <span className="w-8 h-px bg-primary/50" />
                </div>
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
