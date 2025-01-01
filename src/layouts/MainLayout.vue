<script setup lang="ts">
import AppNavbar from "@/components/common/Navbar.vue";
import { RouterView } from "vue-router";
import Footer from "../components/common/Footer.vue";

defineOptions({
	name: "MainLayout",
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <AppNavbar />
    <main class="min-h-screen relative flex-grow">
      <div class="magic-polkadot-bg"></div>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style lang="css" scoped>
.magic-polkadot-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsl(var(--background));
  opacity: 0.3;
  background-image: radial-gradient(hsl(var(--primary)) 0.75px, hsl(var(--background)) 0.75px);
  background-size: 15px 15px;
  z-index: 1;
}
</style>
