'use client'

import { useState, useEffect } from 'react'
import { AboutTeam } from '../../components/AboutTeam'
import { ScatterBackdrop } from './scatter-backdrop'
import { ABOUT_PAGE_BACKGROUND } from './about-theme'

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

export default function AboutPage() {
  const [dark, setDark] = useState(false)
  useReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: '#1a2333', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 clamp(24px,5vw,80px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
  <a href="/" style={{ textDecoration: 'none' }}>
    <div style={{ overflow: 'hidden', width: 100, height: 40 }}>
      <img src="/Logo_Icon-Light__1_-removebg-preview - Edited.png" alt="Finch" style={{ height: 40, width: 'auto', display: 'block' }} />
    </div>
  </a>
  <div style={{ display: 'flex', alignItems: 'center', gap: 32, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
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
    <button onClick={() => setDark(!dark)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {dark ? '☀️' : '🌙'}
    </button>
    <a href="/#waitlist" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: 'white', textDecoration: 'none', background: '#E09643', padding: '10px 24px', borderRadius: 50 }}
      onMouseEnter={e => (e.currentTarget.style.background = '#cc7a10')}
      onMouseLeave={e => (e.currentTarget.style.background = '#E09643')}
    >Join Waitlist</a>
  </div>
        </div>
      </nav>

      <main style={{ position: 'relative', backgroundColor: '#030118' }}>
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
    <img src="/Finch Backdrop 1.jpeg" alt="" style={{ width: '100%', display: 'block', opacity: 0.20 }} />
    <img src="/Finch Backdrop 2.jpeg" alt="" style={{ width: '100%', display: 'block', opacity: 0.20 }} />
  </div>
  <div style={{ position: 'relative', zIndex: 2, paddingTop: 72 }}>
    <AboutTeam transparentBackground missionCenterWhite />
  </div>
</main>

      <footer style={{ position: 'relative', zIndex: 10 }}>
        <div className="foot-inner">
          <div className="foot-top">
            <div>
              <div style={{ overflow: 'hidden', width: 100, height: 40, marginBottom: 8 }}>
                <img src="/Logo_Icon-Light__1_-removebg-preview.png" alt="Finch" style={{ height: 40, width: 'auto', display: 'block' }} />
              </div>
              <div className="foot-tagline">Fewer applications. More interviews.</div>
            </div>
            <div className="foot-links">
              {[['/', 'Home'], ['/how-it-works', 'How It Works'], ['/about', 'About'], ['/#waitlist', 'Join Waitlist']].map(([href, label]) => (
                <a key={label} href={href} className="foot-link">{label}</a>
              ))}
            </div>
          </div>
          <div className="foot-bottom">
            <p className="foot-copy">2025 Finch Built at Texas A&M University</p>
            <p className="foot-copy"><a href="mailto:nicanor14gz@tamu.edu" style={{ color: 'inherit', textDecoration: 'none' }}>Contact the team</a></p>
          </div>
        </div>
      </footer>
    </>
  )
}