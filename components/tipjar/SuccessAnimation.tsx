'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTheme } from '@/components/providers/theme-provider';

interface SuccessAnimationProps {
  amountMXN: number;
  amountSats: number;
  onClose: () => void;
  showSound?: boolean;
}

export function SuccessAnimation({ amountMXN, amountSats, onClose, showSound = true }: SuccessAnimationProps) {
  const { theme } = useTheme();
  const isNight = theme === 'night';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Confetti burst
    confetti({
      particleCount: 150,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.8 },
      colors: isNight ? ['#FF2E93', '#00F5D4', '#9B5DE5'] : ['#E07A5F', '#D4AF37', '#3D5A51'],
    });
    confetti({
      particleCount: 150,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.8 },
      colors: isNight ? ['#FF2E93', '#00F5D4', '#9B5DE5'] : ['#E07A5F', '#D4AF37', '#3D5A51'],
    });

    // Optional chime sound (Italian bell)
    if (showSound) {
      audioRef.current = new Audio('/sounds/bell-chime.mp3');
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }

    // Auto-close after 5 seconds
    const timer = setTimeout(onClose, 5000);
    return () => {
      clearTimeout(timer);
      audioRef.current?.pause();
    };
  }, [isNight, onClose, showSound]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-4
          ${isNight ? 'bg-[#0F0F1E]/95' : 'bg-cream/95'} backdrop-blur-sm
        `}
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className={`
            relative w-full max-w-sm rounded-2xl p-6 text-center
            ${isNight 
              ? 'bg-[#1a1a2e] border border-neonCyan/40 shadow-[0_0_40px_rgba(0,245,212,0.3)]' 
              : 'bg-white border border-gold shadow-2xl'
            }
          `}
        >
          {/* Lightning Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              filter: ['brightness(1)', 'brightness(2)', 'brightness(1)']
            }}
            transition={{ duration: 0.5, repeat: 2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4
                      bg-gradient-to-br from-neonCyan/30 to-neonPink/30"
          >
            <svg className={`w-10 h-10 ${isNight ? 'text-neonCyan' : 'text-gold'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </motion.div>

          {/* Success Message */}
          <h3 className={`font-playfair text-2xl mb-2 ${isNight ? 'text-neonCyan' : 'text-terracotta'}`}>
            ¡Pago Exitoso!
          </h3>
          <p className={`font-montserrat text-sm mb-4 ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>
            Gracias por tu propina ⚡
          </p>

          {/* Receipt Style Details */}
          <div className={`
            font-btc text-left text-sm space-y-2 p-4 rounded-lg mb-4
            ${isNight ? 'bg-[#0a0a15] border border-gray-700' : 'bg-gray-50 border border-gray-200'}
          `}>
            <div className="flex justify-between">
              <span className="text-gray-400">Monto:</span>
              <span className={isNight ? 'text-white' : 'text-[var(--text-primary)]'}>${amountMXN.toFixed(2)} MXN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">En BTC:</span>
              <span className="text-neonCyan">{amountSats.toLocaleString()} sats</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-dashed border-gray-600">
              <span className="text-gray-400">Estado:</span>
              <span className="text-green-400 font-bold">CONFIRMADO</span>
            </div>
          </div>

          {/* Credit */}
          <p className="text-[10px] text-gray-500 font-btc tracking-widest">
            HECHO POR ACEPTABITCOIN.ORG ⚡
          </p>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`
              mt-4 px-6 py-2 rounded-lg font-montserrat font-semibold text-sm uppercase
              ${isNight 
                ? 'bg-neonCyan/20 text-neonCyan hover:bg-neonCyan/30 border border-neonCyan/40'
                : 'bg-terracotta/20 text-terracotta hover:bg-terracotta/30 border border-terracotta/40'
              }
            `}
          >
            Nuevo Pago
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}