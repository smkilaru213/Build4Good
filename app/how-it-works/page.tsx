'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
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

// ── STEP 1: LinkedIn OAuth with animated data nodes ────────────────────────
function Step1Visual() {
  const [phase, setPhase] = useState<'idle' | 'connecting' | 'importing' | 'done'>('idle')
  const [dots, setDots] = useState(0)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([])

  useEffect(() => {
    const timeline = [
      () => setPhase('connecting'),
      () => setPhase('importing'),
      () => setPhase('done'),
      () => { setPhase('idle'); setTimeout(() => setPhase('connecting'), 400) },
    ]
    let step = 0
    const timings = [600, 1400, 2800, 5200]
    const timers = timings.map((t, i) => setTimeout(() => { timeline[i](); step = i + 1 }, t))

    // Restart loop
    const loop = setTimeout(() => {
      timers.forEach(clearTimeout)
      setPhase('idle')
    }, 6800)

    return () => { timers.forEach(clearTimeout); clearTimeout(loop) }
  }, [])

  // Re-trigger on phase change via key prop on parent
  const [cycleKey, setCycleKey] = useState(0)
  useEffect(() => {
    if (phase === 'idle') {
      const t = setTimeout(() => setCycleKey(k => k + 1), 300)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'importing') return
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 260 + 20,
      y: Math.random() * 60 + 20,
      delay: i * 0.12,
    }))
    setParticles(newParticles)
  }, [phase])

  useEffect(() => {
    if (phase !== 'connecting') return
    const interval = setInterval(() => setDots(d => (d + 1) % 4), 400)
    return () => clearInterval(interval)
  }, [phase])

  const dataNodes = [
    { icon: '👤', label: 'Profile', color: '#0077B5', x: 20, y: 0 },
    { icon: '💼', label: 'Experience', color: '#E09643', x: 120, y: -18 },
    { icon: '🎓', label: 'Education', color: '#22c55e', x: 220, y: 0 },
    { icon: '⚡', label: 'Skills', color: '#a855f7', x: 320, y: -18 },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
      {/* Animated connection arc */}
      <AnimatePresence>
        {(phase === 'importing' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: -60, left: 0, right: 0, height: 60, pointerEvents: 'none' }}
          >
            <svg width="380" height="60" viewBox="0 0 380 60" fill="none" style={{ overflow: 'visible' }}>
              {dataNodes.map((node, i) => (
                <motion.circle
                  key={i}
                  cx={node.x + 10}
                  cy={50 + node.y}
                  r={6}
                  fill={node.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
                />
              ))}
              {dataNodes.map((node, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={node.x + 10} y1={50 + node.y}
                  x2={190} y2={60}
                  stroke={node.color}
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  opacity={0.4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        animate={phase === 'connecting' ? { boxShadow: '0 0 0 2px #0077B5, 0 16px 48px rgba(0,119,181,0.2)' } : { boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.12)' }}
        style={{ background: 'white', borderRadius: 14, overflow: 'hidden' }}
      >
        {/* LinkedIn header */}
        <div style={{ background: 'linear-gradient(160deg, #0077B5 0%, #005c8f 100%)', padding: '24px 24px 20px', textAlign: 'center' }}>
          <motion.div
            animate={phase === 'connecting' ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.6, repeat: phase === 'connecting' ? Infinity : 0 }}
            style={{ width: 44, height: 44, borderRadius: 9, background: 'white', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 20, color: '#0077B5' }}
          >in</motion.div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'DM Sans, sans-serif' }}>LinkedIn</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'DM Sans, sans-serif', marginTop: 2 }}>
            {phase === 'connecting' ? `Connecting${'.'.repeat(dots)}` : phase === 'importing' ? 'Importing data…' : phase === 'done' ? 'Authorized ✓' : 'Secure authorization'}
          </div>
        </div>

        {/* Permission rows */}
        <div style={{ padding: '16px 20px' }}>
          {[
            { icon: '👤', text: 'Profile info, headline & photo', color: '#0077B5' },
            { icon: '💼', text: 'Work experience & education', color: '#E09643' },
            { icon: '⚡', text: 'Skills & endorsements', color: '#22c55e' },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F9F9F9', borderRadius: 8, padding: '9px 11px', marginBottom: 8 }}
            >
              <div style={{ width: 24, height: 24, borderRadius: 6, background: p.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{p.icon}</div>
              <div style={{ fontSize: 12, color: '#333', fontFamily: 'DM Sans, sans-serif', flex: 1 }}>{p.text}</div>
              <AnimatePresence>
                {(phase === 'importing' || phase === 'done') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2, type: 'spring', stiffness: 400 }}
                    style={{ width: 16, height: 16, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', flexShrink: 0 }}
                  >✓</motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%', padding: 11, background: '#0077B5', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', marginTop: 4 }}
          >Allow access</motion.button>
        </div>
      </motion.div>

      {/* Success overlay */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 250 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.97)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
              style={{ width: 64, height: 64, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: 'white', boxShadow: '0 0 0 12px rgba(34,197,94,0.12)' }}
            >✓</motion.div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#24364C', fontFamily: 'DM Sans, sans-serif' }}>Profile imported</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['3 jobs', '5 skills', '2 degrees'].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20, background: '#f0f9f4', color: '#15803d', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
                >{t}</motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── STEP 2: Job Board with live Finch scanner ──────────────────────────────
function Step2Visual() {
  const [scanLine, setScanLine] = useState(0)
  const [popupVisible, setPopupVisible] = useState(false)
  const [matchPct, setMatchPct] = useState(0)

  useEffect(() => {
    let frame: ReturnType<typeof setTimeout>
    const scan = () => {
      let y = 0
      const interval = setInterval(() => {
        y += 3
        setScanLine(y)
        if (y >= 220) {
          clearInterval(interval)
          setPopupVisible(true)
          setTimeout(() => {
            let pct = 0
            const counter = setInterval(() => {
              pct += 3
              setMatchPct(pct)
              if (pct >= 91) clearInterval(counter)
            }, 18)
          }, 300)
          frame = setTimeout(() => {
            setScanLine(0)
            setPopupVisible(false)
            setMatchPct(0)
            setTimeout(scan, 600)
          }, 3200)
        }
      }, 14)
      return () => clearInterval(interval)
    }
    const start = setTimeout(scan, 500)
    return () => { clearTimeout(start); clearTimeout(frame) }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      <div style={{ background: 'white', borderRadius: 13, boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 56px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {/* Chrome bar */}
        <div style={{ background: '#F0F0F0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          <div style={{ flex: 1, margin: '0 8px', background: 'white', border: '1px solid #D8D8D8', borderRadius: 5, padding: '4px 10px', fontSize: 10, color: '#666', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 9 }}>🔒</span>greenhouse.io/jobs/stripe/backend-intern
          </div>
        </div>

        {/* Page body — scan container */}
        <div style={{ padding: '16px 16px 56px', position: 'relative', overflow: 'hidden' }}>
          {/* Scan line */}
          <motion.div
            style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #0077B5 40%, #22c55e 60%, transparent)', opacity: 0.6, top: scanLine, zIndex: 5, pointerEvents: 'none' }}
          />

          {/* Company header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#6772E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'white', fontWeight: 700, flexShrink: 0, fontFamily: 'DM Sans, sans-serif' }}>S</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', fontFamily: 'DM Sans, sans-serif' }}>Stripe</div>
              <div style={{ fontSize: 11, color: '#888', fontFamily: 'DM Sans, sans-serif' }}>San Francisco, CA · Remote OK</div>
            </div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 10, lineHeight: 1.3, fontFamily: 'DM Sans, sans-serif' }}>Backend Infrastructure Intern</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
            {['Summer 2025', 'Engineering', 'Actively hiring'].map((c, i) => (
              <div key={i} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: i === 2 ? '#E8F5E9' : '#EEF1F5', color: i === 2 ? '#2E7D32' : '#444', fontFamily: 'DM Sans, sans-serif' }}>{c}</div>
            ))}
          </div>
          <div style={{ height: 1, background: '#F0F0F0', marginBottom: 12 }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aaa', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>About the role</div>
          {[100, 92, 97, 68, 85, 74].map((w, i) => (
            <div key={i} style={{ height: 6, borderRadius: 3, background: '#EBEBEB', width: `${w}%`, marginBottom: 5 }} />
          ))}
        </div>

        {/* Apply bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #EBEBEB', padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 11, color: '#888', fontFamily: 'DM Sans, sans-serif' }}>Easy apply · 2 min</div>
          <button style={{ background: '#24364C', color: 'white', fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 6, border: 'none', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>Apply now</button>
        </div>
      </div>

      {/* Finch popup — enhanced with live match counter */}
      <AnimatePresence>
        {popupVisible && (
          <motion.div
            initial={{ x: 20, opacity: 0, scale: 0.92 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 16, opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: 'absolute', top: 48, right: -8, width: 218, background: 'white', borderRadius: 11, boxShadow: '0 4px 6px rgba(0,0,0,0.06), 0 12px 36px rgba(0,0,0,0.16)', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', zIndex: 20 }}
          >
            <div style={{ background: '#24364C', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'white', fontFamily: 'DM Sans, sans-serif' }}>🐦 Finch detected</div>
              <div style={{ fontSize: 8, fontWeight: 700, background: '#D43C33', color: 'white', padding: '2px 6px', borderRadius: 3, letterSpacing: '0.5px', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'white', display: 'inline-block', animation: 'step2-pulse 1s ease-in-out infinite' }} />
                LIVE
              </div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              {[{ text: 'Greenhouse form found', color: '#22c55e' }, { text: `Resume match: ${matchPct}%`, color: matchPct >= 80 ? '#22c55e' : '#E09643' }].map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: r.color, flexShrink: 0, boxShadow: `0 0 6px ${r.color}` }} />
                  <div style={{ fontSize: 11, color: '#222', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{r.text}</div>
                </motion.div>
              ))}
              {/* Mini match bar */}
              <div style={{ height: 3, borderRadius: 2, background: '#F0F0F0', marginBottom: 8, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${matchPct}%` }}
                  transition={{ duration: 0.05 }}
                  style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #22c55e, #16a34a)' }}
                />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#24364C', textAlign: 'center', background: '#F5F0E8', padding: '7px 6px', borderRadius: 6, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>Autofill this application →</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@keyframes step2-pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}

// ── STEP 3: Resume editor with animated diff highlights ───────────────────
function Step3Visual() {
  const [activeChange, setActiveChange] = useState(0)
  const changes = [
    { color: '#22c55e', text: 'Promoted distributed systems', line: 2 },
    { color: '#E09643', text: 'Reordered skills to match JD', line: 5 },
    { color: '#4ade80', text: 'Added Go to skills section', line: 7 },
  ]

  useEffect(() => {
    const interval = setInterval(() => setActiveChange(a => (a + 1) % changes.length), 1400)
    return () => clearInterval(interval)
  }, [])

  const lineWidths = [100, 85, 90, 60, 95, 75, 80, 88, 65, 92]

  return (
    <div style={{ width: '100%', maxWidth: 380, background: '#1C2B3A', borderRadius: 11, overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 20px 60px rgba(0,0,0,0.5)' }}>
      {/* Editor chrome */}
      <div style={{ background: '#162130', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
        {['resume.finch', 'original.pdf'].map((tab, i) => (
          <div key={i} style={{ marginLeft: i === 0 ? 10 : 0, fontSize: 10, padding: '3px 10px', borderRadius: 4, background: i === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', color: i === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>{tab}</div>
        ))}
      </div>

      {/* Two-panel body */}
      <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {/* Left: resume lines with animated highlights */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 7, padding: 11, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>Your resume</div>
          {lineWidths.map((w, i) => {
            const matchingChange = changes.findIndex(c => c.line === i)
            const isActive = matchingChange === activeChange
            return (
              <motion.div
                key={i}
                animate={isActive ? { backgroundColor: changes[matchingChange]?.color + '30', x: 2 } : { backgroundColor: 'transparent', x: 0 }}
                style={{ height: 6, borderRadius: 3, marginBottom: 5, width: `${w}%`, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'visible' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeLine"
                    style={{ position: 'absolute', left: -4, top: -1, bottom: -1, width: 3, borderRadius: 2, background: changes[matchingChange]?.color }}
                  />
                )}
              </motion.div>
            )
          })}

          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {changes.map((c, i) => (
              <motion.div
                key={i}
                animate={{ opacity: activeChange === i ? 1 : 0.4, x: activeChange === i ? 2 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}
              >
                <div style={{ width: 3, borderRadius: 2, background: c.color, flexShrink: 0, alignSelf: 'stretch', minHeight: 14 }} />
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, fontFamily: 'DM Sans, sans-serif' }}>{c.text}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: animated score ring + keywords */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 7, padding: 11, border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8, alignSelf: 'flex-start', fontFamily: 'DM Sans, sans-serif' }}>Match score</div>

          {/* Animated conic ring */}
          <div style={{ position: 'relative', width: 70, height: 70, marginBottom: 8 }}>
            <svg width="70" height="70" viewBox="0 0 70 70" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <motion.circle
                cx="35" cy="35" r="28" fill="none"
                stroke="#22c55e" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - 0.94) }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: 'white' }}>94</div>
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontFamily: 'DM Sans, sans-serif' }}>out of 100</div>

          <div style={{ alignSelf: 'flex-start', width: '100%' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6, fontFamily: 'DM Sans, sans-serif' }}>Keywords</div>
            <div>
              {[{ label: 'Golang', match: true }, { label: 'APIs', match: true }, { label: 'SQL', match: true }, { label: 'AWS', match: true }, { label: 'Kafka', match: false }, { label: 'gRPC', match: true }, { label: 'k8s', match: false }].map((kw, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.07, type: 'spring', stiffness: 300 }}
                  style={{ display: 'inline-block', fontSize: 9, fontWeight: 600, padding: '3px 7px', borderRadius: 3, margin: '2px', background: kw.match ? 'rgba(34,197,94,0.15)' : 'rgba(212,60,51,0.15)', color: kw.match ? '#4ade80' : '#f87171', fontFamily: 'DM Sans, sans-serif' }}
                >{kw.label}</motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── STEP 4: ATS Autofill with speed counter ────────────────────────────────
function Step4Visual() {
  const [displayVals, setDisplayVals] = useState(['', '', ''])
  const [activeField, setActiveField] = useState(-1)
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)
  const fields = [
    { label: 'Full name *', value: 'Carlos Luna Pena' },
    { label: 'Email address *', value: 'carlunpen@tamu.edu' },
    { label: 'University *', value: 'Texas A&M University' },
  ]

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setInterval>

    const typeField = (idx: number, onComplete: () => void) => {
      const target = fields[idx].value
      let i = 0
      setActiveField(idx)
      const t = setInterval(() => {
        if (cancelled) { clearInterval(t); return }
        i++
        setDisplayVals(prev => { const next = [...prev]; next[idx] = target.slice(0, i); return next })
        if (i >= target.length) { clearInterval(t); setTimeout(onComplete, 500) }
      }, 55)
    }

    const run = () => {
      setDisplayVals(['', '', ''])
      setActiveField(-1)
      setElapsed(0)
      setDone(false)

      let ms = 0
      timer = setInterval(() => { ms += 100; setElapsed(ms) }, 100)

      setTimeout(() => {
        typeField(0, () => typeField(1, () => typeField(2, () => {
          if (!cancelled) {
            clearInterval(timer)
            setActiveField(-1)
            setDone(true)
            setTimeout(run, 3000)
          }
        })))
      }, 600)
    }

    run()
    return () => { cancelled = true; clearInterval(timer) }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      {/* Speed badge */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', background: '#22c55e', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 12px rgba(34,197,94,0.4)' }}
          >
            ⚡ Done in {(elapsed / 1000).toFixed(1)}s
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ background: 'white', borderRadius: 13, boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 56px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {/* Browser bar */}
        <div style={{ background: '#F0F0F0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          <div style={{ flex: 1, margin: '0 8px', background: 'white', border: '1px solid #D8D8D8', borderRadius: 5, padding: '4px 10px', fontSize: 10, color: '#666', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 9 }}>🔒</span>app.greenhouse.io/application
          </div>
        </div>

        {/* ATS header */}
        <div style={{ padding: '13px 15px', borderBottom: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#24B47E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🌿</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', fontFamily: 'DM Sans, sans-serif' }}>Greenhouse</div>
            <div style={{ fontSize: 10, color: '#888', fontFamily: 'DM Sans, sans-serif' }}>Stripe · Backend Infrastructure Intern</div>
          </div>
          {/* Live timer */}
          <div style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: 11, color: done ? '#22c55e' : '#E09643', fontWeight: 600 }}>
            {(elapsed / 1000).toFixed(1)}s
          </div>
        </div>

        {/* Form body */}
        <div style={{ padding: '13px 15px 56px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aaa', marginBottom: 9, fontFamily: 'DM Sans, sans-serif' }}>Personal info</div>
          {fields.map((f, i) => (
            <div key={i} style={{ marginBottom: 9 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#555', marginBottom: 3, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}>
                {f.label}
                {displayVals[i].length === f.value.length && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: 10, color: '#22c55e' }}>✓</motion.span>
                )}
              </div>
              <motion.div
                animate={{ borderColor: activeField === i ? '#24364C' : displayVals[i].length === f.value.length ? '#22c55e' : '#E0E0E0', background: displayVals[i].length === f.value.length ? '#f0fdf4' : activeField === i ? '#fafafa' : 'white' }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #E0E0E0', borderRadius: 6, fontSize: 12, fontFamily: 'DM Sans, sans-serif', color: displayVals[i] ? '#1a1a1a' : '#ccc', minHeight: 34 }}
              >
                {displayVals[i] || (activeField === i ? '' : <span style={{ color: '#ccc' }}>Waiting…</span>)}
                {activeField === i && <span style={{ display: 'inline-block', width: '1.5px', height: 12, background: '#24364C', verticalAlign: 'middle', marginLeft: 1, animation: 'step4-blink 0.7s ease-in-out infinite' }} />}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, height: 3, background: '#F0F0F0' }}>
          <motion.div
            animate={{ width: done ? '100%' : activeField === 0 ? '25%' : activeField === 1 ? '55%' : activeField === 2 ? '80%' : '0%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ height: '100%', background: done ? '#22c55e' : 'linear-gradient(90deg, #E09643, #f0a050)', borderRadius: '0 2px 2px 0' }}
          />
        </div>

        {/* Finch footer */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#24364C', padding: '9px 13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'white', fontFamily: 'DM Sans, sans-serif' }}>
            {done ? '🐦 Application filled!' : '🐦 Filling your application…'}
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, background: '#E09643', color: 'white', padding: '2px 6px', borderRadius: 3, fontFamily: 'DM Sans, sans-serif' }}>FINCH</div>
        </div>
      </div>
      <style>{`@keyframes step4-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
}

// ── STEP 5: Animated confirmation with live stats ticker ──────────────────
function Step5Visual() {
  const [count, setCount] = useState(0)
  const [showRow, setShowRow] = useState(-1)
  const apps = [
    { bg: '#6772E5', init: 'S', co: 'Stripe', role: 'Backend Infrastructure Intern', status: 'Sent', statusColor: '#E8F5E9', statusText: '#2E7D32' },
    { bg: '#FF5A36', init: 'A', co: 'Airbnb', role: 'Software Engineer Intern', status: 'Sent', statusColor: '#E8F5E9', statusText: '#2E7D32' },
    { bg: '#0078D4', init: 'M', co: 'Microsoft', role: 'SWE Intern — Azure', status: 'In review', statusColor: '#FFF8E1', statusText: '#E65100' },
  ]

  useEffect(() => {
    const target = 12
    let i = 0
    const t = setInterval(() => { i++; setCount(i); if (i >= target) clearInterval(t) }, 80)
    apps.forEach((_, idx) => setTimeout(() => setShowRow(idx), 600 + idx * 250))
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: 340, background: 'white', borderRadius: 15, overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.1)' }}>
      {/* Dark top */}
      <div style={{ background: 'linear-gradient(135deg, #24364C 0%, #1a2d42 100%)', padding: '24px 20px 20px', textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 250, delay: 0.1 }}
          style={{ width: 60, height: 60, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 0 0 12px rgba(34,197,94,0.15)' }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <motion.polyline
              points="4,14 11,21 24,8"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: '1.5px', color: 'white', marginBottom: 3 }}>APPLICATION SENT</motion.div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Sans, sans-serif' }}>Submitted to Stripe · just now</div>
      </div>

      <div style={{ padding: '16px 18px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#aaa', marginBottom: 9, fontFamily: 'DM Sans, sans-serif' }}>This week's applications</div>
        {apps.map((app, i) => (
          <AnimatePresence key={i}>
            {showRow >= i && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderBottom: i < 2 ? '1px solid #F5F5F5' : 'none' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 7, background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: 'white', fontWeight: 700, flexShrink: 0, fontFamily: 'DM Sans, sans-serif' }}>{app.init}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', fontFamily: 'DM Sans, sans-serif' }}>{app.co}</div>
                  <div style={{ fontSize: 11, color: '#888', fontFamily: 'DM Sans, sans-serif' }}>{app.role}</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: app.statusColor, color: app.statusText, fontFamily: 'DM Sans, sans-serif' }}>{app.status}</div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Metrics with animated counters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F5F5F5' }}>
          {[{ num: count, suffix: '', label: 'Applied' }, { num: 94, suffix: '%', label: 'Avg match' }, { num: '1:48', suffix: '', label: 'Avg time', raw: true }].map((m, i) => (
            <div key={i} style={{ textAlign: 'center', background: '#FAFAFA', borderRadius: 8, padding: '8px 4px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: '#24364C', lineHeight: 1 }}>{(m as any).raw ? m.num : m.num}{m.suffix}</div>
              <div style={{ fontSize: 9, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 3, fontFamily: 'DM Sans, sans-serif' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── STEPS SECTION ─────────────────────────────────────────────────────────
const steps = [
  {
    num: 'STEP 01',
    title: 'CONNECT\nLINKEDIN',
    desc: 'One click and Finch imports your experience, skills, and education. No uploading résumés or filling out profiles manually — your LinkedIn is already perfect.',
    visual: <Step1Visual />,
    textBg: '#F5F0E8',
    visualBg: '#F5F5F7',
    reverse: false,
  },
  {
    num: 'STEP 02',
    title: 'BROWSE\nNORMALLY',
    desc: 'Find a role you\'re excited about on Greenhouse, Lever, or Workday. Finch watches in the background and activates the moment it detects an application form.',
    visual: <Step2Visual />,
    textBg: '#ffffff',
    visualBg: '#EAEEF3',
    reverse: true,
  },
  {
    num: 'STEP 03',
    title: 'GET A TAILORED\nRESUME',
    desc: 'Finch reads the job description and re-weights your experience to match — surfacing exactly what that recruiter is looking for, without changing a single fact.',
    visual: <Step3Visual />,
    textBg: '#F5F0E8',
    visualBg: '#1E2D3E',
    reverse: false,
  },
  {
    num: 'STEP 04',
    title: 'WATCH IT\nAUTOFILL',
    desc: 'Finch fills every field in seconds — name, email, university, work history, all of it. What used to take 40 minutes takes under 60 seconds.',
    visual: <Step4Visual />,
    textBg: '#ffffff',
    visualBg: '#F0F4F8',
    reverse: true,
  },
  {
    num: 'STEP 05',
    title: 'SUBMIT WITH\nCONFIDENCE',
    desc: 'Review, tweak if you like, then hit submit. You\'re in control — Finch just makes every application feel like your best one.',
    visual: <Step5Visual />,
    textBg: '#F5F0E8',
    visualBg: '#F5F0E8',
    reverse: false,
  },
]

function StepsSection() {
  return (
    <section style={{ borderTop: '1px solid rgba(36,54,76,0.08)' }}>
      {steps.map((step, i) => (
        <div
          key={i}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            minHeight: 520,
            borderBottom: i < steps.length - 1 ? '1px solid rgba(36,54,76,0.08)' : 'none',
            direction: step.reverse ? 'rtl' : 'ltr',
          }}
        >
          {/* Text panel */}
          <div style={{
            direction: 'ltr',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(40px, 6vw, 72px) clamp(32px, 5vw, 64px)',
            background: step.textBg,
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 12, letterSpacing: '3px', color: 'var(--red)', marginBottom: 14 }}>{step.num}</div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 3.5vw, 52px)', lineHeight: 0.95, color: 'var(--navy)', marginBottom: 18, letterSpacing: '0.02em', whiteSpace: 'pre-line' }}>{step.title}</h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, lineHeight: 1.7, color: 'var(--ink)', opacity: 0.6, maxWidth: 340, fontWeight: 400 }}>{step.desc}</p>
          </div>

          {/* Visual panel */}
          <div style={{
            direction: 'ltr',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(40px, 5vw, 60px) clamp(32px, 4vw, 48px)',
            background: step.visualBg,
            position: 'relative', overflow: 'hidden',
          }}>
            {step.visual}
          </div>
        </div>
      ))}
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
                    <motion.p
                      className="faq-ans"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
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

// ── CAPTURE ────────────────────────────────────────────────────────────────
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
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Have a specific question?</p>
                  <a href="/contact" style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600, color: '#E09643', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'opacity 0.2s' }}>Contact us directly →</a>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ fontFamily: 'Bebas Neue', fontSize: 36, color: 'white', letterSpacing: 1 }}>
                🎉 YOU'RE ON THE LIST.
                <p style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 0 }}>
                  We'll reach out when early access opens.
                </p>
                <a href="/contact" style={{ display: 'inline-block', marginTop: 20, fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600, color: '#E09643', textDecoration: 'none' }}>
                  Have a question? Contact us →
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────────
function HowItWorksHero() {
  return (
    <section style={{
      paddingTop: 'calc(68px + clamp(60px, 8vw, 100px))',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
      padding: 'calc(68px + clamp(60px, 8vw, 100px)) clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)',
      borderBottom: '1px solid rgba(36,54,76,0.08)',
      background: '#F5F0E8',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 24 }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
          How It Works
        </motion.div>

        <motion.h1
          className="hiw-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: 20 }}
        >
          FIVE STEPS FROM<br />SIGN-UP TO<br />INTERVIEW SCHEDULED.
        </motion.h1>

        <motion.p
          className="hiw-lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Finch doesn't just help you apply — it helps you apply smarter. Here's exactly what happens from the moment you sign up.
        </motion.p>
      </div>
    </section>
  )
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function HowItWorksPage() {
  const [dark, setDark] = useState(false)
  useReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="hiw-page">
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <HowItWorksHero />
        <StepsSection />
      </main>
      <Footer />
    </div>
  )
}