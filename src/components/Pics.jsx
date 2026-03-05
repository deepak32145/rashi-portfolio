import { useState } from 'react'
import './Pics.css'
import img1 from '../images/WhatsApp Image 2026-03-05 at 13.48.19.jpeg'
import img2 from '../images/WhatsApp Image 2026-03-05 at 13.48.20.jpeg'

const GALLERY = [
  { id: 1, label: 'Captured Moments', src: img1, span: 'wide' },
  { id: 2, label: 'Captured Moments', src: img2, span: '' },
  { id: 3, label: 'Travel Diaries', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', span: '' },
  { id: 4, label: 'Campus Life', gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)', span: '' },
  { id: 5, label: 'Poetry Corner', gradient: 'linear-gradient(135deg,#fa709a,#fee140)', span: '' },
  { id: 6, label: 'Study Nooks', gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', span: 'tall' },
  { id: 7, label: 'Everyday Moments', gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)', span: '' },
  { id: 8, label: 'Monsoon Mood', gradient: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)', span: '' },
]

export default function Pics() {
  const [selected, setSelected] = useState(null)

  const open  = (item) => setSelected(item)
  const close  = ()    => setSelected(null)

  return (
    <section id="pics" className="pics section">
      <div className="section__inner">
        <div className="section__label">Gallery</div>
        <h2 className="section__title">
          Moments &amp; <span className="accent">Memories</span>
        </h2>
        <p className="pics__desc">
          A glimpse into the places, moments, and experiences that shape who I am —
          from travels and art to everyday life.
        </p>

        <div className="pics__grid">
          {GALLERY.map((item) => (
            <button
              key={item.id}
              className={`pics__card${item.span ? ` pics__card--${item.span}` : ''}`}
              style={item.src ? {} : { background: item.gradient }}
              onClick={() => open(item)}
              aria-label={`View ${item.label}`}
            >
              {item.src && (
                <img src={item.src} alt={item.label} className="pics__card-img" />
              )}
              <div className="pics__card-overlay">
                <span className="pics__card-label">{item.label}</span>
                <svg className="pics__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="pics__lightbox" onClick={close}>
          <div
            className="pics__lightbox-img"
            style={selected.src ? {} : { background: selected.gradient }}
            onClick={(e) => e.stopPropagation()}
          >
            {selected.src
              ? <img src={selected.src} alt={selected.label} className="pics__lightbox-real-img" />
              : <p className="pics__lightbox-label">{selected.label}</p>
            }
          </div>
          <button className="pics__lightbox-close" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
