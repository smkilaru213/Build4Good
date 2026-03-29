'use client'

import { useState, useEffect } from 'react'

export function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark">🐦</div>
          <span className="nav-logo-text">Finch</span>
        </a>
        <div className="nav-links">
          {[
            ['/#problem', 'Why Finch'],
            ['/about', 'About'],
            ['/how-it-works', 'How It Works'],
            ['/#pricing', 'Pricing'],
            ['/#faq', 'FAQ'],
          ].map(([href, label]) => (
            <a key={label} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="dark-toggle" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
          <a href="/#waitlist" className="nav-cta">Join Waitlist</a>
        </div>
      </div>
    </nav>
  )
}
