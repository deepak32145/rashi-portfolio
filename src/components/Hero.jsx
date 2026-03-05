import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
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
