import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = (name) => resolve(__dirname, `packages/${name}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: "automatic",
  },
  resolve: {
    alias: {
      "@minilogg/buttons": pkg("buttons"),
      "@minilogg/cards": pkg("cards"),
      "@minilogg/dropdowns": pkg("dropdowns"),
      "@minilogg/modals": pkg("modals"),
      "@minilogg/tabs": pkg("tabs"),
      "@minilogg/toasts": pkg("toasts"),
      "@minilogg/navbar": pkg("navbar"),
      "@minilogg/inputs": pkg("inputs"),
      "@minilogg/badges": pkg("badges"),
      "@minilogg/weekly-schedule": pkg("weekly-schedule"),
      "@minilogg/stat-card": pkg("stat-card"),
      "@minilogg/child-card": pkg("child-card"),
      "@minilogg/message-card": pkg("message-card"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
    css: true,
    include: ["test/**/*.test.{js,jsx}"],
  },
});
