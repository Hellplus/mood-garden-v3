function AnalyticsDashboard({ analytics }) {
  return (
    <section className="surface-panel analytics-dashboard">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>情绪分析预览</h2>
        </div>
        <span className="section-caption">mock 数据</span>
      </div>

      <div className="analytics-summary">
        {analytics.summaryCards.map((card) => (
          <article className="analytics-tile" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.hint}</small>
          </article>
        ))}
      </div>

      <div className="analytics-content">
        <div className="mood-bars">
          {analytics.moodBars.map((bar) => (
            <div className="mood-bar-row" key={bar.label}>
              <span>{bar.label}</span>
              <div className="mood-bar-track">
                <i style={{ width: `${bar.value}%`, background: bar.color }}></i>
              </div>
              <strong>{bar.value}%</strong>
            </div>
          ))}
        </div>

        <div className="weekly-chart" aria-label="静态本周曲线">
          {analytics.weeklyCurve.map((point) => (
            <div className="chart-column" key={point.label}>
              <span style={{ height: `${point.value}%` }}></span>
              <small>{point.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnalyticsDashboard
