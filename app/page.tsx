'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem { q: string; a: string }

const faqs: FAQItem[] = [
  { q: 'What ATS platforms does Finch support?', a: 'Finch currently works across Greenhouse, Lever, and Workday — the three platforms covering most engineering internship applications at top companies. More are being added every sprint.' },
  { q: 'Is Finch an auto-apply tool?', a: "No — and that's intentional. Finch fills forms and tailors your materials, but you always review before submitting. It's a response-optimization platform, not a spray-and-pray bot." },
  { q: 'How does the resume tailoring actually work?', a: 'Finch parses the job description, extracts what the recruiter actually cares about, and re-weights your experience to match — while staying 100% truthful to your background.' },
  { q: 'Does Finch work for non-CS students?', a: "Right now Finch is optimized for CS, engineering, and quantitative business majors. Other fields are on the roadmap — get on the waitlist and we'll let you know." },
  { q: 'How is this different from a resume builder?', a: 'Resume builders give you a static doc. Finch dynamically tailors per application AND fills the form. The difference between a tool and a system.' },
  { q: 'Is my data safe?', a: 'Yes. Your LinkedIn data and resume are never sold or shared with third parties. You own your data and can delete it any time.' },
]

const steps = [
  { n: '01', title: 'Connect LinkedIn', body: "Sign up and link your profile. Finch's AI builds a full candidate profile — no manual data entry.", detail: 'Takes about 60 seconds' },
  { n: '02', title: 'Browse normally', body: 'The Chrome extension watches for job applications on Greenhouse, Lever, and Workday as you browse.', detail: 'Works in the background' },
  { n: '03', title: 'Get a tailored resume', body: 'For each role, Finch generates a resume and cover letter matched to that exact job description.', detail: 'Generated in seconds' },
  { n: '04', title: 'Watch it autofill', body: 'The extension fills the entire form — including file uploads — and stops at the review page.', detail: 'You stay in control' },
  { n: '05', title: 'Submit with confidence', body: 'What normally takes 20-30 minutes is done in under 60 seconds — without sacrificing ATS quality.', detail: 'Fewer apps. Better results.' },
]

const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Nvidia', 'Stripe', 'Airbnb', 'Uber', 'LinkedIn', 'Salesforce', 'Adobe', 'Figma', 'Notion']

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const dur = 1800; const step = target / (dur / 16); let cur = 0
        const t = setInterval(() => { cur += step; if (cur >= target) { setVal(target); clearInterval(t) } else { setVal(Math.floor(cur)) } }, 16)
      }
    }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

