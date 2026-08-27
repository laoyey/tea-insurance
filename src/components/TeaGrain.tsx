import { useEffect, useRef } from 'react'

export default function TeaGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particleCount = 15
    const particles: Array<{
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      rotation: number
      rotationSpeed: number
      opacity: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: 8 + Math.random() * 20,
        speedY: 0.15 + Math.random() * 0.25,
        speedX: (Math.random() - 0.5) * 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        opacity: 0.15 + Math.random() * 0.15,
      })
    }

    const drawTeaLeaf = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#6B1D14'

      ctx.beginPath()
      ctx.ellipse(0, 0, size, size * 0.45, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(107,29,20,0.3)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(-size * 0.8, 0)
      ctx.lineTo(size * 0.8, 0)
      ctx.stroke()

      ctx.restore()
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX
        p.rotation += p.rotationSpeed

        if (p.y > canvas.height + 50) {
          p.y = -50
          p.x = Math.random() * canvas.width
        }
        if (p.x < -50) p.x = canvas.width + 50
        if (p.x > canvas.width + 50) p.x = -50

        drawTeaLeaf(p.x, p.y, p.size, p.rotation, p.opacity)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      {/* 茶渍胶片颗粒 - SVG */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05]"
        style={{ mixBlendMode: 'multiply' }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="teaGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#teaGrain)" fill="#6B1D14" />
        </svg>
      </div>

      {/* 水墨晕染纹理叠加 */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.03]"
        style={{
          mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='%236B1D14'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* 茶叶粒子 Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997] opacity-30"
        aria-hidden="true"
      />
    </>
  )
}
