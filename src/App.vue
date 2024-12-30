<!-- src/App.vue -->
<script setup lang="ts">
// import WebVitalsMonitor from '@/components/common/WebVitalsMonitor.vue'
import { Toaster } from "@/components/ui/sonner";
// import { computed } from 'vue'
import { RouterView } from "vue-router";

// const isDev = computed(() => import.meta.env.MODE === 'development')
</script>

<template>
  <!-- Only show WebVitalsMonitor in development mode -->
  <!-- <WebVitalsMonitor v-if="isDev" /> -->
  <div>
    <Toaster />
    <RouterView />
  </div>
</template>
