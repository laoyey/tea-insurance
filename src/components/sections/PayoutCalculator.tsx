import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calculator, Info, Snowflake, Sun, Droplets } from 'lucide-react'
import { MOCK_FORMULA_VARIABLES, MOCK_FORMULA_SECTIONS } from '@/data/formula'
import { coldRatio, droughtRatio, heatRatio } from '@/data/payoutTables'
import type { IPayoutResult } from '@/data/payoutTables'

gsap.registerPlugin(ScrollTrigger)

type HazardType = 'cold' | 'drought' | 'heat'

const HAZARDS: { type: HazardType; name: string; Icon: typeof Snowflake }[] = [
  { type: 'cold', name: '低温冷害', Icon: Snowflake },
  { type: 'drought', name: '干旱', Icon: Droplets },
  { type: 'heat', name: '热害', Icon: Sun },
]

const HAZARD_WEIGHT: Record<HazardType, number> = {
  cold: 0.6,
  drought: 0.3,
  heat: 0.1,
}

export default function PayoutCalculator() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formulaRef = useRef<HTMLDivElement>(null)
  const [area, setArea] = useState(10)
  const [hazard, setHazard] = useState<HazardType>('cold')
  const [tmin, setTmin] = useState(0)
  const [pa, setPa] = useState(-60)
  const [days, setDays] = useState(10)
  const [highTemp, setHighTemp] = useState(false)
  const [activeVar, setActiveVar] = useState<string | null>(null)

  const coveragePerMu = 5000

  let result: IPayoutResult
  if (hazard === 'cold') result = coldRatio(tmin)
  else if (hazard === 'drought') result = droughtRatio(pa)
  else result = heatRatio(days, highTemp)

  const weight = HAZARD_WEIGHT[hazard]
  const ratio = result.ratio
  const estimatedPayout = Math.round(
    coveragePerMu * (ratio / 100) * area * weight,
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      const modules = formulaRef.current?.querySelectorAll('.formula-module')
      if (modules && modules.length) {
        gsap.set(modules, { opacity: 0, y: 30 })
        gsap.to(modules, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formulaRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === formulaRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="formula"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#2F4F3E] py-32 md:py-40"
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 10 Q40 20 30 30 Q20 20 30 10' fill='none' stroke='%23F5EFE0' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
          <h2
            className="text-[#F5EFE0] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            赔付计算可视化
          </h2>
          <p className="mt-4 text-[#EDE7DA]/60 text-base tracking-wider">
            透明公式，让每一笔赔付都清晰可算
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div ref={formulaRef} className="space-y-6">
            {MOCK_FORMULA_SECTIONS.map((section) => (
              <div
                key={section.id}
                className="formula-module rounded-xl border border-[#C99A3B]/20 bg-[#1A120B]/30 backdrop-blur-sm p-6"
              >
                <h3
                  className="text-[#C99A3B] text-base font-medium mb-4 tracking-wider"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {section.title}
                </h3>
                <p className="text-[#F5EFE0] text-lg leading-relaxed">
                  {section.formulaText}
                </p>
              </div>
            ))}

            <div className="formula-module rounded-xl border border-[#C99A3B]/20 bg-[#1A120B]/30 backdrop-blur-sm p-6">
              <h3
                className="text-[#C99A3B] text-base font-medium mb-4 tracking-wider"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                变量说明（点击查看）
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_FORMULA_VARIABLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVar(activeVar === v.id ? null : v.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                      activeVar === v.id
                        ? 'bg-[#C99A3B] text-[#1A120B]'
                        : 'bg-[#C99A3B]/15 text-[#F5EFE0] hover:bg-[#C99A3B]/30'
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {v.symbol}
                  </button>
                ))}
              </div>

              {activeVar && (
                <div className="mt-4 p-4 rounded-lg bg-[#C99A3B]/10 border border-[#C99A3B]/20">
                  <div className="flex items-start gap-2">
                    <Info size={16} className="text-[#C99A3B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#F5EFE0] text-sm font-medium">
                        {MOCK_FORMULA_VARIABLES.find((v) => v.id === activeVar)?.name}
                      </p>
                      <p className="text-[#EDE7DA]/70 text-xs mt-1 leading-relaxed">
                        {MOCK_FORMULA_VARIABLES.find((v) => v.id === activeVar)?.description}
                      </p>
                      {MOCK_FORMULA_VARIABLES.find((v) => v.id === activeVar)?.defaultValue && (
                        <p
                          className="text-[#C99A3B] text-xs mt-2"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          默认值：{MOCK_FORMULA_VARIABLES.find((v) => v.id === activeVar)?.defaultValue}
                          {MOCK_FORMULA_VARIABLES.find((v) => v.id === activeVar)?.unit || ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-[#C99A3B]/30 bg-[#1A120B]/50 backdrop-blur-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#C99A3B]/15">
                  <Calculator size={20} className="text-[#C99A3B]" />
                </div>
                <h3
                  className="text-[#F5EFE0] text-lg font-medium"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  赔付金额模拟计算器
                </h3>
              </div>

              <div className="space-y-6">
                {/* 保险面积 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[#EDE7DA]/80 text-base">保险面积</label>
                    <span
                      className="text-[#C99A3B] text-sm font-bold"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {area} 亩
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#C99A3B]/20 rounded-full appearance-none cursor-pointer accent-[#C99A3B]"
                  />
                  <div className="flex justify-between text-[#EDE7DA]/40 text-xs mt-1">
                    <span>1亩</span>
                    <span>100亩</span>
                  </div>
                </div>

                {/* 受灾情况选择 */}
                <div>
                  <label className="text-[#EDE7DA]/80 text-base block mb-2">
                    受灾情况
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {HAZARDS.map(({ type, name, Icon }) => (
                      <button
                        key={type}
                        onClick={() => setHazard(type)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          hazard === type
                            ? 'bg-[#C99A3B] text-[#1A120B] border-[#C99A3B]'
                            : 'bg-[#C99A3B]/10 text-[#EDE7DA] border-transparent hover:bg-[#C99A3B]/20'
                        }`}
                      >
                        <Icon size={18} />
                        {name}
                      </button>
                    ))}
                  </div>
                  <p className="text-[#EDE7DA]/50 text-xs mt-2">
                    当前权重系数{' '}
                    <span
                      className="text-[#C99A3B] font-bold"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {weight}
                    </span>
                  </p>
                </div>

                {/* 天气输入区 */}
                {hazard === 'cold' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[#EDE7DA]/80 text-base">单日最低气温</label>
                      <span
                        className="text-[#C99A3B] text-sm font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tmin}℃
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="4"
                      step="1"
                      value={tmin}
                      onChange={(e) => setTmin(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#C99A3B]/20 rounded-full appearance-none cursor-pointer accent-[#C99A3B]"
                    />
                    <div className="flex justify-between text-[#EDE7DA]/40 text-xs mt-1">
                      <span>-10℃</span>
                      <span>4℃</span>
                    </div>
                  </div>
                )}

                {hazard === 'drought' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[#EDE7DA]/80 text-base">
                        月降水距平百分率（PA）
                      </label>
                      <span
                        className="text-[#C99A3B] text-sm font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {pa}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="0"
                      step="5"
                      value={pa}
                      onChange={(e) => setPa(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#C99A3B]/20 rounded-full appearance-none cursor-pointer accent-[#C99A3B]"
                    />
                    <div className="flex justify-between text-[#EDE7DA]/40 text-xs mt-1">
                      <span>-100%</span>
                      <span>0%</span>
                    </div>
                  </div>
                )}

                {hazard === 'heat' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[#EDE7DA]/80 text-base block mb-2">
                        日最高气温档
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setHighTemp(false)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                            !highTemp
                              ? 'bg-[#C99A3B] text-[#1A120B] border-[#C99A3B]'
                              : 'bg-[#C99A3B]/10 text-[#EDE7DA] border-transparent hover:bg-[#C99A3B]/20'
                          }`}
                        >
                          ≥32℃
                        </button>
                        <button
                          onClick={() => setHighTemp(true)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                            highTemp
                              ? 'bg-[#C99A3B] text-[#1A120B] border-[#C99A3B]'
                              : 'bg-[#C99A3B]/10 text-[#EDE7DA] border-transparent hover:bg-[#C99A3B]/20'
                          }`}
                        >
                          ≥34℃
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[#EDE7DA]/80 text-base">
                          累计高温日数
                        </label>
                        <span
                          className="text-[#C99A3B] text-sm font-bold"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {days} 天
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#C99A3B]/20 rounded-full appearance-none cursor-pointer accent-[#C99A3B]"
                      />
                      <div className="flex justify-between text-[#EDE7DA]/40 text-xs mt-1">
                        <span>0天</span>
                        <span>30天</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 结果区 */}
                <div className="pt-4 border-t border-[#C99A3B]/20">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-[#C99A3B]/10 px-4 py-3">
                      <p className="text-[#EDE7DA]/50 text-xs mb-1">灾害等级</p>
                      <span
                        className="text-[#F5EFE0] text-lg font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {result.level > 0 ? `${result.level} 级` : '未达起赔'}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#C99A3B]/10 px-4 py-3">
                      <p className="text-[#EDE7DA]/50 text-xs mb-1">赔偿比例</p>
                      <span
                        className="text-[#C99A3B] text-lg font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {ratio}%
                      </span>
                    </div>
                  </div>

                  <p className="text-[#EDE7DA]/60 text-sm mb-2">预计赔付金额</p>
                  <div
                    className="text-[#C99A3B] text-4xl font-bold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ¥{estimatedPayout.toLocaleString()}
                  </div>
                  <p className="text-[#EDE7DA]/40 text-xs mt-2">
                    = 5000元/亩 × {ratio}% × {area}亩 × {weight}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[#EDE7DA]/50 text-xs leading-relaxed">
                * 本计算器为模拟演示，实际赔付金额以保险合同约定和气象数据为准
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
