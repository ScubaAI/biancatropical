'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/theme-provider';

interface PosKeypadProps {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

const KEYS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', '.', '⌫'],
];

export function PosKeypad({ onDigit, onClear, onBackspace, onConfirm, disabled }: PosKeypadProps) {
  const { theme } = useTheme();
  const isNight = theme === 'night';

  const handlePress = (key: string) => {
    if (key === '⌫') onBackspace();
    else onDigit(key);
  };

  return (
    <div className="w-full space-y-3">
      {/* Clear Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        disabled={disabled}
        className={`
          w-full py-3 rounded-lg font-montserrat font-semibold text-sm uppercase tracking-wider
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
          ${isNight 
            ? 'bg-gray-800 hover:bg-gray-700 text-neonPink border border-neonPink/40' 
            : 'bg-gray-200 hover:bg-gray-300 text-terracotta border border-terracotta/30'
          }
        `}
      >
        Limpiar
      </motion.button>

      {/* Numeric Grid */}
      <div className="grid grid-cols-3 gap-3">
        {KEYS.flat().map((key) => (
          <motion.button
            key={key}
            whileTap={{ scale: 0.92 }}
            onClick={() => handlePress(key)}
            disabled={disabled}
            className={`
              aspect-square rounded-xl flex items-center justify-center text-2xl font-bold
              transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
              ${key === '.' 
                ? (isNight ? 'bg-gray-700 text-neonCyan' : 'bg-gray-300 text-terracotta')
                : key === '⌫'
                  ? (isNight ? 'bg-red-900/50 text-red-300 border border-red-500/30' : 'bg-red-100 text-red-600 border border-red-300')
                  : (isNight 
                      ? 'bg-[#1a1a2e] hover:bg-[#252540] text-white border border-neonCyan/20 shadow-[0_0_10px_rgba(0,245,212,0.1)]' 
                      : 'bg-white hover:bg-cream text-[var(--text-primary)] border border-terracotta/20 shadow-md'
                    )
              }
            `}
          >
            {key}
          </motion.button>
        ))}
      </div>

      {/* Confirm Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        onClick={onConfirm}
        disabled={disabled}
        className={`
          w-full py-4 rounded-xl font-montserrat font-bold text-lg uppercase tracking-wider
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          ${isNight
            ? 'bg-gradient-to-r from-neonPink to-neonCyan text-[#0F0F1E] shadow-[0_0_25px_rgba(255,46,147,0.4)] hover:shadow-[0_0_35px_rgba(0,245,212,0.5)]'
            : 'bg-gradient-to-r from-terracotta to-gold text-white shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isNight ? '⚡ Pagar con Lightning' : '✅ Confirmar Propina'}
      </motion.button>

      {/* Footer hint */}
      <p className={`text-center text-xs ${isNight ? 'text-gray-500' : 'text-gray-400'}`}>
        Escanea el QR con Blink Wallet
      </p>
    </div>
  );
}