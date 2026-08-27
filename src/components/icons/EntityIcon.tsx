import * as React from 'react'
import { Building2, Users, Home, User } from 'lucide-react'

interface EntityIconProps {
  type: 'enterprise' | 'cooperative' | 'familyFarm' | 'farmer'
  size?: number
  className?: string
}

export default function EntityIcon({ type, size = 28, className = '' }: EntityIconProps) {
  const commonClass = `text-[#C99A3B] ${className}`

  const iconMap = {
    enterprise: Building2,
    cooperative: Users,
    familyFarm: Home,
    farmer: User,
  }

  const Icon = iconMap[type]
  return <Icon size={size} className={commonClass} strokeWidth={1.5} />
}
