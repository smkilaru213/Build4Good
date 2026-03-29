import { steps } from './steps'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="hiw-steps" aria-labelledby="hiw-steps-heading">
      <div className="hiw-container">
        <header className="hiw-section-head reveal">
          <span className="hiw-pill">How it works</span>
          <h2 id="hiw-steps-heading" className="hiw-title">
            From sign-up to submit — in under a minute per app
          </h2>
          <p className="hiw-lede">
            Five focused steps. Finch handles the busywork so you can aim at the right roles and show up with tailored materials every time.
          </p>
        </header>

        <div className="hiw-bento">
          {steps.map((s, i) => {
            const featured = i === 0
            return (
              <article
                key={s.n}
                className={`hiw-bento-card ${featured ? 'hiw-bento-card--featured' : ''} reveal reveal-d${Math.min(i + 1, 4)}`}
              >
                <div className="hiw-step-num">{s.n}</div>
                <h3 className="hiw-card-title">{s.title}</h3>
                <p className="hiw-card-body">{s.body}</p>
                {featured ? (
                  <div className="hiw-glass-panel">{s.detail}</div>
                ) : (
                  <span className="hiw-card-meta">{s.detail}</span>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
