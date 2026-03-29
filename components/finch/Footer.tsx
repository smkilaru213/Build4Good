export function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <div>
            <div className="foot-brand">🐦 FINCH</div>
            <div className="foot-tagline">Fewer applications. More interviews.</div>
          </div>
          <div className="foot-links">
            {[
              ['/#problem', 'Problem'],
              ['/how-it-works', 'How It Works'],
              ['/#pricing', 'Pricing'],
              ['/#team', 'Team'],
              ['/#faq', 'FAQ'],
              ['/#waitlist', 'Join Waitlist'],
            ].map(([href, label]) => (
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
