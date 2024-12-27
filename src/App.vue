<!-- src/App.vue -->
<script setup lang="ts">
// import { computed } from 'vue'
import { RouterView } from "vue-router";
// import WebVitalsMonitor from '@/components/common/WebVitalsMonitor.vue'
import { Toaster } from "@/components/ui/sonner";

// const isDev = computed(() => import.meta.env.MODE === 'development')
</script>

<template>
  <!-- Only show WebVitalsMonitor in development mode -->
  <!-- <WebVitalsMonitor v-if="isDev" /> -->
  <Toaster />
  <RouterView />
</template>
