<script setup lang="ts">
import ColorCard from '@/components/custom/ColorCard.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import solidColors from '@/config/constants/data/solid-colors.json'
import gradientColors from '@/config/constants/data/ui-gradients.json'
import type { GradientColor, SolidColor } from '@/types/colors'
import { Loader2, Search } from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'

const PAGE_SIZE = 16
const currentPage = ref(1)
const activeTab = ref('solid-colors')
const isLoading = ref(true)
const searchQuery = ref('')

const solidColorData = ref<SolidColor[]>([])
const gradientColorData = ref<GradientColor[]>([])

onMounted(async () => {
  try {
    solidColorData.value = solidColors
    gradientColorData.value = gradientColors
  } catch (error) {
    console.error('Error loading color data:', error)
  } finally {
    isLoading.value = false
  }
})

watch([activeTab, searchQuery], () => {
  currentPage.value = 1
})

const filteredSolids = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return query
    ? solidColorData.value.filter(color =>
      color.name.toLowerCase().includes(query)
    )
    : solidColorData.value
})

const filteredGradients = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return query
    ? gradientColorData.value.filter(gradient =>
      gradient.name.toLowerCase().includes(query)
    )
    : gradientColorData.value
})

const paginatedColors = computed(() => {
  const currentData = activeTab.value === 'solid-colors'
    ? filteredSolids.value
    : filteredGradients.value

  const start = (currentPage.value - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  return currentData.slice(start, end)
})

const totalPages = computed(() => {
  const total = activeTab.value === 'solid-colors'
    ? filteredSolids.value.length
    : filteredGradients.value.length
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
})

const totalItems = computed(() =>
  activeTab.value === 'solid-colors'
    ? filteredSolids.value.length
    : filteredGradients.value.length
)

function handlePageChange(event: { page: number }) {
  currentPage.value = Math.min(Math.max(1, event.page), totalPages.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let searchTimeout: number | null = null
function handleSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = window.setTimeout(() => {
    searchQuery.value = value
    currentPage.value = 1
  }, 300)
}
</script>

<template>
  <div class="min-h-screen container px-4 md:px-24 py-12">
    <div class="min-h-full min-w-full mb-12 space-y-4">
      <h1
        class="text-center text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Color Collections
      </h1>
      <p class="text-center text-gray-600 dark:text-gray-400">
        Explore our curated collection of colors and gradients for your next project
      </p>
    </div>

    <Tabs v-model="activeTab" class="w-full space-y-8">
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 sticky top-0 bg-background/95 backdrop-blur-sm z-10 py-4">
        <TabsList class="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="solid-colors" class="px-8">Solid Colors</TabsTrigger>
          <TabsTrigger value="gradient-colors" class="px-8">Gradients</TabsTrigger>
        </TabsList>

        <div class="w-full md:w-auto relative">
          <Input :value="searchQuery" @input="handleSearch" placeholder="Search colors..."
            class="w-full md:w-[300px] pl-10" />
          <Search class="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
        <Loader2 class="h-8 w-8 animate-spin text-primary" />
      </div>

      <template v-else>
        <TabsContent v-for="type in ['solid-colors', 'gradient-colors']" :key="type" :value="type" class="space-y-8">
          <div class="relative">
            <TransitionGroup name="color-card" tag="div"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <ColorCard v-for="color in paginatedColors" :key="color.name" :color-data="color"
                class="transform transition-all duration-300 hover:scale-105 ease-in-out" />
            </TransitionGroup>
          </div>

          <div v-if="totalItems === 0" class="text-center py-12 text-gray-500">
            No colors found matching your search.
          </div>

          <div v-else-if="totalItems > PAGE_SIZE" class="flex justify-center py-8">
            <Pagination v-model:page="currentPage" :total="totalItems" :sibling-count="1" :total-pages="totalPages"
              show-edges @change="handlePageChange">
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
      </template>
    </Tabs>
  </div>
</template>
