'use client'

import { useState, useEffect } from 'react'

function homePath(hash: string, subpage: boolean) {
  return subpage ? `/${hash}` : hash
}

function navEntries(subpage: boolean): [string, string][] {
  return [
    [homePath('#problem', subpage), 'Problem'],
    [homePath('#how-it-works', subpage), 'How It Works'],
    [homePath('#pricing', subpage), 'Pricing'],
    ['/about', 'About'],
    [homePath('#faq', subpage), 'FAQ'],
  ]
}

function footerEntries(subpage: boolean): [string, string][] {
  return [
    ...navEntries(subpage),
    [homePath('#waitlist', subpage), 'Join Waitlist'],
  ]
}

export function Navbar({ dark, setDark, subpage = false }: { dark: boolean; setDark: (v: boolean) => void; subpage?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const waitlistHref = subpage ? '/#waitlist' : '#waitlist'
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">🐦</div>
          <span className="nav-logo-text">Finch</span>
        </a>
        <div className="nav-links">
          {navEntries(subpage).map(([href, label]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button type="button" className="dark-toggle" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
          <a href={waitlistHref} className="nav-cta">Join Waitlist</a>
        </div>
      </div>
    </nav>
  )
}

export function Footer({ subpage = false }: { subpage?: boolean }) {
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <div>
            <div className="foot-brand">🐦 FINCH</div>
            <div className="foot-tagline">Fewer applications. More interviews.</div>
          </div>
          <div className="foot-links">
            {footerEntries(subpage).map(([href, label]) => (
              <a key={label} href={href} className="foot-link">{label}</a>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <p className="foot-copy">© 2025 Finch — Built at Texas A&M University</p>
          <p className="foot-copy">
            <a href="mailto:nicanor14gz@tamu.edu" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Contact the team</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