function ExtMockup() {
  const [displayValues, setDisplayValues] = useState(['', '', ''])
  const [activeField, setActiveField] = useState(-1)
  const [done, setDone] = useState(false)
  const fields = [
    { label: 'FULL NAME', value: 'Carlos Luna Pena', placeholder: 'Your name' },
    { label: 'EMAIL', value: 'carlunpen@tamu.edu', placeholder: 'Email address' },
    { label: 'UNIVERSITY', value: 'Texas A&M University', placeholder: 'University' },
  ]
  useEffect(() => {
    let cancelled = false
    const typeField = (fieldIndex: number, onComplete: () => void) => {
      const target = fields[fieldIndex].value
      let i = 0
      setActiveField(fieldIndex)
      const t = setInterval(() => {
        if (cancelled) { clearInterval(t); return }
        i++
        setDisplayValues(prev => { const next = [...prev]; next[fieldIndex] = target.slice(0, i); return next })
        if (i >= target.length) { clearInterval(t); setTimeout(onComplete, 700) }
      }, 120)
    }
    const runSequence = () => {
      setDisplayValues(['', '', '']); setActiveField(-1); setDone(false)
      setTimeout(() => {
        typeField(0, () => typeField(1, () => typeField(2, () => {
          if (!cancelled) { setActiveField(-1); setDone(true); setTimeout(() => { if (!cancelled) runSequence() }, 3000) }
        })))
      }, 800)
    }
    runSequence()
    return () => { cancelled = true }
  }, [])
  return (
    <div className="ext-mockup" style={{ fontSize: 13 }}>
      <div className="ext-browser-bar">
        <div className="ext-dot" style={{ background: '#ff5f57' }} />
        <div className="ext-dot" style={{ background: '#febc2e' }} />
        <div className="ext-dot" style={{ background: '#28c840' }} />
        <div className="ext-url-bar">greenhouse.io/applications/stripe-backend-intern</div>
      </div>
      <div className="ext-body">
        <div className="ext-job-co">Stripe</div>
        <div className="ext-job-title">Backend Infrastructure Intern</div>
        {fields.map((f, i) => (
          <div key={i}>
            <div className="ext-field-label">{f.label}</div>
            <div style={{ position: 'relative' }}>
              <input readOnly
                className={'ext-field' + (activeField === i ? ' typing' : '') + (displayValues[i].length === f.value.length ? ' done' : '')}
                value={displayValues[i]} onChange={() => {}} placeholder={f.placeholder} />
              {activeField === i && (
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 1.5, height: 14, background: 'var(--navy)', animation: 'blink 0.8s ease-in-out infinite' }} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="ext-banner">
        <div className="ext-banner-text">
          <span>🐦</span>
          <span>{activeField === -1 && !done ? 'Finch detected application' : done ? 'Ready to review' : 'Filling your application...'}</span>
        </div>
        <span className="ext-banner-badge">Finch</span>
      </div>
    </div>
  )
}

function BirdFlock() {
  const birds = [
    { id: 0, y: 15, size: 0.9, duration: 18, delay: 0, flapSpeed: 0.4 },
    { id: 1, y: 25, size: 0.7, duration: 22, delay: 2, flapSpeed: 0.5 },
    { id: 2, y: 35, size: 1.0, duration: 16, delay: 4, flapSpeed: 0.35 },
    { id: 3, y: 20, size: 0.6, duration: 25, delay: 1, flapSpeed: 0.55 },
    { id: 4, y: 45, size: 0.8, duration: 20, delay: 6, flapSpeed: 0.45 },
    { id: 5, y: 30, size: 0.7, duration: 19, delay: 3, flapSpeed: 0.38 },
    { id: 6, y: 55, size: 0.9, duration: 23, delay: 5, flapSpeed: 0.5 },
    { id: 7, y: 60, size: 0.6, duration: 17, delay: 7, flapSpeed: 0.42 },
  ]
  return (
    <>
      <style>{`
        @keyframes flyAcross {
          0%   { transform: translateX(-60px) scaleX(-1); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateX(105vw) scaleX(-1); opacity: 0; }
        }
        @keyframes flapUp {
          0%, 100% { d: path("M12 7 C9 2, 4 1, 0 4"); }
          50%       { d: path("M12 7 C9 5, 4 6, 0 8"); }
        }
        @keyframes flapDown {
          0%, 100% { d: path("M12 7 C15 2, 20 1, 24 4"); }
          50%       { d: path("M12 7 C15 5, 20 6, 24 8"); }
        }
      `}</style>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {birds.map(b => (
          <div key={b.id} style={{ position: 'absolute', top: `${b.y}%`, left: 0, opacity: 0, animation: `flyAcross ${b.duration}s linear ${b.delay}s infinite` }}>
            <svg width={28 * b.size} height={16 * b.size} viewBox="0 0 24 14" fill="none" style={{ transform: 'rotate(-12deg)' }}>
              <path d="M12 7 C9 2, 4 1, 0 4" stroke="#24364C" strokeWidth="1.6" strokeLinecap="round" fill="none" style={{ animation: `flapUp ${b.flapSpeed}s ease-in-out infinite` }} />
              <path d="M12 7 C15 2, 20 1, 24 4" stroke="#24364C" strokeWidth="1.6" strokeLinecap="round" fill="none" style={{ animation: `flapDown ${b.flapSpeed}s ease-in-out infinite` }} />
            </svg>
          </div>
        ))}
      </div>
    </>
  )
}

function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <nav>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div style={{ overflow: 'hidden', width: 100, height: 40 }}>
            <img src="/Logo_Icon-Light__1_-removebg-preview - Edited.png" alt="Finch" style={{ height: 40, width: 'auto', display: 'block' }} />
          </div>
        </a>
        <div className="nav-links">
        {[['/', 'Home'], ['/how-it-works', 'How It Works'], ['/about', 'About']].map(([href, label]) => (
  <a key={label} href={href} className="nav-link"
    onMouseEnter={e => {
      const el = e.currentTarget
      el.style.color = 'white'
      el.style.transform = 'translateY(-2px) scale(1.05)'
      const underline = el.querySelector('.nav-underline') as HTMLElement
      if (underline) underline.style.width = '100%'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget
      el.style.color = 'rgba(255,255,255,0.6)'
      el.style.transform = 'none'
      const underline = el.querySelector('.nav-underline') as HTMLElement
      if (underline) underline.style.width = '0%'
    }}
    style={{ position: 'relative', display: 'inline-block', paddingBottom: 4, transition: 'color 0.2s, transform 0.2s' }}
  >
    {label}
    <span className="nav-underline" style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: 2, background: '#E09643', transition: 'width 0.25s ease' }} />
  </a>
))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="dark-toggle" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
          <a href="#waitlist" className="nav-cta"
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#cc7a10'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--orange)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none' }}
          >Join Waitlist</a>
        </div>
      </div>
    </nav>
  )
}

