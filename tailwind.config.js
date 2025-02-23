import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const safelist = ["dark"];
export const prefix = "";
export const content = [
	"./pages/**/*.{ts,tsx,vue}",
	"./components/**/*.{ts,tsx,vue}",
	"./app/**/*.{ts,tsx,vue}",
	"./src/**/*.{ts,tsx,vue}",
];
export const theme = {
	container: {
		center: true,
		padding: "2rem",
		screens: {
			"2xl": "1400px",
		},
	},
	extend: {
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},
		},
		transitionProperty: {
			colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
		},
		borderRadius: {
			xl: "calc(var(--radius) + 4px)",
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
			"accordion-down": {
				from: { height: 0 },
				to: { height: "var(--radix-accordion-content-height)" },
			},
			"accordion-up": {
				from: { height: "var(--radix-accordion-content-height)" },
				to: { height: 0 },
			},
			"collapsible-down": {
				from: { height: 0 },
				to: { height: "var(--radix-collapsible-content-height)" },
			},
			"collapsible-up": {
				from: { height: "var(--radix-collapsible-content-height)" },
				to: { height: 0 },
			},
		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
			"collapsible-down": "collapsible-down 0.2s ease-in-out",
			"collapsible-up": "collapsible-up 0.2s ease-in-out",
		},
		fontFamily: {
			sans: ["var(--font-family)"],
			inter: [
				"Inter",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"sans-serif",
			],
			roboto: [
				"Roboto",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"sans-serif",
			],
			"open-sans": [
				'"Open Sans"',
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"sans-serif",
			],
			lato: [
				"Lato",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"sans-serif",
			],
			montserrat: [
				"Montserrat",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"sans-serif",
			],
		},
	},
};
export const plugins = [animate, forms, typography, aspectRatio, scrollbar];
