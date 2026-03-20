import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="glass-card p-12 rounded-3xl max-w-lg w-full border border-white/10">
        <h1 className="font-display text-8xl font-bold gold-gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="gold-button px-8 py-3 rounded-full inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
