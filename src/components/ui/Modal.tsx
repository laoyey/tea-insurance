import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  size?: ModalSize
  /** 内容区是否不设内边距（用于自绘表格/图） */
  flush?: boolean
  /** 深色主题弹窗（用于放在深色区块上） */
  dark?: boolean
}

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  flush = false,
  dark = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* 模糊背景 */}
      <div
        className="modal-backdrop absolute inset-0 bg-[#0D0805]/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* 弹窗面板 */}
      <div
        className={`modal-panel relative w-full ${SIZE_CLASS[size]} max-h-[86vh] overflow-hidden rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ${
          dark
            ? 'border border-[#C99A3B]/25 bg-[#1A120B]'
            : 'border border-[#6B1D14]/15 bg-[#F5EFE0]'
        }`}
      >
        {/* 头部 */}
        <div
          className={`flex items-start justify-between gap-4 px-6 md:px-8 py-5 border-b ${
            dark ? 'border-[#C99A3B]/15' : 'border-[#6B1D14]/10'
          }`}
        >
          <div>
            <h3
              className={`text-lg md:text-xl font-medium leading-snug ${
                dark ? 'text-[#C99A3B]' : 'text-[#6B1D14]'
              }`}
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                className={`mt-1 text-sm ${dark ? 'text-[#EDE7DA]/50' : 'text-[#4A3A2C]/60'}`}
              >
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            className={`shrink-0 p-2 rounded-full transition-colors duration-300 ${
              dark
                ? 'text-[#EDE7DA]/60 hover:bg-[#C99A3B]/15 hover:text-[#C99A3B]'
                : 'text-[#6B1D14]/50 hover:bg-[#6B1D14]/10 hover:text-[#6B1D14]'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* 内容 */}
        <div
          className={`overflow-y-auto max-h-[calc(86vh-88px)] ${
            flush ? '' : 'px-6 md:px-8 py-6'
          }`}
        >
          {children}
        </div>
      </div>

      <style>{`
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPanelIn {
          from { opacity: 0; transform: translateY(28px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-backdrop { animation: modalBackdropIn 0.28s ease forwards; }
        .modal-panel { animation: modalPanelIn 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  )
}
