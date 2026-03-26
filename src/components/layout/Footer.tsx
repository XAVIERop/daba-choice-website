import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { SITE_LOGO_URL, SITE_WORDMARK } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 mt-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/arabic-pattern.png)`, backgroundSize: '400px' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <img
                src={SITE_LOGO_URL}
                alt="Daba Choice Restaurant Logo"
                className="h-14 w-auto md:h-20 object-contain object-left max-w-[200px] md:max-w-[240px]"
                width={240}
                height={80}
                decoding="async"
              />
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-widest gold-gradient-text">
                {SITE_WORDMARK}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Real Taste of Punjab in the heart of International City, Dubai. Dine-in, takeaway, delivery & tiffin services. Authentic recipes, premium ingredients, warm Punjabi hospitality.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/daba_choice"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-white mb-6 tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-4">
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link href="/tiffin" className="text-muted-foreground hover:text-primary transition-colors">Tiffin Plans</Link></li>
              <li><Link href="/catering" className="text-muted-foreground hover:text-primary transition-colors">Catering</Link></li>
              <li><Link href="/reservation" className="text-muted-foreground hover:text-primary transition-colors">Book a Table</Link></li>
              <li><Link href="/offers" className="text-muted-foreground hover:text-primary transition-colors">Special Offers</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Order Online</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-white mb-6 tracking-wider">FIND US</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="text-primary shrink-0 mt-1" size={18} />
                <span>Y-20, England-Y Street, England Cluster, International City, Dubai, UAE</span>
              </li>
              <li className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Phone className="text-primary shrink-0" size={18} />
                  <a href="tel:+971504247836" className="hover:text-primary transition-colors">+971 50 424 7836</a>
                </div>
                <div className="flex items-center gap-3 pl-[30px]">
                  <a href="tel:+97145770225" className="hover:text-primary transition-colors">+971 4 577 0225</a>
                </div>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Daba+Choice+Restaurant+International+City+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                >
                  Get Directions <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="font-display text-lg text-white mb-6 tracking-wider">DELIVERY AREAS</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                International City
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                International City 2
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Dubai Silicon Oasis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                Warsan 1
              </li>
            </ul>
            <Link href="/menu" className="mt-6 inline-flex items-center gap-2 gold-button px-4 py-2 rounded-xl text-sm">
              Order Online
            </Link>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Daba Choice. All rights reserved. · England Cluster, International City, Dubai
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Powered by <a href="https://plattros.in/landing" target="_blank" rel="noopener noreferrer" className="text-primary font-bold tracking-wide hover:underline transition-all">Plattr OS</a>
            </p>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
