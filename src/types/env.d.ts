/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_VITALS_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-svg-loader" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

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

import type { MessageSchema } from "./index";

declare module "vue-i18n" {
  export type DefineLocaleMessage = MessageSchema;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
