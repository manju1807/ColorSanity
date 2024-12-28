<script setup lang="ts">
import AppNavbar from "@/components/common/Navbar.vue";
import { RouterView } from "vue-router";
import Footer from "../components/common/Footer.vue";

defineOptions({
	name: "MainLayout",
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-grow">
      <RouterView />
      <h1 class="text-6xl text-center">
        hello world
      </h1>
    </main>
    <Footer />
  </div>
</template>
