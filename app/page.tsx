'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/finch/Navbar'
import { Footer } from '@/components/finch/Footer'
import { useReveal } from '@/components/finch/useReveal'

// ── TYPES ──────────────────────────────────────────────────────────────────
interface FAQItem { q: string; a: string }

// ── DATA ───────────────────────────────────────────────────────────────────
const faqs: FAQItem[] = [
  { q: 'What ATS platforms does Finch support?', a: 'Finch currently works across Greenhouse, Lever, and Workday — the three platforms covering most engineering internship applications at top companies. More are being added every sprint.' },
  { q: 'Is Finch an auto-apply tool?', a: 'No — and that\'s intentional. Finch fills forms and tailors your materials, but you always review before submitting. It\'s a response-optimization platform, not a spray-and-pray bot.' },
  { q: 'How does the resume tailoring actually work?', a: 'Finch parses the job description, extracts what the recruiter actually cares about, and re-weights your experience to match — while staying 100% truthful to your background.' },
  { q: 'Does Finch work for non-CS students?', a: 'Right now Finch is optimized for CS, engineering, and quantitative business majors. Other fields are on the roadmap — get on the waitlist and we\'ll let you know.' },
  { q: 'How is this different from a resume builder?', a: 'Resume builders give you a static doc. Finch dynamically tailors per application AND fills the form. It\'s the difference between a tool and a system.' },
  { q: 'Is my data safe?', a: 'Yes. Your LinkedIn data and resume are never sold or shared with third parties. You own your data and can delete it any time.' },
]

const inboxItems = [
  { ico: '🔵', co: 'Google', pos: 'SWE Intern', tag: 'No response', winner: false },
  { ico: '🟠', co: 'Amazon', pos: 'SDE Intern', tag: 'No response', winner: false },
  { ico: '🟣', co: 'Meta', pos: 'Software Engineer Intern', tag: 'No response', winner: false },
  { ico: '⚫', co: 'Apple', pos: 'iOS Engineer Intern', tag: 'No response', winner: false },
  { ico: '🔴', co: 'Netflix', pos: 'Engineering Intern', tag: 'No response', winner: false },
  { ico: '🟢', co: 'Stripe', pos: 'Backend Intern', tag: 'Interview →', winner: true },
]

const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Nvidia', 'Stripe', 'Airbnb', 'Uber', 'LinkedIn', 'Salesforce', 'Adobe', 'Figma', 'Notion']

// ── COUNTER ────────────────────────────────────────────────────────────────
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

