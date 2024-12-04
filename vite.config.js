import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  // Tambahkan konfigurasi ini
  publicDir: "public",
});
