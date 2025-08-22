import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Dynamically import Replit plugins only in development and when available
const loadReplitPlugins = async () => {
  if (process.env.NODE_ENV === "production" || !process.env.REPL_ID) {
    return [];
  }
  
  try {
    const [runtimeErrorOverlay, cartographer] = await Promise.all([
      import("@replit/vite-plugin-runtime-error-modal").catch(() => null),
      import("@replit/vite-plugin-cartographer").catch(() => null),
    ]);
    
    const plugins = [];
    if (runtimeErrorOverlay) plugins.push(runtimeErrorOverlay.default());
    if (cartographer) plugins.push(cartographer.cartographer());
    return plugins;
  } catch {
    return [];
  }
};

export default defineConfig(async () => {
  const replitPlugins = await loadReplitPlugins();
  
  return {
    plugins: [
      react(),
      ...replitPlugins,
    ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
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
  };
});
