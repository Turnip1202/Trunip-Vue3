import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/styles";
import store from "@/store";

createApp(App).use(router).use(store).mount("#app");


console.log("base_url",import.meta.env.VITE_TURNIP_WALLPAPER_URL)
