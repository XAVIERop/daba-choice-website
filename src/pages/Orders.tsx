import { useAuth } from "@/store/use-auth";
import { Package } from "lucide-react";
import { Link } from "wouter";

export default function Orders() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
        <h2 className="font-display text-2xl mb-4">Please log in to view your orders</h2>
        <Link href="/auth" className="gold-button px-8 py-3 rounded-full">Log In</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold mb-10">ORDER <span className="gold-gradient-text">HISTORY</span></h1>
      <div className="glass-card p-12 text-center rounded-3xl">
        <Package className="mx-auto text-muted-foreground mb-4 opacity-30" size={48} />
        <p className="text-xl text-muted-foreground mb-6">Order history requires login. Guest orders can be tracked via order confirmation.</p>
        <Link href="/menu" className="outline-button px-8 py-3 rounded-full">Explore Menu</Link>
      </div>
    </div>
  );
}
