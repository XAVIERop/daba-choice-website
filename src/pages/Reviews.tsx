import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const PLACEHOLDER_REVIEWS = [
  { id: "1", authorName: "Priya S.", comment: "Authentic Punjabi flavours! The butter chicken was incredible.", rating: 5, createdAt: "2024-01-15" },
  { id: "2", authorName: "Rahul M.", comment: "Best dal makhani in Dubai. Will definitely come back.", rating: 5, createdAt: "2024-02-01" },
  { id: "3", authorName: "Anita K.", comment: "Great ambience and friendly staff. Food was fresh and delicious.", rating: 4, createdAt: "2024-02-20" },
];

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-8 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </div>
      <span className="text-xs text-muted-foreground w-6 text-right shrink-0">{count}</span>
    </div>
  );
}

export default function Reviews() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const allReviews = PLACEHOLDER_REVIEWS;
  const filtered = filterRating ? allReviews.filter(r => r.rating === filterRating) : allReviews;
  const avgRating = allReviews.length ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(n => ({
    label: `${n}★`,
    count: allReviews.filter(r => r.rating === n).length,
  }));

  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Real Stories</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            GUEST <span className="gold-gradient-text">EXPERIENCES</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our valued guests have to say about their Daba Choice experience.
          </p>
        </div>

        {/* Rating Summary + Filter */}
        {allReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Overall */}
            <div className="glass-card p-8 rounded-3xl text-center col-span-1">
              <div className="font-display text-7xl font-bold gold-gradient-text mb-2">
                {avgRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(avgRating) ? "fill-primary text-primary" : "text-white/20"} />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">{allReviews.length} verified reviews</p>
            </div>

            {/* Breakdown */}
            <div className="glass-card p-8 rounded-3xl col-span-1 space-y-4">
              <h3 className="font-display text-sm font-bold mb-4 uppercase tracking-widest text-muted-foreground">Rating Breakdown</h3>
              {ratingCounts.map(({ label, count }) => (
                <RatingBar key={label} label={label} count={count} total={allReviews.length} />
              ))}
            </div>

            {/* Filter + CTA */}
            <div className="glass-card p-8 rounded-3xl col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-sm font-bold mb-4 uppercase tracking-widest text-muted-foreground">Filter by Stars</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setFilterRating(null)}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-all ${!filterRating ? "bg-primary text-black border-primary" : "border-white/20 text-muted-foreground hover:border-primary/50"}`}
                  >
                    All
                  </button>
                  {[5, 4, 3, 2, 1].map(n => (
                    <button
                      key={n}
                      onClick={() => setFilterRating(n === filterRating ? null : n)}
                      className={`px-4 py-1.5 rounded-full text-sm border transition-all ${filterRating === n ? "bg-primary text-black border-primary" : "border-white/20 text-muted-foreground hover:border-primary/50"}`}
                    >
                      {n}★
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Share your experience after your visit!</p>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all"
            >
              <Quote className="absolute top-4 right-4 text-white/4" size={72} />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className={j < review.rating ? "fill-primary text-primary" : "text-white/20"} />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-8 relative z-10 leading-relaxed text-sm">"{review.comment}"</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-bold font-display text-lg">
                  {review.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{review.authorName}</h4>
                  <span className="text-xs text-primary font-medium">✓ Verified Guest</span>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-xs text-muted-foreground">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-AE", { month: "short", year: "numeric" }) : ""}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
