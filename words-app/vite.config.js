import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { babel } from "@rollup/plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelrc: false,
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
      ],
      exclude: "node_modules/**",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: " http://itgirlschool.justmakeit.ru/api/words",
        changeOrigin: true,
      },
    },
  },
  base: "./",
  optimizeDeps: {
    include: ["mobx", "mobx-react"],
  },
});
