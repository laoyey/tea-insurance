import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, FileText } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import {
  MOCK_ELIGIBILITY_CONDITIONS,
  MOCK_ELIGIBILITY_ENTITIES,
  ELIGIBILITY_HERO_IMAGE,
} from '@/data/eligibility'
import EntityIcon from '@/components/icons/EntityIcon'
import { Image } from '@/components/ui/image'

gsap.registerPlugin(ScrollTrigger)

export default function Eligibility() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const entitiesRef = useRef<HTMLDivElement>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { x: -60, opacity: 0 })
      gsap.to(imageRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      const items = listRef.current?.querySelectorAll('.condition-item')
      if (items && items.length) {
        gsap.set(items, { y: 20, opacity: 0 })
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
          },
        })
      }

      const entityCards = entitiesRef.current?.querySelectorAll('.entity-card')
      if (entityCards && entityCards.length) {
        gsap.set(entityCards, { y: 30, opacity: 0 })
        gsap.to(entityCards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entitiesRef.current,
            start: 'top 85%',
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === sectionRef.current ||
          st.trigger === listRef.current ||
          st.trigger === entitiesRef.current
        ) {
          st.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="eligibility"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1A120B] py-32 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
          <h2
            className="text-[#F5EFE0] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            参保对象与投保条件
          </h2>
          <p className="mt-4 text-[#EDE7DA]/60 text-base tracking-wider">
            明确参保标准，让每一片茶园都能获得保障
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={ELIGIBILITY_HERO_IMAGE}
                alt="阳光明媚的英德红茶园"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: 'sepia(0.15) saturate(1.1) brightness(1.05)',
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#C99A3B]/40 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#C99A3B]/30 rounded-xl -z-10" />
          </div>

          <div ref={listRef}>
            <h3
              className="text-[#C99A3B] text-xl font-medium mb-8"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              投保条件
            </h3>
            <div className="space-y-4">
              {MOCK_ELIGIBILITY_CONDITIONS.map((condition) => (
                <div
                  key={condition.id}
                  className="condition-item flex items-start gap-4 p-5 rounded-lg bg-[#2A1F14]/40 border border-[#C99A3B]/10 hover:border-[#C99A3B]/30 transition-colors duration-300"
                >
                  <CheckCircle2
                    size={20}
                    className="text-[#C99A3B] mt-0.5 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h4 className="text-[#F5EFE0] text-base font-medium mb-1.5">
                      {condition.title}
                    </h4>
                    <p className="text-[#EDE7DA]/60 text-sm leading-relaxed">
                      {condition.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={entitiesRef} className="mt-20">
          <h3
            className="text-[#C99A3B] text-xl font-medium mb-10 text-center"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            参保主体
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MOCK_ELIGIBILITY_ENTITIES.map((entity) => (
              <div
                key={entity.id}
                className="entity-card group flex flex-col items-center text-center p-7 rounded-xl border border-[#C99A3B]/15 bg-[#2A1F14]/30 hover:border-[#C99A3B]/50 hover:bg-[#2A1F14]/50 transition-all duration-500 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1A120B]/50 border border-[#C99A3B]/20 group-hover:border-[#C99A3B]/60 transition-all duration-500 group-hover:scale-110">
                  <EntityIcon type={entity.type} size={28} />
                </div>
                <h4
                  className="mt-5 text-[#F5EFE0] text-base font-medium"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {entity.name}
                </h4>
                <p className="mt-2 text-[#EDE7DA]/60 text-sm leading-relaxed">
                  {entity.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-[#EDE7DA]/50 text-sm leading-relaxed max-w-2xl mx-auto">
            在实施范围内，从事茶树及茶叶种植且茶树及茶叶权属清晰的生产经营主体，包括农业企业、农民合作社、家庭农场、农户等。
          </p>

          <div className="mt-8 text-center">
            <button
              onClick={() => setDetailOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#C99A3B]/30 bg-[#C99A3B]/10 text-[#EDE7DA] text-sm tracking-wider hover:bg-[#C99A3B]/20 hover:border-[#C99A3B]/50 transition-all duration-300"
            >
              <FileText size={16} className="text-[#C99A3B]" />
              查看详细参保说明
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="详细参保说明"
        subtitle="参保对象、保险标的、金额与费率"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-[#6B1D14] font-medium mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              <span className="w-6 h-6 rounded-full bg-[#6B1D14] text-[#F5EFE0] text-xs font-bold flex items-center justify-center shrink-0">一</span>
              参保对象
            </h4>
            <p className="text-[#4A3A2C]/75 text-sm leading-relaxed pl-8">
              在实施范围内，从事茶树及茶叶种植且茶树及茶叶权属清晰的生产经营主体，包括农业企业、农民合作社、家庭农场、农户等，均可自愿投保。
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-[#6B1D14] font-medium mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              <span className="w-6 h-6 rounded-full bg-[#6B1D14] text-[#F5EFE0] text-xs font-bold flex items-center justify-center shrink-0">二</span>
              保险标的
            </h4>
            <ol className="pl-8 space-y-1.5 text-[#4A3A2C]/75 text-sm leading-relaxed list-decimal list-inside">
              <li>种植场所不在禁种、行蓄洪区范围内；</li>
              <li>茶园连片集中，生产管理正常；</li>
              <li>树龄 3 年（含）以上；</li>
              <li>连片种植面积 30 亩（含）以上；不足 30 亩的，可由农民合作社或村委会组织投保。</li>
            </ol>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-[#6B1D14] font-medium mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              <span className="w-6 h-6 rounded-full bg-[#6B1D14] text-[#F5EFE0] text-xs font-bold flex items-center justify-center shrink-0">三</span>
              保险金额
            </h4>
            <p className="text-[#4A3A2C]/75 text-sm leading-relaxed pl-8">
              保险金额 = 每亩保险金额（5000 元）× 保险面积。同一保单的保险面积不超过被保险人的实际种植面积。
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-[#6B1D14] font-medium mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              <span className="w-6 h-6 rounded-full bg-[#6B1D14] text-[#F5EFE0] text-xs font-bold flex items-center justify-center shrink-0">四</span>
              保险期间
            </h4>
            <p className="text-[#4A3A2C]/75 text-sm leading-relaxed pl-8">
              保险期间为一年，以保险单载明的起讫时间为准。
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-[#6B1D14] font-medium mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              <span className="w-6 h-6 rounded-full bg-[#6B1D14] text-[#F5EFE0] text-xs font-bold flex items-center justify-center shrink-0">五</span>
              保险费率与保费承担
            </h4>
            <p className="text-[#4A3A2C]/75 text-sm leading-relaxed pl-8">
              保险费率为 3%，每亩保费 150 元。其中市级财政补贴 10%（15 元/亩），农户自缴 40%（60 元/亩），其余由英德市财政据实结算。
            </p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
