'use client';

import { useState } from 'react';

interface LightningInvoice {
  paymentRequest: string;
  paymentHash: string;
  expiresAt: string;
}

interface UseLightningInvoiceReturn {
  createInvoice: (amountSats: number, memo?: string) => Promise<LightningInvoice | null>;
  loading: boolean;
  error: string | null;
}

// Placeholder para Blink API GraphQL
// En producción: usar @blink/bitcoin SDK
export function useLightningInvoice(): UseLightningInvoiceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (
    amountSats: number,
    memo: string = 'Propina - La Bianca'
  ): Promise<LightningInvoice | null> => {
    setLoading(true);
    setError(null);

    try {
      // Placeholder - Simulación
      // En producción: llamada GraphQL a Blink API
      /*
      mutation LnInvoiceCreate {
        lnInvoiceCreate(input: {
          amount: amountSats
          memo: memo
        }) {
          invoice {
            paymentRequest
            paymentHash
            expiresAt
          }
        }
      }
      */
      
      const mockInvoice: LightningInvoice = {
        paymentRequest: `lnbc${amountSats}n1p...mock...`,
        paymentHash: `mock_hash_${Date.now()}`,
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      };

      return mockInvoice;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating invoice');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createInvoice, loading, error };
}