function HeroSection({ content }) {
  return (
    <header className="hero-section">
      <div className="brand-row">
        <span className="brand-mark" aria-hidden="true"></span>
        <span>{content.eyebrow}</span>
      </div>

      <div className="hero-layout">
        <div className="hero-copy-stack">
          <p className="eyebrow">Mood Journal</p>
          <h1>{content.title}</h1>
          <p className="hero-greeting">{content.greeting}</p>
          <p className="hero-copy">{content.description}</p>
        </div>

        <div className="hero-metrics" aria-label="静态概览指标">
          {content.metrics.map((metric) => (
            <article className="metric-tile" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.hint}</small>
            </article>
          ))}
        </div>
      </div>
    </header>
  )
}

export default HeroSection
