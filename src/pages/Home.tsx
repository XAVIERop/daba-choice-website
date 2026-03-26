import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, ChevronDown, Utensils, MapPin, ShieldCheck, Flame, Award, Users, Package } from "lucide-react";
import { useCafeMenu } from "@/hooks/useCafeMenu";
import { useRef, useEffect, useState, type RefObject } from "react";
import { useTemplate, TEMPLATES, type TemplateLayout } from "@/contexts/TemplateContext";

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
  { icon: Flame, title: "Authentic North Indian", desc: "Hand-ground masalas and recipes from the heart of Delhi, Bombay, and Punjab." },
  { icon: Award, title: "Haveli Experience", desc: "A premium Punjabi Daba experience with zero compromise on quality and pure traditional standards." },
  { icon: Package, title: "Tiffin & Catering", desc: "4-week meal plans and premium catering for events, including Punjabi song shoots." },
  { icon: MapPin, title: "Wide Delivery", desc: "Serving Silicon Oasis, Academic City, Al Warqa, and Warsan 4." },
];

const testimonials = [
  { name: "Tariq M.", review: "The best Paya I've ever had in Dubai. Tastes exactly like back home in Lahore.", rating: 5 },
  { name: "Sana K.", review: "Their Chicken Karahi is legendary. Perfectly spiced, tender, and absolutely divine.", rating: 5 },
  { name: "Bilal R.", review: "Daba Choice is my go-to spot in International City. The Biryani never disappoints!", rating: 5 },
  { name: "Ayesha F.", review: "Best Malai Boti in Dubai, hands down. Creamy, smoky, and melts in your mouth.", rating: 5 },
  { name: "Usman A.", review: "Loved the Kashmiri chai and Gulab Jaman. Perfect ending to a beautiful meal.", rating: 5 },
];

/** Optional YouTube hero — off by default (embed often black on localhost / without referrer). Set `VITE_HERO_USE_YOUTUBE=1` to try. */
const HERO_YOUTUBE_ID = "fMCtQ-h6_mw";
const HERO_YOUTUBE_POSTER = `https://i.ytimg.com/vi/${HERO_YOUTUBE_ID}/hqdefault.jpg`;

/** Always-visible still (under video) so the hero never flashes empty black while the MP4 buffers. */
const HERO_STILL_BG =
  "https://images.unsplash.com/photo-1626776880227-9415683a690d?q=80&w=2070&auto=format&fit=crop";

/** Smaller files first so the first frame appears sooner. */
const HERO_MP4_SOURCES = [
  { src: "https://videos.pexels.com/video-files/5834304/5834304-hd_1280_720_24fps.mp4", type: "video/mp4" },
  { src: "https://videos.pexels.com/video-files/5834304/5834304-hd_1920_1080_24fps.mp4", type: "video/mp4" },
  { src: "https://videos.pexels.com/video-files/4092617/4092617-hd_1920_1080_30fps.mp4", type: "video/mp4" },
] as const;

function heroYoutubeEmbedSrc(id: string, pageOrigin: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    enablejsapi: "1",
  });
  if (pageOrigin) p.set("origin", pageOrigin);
  return `https://www.youtube.com/embed/${id}?${p.toString()}`;
}

type HeroMediaProps = {
  heroVideoRef: RefObject<HTMLVideoElement | null>;
  prefersReducedMotion: boolean;
  useYoutubeHero: boolean;
  youtubeEmbedSrc: string | null;
};

function HeroMediaStack({ heroVideoRef, prefersReducedMotion, useYoutubeHero, youtubeEmbedSrc }: HeroMediaProps) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${HERO_STILL_BG})` }}
        aria-hidden
      />
      {prefersReducedMotion ? null : useYoutubeHero ? (
        <div className="absolute inset-0 overflow-hidden bg-black z-[1]">
          {youtubeEmbedSrc ? (
            <iframe
              title="Daba Choice hero background"
              src={youtubeEmbedSrc}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
              style={{
                width: "100vw",
                height: "56.25vw",
                minHeight: "100vh",
                minWidth: "177.78vh",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={false}
              referrerPolicy="strict-origin-when-cross-origin"
              aria-hidden
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_YOUTUBE_POSTER})` }}
            />
          )}
        </div>
      ) : (
        <video
          ref={heroVideoRef}
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_STILL_BG}
          aria-hidden
        >
          {HERO_MP4_SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </>
  );
}

