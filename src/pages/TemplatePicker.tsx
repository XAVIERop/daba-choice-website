import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Layout, Palette, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/use-theme";
import { TEMPLATES } from "@/contexts/TemplateContext";
import { SITE_LOGO_URL, SITE_NAME, SITE_WORDMARK } from "@/lib/site";

const PITCH_TEMPLATES = ["1", "5"] as const; // Current + Gazebo for client demo

export default function TemplatePicker() {
  const themeMode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleMode);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${SITE_NAME} home`}
            className="inline-flex items-center gap-2.5 md:gap-3 hover:opacity-90 transition-opacity min-w-0"
          >
            <img
              src={SITE_LOGO_URL}
              alt=""
              className="h-9 md:h-11 w-auto object-contain shrink-0 max-w-[100px] md:max-w-[130px]"
              width={130}
              height={56}
              decoding="async"
              aria-hidden
            />
            <span className="font-display text-lg md:text-xl font-bold tracking-widest gold-gradient-text whitespace-nowrap">
              {SITE_WORDMARK}
            </span>
          </Link>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => toggleTheme()}
              className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/5 border border-white/10"
              aria-label={themeMode === "dark" ? "Switch to day mode" : "Switch to night mode"}
            >
              {themeMode === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              Skip to main site
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Layout className="w-4 h-4" />
            Client preview
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide text-foreground mb-4">
            Choose Your Design
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each option uses a different layout on the home page (hero, navigation, sections)—not only colors.
            Same features and content everywhere else.
          </p>
        </motion.div>
      </section>

      {/* Template cards */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
          {PITCH_TEMPLATES.map((id, i) => {
            const template = TEMPLATES[id];
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <Link href={`/?template=${template.id}`}>
                  <a className="block group">
                    <div className="glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300">
                      {/* Preview thumbnail */}
                      <div
                        className={`relative h-52 bg-gradient-to-br ${template.previewGradient} overflow-hidden`}
                      >
                        <img
                          src={template.image}
                          alt={template.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white/90">
                            <Palette className="w-12 h-12 mx-auto mb-2 opacity-80" />
                            <span className="font-display text-xl font-semibold">
                              {template.name}
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-white/80 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15 max-w-[85%]">
                            {template.layoutSummary}
                          </span>
                          <div className="flex gap-1.5 shrink-0" aria-hidden>
                            <span
                              className="w-5 h-5 rounded-full border border-white/40"
                              style={{ backgroundColor: template.primary }}
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-white/40"
                              style={{ backgroundColor: template.accent }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-muted-foreground text-sm mb-1 font-medium text-foreground/90">
                          {template.layout === "royal" ? "Different structure" : "Classic structure"}
                        </p>
                        <p className="text-muted-foreground text-sm mb-4">
                          {template.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          View full demo
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer note */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5 max-w-xl mx-auto px-4">
        Templates 2–4 reuse the cinematic layout with different palettes. Template 5 changes home layout and nav; day/night
        still applies on top.
      </footer>
    </div>
  );
}
