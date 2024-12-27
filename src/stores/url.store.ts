// src/stores/url.store.ts
import { defineStore } from 'pinia'
import type { UrlResponse } from '@/types/url'

export const useUrlStore = defineStore('url', {
  state: () => ({
    recentUrls: [] as UrlResponse[]
  }),

  actions: {
    addRecent(url: UrlResponse) {
      this.recentUrls = [url, ...this.recentUrls].slice(0, 5)
    }
  }
})
