// src/composables/useWebVitals.ts
import { onMounted, ref } from "vue";
import type { Metric } from "web-vitals";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";

interface MetricData {
	value: number;
	rating: "good" | "needs-improvement" | "poor";
}

type Metrics = Record<string, MetricData | null>;

export function useWebVitals(options = { debug: false }) {
	const metrics = ref<Metrics>({
		CLS: null,
		FID: null,
		LCP: null,
		FCP: null,
		TTFB: null,
		INP: null,
	});

	const isLoading = ref(true);

	onMounted(() => {
		const handleMetric = (metric: Metric) => {
			metrics.value[metric.name] = {
				value: metric.value,
				rating: metric.rating as MetricData["rating"],
			};

			if (options.debug) {
				console.log("[Web Vitals]:", metric);
			}
		};

		// Start measuring metrics
		onCLS(handleMetric);
		onFID(handleMetric);
		onLCP(handleMetric);
		onFCP(handleMetric);
		onTTFB(handleMetric);
		onINP(handleMetric);

		// Set loading to false after initial setup
		setTimeout(() => {
			isLoading.value = false;
		}, 100);
	});

	return {
		metrics,
		isLoading,
	};
}
