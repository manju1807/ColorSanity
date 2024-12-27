// src/composables/useQrCodes.ts
import { useQuery, useMutation } from '@tanstack/vue-query'
import { qrService } from '@/services/qr.service'
import { useQrStore } from '@/stores/qr.store'
import { useToast } from './useToast'
import type { CreateQrDto } from '@/types/qr'
import { queryClient } from '@/plugins/vue-query'

export function useQrCodes() {
  const store = useQrStore()
  const { error, success } = useToast()

  const qrQuery = useQuery({
    queryKey: ['qrcodes'],
    queryFn: async () => {
      try {
        const res = await qrService.list()
        return res.data
      } catch (err) {
        if ((err as { response?: { status?: number } })?.response?.status === 429) {
          console.error('Rate limit exceeded - try again later')
        }
        error('Failed to fetch QR codes', err instanceof Error ? err.message : 'Unknown error')
        throw err
      }
    }
  })

  const createMutation = useMutation({
    mutationFn: async (data: CreateQrDto) => {
      try {
        const res = await qrService.create(data)
        return res.data
      } catch (err) {
        error('Failed to create QR code', err instanceof Error ? err.message : 'Unknown error')
        throw err
      }
    },
    onSuccess: (data) => {
      store.addRecent(data)
      queryClient.invalidateQueries({ queryKey: ['qrcodes'] })
      success('QR code created successfully')
    }
  })

  return {
    qrCodes: qrQuery.data,
    isLoading: qrQuery.isLoading,
    create: createMutation.mutate
  }
}
