import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import type { App } from "vue";
const store = createPinia();
const registerStore = (app: App<Element>) => {
	app.use(store);
	store.use(piniaPersist);
};

export default registerStore;
