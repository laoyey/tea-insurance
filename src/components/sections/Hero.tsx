import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

import { MOCK_INSURANCE_PROTECTION } from '@/data/insurance'
import { Image } from '@/components/ui/image'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState<number[]>([0, 0, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        delay: 0.5,
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none'
          }
        },
      })

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1,
      })

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      })

      gsap.from(dataRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5,
      })
    }, heroRef)

    const targetValues = MOCK_INSURANCE_PROTECTION.map((item) => item.value)
    const duration = 1200
    const startTime = performance.now() + 1500

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }

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

    return () => ctx.revert()
  }, [])

  const scrollToNext = () => {
    document.getElementById('protection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={`${import.meta.env.BASE_URL}images/hero-bg.jpg`}
          alt="英德红茶谷茶园航拍"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: 'sepia(0.3) saturate(0.8) brightness(0.7)',
          }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 0%, #1A120B 120%)',
          }}
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 z-50 bg-[#1A120B]"
        style={{ opacity: 1 }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="text-[#F5EFE0] font-normal leading-tight tracking-tight"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          }}
        >
          一片叶子的天气保障
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-[#EDE7DA]/80 text-sm tracking-[0.2em] md:text-base"
        >
          英德市地方财政补贴性茶叶种植气象指数保险
        </p>

        <div
          ref={dataRef}
          className="absolute bottom-24 right-6 md:bottom-32 md:right-16"
        >
          <div className="rounded-lg border border-[#C99A3B]/30 bg-[#1A120B]/70 backdrop-blur-md p-6 md:p-8">
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              {MOCK_INSURANCE_PROTECTION.map((item, index) => (
                <div key={item.id} className="text-center">
                  <div
                    className="text-[#C99A3B] text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {counts[index].toLocaleString()}
                    {item.unit === '元/亩' || item.unit === '%' ? (
                      <span className="text-base">{item.unit}</span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-[#EDE7DA]/80 text-xs md:text-sm tracking-wider whitespace-nowrap">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#C99A3B] cursor-pointer group"
          aria-label="向下探索"
        >
          <span className="text-sm tracking-widest">向下探索</span>
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            className="animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </button>
      </div>
    </section>
  )
}
