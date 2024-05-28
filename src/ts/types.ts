import { NEWS_TYPES } from './constants'

export interface NewsItemDTO {
  name: string
  code: string
  date: number
  image: string
  link: string
  previewText: string
  type: {
    value: (typeof NEWS_TYPES)[keyof typeof NEWS_TYPES]
    xmlId: keyof typeof NEWS_TYPES
  }
}

export interface NavDTO {
  current: number
  total: number
}

export interface DateItem {
  day: number
  monthYear: string
}

export interface NewsItem {
  name: string
  code: string
  image: string
  link: string
  previewText: string
  date: DateItem
  type: (typeof NEWS_TYPES)[keyof typeof NEWS_TYPES]
}
