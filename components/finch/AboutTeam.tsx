'use client'

export function AboutTeam({
  transparentBackground = false,
  contentPanelBackground,
  missionCenterWhite = false,
}: {
  transparentBackground?: boolean
  contentPanelBackground?: string
  missionCenterWhite?: boolean
} = {}) {
  const members = [
    { init: 'NG', name: 'Nicanor Garza-Zazueta', role: 'CEO & Co-founder', bio: 'Industrial Distribution Engineering at Texas A&M. Meloy Fellows Grant recipient. Operates at the intersection of entrepreneurship, strategy, and execution.', email: 'nicanor14gz@tamu.edu', bg: '#24364C' },
    { init: 'JT', name: 'Jose Tirado', role: 'CTO & Co-founder', bio: 'Industrial Engineering at Texas A&M. Driven by analytical thinking to create practical, measurable impact. Focused on streamlining all people and operations within Finch.', email: 'jmtirador@tamu.edu', bg: '#D43C33' },
    { init: 'CLP', name: 'Carlos Luna Pena', role: 'Technical Lead & Co-founder', bio: 'CS at Texas A&M with a cybersecurity minor. Built AIPHRODITE with FastAPI and Hugging Face. His work spans Python, LangChain, LaTeX resume generation, and LinkedIn scraping.', email: 'carlunpen@tamu.edu', bg: '#E09643' },
  ]

  const glassCard = {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.12)',
    padding: 'clamp(20px, 3vw, 32px)',
    boxSizing: 'border-box' as const,
  }

  return (
    <section id="team" style={{
      background: transparentBackground ? 'transparent' : '#24364C',
      padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}>

        {missionCenterWhite ? (
          <>
            <div className="reveal">
              <p style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: 16,
              }}>
                About
              </p>

              <h2 style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(52px, 6vw, 92px)',
                lineHeight: 0.95,
                color: 'white',
                marginBottom: 24,
              }}>
                BUILT BY STUDENTS WHO GOT TIRED OF GETTING GHOSTED.
              </h2>

              <p style={{
                fontFamily: 'Instrument Serif, serif',
                fontStyle: 'italic',
                fontSize: 20,
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: 640,
              }}>
                "We understood the pain firsthand — and thought there had to be a smarter way."
              </p>

              <p style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: 640,
              }}>
                Carlos was applying to internships as a CS major and getting zero responses from mass applications. He built a backend that minimized the number of applications while maximizing his interview rate. Nicanor and Jose joined to turn it into something real.
              </p>
            </div>

            <div className="reveal reveal-d1" style={{ ...glassCard }}>
              {[
                { label: 'Mission', text: 'Transform the internship process from a frustrating numbers game into an intentional, data-driven strategy that helps students earn the opportunities they deserve.' },
                { label: 'Vision', text: 'Become the default infrastructure for early-career recruiting — replacing cold, volume-based systems with a smarter, outcome-driven approach.' },
                { label: 'Built at', text: 'Texas A&M University — College Station, TX. Supported by the Meloy Fellows Grant and AggieX.' },
              ].map((item, i) => (
                <div key={i} style={{
                  borderLeft: '2px solid rgba(224,150,67,0.5)',
                  paddingLeft: 20,
                  marginBottom: i < 2 ? 24 : 0,
                }}>
                  <div style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2.5,
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    marginBottom: 6,
                  }}>
                    {item.label}
                  </div>
                  <p style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

            <div className="reveal" style={{ ...glassCard }}>
              <p style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: 6,
              }}>
                The Team
              </p>

              <p style={{
                fontFamily: 'Instrument Serif, serif',
                fontStyle: 'italic',
                fontSize: 17,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 28,
              }}>
                Three Aggies who got tired of getting ghosted.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 2,
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                {members.map((m, i) => (
                  <div
                    key={i}
                    className={`reveal reveal-d${i + 1}`}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      padding: '28px 22px',
                      transition: 'background 0.3s',
                      cursor: 'default',
                    }}
                  >
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: m.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 900,
                      fontSize: 14,
                      color: 'white',
                      marginBottom: 14,
                    }}>
                      {m.init}
                    </div>

                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'white',
                      marginBottom: 4,
                    }}>
                      {m.name}
                    </div>

                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: m.bg === '#24364C' ? 'var(--orange)' : m.bg,
                      marginBottom: 12,
                    }}>
                      {m.role}
                    </div>

                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.65,
                      fontWeight: 300,
                      marginBottom: 14,
                    }}>
                      {m.bio}
                    </div>

                    <a href={`mailto:${m.email}`} style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.35)',
                      textDecoration: 'none'
                    }}>
                      {m.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

      </div>
    </section>
  )
}