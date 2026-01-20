/**
 * Vite configuration for the frontend development server and build.
 *
 * The `server.proxy` entry forwards `/api` requests to the backend
 * running on `localhost:8080` during development.
 *
 * @module frontend/vite.config
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
