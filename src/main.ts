import "./assets/index.css";
import { registerSW } from "virtual:pwa-register";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import { VueQueryPlugin, vueQueryPluginOptions } from "./lib/vue-query";
import router from "./router";
import { useThemeStore } from "./stores/theme-store";

// Create app instance first
const app = createApp(App);

// Initialize Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

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

// Initialize plugins
app.use(router);
app.use(i18n);
app.use(VueQueryPlugin, vueQueryPluginOptions);

// Initialize theme store and mount app using IIFE
(async () => {
	const themeStore = useThemeStore();
	await themeStore.init();

	// Mount app
	app.mount("#app");
})();
