import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { MOCK_ARTICLES, ARTICLE_CATEGORIES } from '@/data/articles'

gsap.registerPlugin(ScrollTrigger)

export default function MediaCoverage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = listRef.current?.querySelectorAll('.media-category')
      if (blocks && blocks.length) {
        gsap.set(blocks, { opacity: 0, y: 40 })
        gsap.to(blocks, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === listRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="media"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1A120B] py-32 md:py-40"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#C99A3B]" />
          <h2
            className="text-[#F5EFE0] font-normal leading-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            }}
          >
            媒体关注
          </h2>
          <p className="mt-4 text-[#EDE7DA]/60 text-base tracking-wider">
            权威报道，见证一片叶子的保障力量
          </p>
        </div>

        <div ref={listRef} className="space-y-16">
          {ARTICLE_CATEGORIES.map((cat) => {
            const articles = MOCK_ARTICLES.filter((a) => a.category === cat.key)
            if (!articles.length) return null
            return (
              <div key={cat.key} className="media-category">
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#C99A3B]/20" />
                  <h3
                    className="text-[#C99A3B] text-xl font-medium text-center whitespace-nowrap"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {cat.label}
                  </h3>
                  <div className="h-px flex-1 bg-[#C99A3B]/20" />
                </div>

                <div className="space-y-4">
                  {articles.map((article) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 p-5 md:p-6 rounded-xl border border-[#C99A3B]/10 bg-[#2A1F14]/40 transition-all duration-300 hover:border-[#C99A3B]/40 hover:bg-[#2A1F14]/60"
                    >
                      <div className="min-w-0">
                        <h4 className="text-[#F5EFE0] text-base font-medium leading-snug transition-colors duration-300 group-hover:text-[#C99A3B]">
                          {article.title}
                        </h4>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#EDE7DA]/50 text-sm">
                          <span>{article.source}</span>
                          <span className="w-1 h-1 rounded-full bg-[#C99A3B]/40" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-[#C99A3B]/50 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-[#C99A3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
