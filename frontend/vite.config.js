import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/students": {
        target: "http://172.16.19.129:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
