import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A120B] px-6">
      <h1
        className="text-[#C99A3B] text-6xl md:text-8xl font-bold mb-4"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        404
      </h1>
      <p
        className="text-[#F5EFE0] text-xl mb-8"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        页面未找到
      </p>
      <Link
        to="/"
        className="px-8 py-3 rounded-lg bg-[#C99A3B] text-[#1A120B] text-sm font-medium tracking-wider hover:bg-[#F5EFE0] transition-colors duration-300"
      >
        返回首页
      </Link>
    </div>
  )
}
