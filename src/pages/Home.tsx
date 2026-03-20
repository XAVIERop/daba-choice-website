import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, ChevronDown, Utensils, Clock, MapPin, ShieldCheck, Flame, Award, Users, Package } from "lucide-react";
import { useCafeMenu } from "@/hooks/useCafeMenu";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

const features = [
  { icon: Flame, title: "Authentic Spices", desc: "Hand-ground masalas sourced directly from Punjab's finest spice markets." },
  { icon: Award, title: "Premium Quality", desc: "Only the freshest halal ingredients, prepared daily with zero compromise." },
  { icon: Clock, title: "Fast Delivery", desc: "Hot food delivered to International City and Dubai Silicon Oasis." },
  { icon: ShieldCheck, title: "Trusted Experience", desc: "Hundreds of loyal customers who return for the real taste of home." },
];

const testimonials = [
  { name: "Tariq M.", review: "The best Paya I've ever had in Dubai. Tastes exactly like back home in Lahore.", rating: 5 },
  { name: "Sana K.", review: "Their Chicken Karahi is legendary. Perfectly spiced, tender, and absolutely divine.", rating: 5 },
  { name: "Bilal R.", review: "Daba Choice is my go-to spot in International City. The Biryani never disappoints!", rating: 5 },
  { name: "Ayesha F.", review: "Best Malai Boti in Dubai, hands down. Creamy, smoky, and melts in your mouth.", rating: 5 },
  { name: "Usman A.", review: "Loved the Kashmiri chai and Gulab Jaman. Perfect ending to a beautiful meal.", rating: 5 },
];

