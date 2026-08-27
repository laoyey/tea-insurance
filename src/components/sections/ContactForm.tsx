import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  phone: string
  location: string
  area: string
}

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    location: '',
    area: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = formRef.current?.querySelectorAll('.form-element')
      if (elements && elements.length) {
        gsap.set(elements, { opacity: 0, y: 30 })
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === formRef.current) st.kill()
      })
    }
  }, [])

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', location: '', area: '' })
    }, 4000)
  }

  const fields = [
    { key: 'name' as const, label: '姓名', type: 'text', placeholder: '请输入您的姓名' },
    { key: 'phone' as const, label: '联系电话', type: 'tel', placeholder: '请输入您的联系电话' },
    { key: 'location' as const, label: '种植地点', type: 'text', placeholder: '请输入茶园所在地址' },
    { key: 'area' as const, label: '意向保险面积（亩）', type: 'number', placeholder: '请输入意向投保面积' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-32 md:py-40"
      style={{ backgroundColor: '#1A120B' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(107,29,20,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(201,154,59,0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
          <h2
            className="text-[#F5EFE0] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            投保咨询
          </h2>
          <p className="mt-4 text-[#EDE7DA]/60 text-base tracking-wider">
            填写信息，我们将尽快与您联系，为您的茶园提供专属保障方案
          </p>
        </div>

        {submitted ? (
          <div className="form-element flex flex-col items-center justify-center py-16 px-8 rounded-xl border border-[#C99A3B]/30 bg-[#2A1F14]/40 backdrop-blur-sm text-center">
            <div className="w-16 h-16 rounded-full bg-[#C99A3B]/20 flex items-center justify-center mb-6">
              <CheckCircle2 size={36} className="text-[#C99A3B]" strokeWidth={1.5} />
            </div>
            <h3
              className="text-[#F5EFE0] text-xl font-medium mb-2"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              提交成功
            </h3>
            <p className="text-[#EDE7DA]/60 text-sm">
              我们已收到您的投保咨询，工作人员将在1-3个工作日内与您联系。
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8 p-8 md:p-12 rounded-xl border border-[#C99A3B]/20 bg-[#2A1F14]/30 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className="form-element relative"
                  style={{
                    gridColumn: field.key === 'location' ? '1 / -1' : undefined,
                  }}
                >
                  <div className="relative">
                    <input
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                      className="w-full bg-transparent border-0 border-b-2 border-[#4A3A2C] px-0 py-4 text-[#F5EFE0] text-base focus:outline-none focus:border-[#C99A3B] transition-colors duration-300 placeholder-transparent"
                    />
                    <label
                      className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                        formData[field.key] || focusedField === field.key
                          ? '-top-6 text-[#C99A3B] text-sm tracking-widest'
                          : 'top-4 text-[#EDE7DA]/50 text-base'
                      }`}
                      style={{
                        transform:
                          formData[field.key] || focusedField === field.key
                            ? 'perspective(100px) rotateX(0deg)'
                            : 'perspective(100px) rotateX(0deg)',
                      }}
                    >
                      {field.label}
                    </label>
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#C99A3B] transition-all duration-300 ${
                        focusedField === field.key ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-element pt-4">
              <button
                type="submit"
                className="group w-full md:w-auto md:min-w-56 md:px-12 py-4 rounded-lg bg-[#C99A3B] text-[#1A120B] text-base font-medium tracking-wider flex items-center justify-center gap-3 transition-all duration-500 hover:bg-[#1A120B] hover:text-[#C99A3B] border border-[#C99A3B] hover:border-[#C99A3B]"
              >
                <span>提交咨询</span>
                <Send
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <p className="form-element text-[#EDE7DA]/40 text-xs leading-relaxed">
              * 您提交的信息仅用于投保咨询服务，我们将严格保护您的个人隐私。
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
