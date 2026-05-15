function InsightCard({ insight }) {
  return (
    <article className="analytics-insight-card">
      <span>{insight.title}</span>
      <strong>{insight.count} 条</strong>
      <p>{insight.text}</p>
    </article>
  )
}

function AnalyticsDashboard({ analytics }) {
  if (!analytics || analytics.isEmpty) {
    return (
      <section className="surface-panel analytics-dashboard">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Analytics</p>
            <h2>真实数据分析</h2>
          </div>
          <span className="section-caption">全部记录</span>
        </div>

        <div className="empty-state analytics-empty">
          <strong>还没有足够的记录形成分析</strong>
          <p>写下第一条心情后，这里会慢慢出现总览、趋势和温柔回顾。</p>
        </div>
      </section>
    )
  }

  return (
    <section className="surface-panel analytics-dashboard">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>真实数据分析</h2>
        </div>
        <span className="section-caption">基于全部记录</span>
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

      <div className="analytics-insights">
        <InsightCard insight={analytics.todayInsight} />
        <InsightCard insight={analytics.weekInsight} />
        <InsightCard insight={analytics.monthInsight} />
      </div>

      <div className="analytics-content">
        <section className="analytics-panel">
          <div className="panel-heading">
            <p className="eyebrow">Mood Mix</p>
            <h3>情绪分布</h3>
          </div>

          {analytics.moodDistribution.length === 0 ? (
            <p className="soft-note">还没有形成情绪分布。</p>
          ) : (
            <div className="mood-bars">
              {analytics.moodDistribution.map((bar) => (
                <div className="mood-bar-row" key={bar.label}>
                  <span>{bar.label}</span>
                  <div className="mood-bar-track">
                    <i style={{ width: `${bar.percent}%`, background: bar.color }}></i>
                  </div>
                  <strong>{bar.percent}%</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="analytics-panel">
          <div className="panel-heading">
            <p className="eyebrow">7 Days</p>
            <h3>最近 7 天</h3>
          </div>

          <div className="weekly-chart" aria-label="最近 7 天记录统计">
            {analytics.last7DaysStats.map((point) => (
              <div className="chart-column" key={point.dateKey}>
                <span style={{ height: `${point.percent}%` }}></span>
                <small>{point.label}</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="analytics-panel">
        <div className="panel-heading">
          <p className="eyebrow">30 Days</p>
          <h3>最近 30 天趋势</h3>
        </div>

        <div className="trend-strip" aria-label="最近 30 天记录趋势">
          {analytics.last30DaysTrend.map((point) => (
            <span
              className={point.count > 0 ? 'trend-dot has-record' : 'trend-dot'}
              key={point.dateKey}
              style={{ height: `${point.percent}%` }}
              title={`${point.label}: ${point.count} 条`}
            ></span>
          ))}
        </div>
      </section>

      <div className="analytics-detail-grid">
        <section className="analytics-panel">
          <div className="panel-heading">
            <p className="eyebrow">Intensity</p>
            <h3>心情强度</h3>
          </div>

          <div className="stat-list">
            <span>平均强度</span>
            <strong>{analytics.intensityStats.averageText} / 5</strong>
            <span>高强度记录</span>
            <strong>{analytics.intensityStats.highCount} 条</strong>
            <span>低强度记录</span>
            <strong>{analytics.intensityStats.lowCount} 条</strong>
          </div>
        </section>

        <section className="analytics-panel">
          <div className="panel-heading">
            <p className="eyebrow">Tags</p>
            <h3>标签 Top 5</h3>
          </div>

          {analytics.topTags.length === 0 ? (
            <p className="soft-note">还没有常用标签。</p>
          ) : (
            <div className="tag-rank-list">
              {analytics.topTags.map((tag) => (
                <div className="tag-rank-row" key={tag.label}>
                  <span>{tag.label}</span>
                  <div className="mood-bar-track">
                    <i style={{ width: `${tag.percent}%` }}></i>
                  </div>
                  <strong>{tag.count}</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="analytics-panel">
          <div className="panel-heading">
            <p className="eyebrow">Favorites</p>
            <h3>收藏回顾</h3>
          </div>

          <p className="soft-note">共收藏 {analytics.favoriteSummary.count} 条记录。</p>
          {analytics.favoriteSummary.recent.length > 0 ? (
            <div className="favorite-list">
              {analytics.favoriteSummary.recent.map((record) => (
                <article key={record.id}>
                  <strong>
                    {record.moodIcon} {record.emotionLabel}
                  </strong>
                  <span>{record.date}</span>
                  <p>{record.note}</p>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </div>

      <div className="analytics-review">
        <article>
          <span>连续记录</span>
          <strong>{analytics.streakDays} 天</strong>
          <p>从今天向前计算，记录只表示留下痕迹，不代表状态好坏。</p>
        </article>
        <article>
          <span>本周回顾</span>
          <p>{analytics.weeklySummary}</p>
        </article>
        <article>
          <span>本月回顾</span>
          <p>{analytics.monthlySummary}</p>
        </article>
      </div>
    </section>
  )
}

export default AnalyticsDashboard
