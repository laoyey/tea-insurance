import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOCK_INSURANCE_PROTECTION } from '@/data/insurance'
import ProtectionIcon from '@/components/icons/ProtectionIcon'
import { Image } from '@/components/ui/image'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE = `${import.meta.env.BASE_URL}images/protection-bg.jpg`

export default function ProtectionOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState<number[]>([0, 0, 0])
  const hasAnimated = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(text1Ref.current, {
        xPercent: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(text2Ref.current, {
        yPercent: -15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(text3Ref.current, {
        xPercent: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(bgRef.current, {
        yPercent: 15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
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
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            onEnter: () => {
              if (!hasAnimated.current) {
                hasAnimated.current = true
                startCountAnimation()
              }
            },
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  const startCountAnimation = () => {
    const targetValues = MOCK_INSURANCE_PROTECTION.map((item) => item.value)
    const duration = 1200
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const newCounts = targetValues.map((target) =>
        Math.round(target * easeOut),
      )
      setCounts(newCounts)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <section
      id="protection"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5EFE0] min-h-[90vh] flex flex-col justify-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ filter: 'grayscale(100%)', opacity: 0.2 }}
      >
        <Image
          src={BG_IMAGE}
          alt="积庆里红茶谷航拍"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-[10] pointer-events-none overflow-hidden py-8 md:py-12">
        <div
          ref={text1Ref}
          className="whitespace-nowrap text-center font-normal text-[#6B1D14] leading-none"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(3rem, 10vw, 7rem)',
          }}
        >
          一叶 · 一叶 · 一叶
        </div>
        <div
          ref={text2Ref}
          className="whitespace-nowrap text-center mt-[-0.3em] leading-none text-[#6B1D14] font-normal"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(3rem, 10vw, 7rem)',
          }}
        >
          一险 · 一险 · 一险
        </div>
        <div
          ref={text3Ref}
          className="whitespace-nowrap text-center mt-[-0.3em] font-normal text-[#6B1D14] leading-none"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(3rem, 10vw, 7rem)',
          }}
        >
          一障 · 一障 · 一障
        </div>
      </div>

      <div
        ref={cardsRef}
        className="relative z-[50] mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3 md:px-12"
      >
        {MOCK_INSURANCE_PROTECTION.map((item, index) => (
          <div
            key={item.id}
            className="group rounded-xl border border-[#6B1D14]/10 bg-[#F5EFE0]/90 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:border-[#C99A3B]/50 hover:shadow-lg"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#6B1D14]/5">
              <ProtectionIcon type={item.iconType} size={28} />
            </div>
            <div
              className="text-[#6B1D14] text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {counts[index].toLocaleString()}
              <span className="text-base font-normal text-[#6B1D14]/70 ml-1">
                {item.unit}
              </span>
            </div>
            <div className="mt-2 text-[#6B1D14] font-medium">{item.label}</div>
            <p className="mt-2 text-sm text-[#4A3A2C]/80">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="relative z-[50] mt-16 flex justify-center">
        <div className="flex items-center gap-4 text-[#6B1D14]/60">
          <div className="h-px w-12 bg-[#6B1D14]/20" />
          <span className="text-sm tracking-[0.2em]">一片叶子的天气保障</span>
          <div className="h-px w-12 bg-[#6B1D14]/20" />
        </div>
      </div>
    </section>
  )
}
