import { URL, fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import autoprefixer from "autoprefixer";
import { visualizer } from "rollup-plugin-visualizer";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import type { ConfigEnv, PluginOption, UserConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import VueDevTools from "vite-plugin-vue-devtools";
// Using dynamic imports with type assertions
const postcssImport = (await import("postcss-import")).default;
const postcssNesting = (await import("postcss-nesting")).default;
import Compression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgLoader from "vite-svg-loader";

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
				name: "Gradio",
				short_name: "Gradio",
				description: "Your application description",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				cleanupOutdatedCaches: true,
				globDirectory: "dist",
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.yourbackend\.com\/.*/i,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							networkTimeoutSeconds: 10,
							expiration: {
								maxEntries: 100,
					      maxAgeSeconds: 60 * 60 * 24, // 24 hours (fixed syntax)
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
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
		server: {
			port: 3000,
			open: true,
			cors: true,
		},
		css: {
			devSourcemap: true,
			postcss: {
				plugins: [
					postcssImport(),
					postcssNesting(),
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
			sourcemap: true,
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
