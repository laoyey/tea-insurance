import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Table2, MapPin } from 'lucide-react'
import { MOCK_TRIGGERS } from '@/data/triggers'
import WeatherIcon from '@/components/icons/WeatherIcon'
import { Image } from '@/components/ui/image'
import Modal from '@/components/ui/Modal'
import {
  COLD_PAYOUT,
  COLD_PAYOUT_NOTE,
  DROUGHT_PAYOUT,
  DROUGHT_PAYOUT_NOTE,
  HEAT_PAYOUT,
  HEAT_PAYOUT_NOTE,
} from '@/data/payoutTables'
import { MOCK_STATIONS } from '@/data/stations'

gsap.registerPlugin(ScrollTrigger)

type TriggerType = 'cold' | 'heat' | 'drought'

export default function ClaimTriggers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [payoutType, setPayoutType] = useState<TriggerType | null>(null)
  const [stationsOpen, setStationsOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      const cards = cardsRef.current
        ? Array.from(cardsRef.current.children)
        : []
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 60 })
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === titleRef.current ||
          st.trigger === cardsRef.current
        ) {
          st.kill()
        }
      })
    }
  }, [])

  const payoutMeta = payoutType
    ? MOCK_TRIGGERS.find((t) => t.type === payoutType)
    : null

  const renderPayoutTable = (type: TriggerType) => {
    if (type === 'cold') {
      return (
        <div>
          <div className="overflow-hidden rounded-xl border border-[#6B1D14]/15">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#6B1D14] text-[#F5EFE0]">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">等级</th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">日最低气温 Tmin</th>
                  <th className="px-4 py-3 text-right text-xs font-medium tracking-wider">赔偿比例</th>
                </tr>
              </thead>
              <tbody>
                {COLD_PAYOUT.map((r, i) => (
                  <tr key={r.level} className={i % 2 ? 'bg-[#6B1D14]/5' : 'bg-transparent'}>
                    <td className="px-4 py-2.5 text-[#C99A3B] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.level}
                    </td>
                    <td className="px-4 py-2.5 text-[#1A120B]/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.tmin}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[#6B1D14] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.ratio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[#4A3A2C]/70 text-xs leading-relaxed">{COLD_PAYOUT_NOTE}</p>
        </div>
      )
    }

    if (type === 'drought') {
      return (
        <div>
          <div className="overflow-hidden rounded-xl border border-[#6B1D14]/15">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#6B1D14] text-[#F5EFE0]">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">等级</th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">PA（3-11月）</th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">PA（12月-翌年2月）</th>
                  <th className="px-4 py-3 text-right text-xs font-medium tracking-wider">赔偿比例</th>
                </tr>
              </thead>
              <tbody>
                {DROUGHT_PAYOUT.map((r, i) => (
                  <tr key={r.level} className={i % 2 ? 'bg-[#6B1D14]/5' : 'bg-transparent'}>
                    <td className="px-4 py-2.5 text-[#C99A3B] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.level}
                    </td>
                    <td className="px-4 py-2.5 text-[#1A120B]/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.paSpring}
                    </td>
                    <td className="px-4 py-2.5 text-[#1A120B]/80" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.paWinter}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[#6B1D14] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {r.ratio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[#4A3A2C]/70 text-xs leading-relaxed">{DROUGHT_PAYOUT_NOTE}</p>
        </div>
      )
    }

    return (
      <div>
        <div className="overflow-hidden rounded-xl border border-[#6B1D14]/15">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#6B1D14] text-[#F5EFE0]">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">等级</th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">触发条件</th>
                <th className="px-4 py-3 text-right text-xs font-medium tracking-wider">赔偿比例</th>
              </tr>
            </thead>
            <tbody>
              {HEAT_PAYOUT.map((r, i) => (
                <tr key={r.level} className={i % 2 ? 'bg-[#6B1D14]/5' : 'bg-transparent'}>
                  <td className="px-4 py-2.5 text-[#C99A3B] font-bold align-top" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {r.level}
                  </td>
                  <td className="px-4 py-2.5 text-[#1A120B]/80 leading-relaxed">{r.condition}</td>
                  <td className="px-4 py-2.5 text-right text-[#6B1D14] font-bold align-top" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {r.ratio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[#4A3A2C]/70 text-xs leading-relaxed">{HEAT_PAYOUT_NOTE}</p>
      </div>
    )
  }

  return (
    <section
      id="triggers"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1A120B] py-32 md:py-40"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cellipse cx='40' cy='40' rx='25' ry='10' fill='%23C99A3B' transform='rotate(-25 40 40)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 text-center">
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
        <h2
          ref={titleRef}
          className="font-normal leading-tight"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            color: '#C99A3B',
          }}
        >
          三种气象因子，触发即赔
        </h2>
        <p className="mt-4 text-[#EDE7DA]/60 text-base tracking-wider max-w-2xl mx-auto">
          当气象指数达到合同约定的触发条件时，自动启动赔付程序，无需现场查勘，高效便捷
        </p>
      </div>

      <div
        ref={cardsRef}
        className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3 md:gap-6 md:px-12"
      >
        {MOCK_TRIGGERS.map((trigger) => (
          <div
            key={trigger.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-[#C99A3B]/15 bg-[#2A1F14]/40 transition-all duration-500 hover:-translate-y-2 hover:border-[#C99A3B]/50 hover:shadow-2xl hover:shadow-black/50"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={trigger.imageUrl}
                alt={trigger.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  filter: 'sepia(0.3) saturate(0.7) brightness(0.7)',
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/30 via-transparent to-[#2A1F14]" />

              <div className="absolute top-6 left-6 p-3 rounded-xl bg-[#1A120B]/60 backdrop-blur-sm border border-[#C99A3B]/20 transition-all duration-500 group-hover:scale-110 group-hover:border-[#C99A3B]/50">
                <WeatherIcon
                  type={trigger.type}
                  size={32}
                  strokeColor="#C99A3B"
                  strokeWidth={1.5}
                />
              </div>

              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-[#C99A3B]/20 backdrop-blur-sm border border-[#C99A3B]/30">
                <span className="text-[#F5EFE0] text-xs font-bold">
                  权重系数 {(trigger.weight * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="flex-1 bg-[#F5EFE0] p-7">
              <h3
                className="text-[#6B1D14] text-xl font-medium mb-4"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {trigger.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-[#C99A3B] text-xs tracking-widest mb-1.5">
                    触发条件
                  </p>
                  <p className="text-[#1A120B]/80 text-base leading-relaxed">
                    {trigger.condition}
                  </p>
                </div>

                <div>
                  <p className="text-[#C99A3B] text-xs tracking-widest mb-1.5">
                    对茶叶影响
                  </p>
                  <p className="text-[#1A120B]/80 text-base leading-relaxed">
                    {trigger.teaImpact}
                  </p>
                </div>

                <div>
                  <p className="text-[#C99A3B] text-xs tracking-widest mb-1.5">
                    说明
                  </p>
                  <p className="text-[#4A3A2C]/80 text-base leading-relaxed">
                    {trigger.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#6B1D14]/10">
                <button
                  onClick={() => setPayoutType(trigger.type)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#6B1D14]/20 text-[#6B1D14]/85 hover:bg-[#6B1D14] hover:text-[#F5EFE0] hover:border-[#6B1D14] text-sm font-medium transition-all duration-300"
                >
                  <Table2 size={15} />
                  查看赔偿标准
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-16 flex flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-[#C99A3B]/50" />
          <span className="text-sm text-[#EDE7DA]/60 tracking-wider">
            触发即赔 · 无需现场查勘
          </span>
          <div className="h-px w-12 bg-[#C99A3B]/50" />
        </div>
        <button
          onClick={() => setStationsOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C99A3B]/30 bg-[#C99A3B]/10 text-[#EDE7DA] text-sm tracking-wider hover:bg-[#C99A3B]/20 hover:border-[#C99A3B]/50 transition-all duration-300"
        >
          <MapPin size={16} className="text-[#C99A3B]" />
          查看英德市有效观测站点
        </button>
      </div>

      {/* 赔偿比例表弹窗 */}
      <Modal
        open={payoutType !== null}
        onClose={() => setPayoutType(null)}
        title={payoutMeta ? `${payoutMeta.name}赔偿标准` : ''}
        subtitle={payoutMeta ? `权重系数 ${payoutMeta.weight}` : undefined}
        size="lg"
      >
        {payoutType && renderPayoutTable(payoutType)}
      </Modal>

      {/* 站点可视化弹窗 */}
      <Modal
        open={stationsOpen}
        onClose={() => setStationsOpen(false)}
        title="英德市有效观测站点"
        subtitle="各镇街主站与备用站（共 20 个）"
        size="xl"
        dark
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {MOCK_STATIONS.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-[#C99A3B]/15 bg-[#2A1F14]/50 p-4 transition-colors duration-300 hover:border-[#C99A3B]/40"
            >
              <p
                className="text-[#F5EFE0] text-sm font-medium mb-2"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {s.town}
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#EDE7DA]/40">主站</span>
                  <span className="text-[#C99A3B] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.main}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#EDE7DA]/40">备站</span>
                  <span
                    className={s.backup ? 'text-[#EDE7DA]/70' : 'text-[#EDE7DA]/25'}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.backup || '—'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[#EDE7DA]/50 text-xs leading-relaxed">
          保险监测站点以英德国家基本气象观测站（59088）为主站，各镇街设自动气象观测站作为监测站点；站点失效时启用备用站。实际监测站点以保险单载明为准。
        </p>
      </Modal>
    </section>
  )
}
