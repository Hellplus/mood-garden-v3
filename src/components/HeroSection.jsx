import { decorationImages } from '../assets/uiAssets.js'

function HeroSection({ content }) {
  const metrics = content?.metrics || []

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
        <span>Mood Garden 情绪花园</span>
      </div>

      <div className="hero-layout">
        <div className="hero-copy-stack">
          <h1>今天想记录什么？</h1>
          <p className="hero-greeting">给此刻的心情留一朵小花。</p>
          <p className="hero-copy">写下一句话，之后再慢慢回看你的花园、月历和备份。</p>
        </div>

        <div className="hero-side">
          <div className="hero-visual-card" aria-hidden="true">
            <img className="hero-window-plant" src={decorationImages.softWindowPlant} alt="" />
            <img className="hero-garden-corner" src={decorationImages.heroGardenCorner} alt="" />
            <img className="hero-leaf-sprig" src={decorationImages.leafSprig} alt="" />
          </div>

          {metrics.length > 0 ? (
            <div className="hero-metrics" aria-label="花园概览">
              {metrics.map((metric) => (
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
