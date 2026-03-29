import { Link, useLocation } from "wouter";
import { useTemplate } from "@/contexts/TemplateContext";
import { useCart } from "@/store/use-cart";
import { useAuth } from "@/store/use-auth";
import { ShoppingBag, User, Menu as MenuIcon, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_LOGO_URL, SITE_NAME, SITE_WORDMARK } from "@/lib/site";
import { features } from "@/config/features";
import { useCafe } from "@/contexts/CafeContext";


export function Navbar() {
  const [location] = useLocation();
  const templateId = useTemplate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, setIsOpen: setCartOpen } = useCart();
  const { user } = useAuth();
  const { cafe } = useCafe();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Matches `TemplateLayout.royal` — structural nav, not only palette. */
  const isRoyalNav = templateId === "5";  const isTransparent = location === "/" && !isScrolled;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/tiffin", label: "Tiffin" },
    { href: "/catering", label: "Catering" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Book & Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isRoyalNav
            ? isScrolled
              ? "bg-accent/10 backdrop-blur-2xl border-b border-primary/20 shadow-lg shadow-accent/20 py-0"
              : "bg-transparent py-0"
            : isScrolled
              ? "bg-background/95 backdrop-blur-2xl border-b border-accent/20 py-3 shadow-lg shadow-accent/15"
              : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isRoyalNav ? (
            <>
              <div
                className={`flex items-center justify-between gap-4 ${
                  isScrolled ? "py-3" : "py-4"
                } border-b border-primary/10`}
              >
                <div className="flex items-center gap-4 shrink-0 min-w-0">
                  <Link
                    href="/"
                    aria-label={`${SITE_NAME} home`}
                    className="group flex items-center gap-2.5 md:gap-3 shrink-0 min-w-0"
                  >
                    <img
                      src={SITE_LOGO_URL}
                      alt=""
                      className="h-10 w-auto sm:h-12 md:h-14 object-contain object-left group-hover:opacity-90 transition-opacity max-w-[100px] sm:max-w-[140px] md:max-w-[180px]"
                      width={180}
                      height={64}
                      decoding="async"
                      aria-hidden
                    />
                    <span className="font-display text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.12em] sm:tracking-[0.18em] md:tracking-widest gold-gradient-text group-hover:opacity-80 transition-opacity whitespace-nowrap">
                      {SITE_WORDMARK}
                    </span>
                  </Link>
                  {/* Template switcher removed */}
                </div>
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                  {cafe?.phone && (
                    <a
                      href={`tel:${cafe.phone}`}
                      className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-primary/15 px-3 py-2 rounded-lg hover:border-primary/40 shadow-sm"
                    >
                      <Phone size={13} />
                      <span className="hidden xl:inline">Call Us</span>
                    </a>
                  )}
                  {features.show_auth && (
                    <Link
                      href={user ? "/profile" : "/auth"}
                      className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5"
                    >
                      <User size={18} />
                    </Link>
                  )}
                  <button
                    onClick={() => setCartOpen(true)}
                    className="relative p-2 text-muted-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/10"
                  >
                    <ShoppingBag size={18} />
                    <AnimatePresence>
                      {itemCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                        >
                          {itemCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                  <button
                    className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                  >
                    <MenuIcon size={22} />
                  </button>
                </div>
              </div>
              <nav className="hidden lg:flex items-center justify-center flex-wrap gap-x-10 gap-y-2 py-3.5 border-b border-primary/5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] tracking-[0.2em] font-medium hover:text-primary transition-colors py-1 group ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label.toUpperCase()}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-primary transition-all duration-300 ${
                        location === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              </nav>
            </>
          ) : (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4 shrink-0">
               <Link href="/" aria-label={`${SITE_NAME} home`} className="group flex items-center gap-2.5 md:gap-3 shrink-0 min-w-0">
                    <img
                      src={SITE_LOGO_URL}
                      alt="Daba Choice Restaurant Logo"
                      className="h-10 w-auto sm:h-12 md:h-14 object-contain object-left group-hover:opacity-90 transition-opacity max-w-[100px] sm:max-w-[140px] md:max-w-[180px]"
                      width={180}
                      height={64}
                      decoding="async"
                    />
                <span className={`font-display text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.12em] sm:tracking-[0.18em] md:tracking-widest group-hover:opacity-80 transition-opacity whitespace-nowrap ${
                  isTransparent ? "text-white" : "gold-gradient-text"
                }`}>
                  {SITE_WORDMARK}
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs tracking-[0.15em] font-medium transition-colors py-1 group ${
                    location === link.href 
                      ? (isTransparent ? "text-white" : "text-primary") 
                      : (isTransparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")
                  }`}
                >
                  {link.label.toUpperCase()}
                  <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                    isTransparent ? "bg-white" : "bg-primary"
                  } ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              {cafe?.phone && (
                <a
                  href={`tel:${cafe.phone}`}
                  className={`hidden md:flex items-center gap-1.5 text-xs transition-all px-3 py-2 rounded-lg shadow-sm border ${
                    isTransparent 
                      ? "text-white border-white/20 hover:bg-white/10" 
                      : "text-muted-foreground hover:text-primary border-primary/15 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <Phone size={13} />
                  <span className="hidden xl:inline">Call Us</span>
                </a>
              )}

              {features.show_auth && (
                <Link
                  href={user ? "/profile" : "/auth"}
                  className={`transition-colors p-2 rounded-lg ${
                    isTransparent ? "text-white/80 hover:text-white hover:bg-white/5" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <User size={18} />
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2 transition-colors rounded-lg ${
                  isTransparent ? "text-white/80 hover:text-white hover:bg-white/5" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                className={`lg:hidden p-2 transition-colors ${
                  isTransparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon size={22} />
              </button>

            </div>
          </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[59] bg-overlay/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-80 bg-background/97 backdrop-blur-2xl border-l border-primary/15 lg:hidden flex flex-col shadow-2xl shadow-primary/20"
            >
              <div className="flex justify-between items-center gap-3 p-6 border-b border-primary/10">
                <Link
                  href="/"
                  aria-label={`${SITE_NAME} home`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 min-w-0 flex-1"
                >
                  <img
                    src={SITE_LOGO_URL}
                    alt="Daba Choice Restaurant Logo"
                    className="h-9 w-auto object-contain shrink-0 max-w-[72px]"
                    width={72}
                    height={48}
                    decoding="async"
                  />
                  <span className="font-display text-base font-bold tracking-widest gold-gradient-text truncate">
                    {SITE_WORDMARK}
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col p-6 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-4 font-display text-xl tracking-widest border-b border-primary/5 last:border-0 transition-colors ${
                      location === link.href ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-6 border-t border-primary/10 space-y-3">
                <Link
                  href="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="gold-button w-full py-3 rounded-xl text-sm text-center block"
                >
                  Order Online
                </Link>
                  {cafe?.phone && (
                    <a
                      href={`tel:${cafe.phone}`}
                      className="outline-button w-full py-3 rounded-xl text-sm text-center block"
                    >
                      Call Us
                    </a>
                  )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
