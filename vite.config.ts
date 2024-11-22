import * as path from "node:path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
	base: "/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
				additionalData: `
				@use "@/styles/element/index.scss" as *;
				@use "@/styles/variable.scss" as *;
				`,
				sassOptions: {
					outputStyle: "expanded",
				},
			},
		},
	},
});
