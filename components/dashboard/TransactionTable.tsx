// ============================================================
// TRANSACTION TABLE — Lightning payment history with filters
// ============================================================

'use client'

import { useState } from 'react'

interface Transaction {
  id: string
  date: string
  mesaMesero: string
  amountMXN: number
  amountBTC: string
  status: 'completed' | 'pending' | 'failed'
  invoice: string
}

export function TransactionTable() {
  const [transactions] = useState<Transaction[]>([])

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Sin transacciones
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-sm text-muted-foreground">Fecha</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Mesa / Mesero</th>
              <th className="text-left p-3 text-sm text-muted-foreground">MXN</th>
              <th className="text-left p-3 text-sm text-muted-foreground">BTC</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Estado</th>
              <th className="text-left p-3 text-sm text-muted-foreground">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="p-3 text-sm">{tx.date}</td>
                <td className="p-3 text-sm">{tx.mesaMesero}</td>
                <td className="p-3 text-sm font-semibold">${tx.amountMXN}</td>
                <td className="p-3 text-sm font-mono">{tx.amountBTC}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tx.status)}`}>
                    {tx.status === 'completed' ? 'Pagado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido'}
                  </span>
                </td>
                <td className="p-3 text-xs font-mono text-muted-foreground">
                  {tx.invoice.slice(0, 20)}...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}