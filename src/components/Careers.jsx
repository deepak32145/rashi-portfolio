import { useState } from 'react'
import './Careers.css'

const TIMELINE = [
  {
    period: '2024 – Present',
    role: 'UPSC CSE Preparation',
    company: 'Self-Study & Coaching',
    desc: 'Full-time preparation for the Civil Services Examination covering GS Papers 1–4, Essay, and History optional. Regular answer writing, mock tests, and current affairs practice.',
    tags: ['GS Papers', 'History Optional', 'Essay', 'Current Affairs'],
  },
  {
    period: '2023 – 2025',
    role: 'Master of Arts — History',
    company: 'University of Delhi',
    desc: 'Pursuing MA in History with a focus on modern Indian and world history. Engaged in academic research, dissertation writing, and seminars on historiography and archival methods.',
    tags: ['Modern History', 'Research', 'Dissertation', 'Historiography'],
  },
  {
    period: '2019 – 2022',
    role: 'Bachelor of Arts — History (Hons.)',
    company: 'University of Delhi',
    desc: 'Graduated with Honours in History. Built a strong academic foundation in Indian, medieval, and world history. Participated in debates, cultural events, and academic writing.',
    tags: ['History', 'Archaeology', 'Political Thought', 'Economics'],
  },
  {
    period: 'Sept 2020 – Mar 2021',
    role: 'Content Intern',
    company: 'DU Updates',
    desc: 'Wrote and edited content covering university news, events, and student stories. Developed skills in digital content creation, research, and deadline-driven writing for a student-focused platform.',
    tags: ['Content Writing', 'Editing', 'Research', 'Digital Media'],
  },
  {
    period: 'Jun 2020 – Aug 2020',
    role: 'Content Intern',
    company: 'Marketing Musketeers',
    desc: 'Created engaging marketing and social media content. Assisted with brand storytelling, copy editing, and content strategy for various client campaigns.',
    tags: ['Content Writing', 'Copywriting', 'Social Media', 'Editing'],
  },
  {
    period: '2021',
    role: 'Project Head — Sensitization',
    company: 'National Service Scheme (NSS), College Unit',
    desc: 'Led the Sensitization project under NSS, organising awareness campaigns and community outreach activities. Managed a team of volunteers and coordinated events focused on social issues.',
    tags: ['Leadership', 'Event Management', 'Community Outreach', 'NSS'],
  },
]

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'rashisharma73033@gmail.com',
    href: 'mailto:rashisharma73033@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
]

export default function Careers() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Hi,\n\nYou received a message from your portfolio contact form.\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    const a = document.createElement('a')
    a.href = `mailto:rashisharma73033@gmail.com?subject=${subject}&body=${body}`
    a.click()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="careers" className="careers section">
      <div className="section__inner">
        <div className="section__label">Journey & Contact</div>
        <h2 className="section__title">
          My Path &amp; <span className="accent">Let's Connect</span>
        </h2>

        <div className="careers__grid">
          {/* Left: Timeline */}
          <div className="careers__timeline">
            <h3 className="careers__col-title">Experience</h3>
            <div className="careers__items">
              {TIMELINE.map((item, i) => (
                <div key={i} className="careers__item">
                  <div className="careers__item-dot" />
                  <div className="careers__item-body">
                    <span className="careers__period">{item.period}</span>
                    <h4 className="careers__role">{item.role}</h4>
                    <span className="careers__company">{item.company}</span>
                    <p className="careers__desc">{item.desc}</p>
                    <div className="careers__tags">
                      {item.tags.map((t) => (
                        <span key={t} className="careers__tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact */}
          <div className="careers__contact">
            <h3 className="careers__col-title">Get In Touch</h3>

            <div className="careers__links">
              {CONTACT_LINKS.map(({ label, value, href, icon }) => (
                <a key={label} href={href} className="careers__link">
                  <span className="careers__link-icon">{icon}</span>
                  <span className="careers__link-text">
                    <span className="careers__link-label">{label}</span>
                    <span className="careers__link-value">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            {sent ? (
              <div className="careers__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <p>Message sent! I'll be in touch soon.</p>
              </div>
            ) : (
              <form className="careers__form" onSubmit={handleSubmit} noValidate>
                <div className="careers__form-row">
                  <div className="careers__field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="careers__field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="careers__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="careers__submit">
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m22 2-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Rashi Sharma. Built with React &amp; Vite.
          </p>
          <div className="footer__links">
            {CONTACT_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="footer__link">{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  )
}
