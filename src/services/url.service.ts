// src/services/url.service.ts
import axiosInstance from '@/plugins/axios'
import type { UrlResponse, CreateUrlDto } from '@/types/url'

export const urlService = {
  create: (data: CreateUrlDto) =>
    axiosInstance.post<UrlResponse>('/url/add', data),

  list: () =>
    axiosInstance.get<UrlResponse[]>('/urls'),

  get: (id: string) =>
    axiosInstance.get<UrlResponse>(`/url/${id}`),

  update: (id: string, data: CreateUrlDto) =>
    axiosInstance.put<UrlResponse>(`/url/${id}/update`, data),

  delete: (id: string) =>
    axiosInstance.delete(`/url/${id}/delete`)
}
