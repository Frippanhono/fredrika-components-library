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
      "@fredrika/buttons": pkg("buttons"),
      "@fredrika/cards": pkg("cards"),
      "@fredrika/dropdowns": pkg("dropdowns"),
      "@fredrika/modals": pkg("modals"),
      "@fredrika/tabs": pkg("tabs"),
      "@fredrika/toasts": pkg("toasts"),
      "@fredrika/navbar": pkg("navbar"),
      "@fredrika/inputs": pkg("inputs"),
      "@fredrika/badges": pkg("badges"),
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
