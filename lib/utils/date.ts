import { format, formatDistance, formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDate(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, { locale: es })
}

export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatRelative(dateObj, new Date(), { locale: es })
}

export function formatDistanceDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: es })
}

export function isExpiringSoon(endDate: Date | string, daysThreshold: number = 30): boolean {
  const dateObj = typeof endDate === 'string' ? new Date(endDate) : endDate
  const now = new Date()
  const diffTime = dateObj.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= daysThreshold && diffDays > 0
}

export function isExpired(endDate: Date | string): boolean {
  const dateObj = typeof endDate === 'string' ? new Date(endDate) : endDate
  return dateObj < new Date()
}
