import { MOCK_FOOTER_INFO } from '@/data/footer'

export default function Footer() {
  const { brand, coverage } = MOCK_FOOTER_INFO

  return (
    <footer className="w-full bg-[#1A120B] border-t border-[#33241A]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 品牌 */}
          <div>
            <span
              className="text-xl tracking-wider text-[#F5EFE0]"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {brand.name}
            </span>
            <p className="mt-3 text-[#EDE7DA]/60 text-sm">{brand.tagline}</p>
          </div>

          {/* 承保区域 */}
          <div>
            <h4
              className="text-[#F5EFE0] text-sm font-medium mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {coverage.title}
            </h4>
            <ul className="space-y-2">
              {coverage.areas.map((area) => (
                <li key={area} className="text-[#EDE7DA]/60 text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
