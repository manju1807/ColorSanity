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
    <main class="min-h-screen flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
