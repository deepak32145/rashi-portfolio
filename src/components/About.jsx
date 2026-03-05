import { useEffect, useRef } from 'react'
import './About.css'

const SKILLS = [
  { label: 'Content Writing', pct: 92 },
  { label: 'Content Editing', pct: 88 },
  { label: 'Historical Research', pct: 90 },
  { label: 'Essay & Academic Writing', pct: 85 },
  { label: 'Current Affairs & UPSC Prep', pct: 82 },
]

const INTERESTS = ['Artwork', 'Poetry', 'Content Writing', 'Research', 'History', 'Travel']

function SkillBar({ label, pct, visible }) {
  return (
    <div className="about__skill">
      <div className="about__skill-header">
        <span className="about__skill-name">{label}</span>
        <span className="about__skill-pct">{pct}%</span>
      </div>
      <div className="about__skill-track">
        <div
          className="about__skill-fill"
          style={{ width: visible ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const barsRef = useRef(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visibleRef.current) {
          visibleRef.current = true
          if (barsRef.current) {
            barsRef.current.querySelectorAll('.about__skill-fill').forEach((el, i) => {
              const pct = SKILLS[i].pct
              setTimeout(() => {
                el.style.width = `${pct}%`
              }, i * 100)
            })
          }
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="section__inner">
        <div className="section__label">About Me</div>
        <h2 className="section__title">
          Driven by Purpose &amp; <span className="accent">Passion</span>
        </h2>

        <div className="about__grid">
          {/* Left: Avatar + bio */}
          <div className="about__left">
            <div className="about__avatar-wrap">
              <div className="about__avatar">
                <span className="about__avatar-initials">RS</span>
              </div>
              <div className="about__avatar-ring" />
              <div className="about__avatar-badge">
                <span>UPSC 2025 Aspirant</span>
                <span className="about__badge-dot" />
              </div>
            </div>

            <div className="about__tags">
              {INTERESTS.map((tag) => (
                <span key={tag} className="about__tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: text + skills */}
          <div className="about__right">
            <p className="about__bio">
              Hi! I'm Rashi, a 23-year-old historian from the University of Delhi.
              I completed my BA (Hons.) in History in 2022 and am currently pursuing
              my MA in History, alongside preparing for the UPSC Civil Services
              Examination — driven by a belief that understanding the past shapes a better future.
            </p>
            <p className="about__bio">
              Alongside my UPSC journey, I have a strong passion for content writing
              and editing — having interned at DU Updates and Marketing Musketeers, and
              led the NSS Sensitization Project in college. Beyond academics, I express
              myself through artwork and poetry, finding creativity as important as knowledge.
            </p>

            <div className="about__skills" ref={barsRef}>
              <h3 className="about__skills-title">Skills</h3>
              {SKILLS.map((s) => (
                <SkillBar key={s.label} {...s} visible={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
