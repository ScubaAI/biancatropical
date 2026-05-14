"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createLightningInvoice } from "@/lib/blink/invoice";

type TipState = "idle" | "generating" | "ready" | "success" | "error";

const QUICK_AMOUNTS = [1000, 5000, 10000]; // Sats

export default function TipJar() {
  const [state, setState] = useState<TipState>("idle");
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [paymentRequest, setPaymentRequest] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  // Animación lightning-strike (extraída del DS para evitar depender de globals.css)
  const lightningStyle = `
    @keyframes lightning-strike {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); filter: brightness(2); }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-lightning { animation: lightning-strike 0.8s ease-in-out; }
  `;

  const handleGenerate = async () => {
    setState("generating");
    const result = await createLightningInvoice({ amountSat: selectedAmount });
    
    if (result.success && result.paymentRequest) {
      setPaymentRequest(result.paymentRequest);
      setExpiresAt(result.expiresAt ? new Date(result.expiresAt) : null);
      setState("ready");
    } else {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  // Simulación de webhook/polling para éxito (reemplazar con tu lógica real de sockets/webhooks)
  useEffect(() => {
    if (state === "ready" && expiresAt) {
      const timer = setTimeout(() => {
        // En producción: verificar status vía GET /api/blink/invoice-status?hash=...
        setState("success");
      }, Math.min(120000, expiresAt.getTime() - Date.now())); // Expira o marca éxito
      return () => clearTimeout(timer);
    }
  }, [state, expiresAt]);

  return (
    <>
      <style>{lightningStyle}</style>
      <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96
        bg-white/90 dark:bg-[#0F0F1E]/95 backdrop-blur-xl 
        border-2 border-dorado dark:border-neon-cian rounded-2xl p-4 
        shadow-2xl dark:shadow-neon-cian/30 transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-playfair text-xl text-cafe dark:text-dorado">
            ☕ Propina Volátil
          </h3>
          <span className="bg-verde-selva dark:bg-neon-cian text-white dark:text-[#0F0F1E] 
            px-2 py-0.5 rounded-full text-xs font-montserrat font-medium">
            ⚡ Lightning
          </span>
        </div>

        {/* Amount Selector */}
        {state === "idle" && (
          <div className="space-y-3">
            <p className="font-montserrat text-sm text-gray-600 dark:text-gray-300">
              Selecciona un monto o escribe en sats:
            </p>
            <div className="flex gap-2">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`flex-1 py-2 rounded-lg font-space-grotesk text-sm transition-all
                    ${selectedAmount === amt 
                      ? "bg-terracota dark:bg-neon-fucsia text-white shadow-lg" 
                      : "bg-gray-100 dark:bg-[#1A1A2E] text-gray-700 dark:text-gray-300 hover:bg-terracota/20"
                    }`}
                >
                  {amt.toLocaleString()} sats
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-terracota hover:bg-dorado dark:bg-neon-fucsia dark:hover:bg-neon-cian 
                text-white font-montserrat font-bold rounded-lg transition-all duration-300 
                shadow-lg dark:shadow-neon-fucsia/50 dark:hover:shadow-neon-cian/50 relative overflow-hidden group"
            >
              <span className="relative z-10">GENERAR INVOICE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        )}

        {/* Loading State */}
        {state === "generating" && (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-terracota border-t-transparent" />
            <p className="mt-3 font-montserrat text-sm text-gray-500 dark:text-gray-400">
              Conectando con la red Lightning...
            </p>
          </div>
        )}

        {/* QR Ready State */}
        {state === "ready" && (
          <div className="space-y-4 animate-lightning">
            <div className="flex justify-center p-3 bg-white dark:bg-[#0F0F1E] rounded-xl border-4 border-dorado dark:border-neon-cian">
              <QRCodeSVG 
                value={paymentRequest} 
                size={180} 
                level="H"
                includeMargin={false}
                fgColor="currentColor"
                bgColor="transparent"
              />
            </div>
            <p className="text-center font-space-grotesk text-lg text-terracota dark:text-neon-cian">
              {selectedAmount.toLocaleString()} sats
            </p>
            <p className="text-center font-montserrat text-xs text-gray-500 dark:text-gray-400">
              Escanea con cualquier wallet Lightning
            </p>
          </div>
        )}

        {/* Success State */}
        {state === "success" && (
          <div className="text-center py-6">
            <div className="inline-block animate-bounce mb-3">
              <svg className="w-12 h-12 text-neon-cian" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-playfair text-2xl text-dorado mb-1">¡Pago Exitoso!</p>
            <p className="font-cormorant italic text-terracota dark:text-neon-fucsia text-sm">
              Grazie mille. La música suena por ti. 🎶
            </p>
            <button 
              onClick={() => setState("idle")}
              className="mt-4 text-xs font-montserrat underline text-gray-500 hover:text-terracota dark:hover:text-neon-cian"
            >
              Enviar otra propina
            </button>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="text-center py-6">
            <p className="font-montserrat text-terracota dark:text-neon-fucsia font-medium">
              ⚠️ Error de conexión
            </p>
            <p className="text-xs text-gray-500 mt-1">Reintenta en unos segundos</p>
          </div>
        )}
      </div>
    </>
  );
}