export default function Home() {
  const { data: menuItems = [] } = useCafeMenu();
  const reviews = testimonials;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredItems = menuItems.filter((item: { price: number }) => item.price > 0).slice(0, 3);
  const topReviews = reviews.slice(0, 3).map((r, i) => ({ id: String(i), authorName: r.name, comment: r.review, rating: r.rating }));

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1541167760496-1628856ab752?q=80&w=2070&auto=format&fit=crop)`,
            y: heroY,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block" />
        <div className="absolute top-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-40 h-40 border border-primary/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-16 w-24 h-24 border border-primary/10 rounded-full hidden lg:block"
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-primary font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 border border-primary/30 px-6 py-2 rounded-full backdrop-blur-sm bg-primary/5"
          >
            Welcome to Dubai's Finest Punjabi Cafe
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[1.05]"
          >
            THE REAL TASTE<br />
            <span className="gold-gradient-text">OF PUNJAB</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-white/70 mb-6 max-w-2xl mx-auto font-light tracking-wide"
          >
            Authentic Punjabi cuisine — crafted with heritage recipes, halal ingredients,<br className="hidden md:block" /> and served in the heart of International City, Dubai.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8 text-white/80 text-sm"
          >
            <span className="flex items-center gap-2">
              <Star size={16} className="fill-primary text-primary" />
              4.9/5 Rating
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              1000+ Happy Guests
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              100% Halal
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/menu" className="gold-button px-10 py-4 rounded-full text-sm tracking-[0.2em] w-full sm:w-auto text-center">
              EXPLORE MENU
            </Link>
            <Link href="/reservation" className="outline-button px-10 py-4 rounded-full text-sm tracking-[0.2em] w-full sm:w-auto text-center bg-black/30 backdrop-blur-md">
              BOOK A TABLE
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="py-12 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 73, suffix: "+", label: "Authentic Dishes" },
              { value: 12, suffix: "", label: "Menu Categories" },
              { value: 100, suffix: "%", label: "Halal Certified" },
              { value: 5, suffix: "★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold gold-gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-28 bg-background relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&fit=crop"
                  alt="Punjabi cuisine"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel px-6 py-4 rounded-2xl border border-primary/30 text-center">
                <p className="font-display text-3xl font-bold gold-gradient-text">100%</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Authentic</p>
              </div>
              {/* Decorative corner */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Our Heritage</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                CRAFTED WITH<br /><span className="gold-gradient-text">HEART & SOUL</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                At Daba Choice, every dish tells a story — the story of Punjab's rich culinary heritage. Our chefs bring decades of experience, using time-tested recipes passed down through generations to craft food that feels like home.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                From the smoky char of our BBQ to the silky richness of our Karahi, every plate is prepared with the finest halal ingredients and served with genuine Punjabi warmth right here in International City, Dubai.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { icon: Utensils, label: "73+ Dishes", sub: "from 12 categories" },
                  { icon: MapPin, label: "International City", sub: "England Cluster, Dubai" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/menu" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all font-medium tracking-wider uppercase text-sm">
                Explore Our Full Menu <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED DISHES ─── */}
      {featuredItems.length > 0 && (
        <section className="py-28 bg-card/20 border-y border-white/5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/arabic-pattern.png)`, backgroundSize: '300px' }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Must Try</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                CHEF'S <span className="gold-gradient-text">SPECIALS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.image_url || "https://images.unsplash.com/photo-1585937421612-70a8d5ab6bc9?w=800&fit=crop"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {i === 0 && (
                        <span className="bg-primary/90 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Bestseller
                        </span>
                      )}
                      {i === 2 && (
                        <span className="bg-accent/90 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Highly Rated
                        </span>
                      )}
                      <span className="bg-black/60 backdrop-blur-md border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <h3 className="font-display text-xl font-bold text-white leading-tight">{item.name}</h3>
                      <span className="text-primary font-bold text-lg shrink-0 ml-3">AED {item.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{item.description}</p>
                    <Link href="/menu" className="text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                      Order Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link href="/menu" className="outline-button inline-block px-10 py-4 rounded-full text-sm tracking-[0.2em]">
                VIEW ALL 73 DISHES
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">The Daba Promise</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              WHY CHOOSE <span className="gold-gradient-text">US</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center group hover:bg-primary/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <f.icon size={28} />
                </div>
                <h3 className="font-display text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIFFIN SERVICES ─── */}
      <section className="py-28 bg-card/20 border-y border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/arabic-pattern.png)`, backgroundSize: '300px' }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Package size={40} />
            </div>
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-2">Daily Meal Plans</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                TIFFIN <span className="gold-gradient-text">SERVICES</span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Fresh Punjabi home-style meals delivered daily. Lunch, dinner, or both — choose a plan that fits your schedule.
              </p>
              <Link href="/tiffin" className="gold-button inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm tracking-[0.2em]">
                View Plans & Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── POPULAR CATEGORIES STRIP ─── */}
      <section className="py-8 bg-black border-y border-white/5 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {["Breakfast", "Desi Chaat", "Biryani", "BBQ", "Karahi", "Lassi", "Fish", "Breads", "Sweets", "Tea", "Lunch & Dinner", "Special Dish",
            "Breakfast", "Desi Chaat", "Biryani", "BBQ", "Karahi", "Lassi", "Fish", "Breads", "Sweets", "Tea", "Lunch & Dinner", "Special Dish"].map((cat, i) => (
            <span key={i} className="text-white/30 text-sm font-display tracking-[0.3em] uppercase shrink-0">
              {cat} <span className="text-primary mx-4">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {topReviews.length > 0 && (
        <section className="py-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Real Guests</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                WHAT THEY <span className="gold-gradient-text">SAY</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card p-8 rounded-3xl relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 font-display text-8xl text-white/3 leading-none select-none">"</div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className={j < review.rating ? "fill-primary text-primary" : "text-white/20"} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 leading-relaxed text-sm relative z-10">"{review.comment}"</p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold font-display">
                      {review.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{review.authorName}</p>
                      <p className="text-xs text-primary">Verified Guest</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/reviews" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium tracking-wider text-sm uppercase">
                Read All Reviews <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── INLINE TESTIMONIALS STRIP (always visible) ─── */}
      {topReviews.length === 0 && (
        <section className="py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Real Guests</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                WHAT THEY <span className="gold-gradient-text">SAY</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card p-8 rounded-3xl"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 text-sm">"{t.review}"</p>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-primary">Verified Guest</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── VISIT US / DELIVERY CTA ─── */}
      <section className="py-28 bg-card/20 border-y border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/arabic-pattern.png)`, backgroundSize: '300px' }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Come Dine With Us</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              VISIT US IN<br /><span className="gold-gradient-text">INTERNATIONAL CITY</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-2 max-w-2xl mx-auto">
              Y-20, England-Y Street, England Cluster, International City, Dubai, UAE
            </p>
            <p className="text-muted-foreground mb-2">Delivery available to International City & Dubai Silicon Oasis</p>
            <p className="text-primary/90 text-sm font-medium mb-10">Limited tables for dinner — book now to avoid wait times</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link href="/reservation" className="gold-button px-10 py-4 rounded-full text-sm tracking-[0.2em]">
                BOOK A TABLE
              </Link>
              <a href="tel:+971504247836" className="outline-button px-10 py-4 rounded-full text-sm tracking-[0.2em]">
                CALL NOW
              </a>
              <a href="https://maps.google.com/?q=Daba+Choice+Restaurant+International+City+Dubai" target="_blank" rel="noopener noreferrer" className="px-10 py-4 rounded-full text-sm tracking-[0.2em] border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
                GET DIRECTIONS
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
