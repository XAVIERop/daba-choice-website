import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCafeMenu } from "@/hooks/useCafeMenu";
import { useCafe } from "@/contexts/CafeContext";
import { useCart } from "@/store/use-cart";
import { SpiceLevel } from "@/components/SpiceLevel";
import { Search, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenuCard, setShowMenuCard] = useState(false);
  const { cafeId, isLoading: cafeLoading, error: cafeError } = useCafe();
  const {
    data: menuItems = [],
    isLoading: menuLoading,
    isError: menuQueryError,
    error: menuError,
  } = useCafeMenu();
  const isLoading = cafeLoading || menuLoading;
  const supabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );
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
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Discover a symphony of authentic Punjabi flavors, meticulously prepared to offer you an unforgettable dining experience.</p>
          <button 
            onClick={() => setShowMenuCard(true)}
            className="gold-button px-8 py-3 rounded-full font-medium inline-flex items-center gap-2"
          >
            Show Real Menu Card
          </button>
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
        {!supabaseConfigured ? (
          <div className="text-center py-24 glass-card rounded-3xl max-w-lg mx-auto px-6">
            <p className="text-lg text-foreground mb-2">Menu is offline</p>
            <p className="text-sm text-muted-foreground">
              Add <code className="text-primary">VITE_SUPABASE_URL</code> and{" "}
              <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> to <code className="text-primary">.env</code>,
              then restart the dev server.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-96 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : cafeError || !cafeId ? (
          <div className="text-center py-24 glass-card rounded-3xl max-w-lg mx-auto px-6">
            <p className="text-lg text-foreground mb-2">Couldn&apos;t load this restaurant</p>
            <p className="text-sm text-muted-foreground mb-4">
              {cafeError ??
                "No active cafe matches the current slug. Check the `cafes` row (slug, is_active) in Supabase."}
            </p>
            <p className="text-xs text-muted-foreground">
              Default slug is <code className="text-primary">dabachoice</code>. Override with{" "}
              <code className="text-primary">?cafe=your-slug</code>.
            </p>
          </div>
        ) : menuQueryError ? (
          <div className="text-center py-24 glass-card rounded-3xl max-w-lg mx-auto px-6">
            <p className="text-lg text-foreground mb-2">Couldn&apos;t load the menu</p>
            <p className="text-sm text-muted-foreground">
              {(menuError as Error)?.message ?? "Request failed. Check Supabase RLS and the menu_items table."}
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-3xl">
            <p className="text-xl text-muted-foreground">No dishes found matching your criteria.</p>
            {menuItems.length === 0 ? (
              <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
                There are no menu rows for this cafe in Supabase, or every item is marked unavailable (
                <code className="text-primary">is_available = false</code>).
              </p>
            ) : null}
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
                  {item.image_url && (
                    <div className="h-56 relative overflow-hidden bg-black/50">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {item.price > 0 ? (
                          <span className="font-bold text-primary">AED {item.price}</span>
                        ) : (
                          <span className="font-bold text-accent text-xs">Price on Selection</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="font-display text-xl font-bold text-white">{item.name}</h3>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {!item.image_url && (
                          <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/30 whitespace-nowrap">
                            {item.price > 0 ? `AED ${item.price}` : "Price on Selection"}
                          </div>
                        )}
                        {item.spiceLevel > 0 && <SpiceLevel level={item.spiceLevel} />}
                      </div>
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

      {createPortal(
        <AnimatePresence>
          {showMenuCard && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8" 
              onClick={() => setShowMenuCard(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[95vh] overflow-y-auto rounded-2xl bg-black border border-white/10 p-2 md:p-4 scrollbar-hide" 
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setShowMenuCard(false)}
                  className="sticky top-2 float-right bg-white/10 backdrop-blur border border-white/20 p-2 rounded-full text-white hover:bg-primary hover:text-black transition-colors z-20"
                >
                  <X size={24} />
                </button>
                <div className="flex flex-col gap-6 pt-10">
                  <img src="https://ik.imagekit.io/foodclub/Daba%20Choice/menu/DABA%20CHOICE_MENU%20NEW%20(1).jpg" alt="Daba Choice Menu Page 1" className="w-full h-auto rounded-xl shadow-2xl" />
                  <img src="https://ik.imagekit.io/foodclub/Daba%20Choice/menu/DABA%20CHOICE_MENU_NEW%2002%20(1).jpg" alt="Daba Choice Menu Page 2" className="w-full h-auto rounded-xl shadow-2xl" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
