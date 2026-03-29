'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email && form.message) setSent(true)
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '13px 16px',
    borderRadius: 8,
    border: `1.5px solid ${focused === name ? '#24364C' : 'rgba(26,26,26,0.12)'}`,
    background: focused === name ? 'rgba(36,54,76,0.03)' : 'white',
    fontFamily: 'Manrope, sans-serif',
    fontSize: 14,
    color: '#1a1a1a',
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: focused === name ? '0 0 0 3px rgba(36,54,76,0.06)' : 'none',
  })

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Manrope, sans-serif',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#888',
    display: 'block',
    marginBottom: 6,
  }

  const team = [
    { init: 'NG', name: 'Nicanor Garza-Zazueta', role: 'CEO & Co-founder', email: 'nicanor14gz@tamu.edu', color: '#24364C' },
    { init: 'JT', name: 'Jose Tirado', role: 'CTO & Co-founder', email: 'jmtirador@tamu.edu', color: '#D43C33' },
    { init: 'CLP', name: 'Carlos Luna Pena', role: 'Technical Lead', email: 'carlunpen@tamu.edu', color: '#E09643' },
  ]

  return (
    <div style={{ background: '#F5F0E8', minHeight: '100vh', fontFamily: 'Manrope, sans-serif', color: '#1a1a1a' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(26,26,26,0.08)',
        padding: '0 clamp(24px,5vw,80px)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: '#24364C',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>🐦</div>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 24, fontWeight: 800, letterSpacing: 2, color: '#24364C' }}>Finch</span>
          </Link>
          <Link href="/" style={{
            fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 500,
            color: '#1a1a1a', opacity: 0.55, textDecoration: 'none',
          }}>
            ← Back to home
          </Link>
        </div>
      </nav>

      {/* Main */}
      <main style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(120px,14vw,160px) clamp(24px,5vw,80px) clamp(80px,10vw,120px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(60px,8vw,120px)',
          alignItems: 'start',
        }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700,
              letterSpacing: 3, textTransform: 'uppercase', color: '#D43C33', marginBottom: 16,
            }}>Contact</p>

            <h1 style={{
              fontFamily: 'Nunito, sans-serif', fontWeight: 900,
              fontSize: 'clamp(52px,7vw,96px)',
              lineHeight: 0.9, color: '#24364C', marginBottom: 24,
            }}>LET'S<br />TALK.</h1>

            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 16, lineHeight: 1.7,
              opacity: 0.55, fontWeight: 300, marginBottom: 52, maxWidth: 380,
            }}>
              Have a question about Finch? Want to partner with us? Or just want to say hi? We're three Aggies who actually reply.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {team.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: m.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, color: 'white',
                  }}>{m.init}</div>
                  <div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{m.name}</div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: m.color, marginBottom: 3 }}>{m.role}</div>
                    <a href={`mailto:${m.email}`} style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#aaa', textDecoration: 'none' }}>{m.email}</a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: 52, paddingTop: 32, borderTop: '1px solid rgba(26,26,26,0.08)' }}>
              <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 16, color: '#1a1a1a', opacity: 0.4, lineHeight: 1.6 }}>
                "We typically respond within 24 hours. If it's urgent, email us directly."
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{
                    background: 'white', borderRadius: 16,
                    padding: 'clamp(36px,5vw,52px)',
                    border: '1px solid rgba(26,26,26,0.07)',
                    boxShadow: '0 4px 40px rgba(26,26,26,0.06)',
                  }}>
                    <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 32, color: '#24364C', marginBottom: 6, letterSpacing: 0.5 }}>
                      Send us a message
                    </h2>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, opacity: 0.45, marginBottom: 32, fontWeight: 300 }}>
                      We read every message. Promise.
                    </p>

                    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                          <label style={labelStyle}>Name</label>
                          <input name="name" value={form.name} onChange={handle} required placeholder="Your name"
                            onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                            style={inputStyle('name')} />
                        </div>
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@email.com"
                            onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                            style={inputStyle('email')} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Topic</label>
                        <select name="subject" value={form.subject} onChange={handle}
                          onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                          style={{ ...inputStyle('subject'), appearance: 'none', cursor: 'pointer', color: form.subject ? '#1a1a1a' : 'rgba(26,26,26,0.25)' }}>
                          <option value="" disabled>What's this about?</option>
                          <option value="general">General question</option>
                          <option value="partnership">University partnership</option>
                          <option value="press">Press & media</option>
                          <option value="bug">Bug report</option>
                          <option value="feedback">Product feedback</option>
                          <option value="other">Something else</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Message</label>
                        <textarea name="message" value={form.message} onChange={handle} required
                          placeholder="Tell us what's on your mind..." rows={5}
                          onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                          style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.65, minHeight: 130 }} />
                      </div>

                      <button type="submit"
                        style={{
                          padding: '15px 28px', borderRadius: 8, border: 'none', cursor: 'pointer',
                          background: '#D43C33', color: 'white',
                          fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 800,
                          letterSpacing: 0.5, transition: 'all 0.25s', width: '100%', marginTop: 4,
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = '#bf3530'
                          ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(212,60,51,0.3)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = '#D43C33'
                          ;(e.currentTarget as HTMLButtonElement).style.transform = 'none'
                          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
                        }}
                      >Send Message →</button>

                      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, opacity: 0.35, textAlign: 'center', fontWeight: 300 }}>
                        We typically respond within 24 hours.
                      </p>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                  style={{
                    background: '#24364C', borderRadius: 16,
                    padding: 'clamp(48px,6vw,64px)', textAlign: 'center',
                    boxShadow: '0 4px 40px rgba(36,54,76,0.2)',
                  }}>
                  <div style={{ fontSize: 56, marginBottom: 24 }}>🐦</div>
                  <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 52, color: 'white', marginBottom: 14, letterSpacing: 0.5 }}>
                    Message Sent!
                  </h2>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>
                    Thanks {form.name.split(' ')[0]}! We read every message and will get back to you within 24 hours.
                  </p>
                  <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 17, color: 'rgba(255,255,255,0.35)', marginBottom: 40 }}>
                    — The Finch Team
                  </p>
                  <Link href="/" style={{
                    fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
                    background: '#E09643', color: 'white',
                    padding: '13px 28px', borderRadius: 8, textDecoration: 'none', display: 'inline-block',
                  }}>← Back to Finch</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  )
}