// src/plugins/vue-query.ts

import {
	QueryClient,
	VueQueryPlugin,
	type VueQueryPluginOptions,
} from "@tanstack/vue-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
			throwOnError: true,
		},
	},
});

const vueQueryPluginOptions: VueQueryPluginOptions = {
	queryClient,
};

export { queryClient, VueQueryPlugin, vueQueryPluginOptions };
