<script setup lang="ts">
import AppNavbar from "@/components/common/Navbar.vue";
import Footer from "../components/common/Footer.vue";
import { RouterView } from "vue-router";

defineOptions({
	name: "MainLayout",
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
