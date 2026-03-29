'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ── DATA ───────────────────────────────────────────────────────────────────
const steps = [
  {
    n: '01', title: 'Connect LinkedIn',
    body: "Sign up and link your profile. Finch's AI builds a full candidate profile — no manual data entry.",
    detail: 'Takes about 60 seconds', icon: '🔗',
    color: '#E09643', shadow: 'rgba(224,150,67,0.35)', bg: 'rgba(224,150,67,0.10)',
    floaters: ['💼', '👤', '⚡'],
  },
  {
    n: '02', title: 'Browse Normally',
    body: 'The Chrome extension watches for job applications on Greenhouse, Lever, and Workday as you browse.',
    detail: 'Works in the background', icon: '🌐',
    color: '#24364C', shadow: 'rgba(36,54,76,0.35)', bg: 'rgba(36,54,76,0.07)',
    floaters: ['🔎', '✦', '📌'],
  },
  {
    n: '03', title: 'Get a Tailored Resume',
    body: 'For each role, Finch generates a resume and cover letter matched to that exact job description.',
    detail: 'Generated in seconds', icon: '📄',
    color: '#D43C33', shadow: 'rgba(212,60,51,0.35)', bg: 'rgba(212,60,51,0.07)',
    floaters: ['✍️', '⚡', '🎨'],
  },
  {
    n: '04', title: 'Watch it Autofill',
    body: 'The extension fills the entire form — including file uploads — and stops at the review page.',
    detail: 'You stay in control', icon: '🤖',
    color: '#E09643', shadow: 'rgba(224,150,67,0.35)', bg: 'rgba(224,150,67,0.10)',
    floaters: ['⌨️', '✅', '💫'],
  },
  {
    n: '05', title: 'Submit with Confidence',
    body: 'What normally takes 20–30 minutes is done in under 60 seconds — without sacrificing ATS quality.',
    detail: 'Fewer apps. Better results.', icon: '🎯',
    color: '#24364C', shadow: 'rgba(36,54,76,0.35)', bg: 'rgba(36,54,76,0.07)',
    floaters: ['🏆', '🎉', '🚀'],
  },
]

const features = [
  { icon: '🔗', title: 'LinkedIn Integration', body: 'Connect once. Finch builds your full profile automatically — no copy-pasting.', color: '#E09643' },
  { icon: '⚡', title: 'Instant Resume Tailoring', body: 'Every job gets a unique resume matched to the exact role requirements — in seconds.', color: '#D43C33' },
  { icon: '✍️', title: 'Cover Letter Generation', body: 'Personalized cover letters that sound like you, not like AI.', color: '#24364C' },
  { icon: '🤖', title: 'Smart Autofill', body: 'Fills every field in Greenhouse, Lever, and Workday — including file uploads.', color: '#E09643' },
  { icon: '🎯', title: 'ATS Optimization', body: 'Finch checks your resume against ATS filters before you ever hit submit.', color: '#D43C33' },
  { icon: '📊', title: 'Application Tracking', body: 'See every app, its status, and which roles are worth following up on.', color: '#24364C' },
]

