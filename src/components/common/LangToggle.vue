<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const toggleLanguage = (lang: string) => {
	locale.value = lang as "en" | "es";
	localStorage.setItem("locale", lang);
};

defineOptions({
	name: "LangToggle",
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" class="h-9 w-9 rounded-full" :aria-label="`Toggle Languages`">
        <Languages class="h-4 w-4" />
        <span class="sr-only">Toggle language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="toggleLanguage('en')" :class="{ 'bg-accent': locale === 'en' }">
        English
      </DropdownMenuItem>
      <DropdownMenuItem @click="toggleLanguage('es')" :class="{ 'bg-accent': locale === 'es' }">
        Español
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
