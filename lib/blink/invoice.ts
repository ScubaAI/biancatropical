import { GraphQLClient, gql } from 'graphql-request';

const BLINK_GRAPHQL_URL = process.env.NEXT_PUBLIC_BLINK_GRAPHQL_URL || 'https://api.blink.sv/graphql';
const BLINK_API_KEY = process.env.BLINK_API_KEY;

if (!BLINK_API_KEY) {
  // En desarrollo/build a veces no están cargadas las envs, lanzamos advertencia en vez de error fatal para no romper el build
  console.warn('⚠️ Missing BLINK_API_KEY environment variable');
}

const client = new GraphQLClient(BLINK_GRAPHQL_URL, {
  headers: {
    Authorization: `Bearer ${BLINK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const CREATE_INVOICE_MUTATION = gql`
  mutation LnInvoiceCreate($input: LnInvoiceCreateInput!) {
    lnInvoiceCreate(input: $input) {
      errors {
        message
        path
      }
      invoice {
        paymentRequest
        paymentHash
        satoshis
        expiresAt
      }
    }
  }
`;

export interface InvoicePayload {
  amountSat: number;
  memo?: string;
}

export interface InvoiceResult {
  success: boolean;
  paymentRequest?: string;
  expiresAt?: string;
  error?: string;
}

export async function createLightningInvoice({
  amountSat,
  memo = 'Propina La Bianca Tropical ⚡',
}: InvoicePayload): Promise<InvoiceResult> {
  // Blink requiere el ID de la wallet por defecto o del destinatario
  const variables = {
    input: {
      amount: amountSat, // El schema de Blink usualmente espera Int o Float para satoshis
      memo,
    },
  };

  try {
    const data = await client.request<{
      lnInvoiceCreate: {
        errors: { message: string }[];
        invoice: { paymentRequest: string; paymentHash: string; satoshis: number; expiresAt: string };
      };
    }>(CREATE_INVOICE_MUTATION, variables);

    if (data.lnInvoiceCreate.errors.length > 0) {
      return {
        success: false,
        error: data.lnInvoiceCreate.errors[0].message,
      };
    }

    return {
      success: true,
      paymentRequest: data.lnInvoiceCreate.invoice.paymentRequest,
      expiresAt: data.lnInvoiceCreate.invoice.expiresAt,
    };
  } catch (error: any) {
    console.error('❌ Blink Invoice Error:', error.message || error);
    
    // Simple retry logic para errores de red/transitorios
    if (error.message?.includes('rate limit') || error.message?.includes('timeout')) {
      await new Promise((res) => setTimeout(res, 2000));
      return createLightningInvoice({ amountSat, memo });
    }

    return {
      success: false,
      error: 'No se pudo generar la invoice. Intenta de nuevo en unos segundos.',
    };
  }
}