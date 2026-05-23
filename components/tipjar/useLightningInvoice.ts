'use client';

import { useState } from 'react';

interface LightningInvoice {
  paymentRequest: string;
  paymentHash?: string;
  expiresAt: string;
}

interface UseLightningInvoiceReturn {
  createInvoice: (amountSats: number, mesaId?: string, meseroId?: string) => Promise<LightningInvoice | null>;
  loading: boolean;
  error: string | null;
}

export function useLightningInvoice(): UseLightningInvoiceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (
    amountSats: number,
    mesaId?: string,
    meseroId?: string
  ): Promise<LightningInvoice | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tipjar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountSats,
          mesaId,
          meseroId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo generar el código de pago');
      }

      return {
        paymentRequest: data.paymentRequest,
        expiresAt: data.expiresAt,
      };
    } catch (err: any) {
      const errorMessage = err.message || 'Error al conectar con el servidor';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createInvoice, loading, error };
}