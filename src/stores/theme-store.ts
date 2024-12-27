import { defineStore } from "pinia";
import { useDark } from "@vueuse/core";
import type { ThemeSettings, ThemeColors, PresetTheme } from "@/types/themes";
import {
	DEFAULT_THEME_SETTINGS,
	THEME_PRESETS,
	FONT_FAMILIES,
	colorUtils,
} from "@/config/constants/themes";

export const useThemeStore = defineStore("theme", {
	state: () => ({
		settings: { ...DEFAULT_THEME_SETTINGS } as ThemeSettings,
	}),

	persist: {
		key: "theme-settings",
		storage: localStorage,
	},

	getters: {
		isDark: () => useDark().value,

		currentColors: (state) => {
			return state.settings.colors[useDark().value ? "dark" : "light"];
		},

		currentRadius: (state) => state.settings.radius,

		currentBorderWidth: (state) => state.settings.borderWidth,

		currentFontFamily: (state) => state.settings.fontFamily,

		// New getters for theme utilities
		isCurrentThemeWCAGCompliant: (state) => {
			const colors =
				state.settings.colors[useDark().value ? "dark" : "light"];
			return colorUtils.isWCAGCompliant(
				colors.background,
				colors.foreground,
			);
		},

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
			if (value in FONT_FAMILIES) {
				this.settings.fontFamily = value;
				this.applyTheme();
			}
		},

		updateColors(colors: Partial<ThemeColors>, mode: "light" | "dark") {
			// Ensure all HSL values are properly formatted
			const formattedColors = Object.entries(colors).reduce(
				(acc, [key, value]) => {
					try {
						const [h, s, l] = colorUtils.parseHSL(value);
						acc[key] = colorUtils.formatHSL(h, s, l);
					} catch {
						acc[key] = value; // Keep original value if parsing fails
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
			this.settings = { ...DEFAULT_THEME_SETTINGS };
			this.applyTheme();
		},

		applyTheme() {
			const root = document.documentElement;
			const isDark = useDark().value;

			// Apply radius
			root.style.setProperty("--radius", `${this.settings.radius}rem`);

			// Apply border width
			root.style.setProperty(
				"--border-width",
				`${this.settings.borderWidth}px`,
			);

			// Apply font family with complete stack
			root.style.setProperty(
				"--font-family",
				FONT_FAMILIES[
					this.settings.fontFamily as keyof typeof FONT_FAMILIES
				] || FONT_FAMILIES.Inter,
			);

			// Apply current mode colors
			const currentColors =
				this.settings.colors[isDark ? "dark" : "light"];
			Object.entries(currentColors).forEach(([key, value]) => {
				// Set both the HSL variable and a CSS color variable
				root.style.setProperty(`--${key}`, value);
				root.style.setProperty(
					`--${key}-hsl`,
					`hsl(${value})`, // The HSL values are already in the correct format
				);
			});

			// Dispatch theme change event for components that need to react
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
				this.settings.colors = { ...presetColors };
				this.applyTheme();
			}
		},

		// New utility methods
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
	},
});
