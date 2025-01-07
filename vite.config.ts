import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import autoprefixer from "autoprefixer";
import { URL, fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import tailwind from "tailwindcss";
import type { ConfigEnv, PluginOption, UserConfig } from "vite";
import { defineConfig } from "vite";
import Compression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import Inspect from "vite-plugin-inspect";
import { VitePWA } from "vite-plugin-pwa";
import VueDevTools from "vite-plugin-vue-devtools";
import svgLoader from "vite-svg-loader";
import { siteConfig } from "./src/config/site-config";
const postcssImport = (await import("postcss-import")).default;
const postcssNesting = (await import("postcss-nesting")).default;

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const plugins: PluginOption[] = [
		vue(),
		vueJsx(),
		VueDevTools(),
		Inspect(),
		svgLoader(),
		Compression({
			algorithm: "gzip",
			ext: ".gz",
		}),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"masked-icon.svg",
			],
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: siteConfig.name,
				short_name: siteConfig.name,
				description: siteConfig.description,
				theme_color: siteConfig.themeColor,
				icons: [
					{
						src: siteConfig.manifest.icons.androidChrome.small,
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: siteConfig.manifest.icons.androidChrome.large,
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: siteConfig.manifest.icons.androidChrome.large,
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				cleanupOutdatedCaches: true,
				globDirectory: "dist", // Change this to "dist"
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
			},
		}),
		createHtmlPlugin({
			inject: {
				data: {
					siteConfig, // Spread the entire siteConfig object
					// test: 'Hello, World!',
				},
				tags: [
					{
						injectTo: "head",
						tag: "meta",
						attrs: {
							name: "theme-color",
							content: siteConfig.themeColor,
						},
					},
				],
			},
			minify: true,
			template: "index.html",
		}),
	];

	if (mode === "analyze") {
		plugins.push(
			visualizer({
				open: true,
				filename: "dist/stats.html",
				gzipSize: true,
				brotliSize: true,
			}) as PluginOption,
		);
	}

	return {
		define: {
			// Inject siteConfig into the app
			"import.meta.env.SITE_CONFIG": JSON.stringify(siteConfig),
		},
		server: {
			port: 3000,
			open: true,
			cors: true,
		},
		css: {
			devSourcemap: true,
			postcss: {
				plugins: [
					postcssImport,
					postcssNesting,
					tailwind(),
					autoprefixer(),
				],
			},
		},
		plugins,
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		build: {
			sourcemap: false,
			rollupOptions: {
				output: {
					manualChunks: {
						vue: ["vue", "vue-router", "pinia"],
						vendors: ["@vueuse/core"],
					},
				},
			},
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
		optimizeDeps: {
			include: ["web-vitals"],
		},
		preview: {
			port: 4173,
			open: true,
		},
	};
});
