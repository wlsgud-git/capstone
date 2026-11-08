import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    host: "0.0.0.0",
    allowedHosts: [".tunnl.gg"],

    proxy: {
      "^/(auth|chatroom|question)": {
        target: "http://backend-service:3000",
        changeOrigin: true,
      },
    },
  },
});
