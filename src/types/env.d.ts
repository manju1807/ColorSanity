/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-svg-loader" />

// Environment variables interface
interface ImportMetaEnv {
	readonly MODE: string;
	readonly VITE_VITALS_ENDPOINT: string;
	// Add any other environment variables you're using
	readonly VITE_API_URL?: string;
	readonly VITE_APP_TITLE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Vue component types
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<object, object, unknown>;
	export default component;
}

// PostCSS plugin types
declare module "postcss-import" {
	import type { Plugin } from "postcss";
	const postcssImport: Plugin;
	export default postcssImport;
}

declare module "postcss-nesting" {
	import type { Plugin } from "postcss";
	const postcssNesting: Plugin;
	export default postcssNesting;
}

// i18n message schema
import type { MessageSchema } from "./index";
declare module "vue-i18n" {
	export type DefineLocaleMessage = MessageSchema;
}

// API Response type
export interface ApiResponse<T> {
	data: T;
	status: number;
	message?: string;
}

// SVG imports
declare module "*.svg" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent;
	export default component;
}

// Static assets
declare module "*.png" {
	const value: string;
	export default value;
}

declare module "*.jpg" {
	const value: string;
	export default value;
}

declare module "*.jpeg" {
	const value: string;
	export default value;
}

declare module "*.gif" {
	const value: string;
	export default value;
}

declare module "*.webp" {
	const value: string;
	export default value;
}

// Style modules
declare module "*.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.scss" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.sass" {
	const classes: { readonly [key: string]: string };
	export default classes;
}