// ── REVEAL HOOK ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.r')
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('rv') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── FLOATING ORBS ───────────────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[
        { w: 300, h: 300, top: '-60px', left: '-50px', bg: 'rgba(224,150,67,0.07)', delay: '0s', dur: '8s' },
        { w: 180, h: 180, top: '25%', right: '-30px', bg: 'rgba(212,60,51,0.06)', delay: '1s', dur: '10s' },
        { w: 120, h: 120, bottom: '18%', left: '6%', bg: 'rgba(36,54,76,0.04)', delay: '2s', dur: '7s' },
        { w: 80, h: 80, top: '65%', right: '10%', bg: 'rgba(224,150,67,0.1)', delay: '0.5s', dur: '9s' },
      ].map((o, i) => (
        <div key={i} style={{
          position: 'absolute', width: o.w, height: o.h, borderRadius: '50%',
          background: o.bg,
          top: (o as any).top, left: (o as any).left, right: (o as any).right, bottom: (o as any).bottom,
          animation: `floatBob ${o.dur} ease-in-out ${o.delay} infinite`,
        }} />
      ))}
      {[
        { e: '🐦', top: '10%', right: '5%', size: 28, delay: '0s', dur: '7s' },
        { e: '✦', top: '50%', left: '2%', size: 20, delay: '1.5s', dur: '9s' },
        { e: '✦', bottom: '25%', right: '3%', size: 14, delay: '0.8s', dur: '6s' },
        { e: '🐦', bottom: '12%', left: '6%', size: 22, delay: '2s', dur: '8s' },
      ].map((f, i) => (
        <div key={i} style={{
          position: 'absolute', fontSize: f.size, opacity: 0.15,
          top: (f as any).top, left: (f as any).left, right: (f as any).right, bottom: (f as any).bottom,
          animation: `floatBob ${f.dur} ease-in-out ${f.delay} infinite`,
        }}>{f.e}</div>
      ))}
    </div>
  )
}