function Hero({ dark }: { dark: boolean }) {
  const words = ['INTERVIEWS', 'CALLBACKS', 'RESULTS', 'OFFERS']
  const [wi, setWi] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWi(i => (i + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])
  const m = dark ? 0.85 : 0.75
  return (
    <section style={{ padding: '0 clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <BirdFlock />
      <div className="hero" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-eyebrow-dot" />
            Built for CS & Engineering Students
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="hero-headline" style={{ marginBottom: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 900 }}>TURN APPS</div>
            <div className="hero-headline" style={{ marginBottom: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 900 }}>INTO</div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 'clamp(48px, 5vw, 88px)', lineHeight: 0.9, letterSpacing: '0.01em', color: 'var(--red)', height: 'clamp(48px, 5vw, 72px)', overflow: 'hidden', position: 'relative', marginBottom: 28 }}>
              <AnimatePresence mode="wait">
                <motion.div key={wi} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                  {words[wi]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ opacity: m }}>
            Stop mass applying with zero return. Finch targets the right roles, tailors your materials automatically, and gets you past ATS in under 60 seconds per application.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <a href="#waitlist" className="btn-main">Join the Waitlist</a>
            <a href="/how-it-works" className="btn-ghost" style={{ opacity: dark ? 0.85 : 0.6 }}>See how it works</a>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ position: 'relative', zIndex: 10 }}>
          <ExtMockup />
        </motion.div>
      </div>
    </section>
  )
}

function Marquee() {
  const SPEED = '30s'
  const allCompanies = [...companies, ...companies]
  return (
    <div style={{ background: 'var(--navy)', padding: '16px 0', overflow: 'hidden', position: 'relative' }}>
      <style>{`@keyframes paradeMove { from { transform: translateX(100vw); } to { transform: translateX(-100%); } }`}</style>
      <div style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', animation: `paradeMove ${SPEED} linear infinite` }}>
        <div style={{ marginRight: 32, display: 'inline-flex', alignItems: 'center' }}>
          <svg width="28" height="16" viewBox="0 0 24 14" fill="none" style={{ transform: 'rotate(-12deg) scaleX(-1)' }}>
            <path d="M12 7 C9 2, 4 1, 0 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" style={{ animation: 'flapUp 0.4s ease-in-out infinite' }} />
            <path d="M12 7 C15 2, 20 1, 24 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" style={{ animation: 'flapDown 0.4s ease-in-out infinite' }} />
          </svg>
        </div>
        {allCompanies.map((c, i) => (
          <span key={i} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 3, color: 'rgba(255,255,255,0.35)', marginRight: 64 }}>{c} </span>
        ))}
      </div>
    </div>
  )
}

