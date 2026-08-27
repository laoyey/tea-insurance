import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: '产品保障', href: '#protection' },
  { label: '发展历程', href: '#timeline' },
  { label: '理赔触发', href: '#triggers' },
  { label: '责任免除', href: '#liability' },
  { label: '赔付计算', href: '#formula' },
  { label: '投保流程', href: '#process' },
  { label: '参保条件', href: '#eligibility' },
  { label: '联系我们', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > heroHeight * 0.8)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(26_18_11_0.92)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a href="#hero" className="flex items-center group" onClick={handleNavClick}>
          <span
            className="text-xl tracking-wider text-[#F5EFE0]"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            红茶气象指数保险
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link relative text-sm tracking-[0.1em] whitespace-nowrap text-[#EDE7DA]/90 hover:text-[#C99A3B] transition-colors duration-300"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#F5EFE0] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="菜单"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 bg-[rgba(26_18_11_0.98)] backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-3 text-base tracking-wider text-[#EDE7DA]/90 hover:text-[#C99A3B] transition-colors"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          width: 0;
          height: 1px;
          background-color: #C99A3B;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  )
}
