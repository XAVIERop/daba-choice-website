import { motion } from "framer-motion";
import { Package, Check, ChevronRight, Utensils, Calendar } from "lucide-react";
import { Link } from "wouter";

const plans = [
  {
    id: "lunch",
    title: "Lunch Tiffin",
    description: "Fresh, home-style Punjabi lunch delivered daily. Roti, sabzi, dal, rice — the way it's meant to be.",
    price: "AED 25",
    period: "/day",
    badge: "Most Popular",
    features: [
      "1 main curry + dal",
      "4 fresh rotis",
      "Rice or pulao",
      "Salad & pickle",
      "Daily delivery",
    ],
    color: "from-primary/20 to-accent/10",
  },
  {
    id: "dinner",
    title: "Dinner Tiffin",
    description: "Hearty Punjabi dinner to end your day right. Perfect for busy professionals and families.",
    price: "AED 28",
    period: "/day",
    badge: null,
    features: [
      "1 main curry + dal",
      "4 fresh rotis",
      "Rice or pulao",
      "Salad & pickle",
      "Evening delivery",
    ],
    color: "from-accent/20 to-primary/10",
  },
  {
    id: "full",
    title: "Lunch + Dinner",
    description: "Complete meal plan — lunch and dinner every day. Best value for regular tiffin subscribers.",
    price: "AED 45",
    period: "/day",
    badge: "Best Value",
    features: [
      "Lunch & dinner daily",
      "2 main curries + dal",
      "8 rotis total",
      "Rice/pulao both meals",
      "Flexible delivery times",
    ],
    color: "from-primary/30 via-accent/20 to-primary/10",
  },
];

const membershipOptions = [
  {
    title: "Weekly Plan",
    desc: "5 or 6 days",
    price: "From AED 125",
    note: "Ideal for trying out",
  },
  {
    title: "Monthly Plan",
    desc: "20–26 days",
    price: "From AED 450",
    note: "Save up to 15%",
  },
  {
    title: "Custom Plan",
    desc: "Your schedule",
    price: "On request",
    note: "Call to discuss",
  },
];

export default function Tiffin() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Daily Meal Plans</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            TIFFIN <span className="gold-gradient-text">SERVICES</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Authentic Punjabi home-style meals delivered to your doorstep. Choose a plan that fits your schedule — lunch, dinner, or both.
          </p>
        </div>

        {/* Intro banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Package className="text-primary" size={28} />
            </div>
            <div>
              <p className="font-display font-bold text-white text-lg">Fresh Daily · Delivered Hot</p>
              <p className="text-muted-foreground text-sm">We deliver to International City, International City 2, and Dubai Silicon Oasis.</p>
            </div>
          </div>
          <a
            href="tel:+971504247836"
            className="gold-button px-8 py-3 rounded-xl text-sm shrink-0 flex items-center gap-2"
          >
            Call to Subscribe <ChevronRight size={16} />
          </a>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30 pointer-events-none`} />
              <div className="relative z-10 p-8 flex flex-col flex-1">
                {plan.badge && (
                  <span className="inline-block w-fit mb-4 px-3 py-1 bg-primary/20 text-primary border border-primary/40 rounded-full text-xs font-bold uppercase tracking-wider">
                    {plan.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Utensils size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-3xl font-bold gold-gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+971504247836"
                  className="outline-button w-full py-3 rounded-xl text-sm text-center flex items-center justify-center gap-2"
                >
                  Subscribe <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Membership options */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Flexible Plans</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              CHOOSE YOUR <span className="gold-gradient-text">DURATION</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipOptions.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center text-center"
              >
                <Calendar className="text-primary mb-4" size={32} />
                <h4 className="font-display text-xl font-bold text-white mb-1">{opt.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{opt.desc}</p>
                <p className="font-display text-2xl font-bold gold-gradient-text mb-2">{opt.price}</p>
                <p className="text-xs text-primary/80">{opt.note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass-card p-10 rounded-3xl border border-primary/20"
        >
          <h2 className="font-display text-3xl font-bold mb-3">Ready to Start?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Call us at <a href="tel:+971504247836" className="text-primary hover:underline font-medium">+971 50 424 7836</a> to discuss your preferences, delivery address, and start date. We'll customize a plan just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+971504247836" className="gold-button px-8 py-3 rounded-xl text-sm">
              Call to Subscribe
            </a>
            <Link href="/contact" className="outline-button px-8 py-3 rounded-xl text-sm">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
