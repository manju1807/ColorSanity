// src/components/LanguageSwitcher.vue
<template>
  <div class="flex items-center gap-2">
    <button
      v-for="locale in availableLocales"
      :key="locale"
      @click="changeLocale(locale)"
      :class="[
        'px-3 py-1 rounded-md',
        currentLocale.value === locale
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted hover:bg-muted/80',
      ]"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "@/composables/useI18n";

const { locale: currentLocale, availableLocales } = useI18n() as {
	locale: { value: string };
	availableLocales: string[];
};

const changeLocale = (newLocale: string) => {
	currentLocale.value = newLocale;
	// Optionally save the locale preference
	localStorage.setItem("locale", newLocale);
};
</script>
