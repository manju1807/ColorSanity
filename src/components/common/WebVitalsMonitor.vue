<!-- src/components/WebVitalsMonitor.vue -->
<script setup lang="ts">
import { useWebVitals } from "@/composables/useWebVitals";
import { ref, onMounted } from "vue";

type MetricName = "CLS" | "FID" | "LCP" | "FCP" | "TTFB" | "INP";
type Rating = "good" | "needs-improvement" | "poor";

interface MetricDisplay {
	name: string;
	description: string;
	threshold: {
		good: number;
		needsImprovement: number;
	};
	unit: string;
	waitMessage: string;
}

const metricInfo: Record<MetricName, MetricDisplay> = {
	CLS: {
		name: "Cumulative Layout Shift",
		description: "Measures visual stability",
		threshold: { good: 0.1, needsImprovement: 0.25 },
		unit: "",
		waitMessage: "Accumulating shifts...",
	},
	FID: {
		name: "First Input Delay",
		description: "Measures interactivity",
		threshold: { good: 100, needsImprovement: 300 },
		unit: "ms",
		waitMessage: "Waiting for first input...",
	},
	LCP: {
		name: "Largest Contentful Paint",
		description: "Measures loading performance",
		threshold: { good: 2500, needsImprovement: 4000 },
		unit: "ms",
		waitMessage: "Measuring...",
	},
	FCP: {
		name: "First Contentful Paint",
		description: "Measures initial render",
		threshold: { good: 1800, needsImprovement: 3000 },
		unit: "ms",
		waitMessage: "Measuring...",
	},
	TTFB: {
		name: "Time to First Byte",
		description: "Measures server response time",
		threshold: { good: 800, needsImprovement: 1800 },
		unit: "ms",
		waitMessage: "Measuring...",
	},
	INP: {
		name: "Interaction to Next Paint",
		description: "Measures responsiveness",
		threshold: { good: 200, needsImprovement: 500 },
		unit: "ms",
		waitMessage: "Waiting for user interaction...",
	},
};

const { metrics, isLoading } = useWebVitals({ debug: true });
const hasInteracted = ref(false);

onMounted(() => {
	window.addEventListener("click", () => {
		hasInteracted.value = true;
	});
});

const getRatingColor = (
	rating: Rating | undefined,
	name: MetricName,
): string => {
	// If it's INP and user hasn't interacted, use gray
	if (name === "INP" && !hasInteracted.value) {
		return "bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
	}

	switch (rating) {
		case "good":
			return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
		case "needs-improvement":
			return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
		case "poor":
			return "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
		default:
			return "bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
	}
};

const getMetricStatus = (
	value: number | null | undefined,
	metric: MetricName,
): string => {
	if (value == null) {
		return metricInfo[metric].waitMessage;
	}
	return metric === "CLS"
		? value.toFixed(3)
		: `${Math.round(value)}${metricInfo[metric].unit}`;
};

const getStatusMessage = (
	metric: MetricName,
	value: { value?: number; rating?: Rating } | null | undefined,
) => {
	if (metric === "INP" && !hasInteracted.value) {
		return "Waiting for interaction";
	}
	if (metric === "CLS" && (!value?.value || value.value === 0)) {
		return "Monitoring shifts";
	}
	return value?.rating || "pending";
};
</script>

<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
      Web Vitals Performance Metrics
    </h2>

    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="[name, value] in Object.entries(metrics)"
        :key="name"
        class="rounded-lg border transition-all duration-200 overflow-hidden"
        :class="getRatingColor(value?.rating, name as MetricName)"
      >
        <div class="p-4">
          <div class="font-medium text-lg">
            {{ metricInfo[name as MetricName]?.name || name }}
          </div>
          <div class="text-3xl font-bold mt-2">
            {{ getMetricStatus(value?.value, name as MetricName) }}
          </div>
          <div class="text-sm mt-2 opacity-75">
            {{ metricInfo[name as MetricName]?.description }}
          </div>
          <div
            class="text-sm mt-2 font-medium flex items-center gap-2"
            :class="{'animate-pulse': !value?.rating}"
          >
            <div
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-green-500': value?.rating === 'good',
                'bg-yellow-500': value?.rating === 'needs-improvement',
                'bg-red-500': value?.rating === 'poor',
                'bg-gray-400': !value?.rating
              }"
            />
            Status: {{ getStatusMessage(name as MetricName, value) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
