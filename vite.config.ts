import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get plugins based on environment
function getPlugins() {
  const plugins = [react()];
  
  // Only add Replit plugins in development with REPL_ID
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID) {
    try {
      // Dynamically require Replit plugins if available
      const runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal");
      if (runtimeErrorOverlay) {
        plugins.push(runtimeErrorOverlay.default());
      }
    } catch {
      // Ignore if not available
    }
  }
  
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
  },
});
