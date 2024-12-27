// src/composables/useUrls.ts
import { useQuery, useMutation } from "@tanstack/vue-query";
import { urlService } from "@/services/url.service";
import { useUrlStore } from "@/stores/url.store";
import type { CreateUrlDto } from "@/types/url";
import { useToast } from "./useToast";
import { queryClient } from "@/lib/vue-query";

export function useUrls() {
	const store = useUrlStore();
	const { error, success } = useToast();

	const urlsQuery = useQuery({
		queryKey: ["urls"],
		queryFn: async () => {
			try {
				const res = await urlService.list();
				return res.data;
			} catch (err) {
				error(
					"Failed to fetch URLs",
					err instanceof Error ? err.message : "Unknown error",
				);
				throw err;
			}
		},
	});

	const createMutation = useMutation({
		mutationFn: async (data: CreateUrlDto) => {
			try {
				const res = await urlService.create(data);
				return res.data;
			} catch (err) {
				error(
					"Failed to create URL",
					err instanceof Error ? err.message : "Unknown error",
				);
				throw err;
			}
		},
		onSuccess: (data) => {
			store.addRecent(data);
			queryClient.invalidateQueries({ queryKey: ["urls"] });
			success("URL shortened successfully");
		},
	});

	return {
		urls: urlsQuery.data,
		isLoading: urlsQuery.isLoading,
		create: createMutation.mutate,
	};
}
