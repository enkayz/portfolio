import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        portfolio: fileURLToPath(new URL("./index.html", import.meta.url)),
        system8: fileURLToPath(new URL("./system8.html", import.meta.url)),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
  },
});
