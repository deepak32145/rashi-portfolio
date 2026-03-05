import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Pics', href: '#pics' },
  { label: 'Careers', href: '#careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['about', 'pics', 'careers']
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a
            href="#hero"
            className="navbar__logo"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <span className="navbar__logo-dot" />
            Rashi Sharma
          </a>

          <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`navbar__link${activeSection === href.slice(1) ? ' navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            ))}
            <a
              href="#careers"
              className="navbar__cta"
              onClick={(e) => handleNavClick(e, '#careers')}
            >
              Hire Me
            </a>
          </nav>

          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}
