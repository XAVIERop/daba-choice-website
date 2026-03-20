import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/store/use-cart";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const DELIVERY_FEE = 15;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, getTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    orderType: "delivery" as "delivery" | "pickup" | "table",
    notes: ""
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const createOrder = useCreateOrder();
  const subtotal = getTotal();
  const total = subtotal + (formData.orderType === "delivery" ? DELIVERY_FEE : 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    createOrder.mutate(
      {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryAddress: formData.orderType === "delivery" ? formData.address : undefined,
        orderType: formData.orderType,
        total,
        notes: formData.notes,
        items: items.map((i) => ({
          menu_item_id: i.menuItem.id,
          quantity: i.quantity,
          unit_price: i.menuItem.price,
          total_price: i.menuItem.price * i.quantity,
        })),
      },
      {
        onSuccess: () => {
          clearCart();
          toast({ title: "Order placed successfully!", style: { backgroundColor: "#D4AF37", color: "black" } });
          setLocation("/order-success");
        },
        onError: (err) => {
          toast({ title: "Failed to place order", description: err.message, variant: "destructive" });
          setIsProcessing(false);
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6 opacity-20" />
          <h2 className="font-display text-2xl font-bold mb-4">Your cart is empty</h2>
          <button onClick={() => setLocation("/menu")} className="gold-button px-8 py-3 rounded-full">Return to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold mb-12">SECURE <span className="gold-gradient-text">CHECKOUT</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Form Side */}
          <div className="lg:col-span-3 space-y-8">
            <form id="checkout-form" onSubmit={handlePayment} className="glass-card p-8 rounded-2xl space-y-6">
              <h3 className="font-display text-xl font-bold border-b border-white/10 pb-4 mb-6">Delivery Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name *</label>
                  <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone Number *</label>
                <input type="tel" required value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Order Type</label>
                <select value={formData.orderType} onChange={e=>setFormData({...formData, orderType: e.target.value as "delivery"|"pickup"|"table"})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                  <option value="table">Dine-in</option>
                </select>
              </div>
              {formData.orderType === "delivery" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Delivery Address *</label>
                  <textarea required rows={3} value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Order Notes (Optional)</label>
                <textarea rows={2} value={formData.notes} onChange={e=>setFormData({...formData, notes: e.target.value})} placeholder="Special requests, allergies..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" />
              </div>
            </form>
          </div>
          
          {/* Summary Side */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-2xl sticky top-32">
              <h3 className="font-display text-xl font-bold border-b border-white/10 pb-4 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.menuItem.id} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.quantity}x {item.menuItem.name}</span>
                    <span className="font-medium">AED {(item.menuItem.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/10 pt-4 mb-8 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>AED {subtotal.toFixed(2)}</span>
                </div>
                {formData.orderType === "delivery" && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>AED {DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-display font-bold gold-gradient-text pt-2">
                  <span>Total</span>
                  <span>AED {total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full gold-button py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                    <CreditCard size={20} />
                  </motion.div>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Pay AED {total.toFixed(2)} Securely
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-4">Powered by Razorpay Secure Checkout</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
