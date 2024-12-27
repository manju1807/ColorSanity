<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUrls } from '@/composables/useUrls'
import { useQrCodes } from '@/composables/useQrCodes'
import ModeToggle from "../components/ModeToggle.vue"
import type { CreateUrlDto} from '@/types/url.ts'

const urlInput = ref('')
const { urls, isLoading: urlsLoading, create: createUrl } = useUrls()
const { qrCodes, isLoading: qrLoading, create: createQr } = useQrCodes()

const urlsList = computed(() => urls?.value || [])
const qrCodesList = computed(() => qrCodes?.value || [])

const handleCreateUrl = async () => {
  if (!urlInput.value) return
  const data: CreateUrlDto = { url: urlInput.value }
  await createUrl(data)
  urlInput.value = ''
}

const handleCreateQr = () => {
  if (!urlInput.value) return
  createQr({
    type: 'link',
    data: urlInput.value
  })
  urlInput.value = ''
}
</script>


<template>
  <div class="p-4 space-y-8">
    <ModeToggle />
    <div class="space-y-4">
      <h2 class="text-2xl font-bold">URL Shortener</h2>
      <div class="flex gap-4">
        <input
          v-model="urlInput"
          type="url"
          placeholder="Enter URL"
          class="flex-1 px-4 py-2 border rounded"
        />
        <button
          @click="handleCreateUrl"
          :disabled="urlsLoading"
          class="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {{ urlsLoading ? 'Processing...' : 'Shorten URL' }}
        </button>
        <button
          @click="handleCreateQr"
          :disabled="qrLoading"
          class="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
        >
          {{ qrLoading ? 'Processing...' : 'Create QR' }}
        </button>
      </div>

      <!-- Recent URLs -->
      <div class="space-y-2">
        <h3 class="text-xl">Recent URLs</h3>
        <div v-if="urlsLoading" class="p-4 text-center">
          <span class="animate-spin mr-2">⌛</span> Loading URLs...
        </div>
        <div v-else-if="urlsList.length" class="space-y-2">
          <div v-for="url in urlsList" :key="url.id" class="p-4 border rounded">
            <div>Original: {{ url.originalUrl }}</div>
            <div>
              Short:
              <a :href="url.shortUrl" target="_blank" class="text-blue-600 hover:underline">
                {{ url.shortUrl }}
              </a>
            </div>
            <div>Clicks: {{ url.clicks }}</div>
            <div class="text-sm text-gray-500">
              Created: {{ new Date(url.createdAt).toLocaleDateString() }}
            </div>
          </div>
        </div>
        <div v-else class="p-4 text-center text-gray-500">No URLs yet</div>
      </div>

      <!-- QR Codes -->
      <div class="space-y-2">
        <h3 class="text-xl">QR Codes</h3>
        <div v-if="qrLoading" class="p-4 text-center">
          <span class="animate-spin mr-2">⌛</span> Loading QR codes...
        </div>
        <div v-else-if="qrCodesList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="qr in qrCodesList" :key="qr.id" class="p-4 border rounded">
            <img :src="qr.imageUrl" :alt="qr.data" class="w-full aspect-square object-contain" />
            <div class="mt-2">
              <div>Type: {{ qr.type }}</div>
              <div>Data: {{ qr.data }}</div>
              <div>Scans: {{ qr.scans }}</div>
              <div class="text-sm text-gray-500">
                Created: {{ new Date(qr.createdAt).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-4 text-center text-gray-500">No QR codes yet</div>
      </div>
    </div>
  </div>
</template>
