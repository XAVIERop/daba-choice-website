import { Star, Quote, ExternalLink, PenLine, MessageSquareQuote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const REAL_REVIEWS = [
  { id: "1", authorName: "Rahul Bhagat", comment: "If you love authentic Punjabi food, this place is a must-visit! The flavors are rich, portions are generous, and every dish feels like it’s made with love. From buttery dal makhni to perfectly spiced tandoori roti, everything tasted fresh and homely.", rating: 5, createdAt: "2023-08-15" },
  { id: "2", authorName: "prabhpreet singh", comment: "Absolutely loved the food from Daba Restaurant! Their Indian and Punjabi dishes are top-notch – the Daal Makhani, Kadhai Chicken, and Tawa Chicken were all bursting with authentic flavors. Quality, taste, and presentation were all spot on.", rating: 5, createdAt: "2023-04-10" },
  { id: "3", authorName: "Harira Normal", comment: "Just perfect. After ordering like 2-3 times now, the consistent quality is unbelievable. The taste of absolutely everything is just impeccable. The meat tastes very fresh, juicy, right amount of spices. Highly recommended.", rating: 5, createdAt: "2023-11-05" },
  { id: "4", authorName: "Shehzad Ahmed", comment: "Dhaba Choice Restaurant is a very nice place to enjoy delicious food. The quality of the food is excellent, and the taste is truly mouth-watering. I tried the Chicken Malai Tikka, and it was absolutely delicious.", rating: 5, createdAt: "2024-02-28" },
  { id: "5", authorName: "KOmal Kang", comment: "I had such a wonderful experience dining here! The food was absolutely delicious every dish was fresh, flavorful, and beautifully presented. You can really taste the quality of the ingredients and the care put into each recipe.", rating: 5, createdAt: "2024-02-15" },
  { id: "6", authorName: "Aashu Sona", comment: "I’ve ordered twice from this restaurant, and both experiences were excellent! The food is absolutely delicious, fresh ingredients, perfectly cooked, and full of flavor. The portions are generous.", rating: 5, createdAt: "2023-08-20" },
  { id: "7", authorName: "daman bhatia", comment: "Dana choice is the latest Punjabi restaurant in International city. Restaurant although is small with respect to sitting arrangement but their menu is quite exhaustive. Tried few items and the food is awesome.", rating: 5, createdAt: "2023-06-10" },
  { id: "8", authorName: "Dheeraj", comment: "From the moment I took the first bite, I knew I was in for something special. The food was not just good — it was exceptional. Every dish was thoughtfully prepared, beautifully presented, and bursting with flavor.", rating: 5, createdAt: "2023-08-01" },
  { id: "9", authorName: "Sushank Malik", comment: "Very nice and delicious food. Many options for veg and non veg items. Service is very fast and the prices are also very reasonable. Highly recommended.", rating: 5, createdAt: "2023-04-25" },
];

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?sca_esv=4e0bfa84728bf4dd&sxsrf=ANbL-n4Q5nGPltlBCm-N4XDMsauBDcdOWg:1774552575010&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXg-ELctQKPGBy0YbKEp3V2GqyxHkr2_duP1EztZ8ISD59zQWQKAYVlC71bhnILycM03nOGgg1RjfQ6sUZtAK3zG80MjhnIgcxBVxj7LSOa9KK-Wc1dpdwAD6PCb8YB8ClM3am0%3D&q=Daba+choice+restaurant+%28Indian+restaurant%29+Reviews&sa=X&ved=2ahUKEwjitvi-o76TAxWQR2wGHdx_MD4Q0bkNegQIMxAF&biw=1512&bih=868&dpr=2";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, review: "" });
  const [allReviews, setAllReviews] = useState(REAL_REVIEWS);
  
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("daba_local_reviews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAllReviews([...parsed, ...REAL_REVIEWS]);
        }
      }
    } catch (e) {}
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.review) return;

    const newReview = {
      id: "local_" + Date.now().toString(),
      authorName: reviewForm.name,
      comment: reviewForm.review,
      rating: reviewForm.rating,
      createdAt: new Date().toISOString().split("T")[0]
    };

    const updatedReviews = [newReview, ...allReviews];
    setAllReviews(updatedReviews);

    try {
      const stored = localStorage.getItem("daba_local_reviews");
      const existingStored = stored ? JSON.parse(stored) : [];
      localStorage.setItem("daba_local_reviews", JSON.stringify([newReview, ...existingStored]));
    } catch (e) {}

    toast({
      title: "Review Published!",
      description: "Thank you for sharing your experience. Your review has been added.",
      style: { backgroundColor: "#D4AF37", color: "black" }
    });
    
    setIsModalOpen(false);
    setReviewForm({ name: "", rating: 5, review: "" });
  };
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
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Hear what our valued guests have to say about their Daba Choice experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative z-20">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gold-button px-6 py-3 rounded-xl text-sm font-medium w-full sm:w-auto justify-center"
            >
              View on Google <ExternalLink size={16} />
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 outline-button px-6 py-3 rounded-xl text-sm font-medium w-full sm:w-auto justify-center cursor-pointer hover:bg-white/5 transition-colors"
            >
              <PenLine size={16} /> Leave a Review
            </button>
          </div>
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

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative glass-card border border-primary/20 p-6 sm:p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquareQuote size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold">Share Your Experience</h3>
                <p className="text-sm text-muted-foreground mt-2">Your feedback helps us improve and serves others.</p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Name *</label>
                  <input required value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                        className="p-1 focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star 
                          size={28} 
                          className={star <= reviewForm.rating ? "fill-primary text-primary" : "text-muted-foreground/30"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Review *</label>
                  <textarea required rows={4} value={reviewForm.review} onChange={e => setReviewForm({...reviewForm, review: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none resize-none" />
                </div>

                <button type="submit" className="gold-button w-full py-4 rounded-xl font-medium mt-2 text-black">
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
