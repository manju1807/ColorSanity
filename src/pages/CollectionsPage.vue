# Vue Component Structure

<script setup lang="ts">
// Imports - Components
import CardSkeleton from "@/components/custom/CardSkeleton.vue";
import ColorCard from "@/components/custom/ColorCard.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Imports - Data & Types
import solidColors from "@/config/constants/data/solid-colors.json";
import gradientColors from "@/config/constants/data/ui-gradients.json";
import type { GradientColor, SolidColor } from "@/types/colors";
import { ChevronUp, Search } from "lucide-vue-next";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

// Constants
const PAGE_SIZE = 16;

// Refs
const currentPage = ref(1);
const activeTab = ref("gradient-colors");
const isLoading = ref(true);
const searchQuery = ref("");
const showBackToTop = ref(false);
const isPageChanging = ref(false);
const pageChangeTimeout = ref<number | null>(null);
const solidColorData = ref<SolidColor[]>([]);
const gradientColorData = ref<GradientColor[]>([]);
const contentRef = ref<HTMLElement | null>(null);

// Observer
let observer: IntersectionObserver | null = null;

// Lifecycle
onMounted(async () => {
  try {
    solidColorData.value = solidColors;
    gradientColorData.value = gradientColors;
    setupIntersectionObserver();
  } catch (error) {
    console.error("Error loading color data:", error);
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  observer?.disconnect();
  if (pageChangeTimeout.value) clearTimeout(pageChangeTimeout.value);
});

// Methods
const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        showBackToTop.value = !entry.isIntersecting;
      });
    },
    { threshold: 0.1 },
  );

  if (contentRef.value) observer.observe(contentRef.value);
};

const handleSearch = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value;
};

const scrollToTop = () => window.scrollTo({ top: 0 });

const handlePageChange = async (event: { page: number }) => {
  const newPage = Math.min(Math.max(1, event.page), totalPages.value);
  if (newPage === currentPage.value) return;

  isPageChanging.value = true;
  currentPage.value = newPage;

  if (pageChangeTimeout.value) clearTimeout(pageChangeTimeout.value);
  pageChangeTimeout.value = window.setTimeout(() => {
    isPageChanging.value = false;
  }, 300);
};

// Watchers
watch([activeTab, searchQuery], () => {
  currentPage.value = 1;
  nextTick(() => window.scrollTo({ top: 0 }));
});

// Utils
const filterColors = (
  colors: Array<SolidColor | GradientColor>,
  query: string,
) => {
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  return colors.filter((color) =>
    searchTerms.every((term) => {
      const hasTag =
        "tags" in color &&
        Array.isArray(color.tags) &&
        color.tags.every((tag) => typeof tag === "string");
      return (
        color.name.toLowerCase().includes(term) ||
        (hasTag &&
          (color.tags as string[]).some((tag) =>
            tag.toLowerCase().includes(term),
          ))
      );
    }),
  );
};

// Computed
const filteredSolids = computed(() =>
  searchQuery.value
    ? filterColors(solidColorData.value, searchQuery.value)
    : solidColorData.value,
);

const filteredGradients = computed(() =>
  searchQuery.value
    ? filterColors(gradientColorData.value, searchQuery.value)
    : gradientColorData.value,
);

const paginatedColors = computed(() => {
  const currentData =
    activeTab.value === "solid-colors"
      ? filteredSolids.value
      : filteredGradients.value;
  return currentData.slice(
    (currentPage.value - 1) * PAGE_SIZE,
    currentPage.value * PAGE_SIZE,
  );
});

const totalPages = computed(() => {
  const total =
    activeTab.value === "solid-colors"
      ? filteredSolids.value.length
      : filteredGradients.value.length;
  return Math.ceil(total / PAGE_SIZE) || 1;
});

const totalItems = computed(() =>
  activeTab.value === "solid-colors"
    ? filteredSolids.value.length
    : filteredGradients.value.length,
);
</script>

<template>
  <div class="container relative px-4 md:px-24 py-12 z-10" ref="contentRef">
    <!-- Header -->
    <div class="min-h-full min-w-full mb-12 space-y-4 flex flex-col items-center justify-center">
      <h1 class="text-center text-5xl font-extrabold tracking-tight leading-tight text-foreground">
        Color Collections
      </h1>
      <p class="text-center text-sm text-foreground max-w-md">
        Explore our curated collection of colors and gradients for your next project
      </p>
      <p class="text-xs text-foreground tracking-tight">Made with ❤️ by Manjunath R</p>
    </div>

    <!-- Main Content -->
    <Tabs v-model="activeTab" class="w-full space-y-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 sticky top-0 z-10 py-4">
        <TabsList class="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="gradient-colors" class="px-8">Gradients</TabsTrigger>
          <TabsTrigger value="solid-colors" class="px-8">Solid Colors</TabsTrigger>
        </TabsList>

        <div class="w-full md:w-auto relative bg-background border-border">
          <Input v-model="searchQuery" @input="handleSearch" placeholder="Search colors..."
            class="w-full md:w-[300px] pl-10 border-border" />
          <Search class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
        <div class="h-8 w-8 text-primary">Loading...</div>
      </div>

      <template v-else>
        <div :key="activeTab">
          <TabsContent :value="activeTab" class="space-y-8">
            <div class="relative min-h-[400px]">
              <div v-if="!isPageChanging"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                <ColorCard v-for="color in paginatedColors" :key="color.name" :color-data="color"
                  class="hover:scale-105 hover:shadow-lg motion-reduce:hover:transform-none" />
              </div>

              <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                <CardSkeleton v-for="n in PAGE_SIZE" :key="n" />
              </div>
            </div>

            <div v-if="totalItems === 0" class="text-center py-12 text-muted-foreground">
              No colors found matching your search.
            </div>

            <div v-else-if="totalItems > PAGE_SIZE" class="flex justify-center py-8">
              <Pagination v-model:page="currentPage" :total="PAGE_SIZE * totalPages"
                :sibling-count="currentPage === totalPages ? 0 : 1" :boundaries="1" :total-pages="totalPages"
                @change="handlePageChange">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                  <PaginationPrev :disabled="currentPage === 1" />
                  <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                      <Button v-if="item.value <= totalPages" class="w-10 h-10 p-0"
                        :variant="item.value === currentPage ? 'default' : 'outline'">
                        {{ item.value }}
                      </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                  </template>
                  <PaginationNext :disabled="currentPage === totalPages" />
                </PaginationList>
              </Pagination>
            </div>
          </TabsContent>
        </div>
      </template>
    </Tabs>

    <button v-show="showBackToTop" @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg">
      <ChevronUp class="h-6 w-6" />
    </button>
  </div>
</template>

<style>
.hover\:shadow-lg {
  transition: box-shadow 0.3s ease-out;
}

* {
  transition-property: none;
}

[class*='transition'] {
  transition-property: var(--un-transition-property);
}
</style>
