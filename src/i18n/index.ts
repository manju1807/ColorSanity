// src/i18n/index.ts
import { createI18n } from "vue-i18n";

// Import your locale messages
import en from "./locales/en";
import es from "./locales/es";
// Add more languages as needed

export type MessageSchema = {
	common: {
		welcome: string;
		loading: string;
		error: string;
		save: string;
		cancel: string;
	};
	navigation: object;
	auth: object;
};

export const i18n = createI18n<[MessageSchema], "en" | "es">({
	legacy: false, // Set to false to use Composition API
	locale: "en",
	fallbackLocale: "en",
	messages: {
		en,
		es,
	},
});
