import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "/api": {
        target: "http://itgirlschool.justmakeit.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/words"),
      },
    },
  },
});
