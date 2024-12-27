// src/services/qr.service.ts
import axiosInstance from '@/plugins/axios'
import type { QrResponse, CreateQrDto } from '@/types/qr'

export const qrService = {
  create: (data: CreateQrDto) =>
    axiosInstance.post<QrResponse>('/qr/add', data),

  list: () =>
    axiosInstance.get<QrResponse[]>('/qr'),

  get: (id: string) =>
    axiosInstance.get<QrResponse>(`/qr/${id}`),

  update: (id: string, data: CreateQrDto) =>
    axiosInstance.put<QrResponse>(`/qr/${id}/update`, data),

  delete: (id: string) =>
    axiosInstance.delete(`/qr/${id}/delete`)
}