// ── PROGRESS TRACK ──────────────────────────────────────────────────────────
function ProgressTrack({ active }: { active: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: i <= active ? s.color : 'rgba(26,26,26,0.08)',
            color: i <= active ? 'white' : 'rgba(26,26,26,0.3)',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: i <= active ? `0 4px 16px ${s.shadow}` : 'none',
            transition: 'all 0.5s cubic-bezier(0.34,1.2,0.64,1)',
            transform: i === active ? 'scale(1.22)' : 'scale(1)',
          }}>{s.n}</div>
          {i < steps.length - 1 && (
            <div style={{
              width: 'clamp(20px,4vw,56px)', height: 3, borderRadius: 2,
              background: i < active ? steps[i + 1].color : 'rgba(26,26,26,0.08)',
              transition: 'background 0.5s ease',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── STEP CARD ───────────────────────────────────────────────────────────────
function StepCard({ step, index, isActive, onEnter }: {
  step: typeof steps[0], index: number, isActive: boolean, onEnter: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onEnter() }, { threshold: 0.4 })
    obs.observe(el); return () => obs.disconnect()
  }, [onEnter])

  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`r r-d${Math.min(index + 1, 3)}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: isLeft ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: 'clamp(28px,5vw,72px)',
        marginBottom: 'clamp(40px,6vw,72px)',
      }}
    >
      {/* Big icon bubble */}
      <div style={{
        flexShrink: 0,
        width: 'clamp(110px,13vw,170px)', height: 'clamp(110px,13vw,170px)',
        borderRadius: 28, background: step.bg,
        border: `3px solid ${step.color}`,
        boxShadow: hovered || isActive ? `0 20px 56px ${step.shadow}, 0 0 0 6px ${step.color}22` : `0 8px 28px ${step.shadow}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, gap: 8,
        transition: 'all 0.35s cubic-bezier(0.34,1.3,0.64,1)',
        transform: hovered ? 'scale(1.08) rotate(-2deg)' : isActive ? 'scale(1.04)' : 'scale(1)',
        position: 'relative' as const, cursor: 'default',
      }}>
        <div style={{
          position: 'absolute', top: -14, right: -14,
          width: 36, height: 36, borderRadius: '50%',
          background: step.color, color: 'white',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 12px ${step.shadow}`,
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hovered ? 'scale(1.18)' : 'scale(1)',
        }}>{step.n}</div>
        <div style={{
          fontSize: 'clamp(38px,5.5vw,58px)', lineHeight: 1,
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hovered ? 'scale(1.18)' : 'scale(1)',
        }}>{step.icon}</div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: hovered ? '4px' : '3px', textTransform: 'uppercase' as const,
          color: step.color, marginBottom: 10, transition: 'letter-spacing 0.3s',
        }}>Step {step.n}</div>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(30px,4vw,54px)', lineHeight: 0.92,
          color: hovered ? step.color : 'var(--navy)',
          marginBottom: 16, transition: 'color 0.3s',
        }}>{step.title}</h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(14px,1.1vw,16px)',
          fontWeight: 300, lineHeight: 1.75,
          color: 'var(--ink)', opacity: 0.7, maxWidth: 460, marginBottom: 18,
        }}>{step.body}</p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: step.bg, border: `1.5px solid ${step.color}40`,
          borderRadius: 20, padding: '7px 18px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
          color: step.color, transition: 'background 0.3s',
        }}>⏱ {step.detail}</div>
      </div>
    </div>
  )
}

// ── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ f, index }: { f: typeof features[0], index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`r r-d${(index % 3) + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white', borderRadius: 20,
        padding: 'clamp(24px,2.5vw,36px)',
        border: `2px solid ${hovered ? f.color : 'rgba(26,26,26,0.08)'}`,
        boxShadow: hovered ? `0 20px 48px ${f.color}28` : '0 2px 12px rgba(26,26,26,0.05)',
        transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: f.color, borderRadius: '20px 20px 0 0',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform 0.35s ease',
      }} />
      <div style={{
        width: 58, height: 58, borderRadius: 15,
        background: `${f.color}15`, border: `2px solid ${f.color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, marginBottom: 18,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'scale(1.16) rotate(-5deg)' : 'scale(1)',
      }}>{f.icon}</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
        color: hovered ? f.color : 'var(--navy)', marginBottom: 10, transition: 'color 0.2s',
      }}>{f.title}</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300,
        color: 'var(--ink)', opacity: 0.6, lineHeight: 1.65,
      }}>{f.body}</div>
    </div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function HowItWorksPage() {
  useReveal()
  const [activeStep, setActiveStep] = useState(0)
  const setStep = useCallback((i: number) => setActiveStep(i), [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        :root { --cream:#F5F0E8; --navy:#24364C; --navy-mid:#1e2e40; --navy-dark:#141f2b; --red:#D43C33; --orange:#E09643; --ink:#1a1a1a; --muted:#8a8a8a; --border:rgba(26,26,26,0.1); }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden;-webkit-font-smoothing:antialiased;}

        @keyframes floatBob{0%,100%{transform:translateY(0) rotate(0)}33%{transform:translateY(-14px) rotate(1.5deg)}66%{transform:translateY(-6px) rotate(-1deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes pulseCta{0%,100%{box-shadow:0 0 0 0 rgba(224,150,67,0.4),0 10px 28px rgba(224,150,67,0.28)}60%{box-shadow:0 0 0 14px rgba(224,150,67,0),0 10px 28px rgba(224,150,67,0.28)}}
        @keyframes heroWordIn{from{opacity:0;transform:translateY(60px) skewY(4deg)}to{opacity:1;transform:translateY(0) skewY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes badgePop{0%{transform:scale(0) rotate(-12deg)}70%{transform:scale(1.12) rotate(3deg)}100%{transform:scale(1) rotate(0)}}

        .r{opacity:0;transform:translateY(28px);transition:opacity 0.65s ease-out,transform 0.65s ease-out;}
        .rv{opacity:1;transform:translateY(0);}
        .r-d1{transition-delay:0.07s;}.r-d2{transition-delay:0.15s;}.r-d3{transition-delay:0.23s;}.r-d4{transition-delay:0.31s;}

        /* NAV */
        .hw-nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:0 clamp(24px,5vw,80px);background:rgba(245,240,232,0.93);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);}
        .hw-nav-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:68px;}
        .hw-logo{display:flex;align-items:center;gap:8px;text-decoration:none;}
        .hw-logo-mark{width:34px;height:34px;border-radius:9px;background:var(--navy);display:flex;align-items:center;justify-content:center;font-size:17px;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);}
        .hw-logo:hover .hw-logo-mark{transform:rotate(-8deg) scale(1.1);}
        .hw-logo-text{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:2px;color:var(--navy);}
        .hw-nav-links{display:flex;align-items:center;gap:36px;}
        .hw-nav-link{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:var(--ink);opacity:0.6;text-decoration:none;transition:opacity 0.2s;}
        .hw-nav-link:hover{opacity:1;}
        .hw-nav-link.active{opacity:1;font-weight:700;color:var(--navy);}
        .hw-nav-cta{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;background:var(--orange);color:white;padding:10px 24px;border-radius:8px;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 14px rgba(224,150,67,0.3);}
        .hw-nav-cta:hover{background:#cc8535;transform:translateY(-2px);box-shadow:0 8px 24px rgba(224,150,67,0.4);}
        @media(max-width:900px){.hw-nav-links{display:none;}}

        /* HERO */
        .hw-hero{min-height:100vh;background:var(--cream);display:flex;align-items:center;padding:100px clamp(24px,5vw,80px) 64px;position:relative;overflow:hidden;}
        .hw-hero-inner{max-width:1280px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:clamp(48px,7vw,96px);align-items:center;}
        @media(max-width:820px){.hw-hero-inner{grid-template-columns:1fr;}}
        .hw-hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--red);margin-bottom:20px;animation:slideUp 0.6s ease-out both;}
        .hw-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--red);animation:blink 2s ease-in-out infinite;}
        .hw-h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(60px,9vw,124px);line-height:0.86;letter-spacing:0.01em;color:var(--navy);margin-bottom:28px;overflow:hidden;}
        .hw-h1-line{display:block;animation:heroWordIn 0.7s cubic-bezier(0.16,1,0.3,1) both;opacity:0;}
        .hw-h1-line:nth-child(1){animation-delay:0.1s;}
        .hw-h1-line:nth-child(2){animation-delay:0.22s;}
        .hw-h1-line:nth-child(3){animation-delay:0.34s;}
        .hw-orange{color:var(--orange);}
        .hw-hero-sub{font-family:'DM Sans',sans-serif;font-size:clamp(14px,1.2vw,16px);font-weight:300;line-height:1.75;color:var(--ink);opacity:0.7;max-width:460px;margin-bottom:36px;animation:slideUp 0.7s ease-out 0.44s both;}
        .hw-hero-btns{display:flex;align-items:center;gap:16px;flex-wrap:wrap;animation:slideUp 0.7s ease-out 0.54s both;}
        .hw-btn-primary{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;background:var(--red);color:white;padding:14px 32px;border-radius:10px;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 0 #a82e26,0 8px 24px rgba(212,60,51,0.28);}
        .hw-btn-primary:hover{transform:translateY(-3px);box-shadow:0 9px 0 #a82e26,0 14px 32px rgba(212,60,51,0.35);}
        .hw-btn-primary:active{transform:translateY(2px);box-shadow:0 3px 0 #a82e26;}
        .hw-btn-ghost{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:var(--navy);opacity:0.55;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:opacity 0.2s;}
        .hw-btn-ghost:hover{opacity:1;}

        /* Hero Card */
        .hw-hero-card{background:white;border-radius:24px;border:2px solid rgba(36,54,76,0.08);box-shadow:0 24px 72px rgba(26,26,26,0.12);overflow:hidden;animation:slideUp 0.8s ease-out 0.3s both;}
        .hw-card-top{background:var(--navy);padding:26px 30px;display:flex;align-items:center;justify-content:space-between;}
        .hw-card-top-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.4);}
        .hw-card-badge{background:var(--orange);color:white;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:20px;animation:badgePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.9s both;}
        .hw-card-body{padding:24px 30px;}
        .hw-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .hw-stat-box{background:var(--cream);border-radius:14px;padding:18px 14px;text-align:center;border:1.5px solid rgba(36,54,76,0.07);transition:transform 0.3s,box-shadow 0.3s;}
        .hw-stat-box:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(224,150,67,0.14);}
        .hw-stat-val{font-family:'Bebas Neue',sans-serif;font-size:40px;color:var(--navy);line-height:1;}
        .hw-stat-val.orange{color:var(--orange);}
        .hw-stat-val.red{color:var(--red);}
        .hw-stat-label{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:var(--ink);opacity:0.45;margin-top:4px;}
        .hw-card-footer{padding:14px 30px 22px;display:flex;align-items:center;gap:10px;}
        .hw-card-footer-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:blink 2s ease-in-out infinite;box-shadow:0 0 0 3px rgba(34,197,94,0.2);}
        .hw-card-footer-txt{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:var(--ink);opacity:0.5;}

        /* STEPS */
        .hw-steps{background:var(--cream);padding:clamp(80px,10vw,120px) clamp(24px,5vw,80px);border-top:1px solid var(--border);position:relative;overflow:hidden;}
        .hw-steps-inner{max-width:1280px;margin:0 auto;}
        .hw-section-center{text-align:center;margin-bottom:56px;}
        .hw-section-label{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--red);margin-bottom:14px;}
        .hw-section-h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6.5vw,84px);line-height:0.9;color:var(--navy);margin-bottom:16px;}
        .hw-section-sub{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;line-height:1.7;color:var(--ink);opacity:0.55;max-width:480px;margin:0 auto;}

        /* FEATURES */
        .hw-features{background:white;padding:clamp(80px,10vw,120px) clamp(24px,5vw,80px);border-top:1px solid var(--border);}
        .hw-features-inner{max-width:1280px;margin:0 auto;}
        .hw-feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:64px;}
        @media(max-width:900px){.hw-feat-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.hw-feat-grid{grid-template-columns:1fr;}}

        /* DARK BAND */
        .hw-band{background:var(--navy);padding:clamp(64px,8vw,100px) clamp(24px,5vw,80px);position:relative;overflow:hidden;}
        .hw-band-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(48px,7vw,100px);align-items:center;}
        @media(max-width:800px){.hw-band-inner{grid-template-columns:1fr;}}
        .hw-band-ghost{position:absolute;right:-20px;bottom:-80px;font-family:'Bebas Neue',sans-serif;font-size:clamp(100px,17vw,220px);color:rgba(255,255,255,0.025);pointer-events:none;user-select:none;line-height:1;letter-spacing:-4px;}
        .hw-band-h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,6vw,80px);line-height:0.9;color:white;margin-bottom:20px;}
        .hw-band-sub{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:rgba(255,255,255,0.45);line-height:1.75;max-width:420px;}
        .hw-band-cards{display:flex;flex-direction:column;gap:14px;}
        .hw-band-card{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:18px 22px;transition:all 0.3s ease;cursor:default;}
        .hw-band-card:hover{background:rgba(255,255,255,0.1);transform:translateX(8px);border-color:rgba(255,255,255,0.18);}
        .hw-band-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);}
        .hw-band-card:hover .hw-band-ico{transform:scale(1.15) rotate(-5deg);}
        .hw-band-card-title{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;color:white;margin-bottom:3px;}
        .hw-band-card-body{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;color:rgba(255,255,255,0.4);line-height:1.5;}

        /* CTA */
        .hw-cta{background:var(--cream);padding:clamp(80px,10vw,120px) clamp(24px,5vw,80px);}
        .hw-cta-box{max-width:1280px;margin:0 auto;background:var(--navy);border-radius:24px;padding:clamp(56px,8vw,88px) clamp(40px,6vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;position:relative;overflow:hidden;}
        @media(max-width:800px){.hw-cta-box{grid-template-columns:1fr;gap:48px;}}
        .hw-cta-glow1{position:absolute;right:-100px;bottom:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(224,150,67,0.14),transparent 65%);pointer-events:none;}
        .hw-cta-glow2{position:absolute;left:-60px;top:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(212,60,51,0.08),transparent 65%);pointer-events:none;}
        .hw-cta-h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,6.5vw,88px);line-height:0.88;color:white;margin-bottom:18px;}
        .hw-cta-sub{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:300;color:rgba(255,255,255,0.4);line-height:1.75;}
        .hw-cta-right{position:relative;}
        .hw-cta-btn{display:block;text-align:center;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;background:var(--orange);color:white;padding:18px 36px;border-radius:12px;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 0 #b8732a,0 12px 32px rgba(224,150,67,0.28);animation:pulseCta 2.4s ease-in-out infinite;margin-bottom:14px;}
        .hw-cta-btn:hover{animation:none;transform:translateY(-3px);box-shadow:0 9px 0 #b8732a,0 18px 40px rgba(224,150,67,0.4);}
        .hw-cta-btn:active{transform:translateY(2px);box-shadow:0 3px 0 #b8732a;}
        .hw-cta-note{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.22);text-align:center;margin-bottom:24px;}
        .hw-cta-divider{border-top:1px solid rgba(255,255,255,0.08);margin-bottom:20px;}
        .hw-cta-contact{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.35);margin-bottom:8px;}
        .hw-cta-link{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:var(--orange);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:opacity 0.2s;}
        .hw-cta-link:hover{opacity:0.8;}

        /* FOOTER */
        .hw-footer{background:var(--navy-dark);color:white;padding:56px clamp(24px,5vw,80px) 40px;}
        .hw-foot-inner{max-width:1280px;margin:0 auto;}
        .hw-foot-top{display:flex;justify-content:space-between;align-items:flex-start;gap:40px;margin-bottom:48px;flex-wrap:wrap;}
        .hw-foot-brand{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:2px;color:white;margin-bottom:8px;}
        .hw-foot-tagline{font-family:'Instrument Serif',serif;font-style:italic;font-size:15px;color:rgba(255,255,255,0.3);}
        .hw-foot-links{display:flex;gap:28px;flex-wrap:wrap;align-items:center;}
        .hw-foot-link{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.2s;}
        .hw-foot-link:hover{color:white;}
        .hw-foot-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:28px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;}
        .hw-foot-copy{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.18);}

        @media(max-width:640px){
          .hw-h1{font-size:clamp(52px,14vw,80px);}
        }
      `}</style>

      {/* NAV */}
      <nav className="hw-nav">
        <div className="hw-nav-inner">
          <a href="/" className="hw-logo">
            <div className="hw-logo-mark">🐦</div>
            <span className="hw-logo-text">FINCH</span>
          </a>
          <div className="hw-nav-links">
            <a href="/#problem" className="hw-nav-link">Problem</a>
            <a href="/how-it-works" className="hw-nav-link active">How It Works</a>
            <a href="/#pricing" className="hw-nav-link">Pricing</a>
            <a href="/#team" className="hw-nav-link">Team</a>
            <a href="/#faq" className="hw-nav-link">FAQ</a>
            <a href="/#waitlist" className="hw-nav-cta">Get Early Access 🐦</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hw-hero">
        <FloatingOrbs />
        <div className="hw-hero-inner">
          <div>
            <div className="hw-hero-eyebrow">
              <span className="hw-eyebrow-dot" />
              Five steps · Under 60 seconds
            </div>
            <h1 className="hw-h1">
              <span className="hw-h1-line">HOW</span>
              <span className="hw-h1-line"><span className="hw-orange">FINCH</span></span>
              <span className="hw-h1-line">WORKS</span>
            </h1>
            <p className="hw-hero-sub">
              From sign-up to interview scheduled — in five steps, in under a minute per application, without sacrificing a single point of ATS quality.
            </p>
            <div className="hw-hero-btns">
              <a href="/#waitlist" className="hw-btn-primary">Join the Waitlist →</a>
              <a href="#steps" className="hw-btn-ghost">See the steps ↓</a>
            </div>
          </div>

          {/* Stats card */}
          <div className="hw-hero-card">
            <div className="hw-card-top">
              <span className="hw-card-top-label">Finch by the numbers</span>
              <span className="hw-card-badge">Live Beta</span>
            </div>
            <div className="hw-card-body">
              <div className="hw-stats-grid">
                <div className="hw-stat-box">
                  <div className="hw-stat-val orange">&lt;60s</div>
                  <div className="hw-stat-label">Per Application</div>
                </div>
                <div className="hw-stat-box">
                  <div className="hw-stat-val red">3×</div>
                  <div className="hw-stat-label">More Interviews</div>
                </div>
                <div className="hw-stat-box">
                  <div className="hw-stat-val">5</div>
                  <div className="hw-stat-label">Steps Total</div>
                </div>
                <div className="hw-stat-box">
                  <div className="hw-stat-val orange">100%</div>
                  <div className="hw-stat-label">You Review First</div>
                </div>
              </div>
            </div>
            <div className="hw-card-footer">
              <div className="hw-card-footer-dot" />
              <span className="hw-card-footer-txt">Finch extension is active and monitoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="hw-steps">
        <FloatingOrbs />
        <div className="hw-steps-inner">
          <div className="hw-section-center">
            <div className="hw-section-label r">The Process</div>
            <h2 className="hw-section-h2 r r-d1">THE FIVE STEPS</h2>
            <p className="hw-section-sub r r-d2">Each step is designed to save you time without taking away your control.</p>
          </div>

          {/* Progress tracker */}
          <div className="r r-d2" style={{ marginBottom: 64 }}>
            <ProgressTrack active={activeStep} />
          </div>

          {/* Step cards */}
          <div>
            {steps.map((step, i) => (
              <StepCard key={step.n} step={step} index={i} isActive={activeStep === i} onEnter={() => setStep(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* DARK BAND */}
      <section className="hw-band">
        <div className="hw-band-ghost">SMART</div>
        <div className="hw-band-inner">
          <div className="r">
            <div className="hw-section-label" style={{ color: 'var(--orange)' }}>The Difference</div>
            <h2 className="hw-band-h2">NOT AUTO-APPLY.<br /><span className="hw-orange">AUTO-PREPARE.</span></h2>
            <p className="hw-band-sub">Finch isn't a spray-and-pray bot. Every application is tailored, reviewed by you, and optimized before it ever hits an ATS. You apply less. You hear back more.</p>
          </div>
          <div className="hw-band-cards">
            {[
              { icon: '🎯', bg: 'rgba(224,150,67,0.15)', title: 'Targeted, not mass', body: 'Finch focuses you on roles you actually qualify for — not 200 long shots.' },
              { icon: '✅', bg: 'rgba(34,197,94,0.12)', title: 'You always review first', body: 'The extension stops at the review page. You click submit. Always.' },
              { icon: '🔍', bg: 'rgba(212,60,51,0.12)', title: 'ATS-matched every time', body: 'Every resume is re-weighted against the job description before submission.' },
            ].map((item, i) => (
              <div key={i} className={`hw-band-card r r-d${i + 1}`}>
                <div className="hw-band-ico" style={{ background: item.bg }}>{item.icon}</div>
                <div>
                  <div className="hw-band-card-title">{item.title}</div>
                  <div className="hw-band-card-body">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="hw-features">
        <div className="hw-features-inner">
          <div className="hw-section-center">
            <div className="hw-section-label r">The Product</div>
            <h2 className="hw-section-h2 r r-d1">EVERYTHING YOU NEED<br />TO WIN THE SEARCH.</h2>
            <p className="hw-section-sub r r-d2">One Chrome extension. One profile. Unlimited tailored applications.</p>
          </div>
          <div className="hw-feat-grid">
            {features.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hw-footer">
        <div className="hw-foot-inner">
          <div className="hw-foot-top">
            <div>
              <div className="hw-foot-brand">🐦 FINCH</div>
              <div className="hw-foot-tagline">Apply less. Win more.</div>
            </div>
            <div className="hw-foot-links">
              <a href="/#problem" className="hw-foot-link">Why Finch</a>
              <a href="/how-it-works" className="hw-foot-link">How It Works</a>
              <a href="/#pricing" className="hw-foot-link">Pricing</a>
              <a href="/#team" className="hw-foot-link">Team</a>
              <a href="/contact" className="hw-foot-link">Contact</a>
              <a href="/#waitlist" className="hw-foot-link">Get Access</a>
            </div>
          </div>
          <div className="hw-foot-bottom">
            <span className="hw-foot-copy">© 2025 Finch. Built at Texas A&M University.</span>
            <span className="hw-foot-copy">Made by students, for students.</span>
          </div>
        </div>
      </footer>
    </>
  )
}