// ── EXTENSION ANIMATION ────────────────────────────────────────────────────
function ExtMockup() {
  const [displayValues, setDisplayValues] = useState(['', '', ''])
  const [activeField, setActiveField] = useState(-1)
  const [done, setDone] = useState(false)

  const fields = [
    { label: 'FULL NAME',  value: 'Carlos Luna Pena',    placeholder: 'Your name' },
    { label: 'EMAIL',      value: 'carlunpen@tamu.edu',   placeholder: 'Email address' },
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
        setDisplayValues(prev => {
          const next = [...prev]
          next[fieldIndex] = target.slice(0, i)
          return next
        })
        if (i >= target.length) {
          clearInterval(t)
          setTimeout(onComplete, 700)
        }
      }, 120)
    }

    const runSequence = () => {
      setDisplayValues(['', '', ''])
      setActiveField(-1)
      setDone(false)

      setTimeout(() => {
        typeField(0, () => {
          typeField(1, () => {
            typeField(2, () => {
              if (!cancelled) {
                setActiveField(-1)
                setDone(true)
                setTimeout(() => {
                  if (!cancelled) runSequence()
                }, 3000)
              }
            })
          })
        })
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
              <input
                readOnly
                className={`ext-field ${activeField === i ? 'typing' : ''} ${displayValues[i].length === f.value.length ? 'done' : ''}`}
                value={displayValues[i]}
                onChange={() => {}}
                placeholder={f.placeholder}
              />
              {/* Blinking cursor on active field */}
              {activeField === i && (
                <span style={{
                  position: 'absolute',
                  right: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 1.5, height: 14,
                  background: 'var(--navy)',
                  animation: 'blink 0.8s ease-in-out infinite',
                }} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="ext-banner">
        <div className="ext-banner-text">
          <span>🐦</span>
          <span>
            {activeField === -1 && !done ? 'Finch detected application' : done ? '✓ Ready to review' : 'Filling your application...'}
          </span>
        </div>
        <span className="ext-banner-badge">Finch</span>
      </div>
    </div>
  )
}

/// ── BIRD FLOCK ─────────────────────────────────────────────────────────────
function BirdFlock() {
  const birds = [
    { id: 0, y: 15, size: 0.9, duration: 18, delay: 0,  flapSpeed: 0.4 },
    { id: 1, y: 25, size: 0.7, duration: 22, delay: 2,  flapSpeed: 0.5 },
    { id: 2, y: 35, size: 1.0, duration: 16, delay: 4,  flapSpeed: 0.35 },
    { id: 3, y: 20, size: 0.6, duration: 25, delay: 1,  flapSpeed: 0.55 },
    { id: 4, y: 45, size: 0.8, duration: 20, delay: 6,  flapSpeed: 0.45 },
    { id: 5, y: 30, size: 0.7, duration: 19, delay: 3,  flapSpeed: 0.38 },
    { id: 6, y: 55, size: 0.9, duration: 23, delay: 5,  flapSpeed: 0.5  },
    { id: 7, y: 60, size: 0.6, duration: 17, delay: 7,  flapSpeed: 0.42 },
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
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        {birds.map(b => (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              top: `${b.y}%`,
              left: 0,
              opacity: 0,
              animation: `flyAcross ${b.duration}s linear ${b.delay}s infinite`,
            }}
          >
            <svg
              width={28 * b.size}
              height={16 * b.size}
              viewBox="0 0 24 14"
              fill="none"
              style={{ transform: 'rotate(-12deg)' }}
            >
              {/* Left wing flaps up and down */}
              <path
                d="M12 7 C9 2, 4 1, 0 4"
                stroke="#24364C"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                style={{
                  animation: `flapUp ${b.flapSpeed}s ease-in-out infinite`,
                }}
              />
              {/* Right wing flaps up and down */}
              <path
                d="M12 7 C15 2, 20 1, 24 4"
                stroke="#24364C"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                style={{
                  animation: `flapDown ${b.flapSpeed}s ease-in-out infinite`,
                }}
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  )
}
// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  const words = ['INTERVIEWS', 'CALLBACKS', 'RESULTS', 'OFFERS']
  const [wi, setWi] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWi(i => (i + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ padding: '0 clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <BirdFlock />
      <div className="hero" style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Left */}
        <div>
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-eyebrow-dot" />
            Built for CS & Engineering Students
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Static lines */}
            <div className="hero-headline" style={{ marginBottom: 0 }}>TURN APPS</div>
            <div className="hero-headline" style={{ marginBottom: 0 }}>INTO</div>
            {/* Animated word — completely separate block, fixed height */}
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(48px, 5vw, 88px)',
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              color: 'var(--red)',
              height: 'clamp(48px, 5vw, 72px)',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: 28,
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={wi}
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
                >
                  {words[wi]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Stop mass applying with zero return. Finch targets the right roles, tailors your materials automatically, and gets you past ATS — in under 60 seconds per application.
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <a href="/#waitlist" className="btn-main">Join the Waitlist →</a>
          </motion.div>

          
        </div>

        {/* Right — extension mockup */}
        <motion.div className="hero-visual" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ position: 'relative', zIndex: 10 }}>
         <ExtMockup />
        </motion.div>
      </div>
    </section>
  )
}
// ── MARQUEE ────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...companies, ...companies]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((c, i) => <span key={i} className="marquee-item">{c}</span>)}
      </div>
    </div>
  )
}

