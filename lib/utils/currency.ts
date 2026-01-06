/**
 * Format amount in Guaraní currency
 * @param amount - Amount in Guaraníes
 * @param showSymbol - Whether to show the currency symbol
 * @returns Formatted currency string
 */
export function formatGuarani(amount: number | string, showSymbol: boolean = true): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(numAmount)) {
    return showSymbol ? '₲ 0' : '0'
  }

  const formatted = new Intl.NumberFormat('es-PY', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount)

  return showSymbol ? `₲ ${formatted}` : formatted
}

/**
 * Parse Guaraní formatted string to number
 * @param value - Formatted currency string
 * @returns Numeric value
 */
export function parseGuarani(value: string): number {
  const cleaned = value.replace(/[₲\s.]/g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}
