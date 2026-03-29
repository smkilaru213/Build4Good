'use client'

import { useState, useEffect } from 'react'
import { AboutTeam } from '../components/AboutTeam'
import { ScatterBackdrop } from './scatter-backdrop'
import { ABOUT_PAGE_BACKGROUND } from './about-theme'

export default function AboutPage() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: '#1a2333', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <div style={{ overflow: 'hidden', width: 100, height: 40 }}>
              <img src="/Logo_Icon-Light__1_-removebg-preview.png" alt="Finch" style={{ height: 40, width: 'auto', display: 'block' }} />
            </div>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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

      <main style={{ position: 'relative' }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: ABOUT_PAGE_BACKGROUND, backgroundImage: 'radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)', backgroundSize: '6px 6px', pointerEvents: 'none' }}>
          <ScatterBackdrop />
        </div>
        <div style={{ minHeight: 'max(250vh, fit-content)', position: 'relative', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, paddingTop: 72 }}>
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
              {[['/#problem', 'Problem'], ['/#how-it-works', 'How It Works'], ['/#pricing', 'Pricing'], ['/about', 'About'], ['/#faq', 'FAQ'], ['/#waitlist', 'Join Waitlist']].map(([href, label]) => (
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