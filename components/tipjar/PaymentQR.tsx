'use client';

import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/theme-provider';

interface PaymentQRProps {
  invoice: string;
  amountSats: number;
}

export function PaymentQR({ invoice, amountSats }: PaymentQRProps) {
  const { theme } = useTheme();
  const isNight = theme === 'night';

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      {/* QR Container with Animated Border */}
      <div className={`
        relative p-4 rounded-2xl
        ${isNight 
          ? 'bg-[#0a0a15] border-2 border-neonCyan/60 shadow-[0_0_30px_rgba(0,245,212,0.3)]' 
          : 'bg-white border-2 border-gold shadow-xl'
        }
      `}>
        {/* Animated Lightning Ring (Night Mode) */}
        {isNight && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-2xl border-2 border-dashed border-neonPink/30"
          />
        )}
        
        <QRCodeSVG
          value={invoice}
          size={200}
          bgColor="transparent"
          fgColor={isNight ? '#00F5D4' : '#1A1A1A'}
          level="H"
          includeMargin={true}
        />
        
        {/* Corner Decorations */}
        <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 ${isNight ? 'border-neonCyan' : 'border-gold'}`} />
        <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 ${isNight ? 'border-neonCyan' : 'border-gold'}`} />
        <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 ${isNight ? 'border-neonCyan' : 'border-gold'}`} />
        <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 ${isNight ? 'border-neonCyan' : 'border-gold'}`} />
      </div>

      {/* Amount Badge */}
      <div className={`
        px-4 py-2 rounded-full font-btc text-sm font-bold
        ${isNight 
          ? 'bg-neonCyan/20 text-neonCyan border border-neonCyan/40' 
          : 'bg-gold/20 text-terracotta border border-gold/40'
        }
      `}>
        {amountSats.toLocaleString()} sats
      </div>

      {/* Instructions */}
      <p className={`text-center text-sm ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>
        Abre Blink Wallet → Escanea → Confirma
      </p>

      {/* Credit */}
      <p className="text-[10px] text-center text-gray-500 font-btc tracking-widest mt-2">
        HECHO POR ACEPTABITCOIN.ORG ⚡
      </p>
    </motion.div>
  );
}