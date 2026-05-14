// ============================================================
// CURRENCY CONVERTER — MXN ↔ BTC (Binance API)
// ============================================================

export interface PriceRate {
  mxn: number
  btc: number
  timestamp: number
}

let cachedRate: PriceRate | null = null
const CACHE_DURATION_MS = 30000 // 30 seconds

async function fetchBinancePrice(): Promise<number> {
  // TODO: replace with real Binance API call
  // const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCMXN')
  // const data = await res.json()
  // return parseFloat(data.price)

  // Placeholder rate
  return 1850000
}

export async function getMXNToBTCRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_DURATION_MS) {
    return cachedRate.btc
  }

  const mxnPerBtc = await fetchBinancePrice()
  cachedRate = {
    mxn: mxnPerBtc,
    btc: 1 / mxnPerBtc,
    timestamp: Date.now(),
  }
  return cachedRate.btc
}

export async function convertMXNtoBTC(mxn: number): Promise<number> {
  const rate = await getMXNToBTCRate()
  return mxn * rate
}

export async function convertBTCtoMXN(btc: number): Promise<number> {
  const rate = await getMXNToBTCRate()
  return btc / rate
}