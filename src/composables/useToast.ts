// src/composables/useToast.ts
import { toast } from 'vue-sonner'

export function useToast() {
  return {
    success: (message: string, description?: string) =>
      toast.success(message, { description }),
    error: (message: string, description?: string) =>
      toast.error(message, { description }),
    info: (message: string, description?: string) =>
      toast.info(message, { description })
  }
}
