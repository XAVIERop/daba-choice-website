import { Package, Search, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Orders() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOrder(null);

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, menu_items(name))")
      .eq("order_number", orderNumber)
      .eq("phone_number", phone)
      .maybeSingle();

    if (error) {
      toast({ title: "Tracking failed", description: error.message, variant: "destructive" });
    } else if (!data) {
      toast({ title: "Order not found", description: "Check your order number and phone.", variant: "destructive" });
    } else {
      setOrder(data);
    }
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'preparing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'out_for_delivery': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-4">TRACK YOUR <span className="gold-gradient-text">ORDER</span></h1>
        <p className="text-muted-foreground">Enter your details to see the real-time status of your Punjabi feast.</p>
      </div>

      <Card className="glass-card mb-10 border-white/10">
        <CardContent className="p-8">
          <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Order Number</label>
              <input 
                required 
                placeholder="e.g. DC-20240325-1234" 
                value={orderNumber} 
                onChange={e=>setOrderNumber(e.target.value)} 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Phone Number</label>
              <input 
                required 
                placeholder="+971 ..." 
                value={phone} 
                onChange={e=>setPhone(e.target.value)} 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="gold-button w-full py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Search size={18} /> {isLoading ? "Searching..." : "Track Order"}
            </button>
          </form>
        </CardContent>
      </Card>

      {order && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Order {order.order_number}</h2>
              <p className="text-sm text-muted-foreground mt-1">Placed on {new Date(order.created_at).toLocaleString()}</p>
            </div>
            <Badge className={`px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full ${getStatusColor(order.order_status)}`}>
              {order.order_status.replace(/_/g, ' ')}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card bg-black/20 border-white/5 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Package size={16} /> Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <div>
                      <span className="font-bold text-white">{item.quantity}x</span>
                      <span className="ml-3 text-muted-foreground">{item.menu_items?.name}</span>
                    </div>
                    <span className="font-mono text-xs">AED {item.total_price}</span>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-center border-t border-white/10">
                  <span className="font-bold text-lg">Total Amount</span>
                  <span className="font-display font-bold text-2xl gold-gradient-text">AED {order.total_amount}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <Clock size={20} />
                  <h4 className="font-bold">Next Step</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {order.order_status === 'pending' && "Our kitchen is reviewing your order. We'll start preparing it soon!"}
                  {order.order_status === 'preparing' && "The chefs are crafting your meal with care and authentic Punjabi spices."}
                  {order.order_status === 'out_for_delivery' && "Your order is hot and on its way to your location!"}
                  {order.order_status === 'delivered' && "Enjoy your meal! Please don't forget to leave us a review."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={20} className="text-muted-foreground" />
                  <h4 className="font-bold text-white">Delivery Address</h4>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {order.delivery_address || "Pick-up / Dine-in Order"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!order && !isLoading && (
        <div className="glass-card p-12 text-center rounded-3xl opacity-50">
          <Package className="mx-auto text-muted-foreground mb-4 opacity-30" size={48} />
          <p className="text-muted-foreground">Search by your order number and phone to track your delivery status.</p>
        </div>
      )}
    </div>
  );
}
