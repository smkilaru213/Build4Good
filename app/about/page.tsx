'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/finch/Navbar'
import { Footer } from '@/components/finch/Footer'
import { AboutTeam } from '@/components/finch/AboutTeam'
import { useReveal } from '@/components/finch/useReveal'
import { ScatterBackdrop } from './scatter-backdrop'
import { ABOUT_PAGE_BACKGROUND } from './about-theme'

export default function AboutPage() {
  const [dark, setDark] = useState(false)
  useReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main style={{ position: 'relative' }}>

        {/* Fixed background layer — stays pinned while page scrolls */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            backgroundColor: ABOUT_PAGE_BACKGROUND,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '6px 6px',
            pointerEvents: 'none',
          }}
        >
          <ScatterBackdrop />
        </div>

        {/* Scroll height spacer — keeps the page tall enough to scroll */}
        <div style={{ minHeight: 'max(250vh, fit-content)', position: 'relative', zIndex: 1 }} />

        {/* Text content — sits at the top, above the fixed background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          <AboutTeam transparentBackground missionCenterWhite />
        </div>
      </main>
      <Footer />
    </>
  )
}