'use client'

import { QRCodeSVG } from 'qrcode.react'
import { cn } from '@/lib/utils'

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({
  value,
  size = 200,
  className,
}: QRCodeProps) {
  return (
    <div className={cn('inline-block', className)}>
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        fgColor="#1a1a1a"
        bgColor="#ffffff"
      />
    </div>
  )
}