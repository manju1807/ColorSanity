import { i18n } from ".";

// src/i18n/setup.ts
export async function setupI18n() {
	// Load saved locale
	const savedLocale = localStorage.getItem("locale");
	if (savedLocale) {
		if (savedLocale === "en" || savedLocale === "es") {
			i18n.global.locale = savedLocale;
		}
	} else {
		// Use browser's language if available
		const browserLocale = navigator.language.split("-")[0];
		if (
			i18n.global.availableLocales.includes(browserLocale as "en" | "es")
		) {
			i18n.global.locale = browserLocale as "en" | "es";
		}
	}
}
