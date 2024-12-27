// src/types/url.ts
export interface UrlResponse {  // Renamed for consistency with QrResponse
  id: string
  originalUrl: string
  shortUrl: string
  clicks: number
  createdAt: string
  updatedAt?: string
  qrCode?: string
}

export interface CreateUrlDto {
  url: string
  customSlug?: string  // Optional custom short URL
}
