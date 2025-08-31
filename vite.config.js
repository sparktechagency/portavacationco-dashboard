import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // for dev
    port: 3001,
  },
  preview: {
    host: "0.0.0.0", // for preview
    port: 3001,
  },
});