function Problem({ dark }: { dark: boolean }) {
  const [withFinch, setWithFinch] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setWithFinch(v => !v), 3000)
    return () => clearInterval(t)
  }, [])
  const withoutFinch = [
    { ico: '🔵', co: 'Google', pos: 'SWE Intern', tag: 'No response', winner: false },
    { ico: '🟠', co: 'Amazon', pos: 'SDE Intern', tag: 'No response', winner: false },
    { ico: '🟣', co: 'Meta', pos: 'Software Engineer Intern', tag: 'No response', winner: false },
    { ico: '⚫', co: 'Apple', pos: 'iOS Engineer Intern', tag: 'No response', winner: false },
    { ico: '🔴', co: 'Netflix', pos: 'Engineering Intern', tag: 'No response', winner: false },
    { ico: '🟢', co: 'Stripe', pos: 'Backend Intern', tag: 'No response', winner: false },
  ]
  const withFinchItems = [
    { ico: '🔵', co: 'Google', pos: 'SWE Intern', tag: 'Interview', winner: true },
    { ico: '🟠', co: 'Amazon', pos: 'SDE Intern', tag: 'Interview', winner: true },
    { ico: '🟣', co: 'Notion', pos: 'PM Intern', tag: 'Interview', winner: true },
    { ico: '🟢', co: 'Stripe', pos: 'Backend Intern', tag: 'Interview', winner: true },
    { ico: '🔴', co: 'Netflix', pos: 'Engineering Intern', tag: 'Phone Screen', winner: true },
    { ico: '🟡', co: 'Figma', pos: 'Design Eng Intern', tag: 'Interview', winner: true },
  ]
  const items = withFinch ? withFinchItems : withoutFinch
  const m = dark ? 0.85 : 0.65
  return (
    <section id="problem" className="inbox-section">
      <div className="container" style={{ padding: '0 clamp(24px,5vw,80px)' }}>
        <div className="inbox-grid">
          <div>
            <p className="section-label">The Problem</p>
            <h2 className="inbox-h2 reveal">THE ADVICE IS ALWAYS APPLY MORE</h2>
            <p className="inbox-sub reveal reveal-d1" style={{ opacity: m }}>But more applications without strategy just means more ghosting. Students spend hours on applications that go nowhere.</p>
            <a href="/how-it-works" className="btn-main reveal reveal-d2" style={{ display: 'inline-block' }}>See the fix</a>
          </div>
          <div>
            <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 16 }}>
              <button onClick={() => setWithFinch(false)} style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '8px 18px', border: 'none', cursor: 'pointer', transition: 'all 0.25s', background: !withFinch ? 'var(--navy)' : 'transparent', color: !withFinch ? 'white' : 'var(--ink)', opacity: !withFinch ? 1 : 0.45 }}>Without Finch</button>
              <button onClick={() => setWithFinch(true)} style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '8px 18px', border: 'none', cursor: 'pointer', transition: 'all 0.25s', background: withFinch ? 'var(--orange)' : 'transparent', color: withFinch ? 'white' : 'var(--ink)', opacity: withFinch ? 1 : 0.45 }}>With Finch</button>
            </div>
            <div className="inbox-label" style={{ marginBottom: 10 }}>{withFinch ? 'Your inbox with Finch' : 'Your inbox without Finch'}</div>
            <div style={{ height: 370, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div key={withFinch ? 'with' : 'without'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {items.map((item, i) => (
                      <div key={i} className={'inbox-row ' + (item.winner ? 'winner' : 'ghost')}>
                        <div className="inbox-left">
                          <div className="inbox-ico">{item.ico}</div>
                          <div>
                            <div className="inbox-co">{item.co}</div>
                            <div className="inbox-pos">{item.pos}</div>
                          </div>
                        </div>
                        <span className={'inbox-tag ' + (item.winner ? 'tag-yes' : 'tag-no')}>{item.tag}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ height: 48, marginTop: 12, position: 'relative', flexShrink: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div key={withFinch ? 'result-with' : 'result-without'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', inset: 0, padding: '10px 14px', borderRadius: 8, background: withFinch ? 'rgba(224,150,67,0.08)' : 'rgba(212,60,51,0.06)', border: '1px solid ' + (withFinch ? 'rgba(224,150,67,0.25)' : 'rgba(212,60,51,0.15)'), fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, color: withFinch ? 'var(--orange)' : 'var(--red)', display: 'flex', alignItems: 'center' }}>
                  {withFinch ? '6 interviews from 6 targeted applications' : '0 interviews from 6 applications'}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BigStat() {
  return (
    <section className="big-stat-section">
      <div className="big-stat-bg">147 APPS</div>
      <div className="big-stat-inner">
        <div className="big-num"><Counter target={147} /><br /><em>APPS</em></div>
        <div className="big-copy reveal">
          <h2>The average CS student sends 147 applications and gets 3 interviews.</h2>
          <p>That is not a skill problem. That is a strategy problem. Finch fixes the strategy so you apply less and hear back more.</p>
        </div>
      </div>
    </section>
  )
}

function HowItWorks({ dark }: { dark: boolean }) {
  const m = dark ? 0.85 : 0.65
  return (
    <section id="how-it-works" className="steps-section">
      <div className="container">
        <div className="steps-top">
          <h2 className="reveal">HOW<br />IT WORKS</h2>
          <p className="reveal reveal-d1" style={{ opacity: m }}>Five steps from sign-up to interview scheduled. The whole thing takes less than a minute per application.</p>
        </div>
        <div className="steps-list">
          {steps.map((s, i) => (
            <div key={i} className={'step-row reveal reveal-d' + Math.min(i + 1, 4)}>
              <div className="step-n">{s.n}</div>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-body" style={{ opacity: m }}>{s.body}</div>
              </div>
              <div className="step-detail-col" style={{ opacity: dark ? 0.7 : 0.5 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Product({ dark }: { dark: boolean }) {
  const m = dark ? 0.85 : 0.55
  const features = [
    { icon: '🔗', title: 'LinkedIn Integration', body: 'Connect once and Finch builds your full candidate profile automatically. No manual data entry, no copy-pasting.' },
    { icon: '⚡', title: 'Instant Resume Tailoring', body: "For every job you apply to, Finch generates a tailored resume that matches the role's exact requirements in seconds." },
    { icon: '✍️', title: 'Cover Letter Generation', body: 'Personalized cover letters that sound like you, not like AI. Generated from your profile and the job description.' },
    { icon: '🤖', title: 'Smart Autofill', body: 'The Chrome extension fills every field in Greenhouse, Lever, and Workday automatically including file uploads.' },
    { icon: '🎯', title: 'ATS Optimization', body: 'Finch analyzes your resume against ATS filters before you submit, so you actually get seen by a human.' },
    { icon: '📊', title: 'Application Tracking', body: "See every application you've sent, its status, and which roles are worth following up on all in one place." },
  ]
  return (
    <section id="product" style={{ padding: 'clamp(80px,12vw,140px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(26,26,26,0.1)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
          <div className="reveal">
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#D43C33', marginBottom: 16 }}>The Product</p>
            <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 'clamp(52px,7vw,88px)', lineHeight: 0.9, color: '#24364C' }}>EVERYTHING YOU NEED<br />TO WIN THE SEARCH.</h2>
          </div>
          <p className="reveal reveal-d1" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, opacity: dark ? 0.85 : 0.5, maxWidth: 280, lineHeight: 1.65, fontWeight: 300, textAlign: 'right' }}>One Chrome extension. One profile. Unlimited tailored applications.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, border: '1px solid rgba(26,26,26,0.1)', borderRadius: 12, overflow: 'hidden' }}>
          {features.map((f, i) => (
            <div key={i} className={'reveal reveal-d' + Math.min(i + 1, 4)}
              style={{ background: 'white', padding: '36px 32px', borderRight: i % 3 !== 2 ? '1px solid rgba(26,26,26,0.08)' : 'none', borderBottom: i < 3 ? '1px solid rgba(26,26,26,0.08)' : 'none', transition: 'background 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8f7f5')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: '#24364C', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, lineHeight: 1.65, opacity: m, fontWeight: 300 }}>{f.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }} className="reveal">
          <a href="#waitlist" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 600, background: '#D43C33', color: 'white', padding: '14px 32px', borderRadius: 6, textDecoration: 'none', transition: 'all 0.25s', display: 'inline-block' }}>Get Early Access</a>
        </div>
      </div>
    </section>
  )
}

function Pricing({ dark }: { dark: boolean }) {
  const [annual, setAnnual] = useState(false)
  const m = dark ? 0.8 : 0.45
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-top reveal">
          <p className="section-label">Pricing</p>
          <h2 className="pricing-h2">START FREE.<br />WIN MORE.</h2>
          <div className="toggle-row">
            <span className={'t-label ' + (!annual ? 'on' : '')}>Monthly</span>
            <button className="t-btn" onClick={() => setAnnual(!annual)} style={{ background: annual ? 'var(--navy)' : 'rgba(0,0,0,0.15)', width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
              <span style={{ position: 'absolute', top: 3, left: annual ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.3s ease', display: 'block' }} />
            </button>
            <span className={'t-label ' + (annual ? 'on' : '')}>Annual</span>
            {annual && <span className="save-pill">Save 30%</span>}
          </div>
        </div>
        <div className="pricing-cols reveal reveal-d1">
          <div className="p-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="p-tier">Free</div>
            <div className="p-price"><sup>$</sup>0<sub>/mo</sub></div>
            <div className="p-desc" style={{ opacity: m }}>Get started no card required.</div>
            <div className="p-features" style={{ flex: 1 }}>
              {['5 AI-tailored applications/month', 'Chrome extension access', 'LinkedIn profile import', 'Basic resume templates'].map((f, i) => (
                <div key={i} className="p-feat" style={{ opacity: dark ? 0.9 : 0.7 }}><span className="p-check">✓</span>{f}</div>
              ))}
            </div>
            <a href="#waitlist" className="p-btn outline" style={{ marginTop: 'auto', alignSelf: 'stretch' }}>Get Started Free</a>
          </div>
          <div className="p-col dark" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="p-popular">Most Popular</div>
            <div className="p-tier" style={{ color: 'rgba(255,255,255,0.4)' }}>Premium</div>
            <div className="p-price" style={{ color: 'white' }}><sup>$</sup>{annual ? '9' : '14'}<sub>/mo</sub></div>
            <div className="p-desc">For serious applicants who want results.</div>
            <div className="p-features">
              {['Unlimited AI-tailored applications', 'Priority Chrome extension', 'Advanced resume builder', 'Cover letter generation', 'ATS optimization scoring', 'Networking outreach templates'].map((f, i) => (
                <div key={i} className="p-feat"><span className="p-check">✓</span>{f}</div>
              ))}
            </div>
            <a href="#waitlist" className="p-btn solid" style={{ marginTop: 'auto', alignSelf: 'stretch' }}>Start Premium</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutTeam() {
  const members = [
    { init: 'NG', name: 'Nicanor Garza-Zazueta', role: 'CEO & Co-founder', bio: 'Industrial Distribution Engineering at Texas A&M. Meloy Fellows Grant recipient. Operates at the intersection of entrepreneurship, strategy, and execution.', email: 'nicanor14gz@tamu.edu', bg: '#24364C' },
    { init: 'JT', name: 'Jose Tirado', role: 'CTO & Co-founder', bio: 'Industrial Engineering at Texas A&M. Driven by analytical thinking to create practical, measurable impact. Focused on streamlining all people and operations within Finch.', email: 'jmtirador@tamu.edu', bg: '#D43C33' },
    { init: 'CLP', name: 'Carlos Luna Pena', role: 'Technical Lead & Co-founder', bio: 'CS at Texas A&M with a cybersecurity minor. Built AIPHRODITE with FastAPI and Hugging Face. His work spans Python, LangChain, LaTeX resume generation, and LinkedIn scraping.', email: 'carlunpen@tamu.edu', bg: '#E09643' },
  ]
  return (
    <section id="team" style={{ background: '#24364C', padding: 'clamp(80px,12vw,140px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -40, right: -20, fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 'clamp(120px,18vw,200px)', color: 'rgba(255,255,255,0.03)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1, letterSpacing: -4 }}>FINCH</div>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(60px,8vw,120px)', alignItems: 'center', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div className="reveal">
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#E09643', marginBottom: 16 }}>About</p>
            <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 'clamp(48px,6vw,88px)', lineHeight: 0.9, color: 'white', marginBottom: 28 }}>BUILT BY STUDENTS WHO GOT TIRED OF GETTING GHOSTED.</h2>
            <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, marginBottom: 20 }}>We understood the pain firsthand and thought there had to be a smarter way.</p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, fontWeight: 300 }}>Carlos was applying to internships as a CS major and getting zero responses from mass applications. He built a backend that minimized the number of applications while maximizing his interview rate. Nicanor and Jose joined to turn it into something real.</p>
          </div>
          <div className="reveal reveal-d1" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Mission', text: 'Transform the internship process from a frustrating numbers game into an intentional, data-driven strategy that helps students earn the opportunities they deserve.' },
              { label: 'Vision', text: 'Become the default infrastructure for early-career recruiting replacing cold, volume-based systems with a smarter, outcome-driven approach.' },
              { label: 'Built at', text: 'Texas A&M University College Station, TX. Supported by the Meloy Fellows Grant and AggieX.' },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: 20 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#E09643', marginBottom: 6 }}>{item.label}</div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontWeight: 300 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 'clamp(48px,6vw,72px)' }} />
        <div className="reveal">
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#E09643', marginBottom: 8 }}>The Team</p>
          <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Three Aggies who got tired of getting ghosted.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
          {members.map((m, i) => (
            <div key={i} className={'reveal reveal-d' + (i + 1)}
              style={{ background: 'rgba(255,255,255,0.04)', padding: '32px 28px', transition: 'background 0.3s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
            >
              <div style={{ width: 48, height: 48, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: 'white', marginBottom: 16 }}>{m.init}</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: m.bg === '#24364C' ? '#E09643' : m.bg, marginBottom: 14 }}>{m.role}</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontWeight: 300, marginBottom: 16 }}>{m.bio}</div>
              <a href={'mailto:' + m.email} style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{m.email}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  const m = dark ? 0.85 : 0.45
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="faq-grid">
          <div className="reveal">
            <h2 className="faq-h2">GOOD QUESTIONS</h2>
            <p className="faq-sub" style={{ opacity: m }}>Everything you need to know before you join. Still curious? Email the team directly.</p>
          </div>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className={'faq-item reveal reveal-d' + Math.min(i + 1, 4)}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q-txt">{f.q}</span>
                  <span className={'faq-ico ' + (open === i ? 'open' : '')}>+</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.p className="faq-ans" style={{ opacity: m }} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: dark ? 0.85 : 0.7 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>{f.a}</motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Capture() {
  const [form, setForm] = useState({ name: '', email: '', interest: '' })
  const [done, setDone] = useState(false)
  const [focused, setFocused] = useState('')
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email) setDone(true)
  }
  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%', padding: '11px 16px', borderRadius: 8,
    border: '1.5px solid ' + (focused === name ? '#E09643' : 'rgba(26,26,26,0.12)'),
    background: 'white', color: '#1a1a1a',
    fontFamily: 'Manrope, sans-serif', fontSize: 14,
    outline: 'none', transition: 'all 0.2s',
    boxShadow: focused === name ? '0 0 0 3px rgba(224,150,67,0.12)' : 'none',
  })
  return (
    <section id="waitlist" style={{ background: 'var(--navy)', padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,80px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,6vw,80px)', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>Early Access</p>
          <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 0.95, color: 'white', marginBottom: 20 }}>
            Apply smarter.<br />Land more<br />interviews.
          </h2>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300, marginBottom: 36, maxWidth: 360 }}>
            Join students applying smarter not harder. Be the first to know when Finch launches.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['500+ students already on the waitlist', 'No spam ever. Unsubscribe anytime.', 'Free early access before public launch', 'Built by Texas A&M students, for students'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(224,150,67,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: 'var(--orange)', fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 'clamp(32px,4vw,48px)', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
          {!done ? (
            <>
              <h3 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 26, color: 'var(--navy)', marginBottom: 6 }}>Join the Waitlist</h3>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#aaa', marginBottom: 28, fontWeight: 300 }}>Takes 20 seconds. No credit card required.</p>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#aaa', display: 'block', marginBottom: 6 }}>Full Name</label>
                  <input name="name" type="text" value={form.name} onChange={handle} required placeholder="Carlos Luna Pena" onFocus={() => setFocused('name')} onBlur={() => setFocused('')} style={inputStyle('name')} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#aaa', display: 'block', marginBottom: 6 }}>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@university.edu" onFocus={() => setFocused('email')} onBlur={() => setFocused('')} style={inputStyle('email')} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#aaa', display: 'block', marginBottom: 6 }}>I am looking for</label>
                  <select name="interest" value={form.interest} onChange={handle} onFocus={() => setFocused('interest')} onBlur={() => setFocused('')} style={{ ...inputStyle('interest'), appearance: 'none', cursor: 'pointer', color: form.interest ? '#1a1a1a' : '#aaa' }}>
                    <option value="" disabled>Select your goal</option>
                    <option value="internship">Summer internship</option>
                    <option value="newgrad">New grad role</option>
                    <option value="both">Both internship and full-time</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
                <button type="submit"
                  style={{ marginTop: 4, padding: '14px 28px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'var(--orange)', color: 'white', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, transition: 'all 0.25s', width: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#cc7a10'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(224,150,67,0.35)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--orange)'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}
                >Get Early Access 🐦</button>
                <div style={{ borderTop: '1px solid rgba(26,26,26,0.07)', marginTop: 8, paddingTop: 16, textAlign: 'center' }}>
                  <a href="/contact" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 500, color: '#bbb', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--orange)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
                  >Have a question? Contact us directly</a>
                </div>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 32, color: 'var(--navy)', marginBottom: 12 }}>You are in!</h3>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#888', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>
                Welcome, {form.name.split(' ')[0]}. We will reach out personally when early access opens.
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 14, opacity: 0.6 }}>
                Know someone who should apply smarter?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://applyfinch.com')
                    const btn = document.getElementById('copy-btn') as HTMLButtonElement
                    if (btn) { btn.innerText = 'Link copied!'; setTimeout(() => { btn.innerText = 'Copy link to share' }, 2000) }
                  }}
                  id="copy-btn"
                  style={{ padding: '12px 24px', borderRadius: 50, border: '1.5px solid rgba(26,26,26,0.15)', background: 'white', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--navy)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--orange)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--orange)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26,26,26,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--navy)' }}
                >Copy link to share</button>
                <a href="https://twitter.com/intent/tweet?text=Just joined the waitlist for Finch — AI that tailors your resume and autofills job applications in under 60 seconds. Check it out: https://applyfinch.com"
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '12px 24px', borderRadius: 50, background: '#1a1a1a', color: 'white', textDecoration: 'none', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
                >Share on X</a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://applyfinch.com"
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '12px 24px', borderRadius: 50, background: '#0077b5', color: 'white', textDecoration: 'none', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.2s', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#005e8e')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0077b5')}
                >Share on LinkedIn</a>
              </div>
              <div style={{ marginTop: 20 }}>
                <a href="/contact" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 500, color: '#bbb', textDecoration: 'none' }}>Have a question? Contact us</a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer({ dark }: { dark: boolean }) {
  const m = dark ? 0.7 : 0.3
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <div>
          <div style={{ overflow: 'hidden', width: 100, height: 40, marginBottom: 8 }}>
  <img src="/Logo_Icon-Light__1_-removebg-preview - Edited.png" alt="Finch" style={{ height: 40, width: 'auto', display: 'block' }} />
</div>
            <div className="foot-tagline" style={{ opacity: dark ? 0.6 : 0.3 }}>Fewer applications. More interviews.</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <a href="https://linkedin.com/company/applyfinch" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                <img src="/InBug-Black.png" alt="LinkedIn" style={{ width: 20, height: 20, objectFit: 'contain' }} />
              </a>
              <a href="https://github.com/applyfinch" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                <img src="/icons8-github-50.png" alt="GitHub" style={{ width: 20, height: 20, objectFit: 'contain', filter: 'brightness(10)' }} />
              </a>
            </div>
          </div>
          <div className="foot-links">
          {[['/', 'Home'], ['/how-it-works', 'How It Works'], ['/about', 'About']].map(([href, label]) => (              <a key={label} href={href} className="foot-link">{label}</a>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <p className="foot-copy" style={{ opacity: dark ? 0.5 : 0.18 }}>2025 Finch Built at Texas A&M University</p>
          <p className="foot-copy" style={{ opacity: dark ? 0.5 : 0.18 }}><a href="mailto:nicanor14gz@tamu.edu" style={{ color: 'inherit', textDecoration: 'none' }}>Contact the team</a></p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [dark, setDark] = useState(false)
  useReveal()
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero dark={dark} />
        <Marquee />
        <Problem dark={dark} />
        <BigStat />
        <Pricing dark={dark} />
        <FAQ dark={dark} />
        <Capture />
      </main>
      <Footer dark={dark} />
    </>
  )
}