import { useState, useEffect } from "react";
import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CafeProvider } from "@/contexts/CafeContext";
import { TemplateProvider, type TemplateId } from "@/contexts/TemplateContext";

// Layout & UI
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { features } from "@/config/features";


// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Tiffin from "./pages/Tiffin";
import Catering from "./pages/Catering";
import Admin from "./pages/Admin";
import TemplatePicker from "./pages/TemplatePicker";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const VALID_TEMPLATES: TemplateId[] = ["1", "2", "3", "4", "5"];
const TEMPLATE_STORAGE_KEY = "daba-preview-template";

function getTemplateFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const tid = new URLSearchParams(window.location.search).get("template");
  return tid && VALID_TEMPLATES.includes(tid as TemplateId) ? tid : null;
}

function TemplateWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [templateId, setTemplateId] = useState<TemplateId | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
    const fullPath = location.split("?")[0] || "/";
    const pathname = baseUrl && fullPath.startsWith(baseUrl) ? fullPath.slice(baseUrl.length) || "/" : fullPath;

    if (pathname === "/choose") {
      sessionStorage.removeItem(TEMPLATE_STORAGE_KEY);
      setTemplateId(null);
      return;
    }

    const fromUrl = getTemplateFromUrl();
    const fromStorage = sessionStorage.getItem(TEMPLATE_STORAGE_KEY) as TemplateId | null;
    const stored = fromStorage && VALID_TEMPLATES.includes(fromStorage) ? fromStorage : null;

    if (fromUrl) {
      sessionStorage.setItem(TEMPLATE_STORAGE_KEY, fromUrl);
      setTemplateId(fromUrl as TemplateId);
    } else if (stored) {
      setTemplateId(stored);
    } else {
      setTemplateId(null);
    }
  }, [location]);

  if (!templateId) return <>{children}</>;
  return <TemplateProvider templateId={templateId}>{children}</TemplateProvider>;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-success" component={OrderSuccess} />
          {features.show_auth && <Route path="/orders" component={Orders} />}
          {features.show_auth && <Route path="/auth" component={Auth} />}
          {features.show_auth && <Route path="/profile" component={Profile} />}
          <Route path="/reservation" component={Reservation} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/offers" component={Offers} />
          <Route path="/tiffin" component={Tiffin} />
          <Route path="/catering" component={Catering} />
          <Route path="/contact" component={Contact} />
          {features.show_admin && <Route path="/admin" component={Admin} />}

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function RootRouter() {
  const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

  return (
    <WouterRouter base={baseUrl}>
      <TemplateWrapper>
        <PreviewRedirectOrRouter baseUrl={baseUrl} />
      </TemplateWrapper>
    </WouterRouter>
  );
}

function PreviewRedirectOrRouter({ baseUrl }: { baseUrl: string }) {
  const pathname = typeof window !== "undefined"
    ? (baseUrl && window.location.pathname.startsWith(baseUrl)
        ? window.location.pathname.slice(baseUrl.length) || "/"
        : window.location.pathname)
    : "/";

  if (/^\/preview\/[1-5]/.test(pathname)) {
    const match = pathname.match(/^\/preview\/([1-5])(?:\/(.*))?$/);
    if (match) {
      const [, tid, rest] = match;
      const path = rest ? `/${rest}` : "/";
      return <Redirect to={`${path}?template=${tid}`} replace />;
    }
  }

  return (
    <Switch>
      <Route path="/choose" component={TemplatePicker} />
      <Route component={AppRouter} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CafeProvider>
        <TooltipProvider>
          <RootRouter />
          <Toaster />
        </TooltipProvider>
      </CafeProvider>
    </QueryClientProvider>
  );
}

export default App;
