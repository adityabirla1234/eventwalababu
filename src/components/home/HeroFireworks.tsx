import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** Warm, brand-toned spark palette — gold/cream, not a generic rainbow. */
const SPARK_COLORS = ['#e2af38', '#ecc65c', '#f3dd94', '#fbf9f4', '#fdf9ec']

const GRAVITY = 0.045
const DRAG = 0.985

interface Spark {
  x: number
  y: number
  prevX: number
  prevY: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

function makeBurst(x: number, y: number, count: number): Spark[] {
  const sparks: Spark[] = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 1.8 + Math.random() * 3.2
    const maxLife = 55 + Math.random() * 35
    sparks.push({
      x,
      y,
      prevX: x,
      prevY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: maxLife,
      maxLife,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      size: 1.2 + Math.random() * 1.6,
    })
  }
  return sparks
}

/**
 * A brief celebratory firework sequence that plays once when the hero first
 * mounts (i.e. when someone lands on the homepage) — not a looping ambient
 * animation. Purely decorative: absolutely positioned, non-interactive, and
 * skipped entirely when the user prefers reduced motion.
 */
export function HeroFireworks({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    const wrapper = canvas?.parentElement
    if (!canvas || !wrapper) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas || !wrapper) return
      width = wrapper.clientWidth
      height = wrapper.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.scale(dpr, dpr)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrapper)

    let sparks: Spark[] = []
    let rafId = 0
    let finishedLaunching = false

    function launch() {
      // Upper "sky" band of the hero, spread across its width.
      const x = width * (0.15 + Math.random() * 0.7)
      const y = height * (0.12 + Math.random() * 0.28)
      sparks.push(...makeBurst(x, y, 46 + Math.floor(Math.random() * 20)))
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height)

      sparks = sparks.filter((s) => s.life > 0)
      for (const s of sparks) {
        s.prevX = s.x
        s.prevY = s.y
        s.vx *= DRAG
        s.vy = s.vy * DRAG + GRAVITY
        s.x += s.vx
        s.y += s.vy
        s.life -= 1

        const alpha = Math.max(s.life / s.maxLife, 0)
        ctx!.strokeStyle = s.color
        ctx!.globalAlpha = alpha
        ctx!.lineWidth = s.size
        ctx!.beginPath()
        ctx!.moveTo(s.prevX, s.prevY)
        ctx!.lineTo(s.x, s.y)
        ctx!.stroke()

        ctx!.globalAlpha = alpha * 0.9
        ctx!.fillStyle = s.color
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      if (!finishedLaunching || sparks.length > 0) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const timeouts = [0, 550, 1150, 1750, 2250].map((delay) =>
      window.setTimeout(launch, delay),
    )
    const stopTimeout = window.setTimeout(() => {
      finishedLaunching = true
    }, 2600)

    rafId = requestAnimationFrame(tick)

    return () => {
      timeouts.forEach(window.clearTimeout)
      window.clearTimeout(stopTimeout)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
