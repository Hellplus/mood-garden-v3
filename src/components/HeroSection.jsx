import { decorationImages } from '../assets/uiAssets.js'

function HeroSection({ content }) {
  return (
    <header className="hero-section">
      <img
        alt=""
        aria-hidden="true"
        className="hero-decoration hero-decoration--cloud"
        src={decorationImages.heroSoftCloud}
      />
      <img
        alt=""
        aria-hidden="true"
        className="hero-decoration hero-decoration--star"
        src={decorationImages.heroFloatingStar}
      />
      <div className="brand-row">
        <img alt="" aria-hidden="true" className="brand-mark-asset" src={decorationImages.brandFlower} />
        <span>{content.eyebrow}</span>
      </div>

      <div className="hero-layout">
        <div className="hero-copy-stack">
          <h1>{content.title}</h1>
          <p className="hero-greeting">{content.greeting}</p>
          <p className="hero-copy">{content.description}</p>
        </div>

        <div className="hero-side">
          <div className="hero-visual-card" aria-hidden="true">
            <img className="hero-window-plant" src={decorationImages.softWindowPlant} alt="" />
            <img className="hero-garden-corner" src={decorationImages.heroGardenCorner} alt="" />
            <img className="hero-leaf-sprig" src={decorationImages.leafSprig} alt="" />
          </div>

          {content.metrics.length > 0 ? (
            <div className="hero-metrics" aria-label="静态概览指标">
              {content.metrics.map((metric) => (
                <article className="metric-tile" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.hint}</small>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default HeroSection
