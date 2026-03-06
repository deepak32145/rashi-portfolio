import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: null, y: null }
    const LINK_DIST  = 140   // particle–particle connection range
    const MOUSE_DIST = 180   // particle–cursor connection range
    const REPEL_DIST = 90    // cursor repulsion range

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Multicolor palette — cyan, yellow, pink, green, blue, magenta
    const PALETTE = [
      [0, 212, 255],    // cyan
      [220, 255, 80],   // yellow-lime
      [255, 80, 180],   // pink
      [0, 255, 160],    // mint green
      [80, 160, 255],   // sky blue
      [255, 160, 40],   // amber
      [180, 80, 255],   // violet
    ]

    const count = Math.floor((canvas.width * canvas.height) / 14000)
    const particles = Array.from({ length: Math.min(Math.max(count, 50), 90) }, () => {
      const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        cr: r, cg: g, cb: b,
        alpha: Math.random() * 0.4 + 0.6,
      }
    })

    const section = canvas.parentElement
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move & repel
      particles.forEach((p) => {
        if (mouse.x !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d  = Math.hypot(dx, dy)
          if (d < REPEL_DIST && d > 0) {
            const force = (REPEL_DIST - d) / REPEL_DIST
            p.x += (dx / d) * force * 1.8
            p.y += (dy / d) * force * 1.8
          }
        }
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })

      // Particle–particle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > LINK_DIST) continue
          const t = 1 - dist / LINK_DIST
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
          grad.addColorStop(0, `rgba(${a.cr},${a.cg},${a.cb},${t * 0.5})`)
          grad.addColorStop(1, `rgba(${b.cr},${b.cg},${b.cb},${t * 0.5})`)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = grad
          ctx.lineWidth = t * 1.2
          ctx.stroke()
        }

        // Particle–cursor lines
        if (mouse.x !== null) {
          const p = particles[i]
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (dist < MOUSE_DIST) {
            const t = 1 - dist / MOUSE_DIST
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${p.cr},${p.cg},${p.cb},${t * 0.6})`
            ctx.lineWidth = t * 1.0
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // soft glow halo
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        glow.addColorStop(0, `rgba(${p.cr},${p.cg},${p.cb},0.15)`)
        glow.addColorStop(1, `rgba(${p.cr},${p.cg},${p.cb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        // core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="hero__content">
        <p className="hero__eyebrow">Hello, I'm</p>
        <h1 className="hero__title">
          Rashi<br />
          <span className="hero__title-accent">Sharma</span>
        </h1>
        <p className="hero__subtitle">
          Historian, Content Writer &amp; UPSC Aspirant — passionate about research,
          creative expression, and making a meaningful difference through public service.
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={scrollToAbout}>
            Know More
          </button>
          <a href="#careers" className="hero__btn hero__btn--ghost" onClick={(e) => {
            e.preventDefault()
            document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Get In Touch
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">23</span>
            <span className="hero__stat-label">Age</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">Arts</span>
            <span className="hero__stat-label">Graduate</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">UPSC</span>
            <span className="hero__stat-label">Aspirant</span>
          </div>
        </div>
      </div>

      <button className="hero__scroll-hint" onClick={scrollToAbout} aria-label="Scroll down">
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
        <span className="hero__scroll-label">Scroll</span>
      </button>
    </section>
  )
}
