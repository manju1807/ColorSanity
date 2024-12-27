<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme-store";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const themeStore = useThemeStore();

const toggleTheme = () => {
	toggleDark();
	themeStore.applyTheme();
};

defineOptions({
	name: "ModeToggle",
});
</script>

<template>
  <Button variant="outline" size="icon" @click="toggleTheme"
    class="rounded-full transition-colors duration-300 ease-in-out">
    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  </Button>
</template>
