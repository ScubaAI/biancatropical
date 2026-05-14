// ============================================================
// FAQ SECTION — Accordion with tropical style
// ============================================================

'use client'

import { useState } from 'react'

const faqs = [
  {
    question: '¿Qué es Bitcoin Lightning?',
    answer:
      'Lightning Network es una capa de pagos rápida y de bajo costo construida sobre Bitcoin. Permite transacciones instantáneas con comisiones mínimas.',
  },
  {
    question: '¿Cómo pago con Lightning?',
    answer:
      'Escanea el QR de la mesa/mesero con cualquier wallet Lightning (Phoenix, Zeus, Muun, etc.), ingresa el monto y confirma el pago.',
  },
  {
    question: '¿Puedo pagar en efectivo?',
    answer:
      'Sí. Si prefieres pagar en efectivo, simplemente avísale a tu mesero. La propina digital es opcional y complementaria.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'No almacenamos datos personales sensibles. Las transacciones Lightning son pseudónimas y los invoices no contienen información personal.',
  },
  {
    question: '¿Qué wallets son compatibles?',
    answer:
      'Cualquier wallet compatible con BOLT11 invoices: Phoenix, Zeus, Blue, Muun, Wallet of Satoshi, Alby, entre otros.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className="w-full text-left p-4 flex justify-between items-center font-medium hover:bg-accent transition-colors"
            onClick={() => (open === index ? setOpen(null) : setOpen(index))}
          >
            <span>{faq.question}</span>
            <span className="ml-4">{open === index ? '▼' : '▶'}</span>
          </button>
          {open === index && (
            <div className="p-4 text-muted-foreground">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}