// src/stores/qr.store.ts
import { defineStore } from 'pinia'
import type { QrResponse } from '@/types/qr'

export const useQrStore = defineStore('qr', {
  state: () => ({
    recentQrs: [] as QrResponse[]
  }),

  actions: {
    addRecent(qr: QrResponse) {
      this.recentQrs = [qr, ...this.recentQrs].slice(0, 5)
    }
  }
})
