import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Star, Users, Award } from "lucide-react";
import { imagekitUrl } from "@/lib/imagekit";

const values = [
  {
    icon: "🙏",
    title: "Seva",
    punjabi: "ਸੇਵਾ",
    desc: "True service runs in our veins. Every guest is treated like family — with warmth, genuine respect, and heartfelt care. In Punjabi culture, feeding someone is an act of love.",
  },
  {
    icon: "🍛",
    title: "Swad",
    punjabi: "ਸੁਆਦ",
    desc: "Taste is our identity. Hand-ground masalas, slow-cooked gravies, and recipes passed through generations define the flavours that make our food unforgettable.",
  },
  {
    icon: "👑",
    title: "Shaan",
    punjabi: "ਸ਼ਾਨ",
    desc: "Pride in every plate. The shaan (pride) of Punjab shines through every dish — no shortcuts, no compromises, only the best.",
  },
  {
    icon: "🌾",
    title: "Mitti",
    punjabi: "ਮਿੱਟੀ",
    desc: "The soil of Punjab. We stay rooted in our origins — the fields, the villages, the dhaba roads that inspired the flavours we serve today in Dubai.",
  },
];

const milestones = [
  { year: "2021", title: "Daba Choice Founded", desc: "Opened our doors in International City, Dubai, with a dream to bring authentic Punjabi Dhaba culture to the UAE." },
  { year: "2022", title: "1000+ Happy Guests", desc: "Crossed a thousand satisfied guests, earning 5-star reviews for our authentic taste and warm hospitality." },
  { year: "2023", title: "Tiffin & Catering Launch", desc: "Launched our popular tiffin meal plans and premium catering services for corporate events and Punjabi song shoots." },
  { year: "2024+", title: "Dubai's Top Punjabi Dhaba", desc: "Recognised as one of Dubai's finest Punjabi dining experiences, serving 73+ authentic dishes across 12 categories." },
];

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent via-30% to-transparent" />

        {/* Phulkari-style decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-accent/20 rounded-full hidden lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 border border-primary/30 px-6 py-2 rounded-full backdrop-blur-sm bg-primary/10 shadow-sm"
          >
            ਸਾਡੀ ਕਹਾਣੀ — Our Story
          </motion.span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="text-white">THE HEART OF</span><br />
            <span className="gold-gradient-text">PUNJABI DABA</span>
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            From the fertile fields of Punjab to the vibrant streets of Dubai — a story of food, culture, and the warmth of Punjabi hospitality.
          </p>
        </motion.div>
      </section>

      {/* ─── INTRO QUOTE ─── */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="phulkari-divider mb-10">
            <span className="text-accent text-xl shrink-0 px-4">✦</span>
          </div>
          <blockquote className="font-display text-3xl md:text-4xl font-bold text-primary leading-relaxed mb-6">
            "ਦਿਲ ਤੋਂ, ਢਾਬੇ ਤੱਕ"
          </blockquote>
          <p className="text-muted-foreground text-lg italic">"From the heart, to the Dhaba"</p>
          <div className="phulkari-divider mt-10">
            <span className="text-accent text-xl shrink-0 px-4">✦</span>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-20 bg-primary/5 punjabi-pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">ਸਾਡੀ ਕਹਾਣੀ · Our Heritage</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                BORN FROM THE <span className="gold-gradient-text">SPIRIT OF PUNJAB</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              <p className="text-muted-foreground leading-relaxed text-lg">
                Daba Choice was born from a simple but profound belief: that the greatest meals in the world come from the dhaba kitchens of Punjab. The kind of places where recipes aren't written down — they're passed from hand to hand, heart to heart.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our founders left Punjab carrying more than just luggage — they carried the aromas of their mothers' kitchens, the laughter of shared meals, and the pride of Punjabi culinary tradition. In 2021, they brought all of that to the heart of International City, Dubai.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Daba Choice serves over 73 authentic dishes across 12 categories — from Amritsari Kulcha and smoky Tandoori Rotis to rich Daal Makhani, Kadhai dishes, and our legendary Sunday Biryani. Every plate is prepared with hand-ground masalas and slow-cooked love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-primary/10">
                  <img src={imagekitUrl("https://ik.imagekit.io/foodclub/Daba%20Choice/pre-prepared-food-showcasing-ready-eat-delicious-meals-go.jpg")} alt="Authentic Punjabi catering" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-8 shadow-lg border border-primary/10">
                  <img src={imagekitUrl("https://ik.imagekit.io/foodclub/Daba%20Choice/pre-prepared-food-showcasing-ready-eat-delicious-meals-go%20(1).jpg?ik-sdk-version=javascript-1.4.3&updatedAt=16726880227")} alt="Ready to eat delicious meals" className="w-full h-full object-cover" />
                </div>
             </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-panel rounded-2xl px-6 py-4 text-center border border-primary/25 punjabi-border whitespace-nowrap">
                <p className="font-display text-xs text-accent font-bold uppercase tracking-widest mb-0.5">ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ</p>
                <p className="text-muted-foreground text-xs">Authentic Punjabi Culture</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OUR VALUES ─── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block mb-3">ਸਾਡੇ ਮੁੱਲ · What We Stand For</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              OUR <span className="gold-gradient-text">VALUES</span>
            </h2>
            <div className="phulkari-divider max-w-xs mx-auto mt-8">
              <span className="text-accent text-lg shrink-0 px-2">✦</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card rounded-2xl p-8 text-center punjabi-border group hover:shadow-primary/20"
              >
                <div className="text-5xl mb-5">{val.icon}</div>
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <h3 className="font-display text-xl font-bold text-foreground">{val.title}</h3>
                  <span className="text-primary text-sm font-medium">{val.punjabi}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-28 bg-primary/5 punjabi-pattern-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block mb-3">ਸਾਡਾ ਸਫ਼ਰ · Our Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              OUR <span className="gold-gradient-text">MILESTONES</span>
            </h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/50 to-primary/30" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ml-14 md:ml-0`}
                >
                  <div className={`glass-card rounded-2xl p-6 flex-1 max-w-md ${i % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"} relative`}>
                    <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40 ${i % 2 === 0 ? "-right-1.5" : "-left-1.5"} hidden md:block`} />
                   <span className="text-accent font-bold text-xl font-display">{m.year}</span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY DUBAI ─── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 punjabi-border"
            >
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&fit=crop"
                alt="Daba Choice Dubai"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-3">
                  {[Star, Heart, Award].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-lg">
                      <Icon size={16} className="fill-white" />
                    </div>
                  ))}
                <p className="text-foreground font-bold drop-shadow-sm">Trusted by Dubai's Punjabi Community</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block">ਦੁਬਈ ਵਿੱਚ · Why Dubai</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                PUNJAB'S FLAVOURS,<br />
                <span className="gold-gradient-text">DUBAI'S STAGE</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full" />
              <p className="text-muted-foreground leading-relaxed text-lg">
                Dubai is home to one of the most vibrant Punjabi communities outside India. We saw a community hungry for the real tastes of home — not just Indian food, but specifically the bold, generous, joyful cuisine of Punjab.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We opened Daba Choice to serve that community. Today we're proud to be the preferred catering partner for Punjabi song shoots, corporate events, weddings, and everyday families who simply want the taste of home.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Users, label: "1000+", sub: "Happy Guests" },
                  { icon: Star, label: "4.9 ★", sub: "Average Rating" },
                  { icon: Award, label: "73+", sub: "Dishes Served" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 text-center">
                    <Icon size={20} className="text-primary mx-auto mb-2" />
                    <p className="font-display font-bold text-lg gold-gradient-text">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 royal-saffron-bar relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 14px)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white/70 font-bold tracking-[0.3em] uppercase text-xs block mb-4">ਸਾਡੇ ਨਾਲ ਜੁੜੋ · Come Join Us</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              TASTE THE PRIDE<br />
              <span className="text-white">OF PUNJAB</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Visit us at International City, Dubai — or let us bring the flavours to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="bg-white text-primary font-bold px-10 py-4 rounded-full text-sm tracking-[0.2em] hover:bg-white/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-black/20 flex items-center gap-2 justify-center">
                EXPLORE MENU <ArrowRight size={16} />
              </Link>
              <Link href="/reservation" className="border-2 border-white/50 text-white font-bold px-10 py-4 rounded-full text-sm tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm">
                BOOK A TABLE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
