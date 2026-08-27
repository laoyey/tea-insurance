import * as React from 'react'
import { Shield, Coins, Wallet } from 'lucide-react'

interface ProtectionIconProps {
  type: 'coverage' | 'premium' | 'subsidy'
  size?: number
  className?: string
}

export default function ProtectionIcon({ type, size = 32, className = '' }: ProtectionIconProps) {
  const commonClass = `text-[#C99A3B] ${className}`

  if (type === 'coverage') {
    return <Shield size={size} className={commonClass} strokeWidth={1.5} />
  }

  if (type === 'premium') {
    return <Coins size={size} className={commonClass} strokeWidth={1.5} />
  }

  return <Wallet size={size} className={commonClass} strokeWidth={1.5} />
}
