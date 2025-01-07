<script setup lang="ts">
import LangToggle from "@/components/common/LangToggle.vue";
import ModeToggle from "@/components/common/ModeToggle.vue";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDark } from "@vueuse/core";
import { Menu, Palette } from "lucide-vue-next"; // Import Menu icon for hamburger
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconLogo from "../icons/IconLogo.vue";
import ThemeCustomizationSheet from "./ThemeCustomizationSheet.vue";

defineOptions({ name: "AppNavbar" });

const router = useRouter();
const sheetOpen = ref(false);
const isDark = useDark();
const isNavOpen = ref(false); // Reactive property to toggle navigation menu

const NavItems = [
  { label: "Collections", navRoute: "/collections" },
  { label: "Tints", navRoute: "/tints" },
  // { label: "Color Palettes", navRoute: "/color-palettes" },
];

const navigateAndCloseSheet = (navRoute: string) => {
  router.push(navRoute);
  isNavOpen.value = false; // Close the sheet after navigation
};

// Helper function to check if the current route matches the navRoute
const isCurrentRoute = (navRoute: string) => {
  return router.currentRoute.value.path === navRoute;
};
</script>

<template>
  <nav
    class="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center justify-between px-4">
      <div class="flex flex-row gap-2 items-center justify-center">
        <!-- Hamburger Menu for Small Screens -->
        <Sheet v-model:open="isNavOpen">
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="h-9 w-9 rounded-full md:hidden"
              aria-label="Open navigation menu">
              <Menu :class="['h-4 w-4', isDark ? 'text-white' : 'text-gray-900']" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left"
            class="fixed inset-y-0 left-0 h-full w-[300px] border-r border-border bg-background p-6 overflow-y-auto transition-transform duration-300 ease-in-out">
            <SheetHeader class="mb-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div class="flex flex-col space-y-2">
              <Button v-for="item in NavItems" :key="item.label" variant="ghost"
                @click="navigateAndCloseSheet(item.navRoute)" :class="[
                  'text-left hover:bg-accent hover:text-accent-foreground',
                  isCurrentRoute(item.navRoute) ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground'
                ]">
                {{ item.label }}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div class="flex items-center gap-2 cursor-pointer" @click="router.replace('/')">
          <IconLogo />
          <span class="font-bold text-primary tracking-tight">ColorSanity</span>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <Button v-for="item in NavItems" :key="item.label" variant="ghost" @click="router.push(item.navRoute)" :class="[
            'hover:bg-accent hover:text-accent-foreground',
            isCurrentRoute(item.navRoute) ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground'
          ]">
            {{ item.label }}
          </Button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <LangToggle />
        <ModeToggle />
        <Sheet v-model:open="sheetOpen">
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="h-9 w-9 rounded-full" aria-label="Open theme customization">
              <!-- Dynamic Icon Color Based on Theme -->
              <Palette :class="['h-4 w-4', isDark ? 'text-white' : 'text-gray-900']" />
            </Button>
          </SheetTrigger>
          <SheetContent position="right"
            class="fixed inset-y-0 right-0 h-full w-[400px] border-l border-border bg-background p-6 overflow-y-auto transition-transform duration-300 ease-in-out">
            <SheetHeader class="mb-4">
              <SheetTitle>Theme Customization</SheetTitle>
            </SheetHeader>
            <ThemeCustomizationSheet />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </nav>
</template>
