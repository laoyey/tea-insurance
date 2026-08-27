import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MOCK_GALLERY_ITEMS } from '@/data/gallery'
import { Image } from '@/components/ui/image'

gsap.registerPlugin(ScrollTrigger)

export default function TeaGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalItems = MOCK_GALLERY_ITEMS.length

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(trackRef.current, { opacity: 0, y: 40 })
      gsap.to(trackRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems)
      }, 5000)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, totalItems])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1A120B] py-32 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
          <h2
            className="text-[#F5EFE0] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            茶园印象
          </h2>
          <p className="mt-4 text-[#EDE7DA]/60 text-base tracking-wider">
            从晨雾到茶汤，记录一片叶子的旅程
          </p>
        </div>

        <div ref={trackRef} className="relative">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {MOCK_GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="relative flex-shrink-0 w-full aspect-[16/9]"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'sepia(0.2) saturate(0.85) brightness(0.9)',
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/80 via-[#1A120B]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-xl">
                      <span
                        className="inline-block px-3 py-1 rounded-full bg-[#C99A3B]/20 backdrop-blur-sm text-[#C99A3B] text-[10px] tracking-widest mb-4"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {String(item.id).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
                      </span>
                      <h3
                        className="text-[#F5EFE0] text-2xl md:text-3xl font-medium mb-3"
                        style={{ fontFamily: "'Noto Serif SC', serif" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[#EDE7DA]/70 text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1A120B]/60 backdrop-blur-sm border border-[#C99A3B]/30 flex items-center justify-center text-[#C99A3B] hover:bg-[#C99A3B] hover:text-[#1A120B] transition-all duration-300 z-10"
            aria-label="上一张"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1A120B]/60 backdrop-blur-sm border border-[#C99A3B]/30 flex items-center justify-center text-[#C99A3B] hover:bg-[#C99A3B] hover:text-[#1A120B] transition-all duration-300 z-10"
            aria-label="下一张"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {MOCK_GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? 'w-8 h-2 bg-[#C99A3B]'
                  : 'w-2 h-2 bg-[#C99A3B]/30 hover:bg-[#C99A3B]/60'
              }`}
              aria-label={`查看第${index + 1}张`}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-[#EDE7DA]/50 text-sm tracking-wider hover:text-[#C99A3B] transition-colors duration-300"
          >
            {isAutoPlaying ? '暂停自动播放' : '开启自动播放'}
          </button>
        </div>
      </div>
    </section>
  )
}
