'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/theme-provider';

interface PosDisplayProps {
  amountMXN: number;
  amountSats: number;
  status: 'idle' | 'input' | 'generating' | 'waiting' | 'success' | 'error';
  message?: string;
}

export function PosDisplay({ amountMXN, amountSats, status, message }: PosDisplayProps) {
  const { theme } = useTheme();
  const isNight = theme === 'night';

  const statusColors = {
    idle: isNight ? 'text-neonCyan' : 'text-jungle',
    input: isNight ? 'text-neonCyan' : 'text-terracotta',
    generating: 'text-yellow-400 animate-pulse',
    waiting: 'text-blue-400 animate-pulse',
    success: 'text-green-400',
    error: 'text-red-400',
  };

  const statusLabels: Record<string, string> = {
    idle: 'ESPERANDO ENTRADA',
    input: 'INGRESAR MONTO',
    generating: 'GENERANDO INVOICE...',
    waiting: 'ESPERANDO PAGO ⚡',
    success: '¡PAGO EXITOSO!',
    error: 'ERROR - REINTENTAR',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative w-full rounded-xl p-4 font-mono
        ${isNight 
          ? 'bg-[#0a0a15] border border-neonCyan/40 shadow-[0_0_20px_rgba(0,245,212,0.2)]' 
          : 'bg-[#1a1a1a] border border-terracotta/40 shadow-lg'
        }
      `}
    >
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)' }} 
      />
      
      {/* Status LED */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-400 animate-ping' : status === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`} />
        <span className={`text-xs ${statusColors[status]}`}>{statusLabels[status]}</span>
      </div>

      {/* Main Display */}
      <div className="mt-6 space-y-2">
        <div className="text-xs text-gray-400 uppercase tracking-wider">Monto MXN</div>
        <div className={`text-4xl font-bold ${isNight ? 'text-white' : 'text-cream'}`}>
          ${amountMXN.toFixed(2)}
        </div>
        
        {amountSats > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-2 border-t border-dashed border-gray-600"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider">Equivalente en BTC</div>
            <div className="text-2xl font-bold text-neonCyan font-btc">
              {amountSats.toLocaleString()} sats
            </div>
            <div className="text-xs text-gray-500 font-btc">
              ≈ {(amountSats / 100_000_000).toFixed(8)} BTC
            </div>
          </motion.div>
        )}
      </div>

      {/* Message Area */}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 p-3 rounded-lg text-sm text-center ${
            status === 'error' 
              ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
              : 'bg-gray-800/50 text-gray-300'
          }`}
        >
          {message}
        </motion.div>
      )}

      {/* Footer Credit */}
      <div className="mt-4 pt-3 border-t border-gray-700 text-center">
        <span className="text-[10px] text-gray-500 font-btc tracking-widest">
          HECHO POR ACEPTABITCOIN.ORG ⚡
        </span>
      </div>
    </motion.div>
  );
}