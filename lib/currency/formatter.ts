// ============================================================
// CURRENCY FORMATTER — Localized amounts with symbols
// ============================================================

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatBTC(amount: number, decimals: number = 8): string {
  return `${amount.toFixed(decimals)} ₿`
}

export function formatSATS(amount: number): string {
  return `${Math.round(amount)} sats`
}

export function formatFiatOrBTC(
  amountMXN: number,
  showBTC: boolean = false
): string {
  if (showBTC) {
    // Placeholder: in production, fetch real BTC rate
    return formatMXN(amountMXN)
  }
  return formatMXN(amountMXN)
}

export function formatUsdToMXN(usd: number, rate: number): string {
  return formatMXN(usd * rate)
}