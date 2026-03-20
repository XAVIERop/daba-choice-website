import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/use-cart";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotal } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    setIsOpen(false);
    setLocation("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-white/10 z-[80] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-primary" />
                YOUR ORDER
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is empty</p>
                  <button 
                    onClick={() => { setIsOpen(false); setLocation("/menu"); }}
                    className="outline-button px-6 py-2 rounded-full text-sm mt-4"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-4 items-center bg-black/40 p-4 rounded-xl border border-white/5">
                    {item.menuItem.image_url ? (
                      <img 
                        src={item.menuItem.image_url} 
                        alt={item.menuItem.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="text-white/20" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">{item.menuItem.name}</h4>
                      <p className="text-primary font-bold text-sm mt-1">AED {item.menuItem.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-background rounded-full border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.menuItem.id)}
                          className="text-xs text-destructive hover:text-destructive/80 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-2xl font-display font-bold gold-gradient-text">
                    AED {getTotal().toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full gold-button py-4 rounded-xl flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
