import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOCK_TIMELINE_NODES } from '@/data/timeline'

gsap.registerPlugin(ScrollTrigger)

export default function DevelopmentTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = trackRef.current?.querySelectorAll('.timeline-node')
      if (nodes && nodes.length) {
        gsap.set(nodes, { opacity: 0, y: 30 })
        gsap.to(nodes, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
          },
        })
      }

      if (progressRef.current) {
        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: 'left center',
        })
        gsap.to(progressRef.current, {
          scaleX: 1,
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            end: 'center 60%',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === trackRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5EFE0] py-32 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
          <h2
            className="text-[#6B1D14] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            发展历程
          </h2>
          <p className="mt-4 text-[#4A3A2C]/70 text-base tracking-wider">
            从试点先行到数据赋能，每一步都在守护一片叶子
          </p>
        </div>

        <div ref={trackRef} className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-[#6B1D14]/15" />
          <div
            ref={progressRef}
            className="hidden md:block absolute top-12 left-0 right-0 h-px bg-[#C99A3B] origin-left"
          />

          <div className="md:hidden absolute top-2 bottom-6 left-3 w-px bg-[#6B1D14]/15" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {MOCK_TIMELINE_NODES.map((node) => (
              <div
                key={node.id}
                className="timeline-node relative flex flex-col items-start md:items-center"
              >
                {/* 移动端：圆圈 + 日期 */}
                <div className="flex md:hidden items-center gap-3 w-full">
                  <div className="w-6 h-6 rounded-full bg-[#F5EFE0] border-2 border-[#C99A3B] flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#C99A3B]" />
                  </div>
                  <span className="text-base font-bold text-[#6B1D14]">
                    {node.year}
                    {node.month && ` · ${node.month}`}
                  </span>
                </div>
                <div className="md:hidden mt-3 pl-9 pb-10">
                  <h3 className="text-[#6B1D14] text-base font-medium">
                    {node.title}
                  </h3>
                  <p className="text-[#4A3A2C]/70 text-sm mt-2 leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* md 端：圆圈 + 年份 */}
                <div className="hidden md:flex flex-col items-center z-10 pt-9">
                  <div className="w-7 h-7 rounded-full bg-[#F5EFE0] border-2 border-[#C99A3B] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#C99A3B]" />
                  </div>
                  <span className="mt-3 text-base font-medium text-[#6B1D14]">
                    {node.year}
                  </span>
                </div>
                <div className="hidden md:block mt-16 text-center px-2">
                  <span className="text-xs text-[#C99A3B]/80 tracking-widest">
                    {node.month || '全年'}
                  </span>
                  <h3 className="text-[#6B1D14] text-base font-medium mt-2">
                    {node.title}
                  </h3>
                  <p className="text-[#4A3A2C]/70 text-sm mt-3 leading-relaxed max-w-[220px] mx-auto">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 text-[#6B1D14]/50">
            <div className="h-px w-12 bg-[#6B1D14]/20" />
            <span className="text-sm tracking-[0.2em]">2022 — 2026</span>
            <div className="h-px w-12 bg-[#6B1D14]/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
