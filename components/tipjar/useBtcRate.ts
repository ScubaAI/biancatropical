'use client';

import { useState, useEffect } from 'react';

interface BtcRate {
  mxnToSats: number;
  lastUpdated: number;
}

// Cache: 30 segundos
const CACHE_DURATION = 30000;

export function useBtcRate(): {
  mxnToSats: number;
  loading: boolean;
  error: string | null;
} {
  const [rate, setRate] = useState<BtcRate>({ mxnToSats: 0, lastUpdated: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const now = Date.now();
        const cacheKey = 'btc-rate-cache';
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const parsed: BtcRate = JSON.parse(cached);
          if (now - parsed.lastUpdated < CACHE_DURATION) {
            setRate(parsed);
            setLoading(false);
            return;
          }
        }

        // Placeholder rate: 1 BTC ≈ 6,000,000 MXN (ejemplo)
        // En producción: usar API de CoinGecko/Blink
        const mockRate = {
          mxnToSats: 6000000 / 100000000, // 1 sat ≈ 0.06 MXN
          lastUpdated: now,
        };

        setRate(mockRate);
        localStorage.setItem(cacheKey, JSON.stringify(mockRate));
      } catch (err) {
        setError('Error fetching BTC rate');
        // Fallback rate
        setRate({ mxnToSats: 0.06, lastUpdated: Date.now() });
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return {
    mxnToSats: rate.mxnToSats,
    loading,
    error,
  };
}

export function convertMXNtoSats(mxn: number, rate: number): number {
  return Math.round(mxn / rate);
}