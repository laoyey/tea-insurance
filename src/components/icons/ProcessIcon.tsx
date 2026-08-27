import * as React from 'react'
import { ClipboardList, FileEdit, Database, Receipt, Megaphone, SearchCheck } from 'lucide-react'

interface ProcessIconProps {
  iconKey: 'collect' | 'fill' | 'enter' | 'pay' | 'public' | 'verify'
  size?: number
  className?: string
}

export default function ProcessIcon({ iconKey, size = 24, className = '' }: ProcessIconProps) {
  const commonClass = `text-[#6B1D14] ${className}`

  const iconMap = {
    collect: ClipboardList,
    fill: FileEdit,
    enter: Database,
    pay: Receipt,
    public: Megaphone,
    verify: SearchCheck,
  }

  const Icon = iconMap[iconKey]
  return <Icon size={size} className={commonClass} strokeWidth={1.5} />
}
