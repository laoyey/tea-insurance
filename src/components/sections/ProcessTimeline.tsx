import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOCK_PROCESS_STEPS } from '@/data/process'
import ProcessIcon from '@/components/icons/ProcessIcon'

gsap.registerPlugin(ScrollTrigger)

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = trackRef.current?.querySelectorAll('.process-node')
      if (nodes && nodes.length) {
        gsap.set(nodes, { opacity: 0, scale: 0.8 })
        gsap.to(nodes, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
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
      id="process"
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
            投保流程
          </h2>
          <p className="mt-4 text-[#4A3A2C]/70 text-base tracking-wider">
            六步轻松投保，全程透明可追溯
          </p>
        </div>

        <div ref={trackRef} className="relative">
          <div className="hidden md:block absolute top-12 left-[8%] right-[8%] h-0.5 bg-[#6B1D14]/15" />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-0">
            {MOCK_PROCESS_STEPS.map((step, index) => (
              <div
                key={step.id}
                className="process-node relative flex flex-col items-center text-center group cursor-pointer"
                onMouseEnter={() => setActiveStep(step.stepNumber)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative z-10">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeStep === step.stepNumber
                        ? 'bg-[#6B1D14] border-2 border-[#C99A3B] scale-110 shadow-lg shadow-[#6B1D14]/30'
                        : 'bg-[#F5EFE0] border-2 border-[#6B1D14]/20 hover:border-[#C99A3B]/50'
                    }`}
                  >
                    <ProcessIcon
                      iconKey={step.iconKey}
                      size={32}
                      className={
                        activeStep === step.stepNumber
                          ? 'text-[#C99A3B]'
                          : 'text-[#6B1D14]'
                      }
                    />
                  </div>
                  <span
                    className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      activeStep === step.stepNumber
                        ? 'bg-[#C99A3B] text-[#1A120B]'
                        : 'bg-[#6B1D14] text-[#F5EFE0]'
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {step.stepNumber}
                  </span>
                </div>

                <h3
                  className={`mt-5 text-base font-medium transition-colors duration-300 ${
                    activeStep === step.stepNumber ? 'text-[#6B1D14]' : 'text-[#6B1D14]/80'
                  }`}
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {step.title}
                </h3>

                <div
                  className={`overflow-hidden transition-all duration-500 mt-2 ${
                    activeStep === step.stepNumber ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[#4A3A2C]/70 text-sm leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 text-[#6B1D14]/50">
            <div className="h-px w-12 bg-[#6B1D14]/20" />
            <span
              className="text-sm tracking-[0.2em]"
            >
              悬停查看详情
            </span>
            <div className="h-px w-12 bg-[#6B1D14]/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
