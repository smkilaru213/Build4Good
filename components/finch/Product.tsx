const features = [
  {
    icon: '🔗',
    title: 'LinkedIn Integration',
    body: 'Connect once and Finch builds your full candidate profile automatically. No manual data entry, no copy-pasting.',
  },
  {
    icon: '⚡',
    title: 'Instant Resume Tailoring',
    body: 'For every job you apply to, Finch generates a tailored resume that matches the role\'s exact requirements — in seconds.',
  },
  {
    icon: '✍️',
    title: 'Cover Letter Generation',
    body: 'Personalized cover letters that sound like you, not like AI. Generated from your profile and the job description.',
  },
  {
    icon: '🤖',
    title: 'Smart Autofill',
    body: 'The Chrome extension fills every field in Greenhouse, Lever, and Workday automatically — including file uploads.',
  },
  {
    icon: '🎯',
    title: 'ATS Optimization',
    body: 'Finch analyzes your resume against ATS filters before you submit, so you actually get seen by a human.',
  },
  {
    icon: '📊',
    title: 'Application Tracking',
    body: 'See every application you\'ve sent, its status, and which roles are worth following up on — all in one place.',
  },
]

export function Product() {
  return (
    <section id="product" className="hiw-product" aria-labelledby="hiw-product-heading">
      <div className="hiw-container">
        <header className="hiw-product-head reveal">
          <div>
            <span className="hiw-pill">The product</span>
            <h2 id="hiw-product-heading" className="hiw-title" style={{ marginBottom: 0 }}>
              Everything you need to win the search
            </h2>
          </div>
          <p className="hiw-product-sub hiw-product-head-right reveal reveal-d1">
            One Chrome extension. One profile. Unlimited tailored applications.
          </p>
        </header>

        <div className="hiw-feature-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`hiw-feature-card reveal reveal-d${Math.min(i + 1, 4)}`}
            >
              <div className="hiw-feature-icon" aria-hidden>
                {f.icon}
              </div>
              <h3 className="hiw-feature-title">{f.title}</h3>
              <p className="hiw-feature-body">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="hiw-cta-row reveal">
          <a href="/#waitlist" className="hiw-cta">
            Get early access →
          </a>
        </div>
      </div>
    </section>
  )
}
