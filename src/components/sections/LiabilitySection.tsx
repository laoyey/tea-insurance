import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BookOpen,
  ShieldCheck,
  ClipboardList,
  Calculator,
  Scale,
  FileText,
  XCircle,
  ChevronRight,
} from 'lucide-react'
import { MOCK_LIABILITIES, MOCK_LIABILITY_EXTRAS } from '@/data/liability'
import { MOCK_GLOSSARY } from '@/data/glossary'
import { MOCK_TERM_SECTIONS, MOCK_CLAIM_DETAILS } from '@/data/terms'
import Modal from '@/components/ui/Modal'

gsap.registerPlugin(ScrollTrigger)

type ModalKey =
  | 'glossary'
  | 'insurer'
  | 'policyholder'
  | 'claim'
  | 'dispute'
  | 'other'
  | null

const CN_NUM = ['一', '二', '三', '四', '五', '六']

const TERM_BUTTONS: {
  key: Exclude<ModalKey, null>
  label: string
  desc: string
  Icon: typeof BookOpen
}[] = [
  { key: 'glossary', label: '术语释义', desc: '关键气象指标定义', Icon: BookOpen },
  { key: 'insurer', label: '保险人义务', desc: '保险公司应履行的职责', Icon: ShieldCheck },
  { key: 'policyholder', label: '投保人、被保险人义务', desc: '参保方应遵守的事项', Icon: ClipboardList },
  { key: 'claim', label: '赔偿处理细则', desc: '赔付计算的补充规则', Icon: Calculator },
  { key: 'dispute', label: '争议处理与法律适用', desc: '纠纷解决途径与适用法律', Icon: Scale },
  { key: 'other', label: '其他事项', desc: '合同终止与效力约定', Icon: FileText },
]

function ArticleList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-[#6B1D14]/10 text-[#6B1D14] text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <p className="text-[#1A120B]/80 text-sm leading-relaxed">{item}</p>
        </li>
      ))}
    </ol>
  )
}

export default function LiabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)
  const [modalKey, setModalKey] = useState<ModalKey>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      })

      const items = listRef.current
        ? Array.from(listRef.current.children)
        : []
      if (items.length) {
        gsap.set(items, { opacity: 0, x: -30 })
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        })
      }

      gsap.set(sideRef.current, { opacity: 0, x: 30 })
      gsap.to(sideRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sideRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === titleRef.current ||
          st.trigger === listRef.current ||
          st.trigger === sideRef.current
        ) {
          st.kill()
        }
      })
    }
  }, [])

  const renderModalBody = () => {
    if (modalKey === 'glossary') {
      return (
        <div className="grid gap-3">
          {MOCK_GLOSSARY.map((g) => (
            <div
              key={g.id}
              className="rounded-xl border border-[#6B1D14]/10 bg-[#6B1D14]/[0.03] p-4"
            >
              <h4
                className="text-[#6B1D14] font-medium mb-1.5"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {g.term}
              </h4>
              <p className="text-[#4A3A2C]/75 text-sm leading-relaxed">
                {g.definition}
              </p>
            </div>
          ))}
        </div>
      )
    }
    if (modalKey === 'claim') {
      return <ArticleList items={MOCK_CLAIM_DETAILS} />
    }
    const section = MOCK_TERM_SECTIONS.find((s) => s.id === modalKey)
    return section ? <ArticleList items={section.items} /> : null
  }

  const modalTitle =
    modalKey === 'glossary'
      ? '术语释义'
      : modalKey === 'claim'
        ? '赔偿处理细则'
        : MOCK_TERM_SECTIONS.find((s) => s.id === modalKey)?.title || ''

  return (
    <section
      id="liability"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5EFE0] py-32 md:py-40"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 15 Q55 25 40 35 Q25 25 40 15' fill='none' stroke='%236B1D14' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div ref={titleRef} className="mb-16">
          <div className="h-1 w-12 rounded-full bg-[#C99A3B] mb-6" />
          <h2
            className="text-[#6B1D14] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            }}
          >
            责任免除
          </h2>
          <p className="mt-4 text-[#4A3A2C]/60 text-base tracking-wider">
            清楚了解哪些情况不予赔付，投保更放心
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* 左侧：责任免除三条 */}
          <div ref={listRef} className="space-y-5">
            {MOCK_LIABILITIES.map((item) => (
              <div
                key={item.id}
                className="group flex gap-5 rounded-xl border border-[#6B1D14]/10 bg-white/50 p-6 transition-all duration-300 hover:border-[#C99A3B]/40 hover:shadow-lg hover:shadow-[#6B1D14]/5"
              >
                <div className="shrink-0 flex flex-col items-center">
                  <span className="w-10 h-10 rounded-full bg-[#6B1D14] text-[#F5EFE0] text-sm font-bold flex items-center justify-center">
                    {CN_NUM[item.order - 1]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={16} className="text-[#6B1D14]/60" />
                    <span className="text-[#6B1D14]/60 text-xs tracking-widest">
                      第{CN_NUM[item.order - 1]}条
                    </span>
                  </div>
                  <h4
                    className="text-[#6B1D14] text-lg font-medium mb-2"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[#4A3A2C]/75 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-dashed border-[#6B1D14]/15 bg-[#6B1D14]/[0.03] p-5">
              <p className="text-[#6B1D14]/50 text-xs tracking-widest mb-3">
                补充说明
              </p>
              <ul className="space-y-2">
                {MOCK_LIABILITY_EXTRAS.map((extra, i) => (
                  <li key={i} className="flex gap-2 text-[#4A3A2C]/70 text-sm leading-relaxed">
                    <span className="text-[#C99A3B] shrink-0">·</span>
                    {extra}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右侧：条款按钮群 */}
          <div ref={sideRef} className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#6B1D14]/10 bg-white/60 backdrop-blur-sm p-6">
              <h3
                className="text-[#6B1D14] text-lg font-medium mb-1"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                完整条款细则
              </h3>
              <p className="text-[#4A3A2C]/50 text-xs mb-5 tracking-wider">
                点击查看对应条款内容
              </p>
              <div className="space-y-2.5">
                {TERM_BUTTONS.map(({ key, label, desc, Icon }) => (
                  <button
                    key={key}
                    onClick={() => setModalKey(key)}
                    className="w-full flex items-center gap-3 rounded-xl border border-[#6B1D14]/10 bg-white/60 px-4 py-3 text-left transition-all duration-300 hover:border-[#C99A3B]/40 hover:bg-[#C99A3B]/10 group"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-[#6B1D14]/5 flex items-center justify-center text-[#6B1D14] group-hover:bg-[#C99A3B]/20 transition-colors duration-300">
                      <Icon size={18} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[#1A120B]/85 text-sm font-medium">
                        {label}
                      </span>
                      <span className="block text-[#4A3A2C]/50 text-xs mt-0.5">
                        {desc}
                      </span>
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-[#6B1D14]/30 group-hover:text-[#C99A3B] group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={modalKey !== null}
        onClose={() => setModalKey(null)}
        title={modalTitle}
        size={modalKey === 'glossary' ? 'lg' : 'md'}
      >
        {renderModalBody()}
      </Modal>
    </section>
  )
}
