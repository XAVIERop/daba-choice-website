import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Link } from "wouter";

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
            <h3 className="font-display text-2xl font-bold gold-gradient-text mb-6">DABA CHOICE</h3>
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
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="text-primary shrink-0" size={18} />
                <a href="tel:+971504247836" className="hover:text-primary transition-colors">+971 50 424 7836</a>
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
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daba Choice. All rights reserved. · England Cluster, International City, Dubai
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
