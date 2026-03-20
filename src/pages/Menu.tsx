import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCafeMenu } from "@/hooks/useCafeMenu";
import { useCart } from "@/store/use-cart";
import { SpiceLevel } from "@/components/SpiceLevel";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: menuItems = [], isLoading } = useCafeMenu();
  const { addItem } = useCart();
  const { toast } = useToast();

  const categories = useMemo(() => {
    const cats = new Set(menuItems.map((i) => i.category).filter(Boolean));
    return ["All", ...Array.from(cats).sort()];
  }, [menuItems]);

  const filteredItems = menuItems?.filter(item => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }) || [];

  const handleAddToCart = (item: any) => {
    addItem(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order.`,
      style: { backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--primary)/0.3)', color: 'white' }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/arabic-pattern.png)`, backgroundSize: '400px' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">OUR <span className="gold-gradient-text">MENU</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover a symphony of authentic Punjabi flavors, meticulously prepared to offer you an unforgettable dining experience.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex overflow-x-auto pb-4 md:pb-0 w-full md:w-auto space-x-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm tracking-wider font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-black shadow-lg shadow-primary/20" 
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-96 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl">
            <p className="text-xl text-muted-foreground">No dishes found matching your criteria.</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="mt-4 text-primary hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col group"
                >
                  <div className="h-56 relative overflow-hidden bg-black/50">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      /* Fallback stock image */
                      <img 
                        src="https://pixabay.com/get/g01002785465801be1a1530659dfe72d6dca08ebc436da6c6777b58f0475190f3db3666c99483b8f57523a7a56b2796aaa3adf4277786885a17cc1a79bdecda77_1280.jpg" 
                        alt="Fallback" 
                        className="w-full h-full object-cover opacity-50"
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      {item.price > 0 ? (
                        <span className="font-bold text-primary">AED {item.price}</span>
                      ) : (
                        <span className="font-bold text-accent text-xs">Price on Selection</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl font-bold text-white">{item.name}</h3>
                      {item.spiceLevel > 0 && <SpiceLevel level={item.spiceLevel} />}
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 mb-6">{item.description}</p>
                    
                    {item.price > 0 ? (
                      <button 
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.is_available}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
                      >
                        <Plus size={18} />
                        {item.is_available ? "Add to Order" : "Sold Out"}
                      </button>
                    ) : (
                      <a
                        href="tel:+971504247836"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 font-medium text-sm"
                      >
                        📞 Call to Order
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
