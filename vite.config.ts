import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), mkcert()],
  server: {
    host: "atom.unigeorge.uk"
  }
})