export default function Home() {
  const templateId = useTemplate();
  const layout: TemplateLayout =
    templateId && templateId in TEMPLATES ? TEMPLATES[templateId].layout : "cinema";
  const isRoyal = layout === "royal";

  const { data: menuItems = [] } = useCafeMenu();
  const reviews = testimonials;
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [youtubeEmbedSrc, setYoutubeEmbedSrc] = useState<string | null>(null);

  const useYoutubeHero = true;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!useYoutubeHero || prefersReducedMotion) return;
    setYoutubeEmbedSrc(heroYoutubeEmbedSrc(HERO_YOUTUBE_ID, window.location.origin));
  }, [useYoutubeHero, prefersReducedMotion]);

  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v || prefersReducedMotion || useYoutubeHero) return;
    const tryPlay = () => {
      void v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [prefersReducedMotion, useYoutubeHero]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredItems = menuItems.filter((item: { price: number }) => item.price > 0).slice(0, 3);
  const topReviews = reviews.slice(0, 3).map((r, i) => ({ id: String(i), authorName: r.name, comment: r.review, rating: r.rating }));

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      {isRoyal ? (
        <section
          ref={heroRef}
          className="relative min-h-[min(820px,90vh)] lg:min-h-screen overflow-hidden border-b border-white/10"
        >
          <div className="grid lg:grid-cols-2 min-h-[min(820px,90vh)] lg:min-h-screen">
            <motion.div
              style={{ y: heroY }}
              className="relative min-h-[42vh] lg:min-h-full order-2 lg:order-1 overflow-hidden"
            >
              <div className="absolute inset-3 sm:inset-4 lg:inset-8 overflow-hidden rounded-sm border-2 border-double border-primary/35 shadow-[inset_0_0_80px_hsl(0_0%_0%/0.45)]">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <HeroMediaStack
                    heroVideoRef={heroVideoRef}
                    prefersReducedMotion={prefersReducedMotion}
                    useYoutubeHero={useYoutubeHero}
                    youtubeEmbedSrc={youtubeEmbedSrc}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/25 pointer-events-none z-[2]" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent pointer-events-none z-[2] hidden lg:block" />
              </div>
              <div
                className="absolute inset-3 sm:inset-4 lg:inset-8 rounded-sm pointer-events-none z-[3] ring-1 ring-inset ring-accent/25"
                aria-hidden
              />
            </motion.div>

            <motion.div
              style={{ opacity: heroOpacity }}
              className="relative z-10 order-1 lg:order-2 flex flex-col justify-center px-5 sm:px-10 lg:pl-14 lg:pr-16 xl:pr-24 py-14 lg:py-16 bg-background lg:bg-gradient-to-bl from-background via-secondary/25 to-background"
            >
              <div className="max-w-xl mx-auto lg:mx-0 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-primary/80 to-transparent" />
                  <span className="text-accent text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase whitespace-nowrap">
                    Heritage kitchen · Dubai
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent hidden sm:block" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1 }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 leading-[1.08] text-left uppercase tracking-tight"
                >
                  THE HEART OF <span className="gold-gradient-text italic">PUNJABI DABA</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="text-base md:text-lg text-muted-foreground mb-8 font-light tracking-wide text-left leading-relaxed"
                >
                  Authentic North Indian, Delhi & Bombay flavors — heritage recipes and pure ingredients — served across Dubai Silicon Oasis & International City.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-muted-foreground text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Star size={16} className="fill-primary text-primary shrink-0" />
                    4.9/5 Rating
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-primary shrink-0" />
                    1000+ guests
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary shrink-0" />
                    100% Authentic
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                >
                  <Link
                    href="/menu"
                    className="gold-button px-10 py-4 rounded-sm text-sm tracking-[0.2em] text-center"
                  >
                    EXPLORE MENU
                  </Link>
                  <Link
                    href="/reservation"
                    className="outline-button px-10 py-4 rounded-sm text-sm tracking-[0.2em] text-center bg-card/40 backdrop-blur-sm"
                  >
                    BOOK A TABLE
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </section>
      ) : (
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 overflow-hidden">
            <HeroMediaStack
              heroVideoRef={heroVideoRef}
              prefersReducedMotion={prefersReducedMotion}
              useYoutubeHero={useYoutubeHero}
              youtubeEmbedSrc={youtubeEmbedSrc}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/50 pointer-events-none" />

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
              Authentic Punjabi cuisine — crafted with heritage recipes, pure ingredients,<br className="hidden md:block" /> and served in the heart of International City, Dubai.
            </motion.p>

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
                100% Authentic
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
      )}

      {/* ─── STATS BAR ─── */}
      <section
        className={`py-12 border-y border-white/5 relative overflow-hidden ${
          isRoyal ? "bg-gradient-to-r from-secondary/40 via-black to-secondary/40" : "bg-black"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 text-center ${
              isRoyal ? "gap-6 md:gap-0 md:divide-x md:divide-white/10 [&>div]:md:px-6" : "gap-8"
            }`}
          >
            {[
              { value: 73, suffix: "+", label: "Authentic Dishes" },
              { value: 12, suffix: "", label: "Menu Categories" },
              { value: 100, suffix: "%", label: "Authentic Recipes" },
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
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${
              isRoyal ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: isRoyal ? 50 : -50 }}
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
              initial={{ opacity: 0, x: isRoyal ? -50 : 50 }}
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
                At Daba Choice, every dish tells a story — the story of North India’s rich culinary heritage from Delhi to Bombay. Our chefs bring decades of experience, inspired by the legendary Haveli style, to craft food that feels like home.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                From the smoky char of our BBQ to our signature Tiffin services, every plate is prepared with the finest ingredients and served with genuine Punjabi warmth. We are the preferred choice for all clients, even powering Punjabi song shoots with our premium catering.
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

            <div
              className={
                isRoyal
                  ? "grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6 lg:gap-5 lg:items-stretch"
                  : "grid grid-cols-1 md:grid-cols-3 gap-8"
              }
            >
              {featuredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`glass-card overflow-hidden group cursor-pointer flex flex-col ${
                    isRoyal
                      ? i === 0
                        ? "lg:col-span-7 lg:row-span-2 rounded-sm"
                        : "lg:col-span-5 rounded-sm"
                      : "rounded-2xl"
                  }`}
                >
                  <div
                    className={`overflow-hidden relative shrink-0 ${
                      isRoyal && i === 0 ? "h-64 lg:h-auto lg:flex-1 lg:min-h-[300px]" : "h-64"
                    }`}
                  >
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
          <div
            className={
              isRoyal
                ? "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            }
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={
                  isRoyal
                    ? "glass-card p-7 rounded-sm border-l-4 border-l-primary text-left flex gap-5 items-start hover:bg-primary/[0.04]"
                    : "glass-card p-8 rounded-2xl text-center group hover:bg-primary/5"
                }
              >
                <div
                  className={
                    isRoyal
                      ? "w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0"
                      : "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-all duration-300"
                  }
                >
                  <f.icon size={isRoyal ? 22 : 28} />
                </div>
                <div className={isRoyal ? "min-w-0" : ""}>
                  <h3 className={`font-display text-lg font-bold mb-3 ${isRoyal ? "" : ""}`}>{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATERING & SONG SHOOTS ─── */}
      <section className="py-28 relative overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">Event Catering</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                FROM CORPORATE TO<br />
                <span className="gold-gradient-text italic">SONG SHOOTS</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether it's a small gathering or a high-profile Punjabi song shoot, our catering team brings the authentic Haveli flavors to your set or event. We manage everything from menu planning to live counters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+971504247836" className="gold-button px-8 py-3 rounded-full text-sm text-center">
                  Inquire for Catering
                </a>
                <Link href="/gallery" className="outline-button px-8 py-3 rounded-full text-sm text-center">
                  View Gallery
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop" 
                alt="Event Catering" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black">
                  <Star className="fill-current" size={20} />
                </div>
                <p className="text-white font-bold text-lg">Trusted by Professionals</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TIFFIN SERVICES (EXISTING) ─── */}
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
