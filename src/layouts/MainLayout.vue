<script setup lang="ts">
import AppNavbar from "@/components/common/Navbar.vue";
import { RouterView } from "vue-router";
import Footer from "../components/common/Footer.vue";

defineOptions({
	name: "MainLayout",
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
    <AppNavbar />
    <!-- Main content area - flex-grow ensures it takes available space -->
    <main class="flex-grow w-full">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
