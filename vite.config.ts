import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import * as path from "node:path";
// https://vite.dev/config/
export default defineConfig({
	resolve:{
		alias:{
			"@":path.resolve(__dirname,"src")
		}
	},
	plugins: [vue(),
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
				api:"modern-compiler",
				additionalData: `
				@use "@/styles/variables.scss" as *;
				@use "@/styles/mixins.scss" as *;
				@use "@/styles/global.scss" as *;
				`,
				sassOptions: {
					outputStyle: 'expanded'
				}
			}
		}
	}
});
