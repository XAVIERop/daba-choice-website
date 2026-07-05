import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const basePath = process.env.BASE_PATH || "/";

const LEGACY_IMAGEKIT_BASE = "https://ik.imagekit.io/foodclub/Daba%20Choice";

function getImageKitBase(): string {
  return (process.env.VITE_IMAGEKIT_BASE_URL?.trim() || LEGACY_IMAGEKIT_BASE).replace(/\/$/, "");
}

function rewriteImageKitUrls(text: string): string {
  return text.replaceAll(LEGACY_IMAGEKIT_BASE, getImageKitBase());
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "imagekit-url-rewrite",
      transformIndexHtml(html) {
        return rewriteImageKitUrls(html);
      },
      closeBundle() {
        const manifestPath = path.join(__dirname, "dist", "manifest.json");
        if (fs.existsSync(manifestPath)) {
          fs.writeFileSync(manifestPath, rewriteImageKitUrls(fs.readFileSync(manifestPath, "utf-8")));
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
    headers: {
      // Avoid stale CSS/JS while iterating locally (hard refresh still recommended).
      "Cache-Control": "no-store",
    },
  },
});
