// src/types/qr.ts
export interface QrResponse {
  id: string
  type: 'link' | 'text' | 'vcard' | 'wifi'
  data: string
  imageUrl: string
  scans: number
  createdAt: string
  updatedAt?: string // Optional timestamp for updates
}

export interface CreateQrDto {
  type: QrResponse['type']
  data: string
  options?: {
    size?: number
    color?: string
  }
}
