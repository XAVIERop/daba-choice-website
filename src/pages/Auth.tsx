import { Link } from "wouter";
import { User, ShoppingBag } from "lucide-react";

export default function Auth() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative">
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-card p-8 rounded-3xl backdrop-blur-2xl text-center">
          <User className="mx-auto text-primary mb-6" size={64} />
          <h1 className="font-display text-3xl font-bold gold-gradient-text mb-4">
            GUEST CHECKOUT
          </h1>
          <p className="text-muted-foreground mb-8">
            No login required. Order directly from our menu and checkout as a guest. You&apos;ll receive order confirmation via the details you provide.
          </p>
          <Link href="/menu" className="gold-button inline-flex items-center gap-2 px-8 py-4 rounded-xl">
            <ShoppingBag size={20} />
            Browse Menu & Order
          </Link>
        </div>
      </div>
    </div>
  );
}
