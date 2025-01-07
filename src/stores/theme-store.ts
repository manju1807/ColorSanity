import {
	DEFAULT_THEME_SETTINGS,
	FONT_FAMILIES,
	THEME_PRESETS,
	colorUtils,
} from "@/config/constants/themes";
import type { PresetTheme, ThemeColors, ThemeSettings } from "@/types/themes";
import { useDark } from "@vueuse/core";
import { defineStore } from "pinia";
import { watch } from "vue";

export const useThemeStore = defineStore("theme", {
	state: () => ({
		settings: JSON.parse(
			JSON.stringify(DEFAULT_THEME_SETTINGS),
		) as ThemeSettings,
	}),

	persist: {
		key: "theme-settings",
		storage: localStorage,
	},

	getters: {
		isDark: () => useDark().value,

		currentColors(): ThemeColors {
			return this.settings.colors[this.isDark ? "dark" : "light"];
		},

		currentRadius: (state) => state.settings.radius,
		currentBorderWidth: (state) => state.settings.borderWidth,
		currentFontFamily: (state) => state.settings.fontFamily,

		currentFontStack: (state) => {
			return (
				FONT_FAMILIES[
					state.settings.fontFamily as keyof typeof FONT_FAMILIES
				] || FONT_FAMILIES.Inter
			);
		},
	},

	actions: {
		updateRadius(value: number) {
			this.settings.radius = value;
			this.applyTheme();
		},

		updateBorderWidth(value: number) {
			this.settings.borderWidth = value;
			this.applyTheme();
		},

		updateFontFamily(value: string) {
			// console.log("Updating font family:", value);
			if (value in FONT_FAMILIES) {
				this.settings.fontFamily = value;
				this.applyTheme();
			}
		},

		updateColors(colors: Partial<ThemeColors>, mode: "light" | "dark") {
			const formattedColors = Object.entries(colors).reduce(
				(acc, [key, value]) => {
					try {
						const [h, s, l] = colorUtils.parseHSL(value);
						acc[key] = colorUtils.formatHSL(h, s, l);
					} catch {
						acc[key] = value;
					}
					return acc;
				},
				{} as Record<string, string>,
			);

			this.settings.colors[mode] = {
				...this.settings.colors[mode],
				...formattedColors,
			};
			this.applyTheme();
		},

		resetTheme() {
			localStorage.removeItem("theme-settings"); // Clear persisted state
			this.settings = JSON.parse(JSON.stringify(DEFAULT_THEME_SETTINGS));
			this.applyTheme();
		},

		applyTheme() {
			const root = document.documentElement;
			const isDark = this.isDark;

			if (isDark) {
				root.classList.add("dark");
			} else {
				root.classList.remove("dark");
			}

			root.style.setProperty("--radius", `${this.settings.radius}rem`);
			root.style.setProperty(
				"--border-width",
				`${this.settings.borderWidth}px`,
			);
			// Update how we set the font-family
			const fontStack =
				FONT_FAMILIES[
					this.settings.fontFamily as keyof typeof FONT_FAMILIES
				] || FONT_FAMILIES.Inter;
			// console.log("Applying font family:", {
			//   selectedFont: this.settings.fontFamily,
			//   fontStack,
			//   currentStyle:
			//     document.documentElement.style.getPropertyValue(
			//       "--font-family",
			//     ),
			// });
			root.style.setProperty("--font-family", fontStack);
			const currentColors =
				this.settings.colors[isDark ? "dark" : "light"];
			Object.entries(currentColors).forEach(([key, value]) => {
				root.style.setProperty(`--${key}`, value);
				root.style.setProperty(`--${key}-hsl`, `hsl(${value})`);
			});

			window.dispatchEvent(
				new CustomEvent("theme-changed", {
					detail: {
						isDark,
						colors: currentColors,
						radius: this.settings.radius,
						borderWidth: this.settings.borderWidth,
						fontFamily: this.settings.fontFamily,
					},
				}),
			);
		},

		applyPreset(preset: PresetTheme) {
			const presetColors = THEME_PRESETS[preset];
			if (presetColors) {
				this.settings.colors = JSON.parse(JSON.stringify(presetColors));
				this.applyTheme();
			}
		},

		adjustThemeLightness(amount: number, mode: "light" | "dark") {
			const colors = this.settings.colors[mode];
			const adjustedColors = Object.entries(colors).reduce(
				(acc, [key, value]) => {
					acc[key] = colorUtils.adjustLightness(value, amount);
					return acc;
				},
				{} as Record<string, string>,
			);

			this.updateColors(adjustedColors, mode);
		},

		init() {
			// If no theme settings exist, start with defaults
			if (!localStorage.getItem("theme-settings")) {
				this.settings = JSON.parse(
					JSON.stringify(DEFAULT_THEME_SETTINGS),
				);
			}

			const dark = useDark();
			this.applyTheme();

			// Ensure theme stays in sync with system/user preference
			watch(
				dark,
				(newValue) => {
					if (newValue) {
						document.documentElement.classList.add("dark");
					} else {
						document.documentElement.classList.remove("dark");
					}
					this.applyTheme();
				},
				{ immediate: true },
			);
		},
	},
});