// ── PROBLEM / INBOX ────────────────────────────────────────────────────────
function Problem() {
  const [withFinch, setWithFinch] = useState(false)

  // Auto-toggle every 3 seconds
  useEffect(() => {
    const t = setInterval(() => setWithFinch(v => !v), 3000)
    return () => clearInterval(t)
  }, [])

  const withoutFinch = [
    { ico: '🔵', co: 'Google',  pos: 'SWE Intern',              tag: 'No response',   winner: false },
    { ico: '🟠', co: 'Amazon',  pos: 'SDE Intern',              tag: 'No response',   winner: false },
    { ico: '🟣', co: 'Meta',    pos: 'Software Engineer Intern', tag: 'No response',   winner: false },
    { ico: '⚫', co: 'Apple',   pos: 'iOS Engineer Intern',      tag: 'No response',   winner: false },
    { ico: '🔴', co: 'Netflix', pos: 'Engineering Intern',       tag: 'No response',   winner: false },
    { ico: '🟢', co: 'Stripe',  pos: 'Backend Intern',           tag: 'No response',   winner: false },
  ]

  const withFinchItems = [
    { ico: '🔵', co: 'Google',  pos: 'SWE Intern',              tag: 'Interview →',   winner: true },
    { ico: '🟠', co: 'Amazon',  pos: 'SDE Intern',              tag: 'Interview →',   winner: true },
    { ico: '🟣', co: 'Notion',  pos: 'PM Intern',               tag: 'Interview →',   winner: true },
    { ico: '🟢', co: 'Stripe',  pos: 'Backend Intern',          tag: 'Interview →',   winner: true },
    { ico: '🔴', co: 'Netflix', pos: 'Engineering Intern',      tag: 'Phone Screen →', winner: true },
    { ico: '🟡', co: 'Figma',   pos: 'Design Eng Intern',       tag: 'Interview →',   winner: true },
  ]

  const items = withFinch ? withFinchItems : withoutFinch

  return (
    <section id="problem" className="inbox-section">
      <div className="container" style={{ padding: '0 clamp(24px,5vw,80px)' }}>
        <div className="inbox-grid">
          {/* Left */}
          <div>
            <p className="section-label">The Problem</p>
            <h2 className="inbox-h2 reveal">THE ADVICE IS ALWAYS "APPLY MORE"</h2>
            <p className="inbox-sub reveal reveal-d1">
              But more applications without strategy just means more ghosting. Students spend hours on applications that go nowhere.
            </p>
            <a href="/how-it-works" className="btn-main reveal reveal-d2" style={{ display: 'inline-block' }}>
              See how it works →
            </a>
          </div>

          {/* Right */}
          <div>
            {/* Toggle — clicking pauses auto-animation */}
            <div style={{
              display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
              border: '1px solid var(--border)', marginBottom: 16,
            }}>
              <button
                onClick={() => setWithFinch(false)}
                style={{
                  fontFamily: 'DM Sans', fontSize: 11, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  padding: '8px 18px', border: 'none', cursor: 'pointer',
                  transition: 'all 0.25s',
                  background: !withFinch ? 'var(--navy)' : 'transparent',
                  color: !withFinch ? 'white' : 'var(--ink)',
                  opacity: !withFinch ? 1 : 0.45,
                }}
              >Without Finch</button>
              <button
                onClick={() => setWithFinch(true)}
                style={{
                  fontFamily: 'DM Sans', fontSize: 11, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  padding: '8px 18px', border: 'none', cursor: 'pointer',
                  transition: 'all 0.25s',
                  background: withFinch ? 'var(--orange)' : 'transparent',
                  color: withFinch ? 'white' : 'var(--ink)',
                  opacity: withFinch ? 1 : 0.45,
                }}
              >With Finch 🐦</button>
            </div>

            <div className="inbox-label" style={{ marginBottom: 10 }}>
              {withFinch ? 'Your inbox — with Finch' : 'Your inbox — without Finch'}
            </div>

            {/* Fixed height wrapper — never jumps */}
            <div style={{ height: 370, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={withFinch ? 'with' : 'without'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className={`inbox-row ${item.winner ? 'winner' : 'ghost'}`}
                      >
                        <div className="inbox-left">
                          <div className="inbox-ico">{item.ico}</div>
                          <div>
                            <div className="inbox-co">{item.co}</div>
                            <div className="inbox-pos">{item.pos}</div>
                          </div>
                        </div>
                        <span className={`inbox-tag ${item.winner ? 'tag-yes' : 'tag-no'}`}>
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Result summary — fixed height so it never jumps */}
            <div style={{ height: 48, marginTop: 12, position: 'relative', flexShrink: 0 }}>              <AnimatePresence mode="wait">
                <motion.div
                  key={withFinch ? 'result-with' : 'result-without'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', inset: 0,
                    padding: '10px 14px', borderRadius: 8,
                    background: withFinch ? 'rgba(224,150,67,0.08)' : 'rgba(212,60,51,0.06)',
                    border: `1px solid ${withFinch ? 'rgba(224,150,67,0.25)' : 'rgba(212,60,51,0.15)'}`,
                    fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600,
                    color: withFinch ? 'var(--orange)' : 'var(--red)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {withFinch ? '6 interviews from 6 targeted applications 🎯' : '0 interviews from 6 applications'}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── BIG STAT ───────────────────────────────────────────────────────────────
function BigStat() {
  return (
    <section className="big-stat-section">
      <div className="big-stat-bg">147 APPS</div>
      <div className="big-stat-inner">
        <div className="big-num">
          <Counter target={147} /><br />
          <em>APPS</em>
        </div>
        <div className="big-copy reveal">
          <h2>"The average CS student sends 147 applications and gets 3 interviews."</h2>
          <p>That's not a skill problem. That's a strategy problem. Finch fixes the strategy — so you apply less, and hear back more.</p>
        </div>
      </div>
    </section>
  )
}

// ── PRICING ────────────────────────────────────────────────────────────────
function Pricing() {
  const [annual, setAnnual] = useState(false)
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-top reveal">
          <p className="section-label">Pricing</p>
          <h2 className="pricing-h2">START FREE.<br />WIN MORE.</h2>
          <div className="toggle-row">
            <span className={`t-label ${!annual ? 'on' : ''}`}>Monthly</span>
            <button
  className="t-btn"
  onClick={() => setAnnual(!annual)}
  style={{
    background: annual ? 'var(--navy)' : 'rgba(0,0,0,0.15)',
    width: 44, height: 24, borderRadius: 12,
    border: 'none', cursor: 'pointer',
    position: 'relative', transition: 'background 0.3s',
  }}
>
  <span style={{
    position: 'absolute',
    top: 3,
    left: annual ? 23 : 3,
    width: 18, height: 18,
    borderRadius: '50%',
    background: 'white',
    transition: 'left 0.3s ease',
    display: 'block',
  }} />
</button>
            <span className={`t-label ${annual ? 'on' : ''}`}>Annual</span>
            {annual && <span className="save-pill">Save 30%</span>}
          </div>
        </div>

        <div className="pricing-cols reveal reveal-d1">
        <div className="p-col" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="p-tier">Free</div>
            <div className="p-price"><sup>$</sup>0<sub>/mo</sub></div>
            <div className="p-desc">Get started — no card required.</div>
            <div className="p-features" style={{ flex: 1 }}>
                {['5 AI-tailored applications/month', 'Chrome extension access', 'LinkedIn profile import', 'Basic resume templates'].map((f, i) => (
                <div key={i} className="p-feat"><span className="p-check">✓</span>{f}</div>
              ))}
            </div>
            <a href="#waitlist" className="p-btn outline" style={{ marginTop: 'auto', alignSelf: 'stretch' }}>Get Started Free</a>          </div>
          <div className="p-col dark" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="p-popular">Most Popular</div>
            <div className="p-tier" style={{ color: 'rgba(255,255,255,0.4)' }}>Premium</div>
            <div className="p-price" style={{ color: 'white' }}>
              <sup>$</sup>{annual ? '9' : '14'}<sub>/mo</sub>
            </div>
            <div className="p-desc">For serious applicants who want results.</div>
            <div className="p-features">
              {['Unlimited AI-tailored applications', 'Priority Chrome extension', 'Advanced resume builder', 'Cover letter generation', 'ATS optimization scoring', 'Networking outreach templates'].map((f, i) => (
                <div key={i} className="p-feat"><span className="p-check">✓</span>{f}</div>
              ))}
            </div>
            <a href="#waitlist" className="p-btn solid" style={{ marginTop: 'auto', alignSelf: 'stretch' }}>Start Premium</a>          </div>
        </div>
      </div>
    </section>
  )
}


// ── ABOUT + TEAM ───────────────────────────────────────────────────────────
function AboutTeam() {
  const members = [
    { init: 'NG', name: 'Nicanor Garza-Zazueta', role: 'CEO & Co-founder', bio: 'Industrial Distribution Engineering at Texas A&M. Meloy Fellows Grant recipient. Operates at the intersection of entrepreneurship, strategy, and execution.', email: 'nicanor14gz@tamu.edu', bg: '#24364C' },
    { init: 'JT', name: 'Jose Tirado', role: 'CTO & Co-founder', bio: 'Industrial Engineering at Texas A&M. Driven by analytical thinking to create practical, measurable impact. Focused on streamlining all people and operations within Finch.', email: 'jmtirador@tamu.edu', bg: '#D43C33' },
    { init: 'CLP', name: 'Carlos Luna Pena', role: 'Technical Lead & Co-founder', bio: 'CS at Texas A&M with a cybersecurity minor. Built AIPHRODITE with FastAPI and Hugging Face. His work spans Python, LangChain, LaTeX resume generation, and LinkedIn scraping.', email: 'carlunpen@tamu.edu', bg: '#E09643' },
  ]

  return (
    <section id="team" style={{
      background: '#24364C',
      padding: 'clamp(80px,12vw,140px) clamp(24px,5vw,80px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background ghost text */}
      <div style={{
        position: 'absolute', bottom: -40, right: -20,
        fontFamily: 'Bebas Neue', fontSize: 'clamp(120px,18vw,200px)',
        color: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
        userSelect: 'none', lineHeight: 1, letterSpacing: -4,
      }}>FINCH</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Top — origin story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(60px,8vw,120px)', alignItems: 'center', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div className="reveal">
            <p style={{ fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#E09643', marginBottom: 16 }}>
              About
            </p>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px,6vw,88px)', lineHeight: 0.9, color: 'white', marginBottom: 28 }}>
              BUILT BY STUDENTS WHO GOT TIRED OF GETTING GHOSTED.
            </h2>
            <p style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, marginBottom: 20 }}>
              "We understood the pain firsthand — and thought there had to be a smarter way."
            </p>
            <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, fontWeight: 300 }}>
              Carlos was applying to internships as a CS major and getting zero responses from mass applications. He built a backend that minimized the number of applications while maximizing his interview rate. Nicanor and Jose joined to turn it into something real.
            </p>
          </div>

          <div className="reveal reveal-d1" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Mission', text: 'Transform the internship process from a frustrating numbers game into an intentional, data-driven strategy that helps students earn the opportunities they deserve.' },
              { label: 'Vision', text: 'Become the default infrastructure for early-career recruiting — replacing cold, volume-based systems with a smarter, outcome-driven approach.' },
              { label: 'Built at', text: 'Texas A&M University — College Station, TX. Supported by the Meloy Fellows Grant and AggieX.' },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: 20 }}>
                <div style={{ fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#E09643', marginBottom: 6 }}>
                  {item.label}
                </div>
                <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontWeight: 300 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 'clamp(48px,6vw,72px)' }} />

        {/* Bottom — team cards */}
        <div className="reveal">
          <p style={{ fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#E09643', marginBottom: 8 }}>
            The Team
          </p>
          <p style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>
            Three Aggies who got tired of getting ghosted.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
          {members.map((m, i) => (
            <div
              key={i}
              className={`reveal reveal-d${i + 1}`}
              style={{ background: 'rgba(255,255,255,0.04)', padding: '32px 28px', transition: 'background 0.3s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 10, background: m.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Bebas Neue', fontSize: 16, color: 'white', marginBottom: 16,
              }}>{m.init}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: m.bg === '#24364C' ? '#E09643' : m.bg, marginBottom: 14 }}>{m.role}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontWeight: 300, marginBottom: 16 }}>{m.bio}</div>
              <a href={`mailto:${m.email}`} style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{m.email}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="faq-grid">
          <div className="reveal">
            <h2 className="faq-h2">GOOD QUESTIONS</h2>
            <p className="faq-sub">Everything you need to know before you join. Still curious? Email the team directly.</p>
          </div>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item reveal reveal-d${Math.min(i + 1, 4)}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q-txt">{f.q}</span>
                  <span className={`faq-ico ${open === i ? 'open' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.p className="faq-ans"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
                    >{f.a}</motion.p>
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

// ── CAPTURE SECTION ─────────────────────────────────────────────────

 
function Capture() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <section id="waitlist" className="capture-section">
      <div className="container">
        <div className="capture-box reveal">
          <div className="capture-glow" />
          <div style={{ position: 'relative' }}>
            <h2 className="capture-h2">FEWER APPS.<br />MORE INTERVIEWS.</h2>
            <p className="capture-sub">Join 500+ students applying smarter. Get early access to Finch and transform your recruiting season.</p>
          </div>
          <div style={{ position: 'relative' }}>
            {!done ? (
              <>
                <form className="capture-form" onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}>
                  <input className="capture-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  <button className="capture-btn" type="submit">Get Early Access 🐦</button>
                  <p className="capture-fine">No spam. We'll only email you when Finch launches.</p>
                </form>
                {/* Contact link */}
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                    Have a specific question?
                  </p>
                  <a href="/contact" style={{
                    fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600,
                    color: '#E09643', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    transition: 'opacity 0.2s',
                  }}>
                    Contact us directly →
                  </a>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ fontFamily: 'Bebas Neue', fontSize: 36, color: 'white', letterSpacing: 1 }}>
                🎉 YOU'RE ON THE LIST.
                <p style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 0 }}>
                  We'll reach out when early access opens.
                </p>
                <a href="/contact" style={{
                  display: 'inline-block', marginTop: 20,
                  fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600,
                  color: '#E09643', textDecoration: 'none',
                }}>Have a question? Contact us →</a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


// ── ROOT ───────────────────────────────────────────────────────────────────
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
        <Hero />
        <Marquee />
        <Problem />
        <BigStat />
        <Pricing />
        <AboutTeam />
        <FAQ />
        <Capture />
      </main>
      <Footer />
    </>
  )
}