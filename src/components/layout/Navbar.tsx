import { Link, useLocation } from "wouter";
import { useTemplate } from "@/contexts/TemplateContext";
import { useCart } from "@/store/use-cart";
import { useAuth } from "@/store/use-auth";
import { ShoppingBag, User, Menu as MenuIcon, X, Phone, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_LOGO_URL, SITE_NAME, SITE_WORDMARK } from "@/lib/site";
import { useThemeStore } from "@/store/use-theme";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  const themeMode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleMode);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Matches `TemplateLayout.royal` — structural nav, not only palette. */
  const isRoyalNav = templateId === "5";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/tiffin", label: "Tiffin" },
    { href: "/catering", label: "Catering" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/reservation", label: "Reservations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isRoyalNav
            ? isScrolled
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/8 shadow-2xl shadow-black/50 py-0"
              : "bg-transparent py-0"
            : isScrolled
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/8 py-3 shadow-2xl shadow-black/50"
              : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isRoyalNav ? (
            <>
              <div
                className={`flex items-center justify-between gap-4 ${
                  isScrolled ? "py-3" : "py-4"
                } border-b border-white/10`}
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
                  {templateId && (
                    <Link
                      href="/choose"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors hidden sm:inline shrink-0"
                    >
                      Change template
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => toggleTheme()}
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                        aria-label={themeMode === "dark" ? "Switch to day mode" : "Switch to night mode"}
                      >
                        {themeMode === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[200px]">
                      {themeMode === "dark" ? "Day mode" : "Night mode"}
                    </TooltipContent>
                  </Tooltip>
                  {cafe?.phone && (
                    <a
                      href={`tel:${cafe.phone}`}
                      className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-white/10 px-3 py-2 rounded-lg hover:border-primary/40"
                    >
                      <Phone size={13} />
                      <span className="hidden xl:inline">Call Us</span>
                    </a>
                  )}
                  {features.show_auth && (
                    <Link
                      href={user ? "/profile" : "/auth"}
                      className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/5"
                    >
                      <User size={18} />
                    </Link>
                  )}
                  <button
                    onClick={() => setCartOpen(true)}
                    className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/5"
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
              <nav className="hidden lg:flex items-center justify-center flex-wrap gap-x-10 gap-y-2 py-3.5 border-b border-white/5">
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

            {/* Logo + optional change template */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/" aria-label={`${SITE_NAME} home`} className="group flex items-center gap-2.5 md:gap-3 shrink-0 min-w-0">
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
              {templateId && (
                <Link
                  href="/choose"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
                >
                  Change template
                </Link>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs tracking-[0.15em] font-medium hover:text-primary transition-colors py-1 group ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label.toUpperCase()}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => toggleTheme()}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    aria-label={themeMode === "dark" ? "Switch to day mode" : "Switch to night mode"}
                  >
                    {themeMode === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  {themeMode === "dark" ? "Day mode" : "Night mode"}
                </TooltipContent>
              </Tooltip>

              {/* WhatsApp / Call */}
              {cafe?.phone && (
                <a
                  href={`tel:${cafe.phone}`}
                  className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-white/10 px-3 py-2 rounded-lg hover:border-primary/40"
                >
                  <Phone size={13} />
                  <span className="hidden xl:inline">Call Us</span>
                </a>
              )}

              {features.show_auth && (
                <Link
                  href={user ? "/profile" : "/auth"}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/5"
                >
                  <User size={18} />
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/5"
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
              className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-80 bg-black/95 backdrop-blur-2xl border-l border-white/10 lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center gap-3 p-6 border-b border-white/10">
                <Link
                  href="/"
                  aria-label={`${SITE_NAME} home`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 min-w-0 flex-1"
                >
                  <img
                    src={SITE_LOGO_URL}
                    alt=""
                    className="h-9 w-auto object-contain shrink-0 max-w-[72px]"
                    width={72}
                    height={48}
                    decoding="async"
                    aria-hidden
                  />
                  <span className="font-display text-base font-bold tracking-widest gold-gradient-text truncate">
                    {SITE_WORDMARK}
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
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
                    className={`py-4 font-display text-xl tracking-widest border-b border-white/5 last:border-0 transition-colors ${
                      location === link.href ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-6 border-t border-white/10 space-y-3">
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
