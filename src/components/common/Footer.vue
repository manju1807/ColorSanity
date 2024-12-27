<script setup lang="ts">
defineOptions({
	name: "AppFooter",
});
</script>
<template>
  <footer class="bg-background/95 border-t border-background/80">
    <div class="container flex items-center justify-center h-14 px-4">
      <span class="text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} HueMain. All rights reserved.
      </span>
    </div>
  </footer>
</template>
