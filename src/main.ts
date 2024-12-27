import "./assets/index.css";

import { registerSW } from "virtual:pwa-register";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { VueQueryPlugin, vueQueryPluginOptions } from "./lib/vue-query";
import router from "./router";

// Initialize PWA
const updateSW = registerSW({
	onNeedRefresh() {
		if (confirm("New content available. Reload?")) {
			updateSW();
		}
	},
	onOfflineReady() {
		console.log("App ready to work offline");
	},
	immediate: true,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.mount("#app");
