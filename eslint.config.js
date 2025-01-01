import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVitest from "@vitest/eslint-plugin";

export default [
	{
		name: "app/files-to-lint",
		files: ["**/*.{ts,mts,tsx,vue}"],
	},
	{
		name: "app/files-to-ignore",
		ignores: [
			"**/dist/**",
			"**/dist-ssr/**",
			"**/coverage/**",
			"**/dev-dist/**",
		],
	},
	{
		name: "app/vue-rules",
		rules: {
			"vue/multi-word-component-names": "off",
		},
	},
	...pluginVue.configs["flat/essential"],
	...vueTsEslintConfig(),
	{
		...pluginVitest.configs.recommended,
		files: ["src/**/__tests__/*"],
	},
];
