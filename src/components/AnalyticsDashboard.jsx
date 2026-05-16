import emptyAnalyticsImage from '../assets/ui/empty-states/empty-analytics-insufficient.png'
import analyticsFavoriteIcon from '../assets/ui/icons/analytics-favorite.png'
import analyticsIntensityIcon from '../assets/ui/icons/analytics-intensity.png'
import analyticsMonthIcon from '../assets/ui/icons/analytics-month.png'
import analyticsOverviewIcon from '../assets/ui/icons/analytics-overview.png'
import analyticsStreakIcon from '../assets/ui/icons/analytics-streak.png'
import analyticsTagsIcon from '../assets/ui/icons/analytics-tags.png'
import analyticsTodayIcon from '../assets/ui/icons/analytics-today.png'
import analyticsTrendIcon from '../assets/ui/icons/analytics-trend.png'
import analyticsWeekIcon from '../assets/ui/icons/analytics-week.png'
import reviewMonthIcon from '../assets/ui/icons/review-month.png'
import reviewWeekIcon from '../assets/ui/icons/review-week.png'
import { getMoodIconAsset } from '../utils/uiAssets.js'

function InsightCard({ insight, icon }) {
  return (
    <article className="analytics-insight-card">
      <div className="card-header card-header--with-icon analytics-card-header">
        <img alt="" aria-hidden="true" className="analytics-icon analytics-icon--panel" src={icon} />
        <div className="card-title-group">
          <span className="card-subtitle">{insight.title}</span>
          <strong className="analytics-count">{insight.count} 条</strong>
        </div>
      </div>
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
            <h2>数据回顾</h2>
          </div>
          <span className="section-caption">全部记录</span>
        </div>

        <div className="empty-state analytics-empty">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--md empty-state-asset"
            src={emptyAnalyticsImage}
          />
          <strong>记录还不够形成回顾</strong>
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
          <h2>数据回顾</h2>
        </div>
        <span className="section-caption">基于全部记录</span>
      </div>

      <div className="analytics-summary">
        {analytics.summaryCards.map((card) => (
          <article className="analytics-tile" key={card.label}>
            <img
              alt=""
              aria-hidden="true"
              className="analytics-icon analytics-icon--tile"
              src={analyticsOverviewIcon}
            />
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.hint}</small>
          </article>
        ))}
      </div>

      <div className="analytics-insights">
        <InsightCard icon={analyticsTodayIcon} insight={analytics.todayInsight} />
        <InsightCard icon={analyticsWeekIcon} insight={analytics.weekInsight} />
        <InsightCard icon={analyticsMonthIcon} insight={analytics.monthInsight} />
      </div>

      <div className="analytics-content">
        <section className="analytics-panel">
          <div className="panel-heading">
            <p className="eyebrow">Mood Mix</p>
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsOverviewIcon}
              />
              情绪分布
            </h3>
          </div>

          {analytics.moodDistribution.length === 0 ? (
            <p className="soft-note">记录还不多，情绪分布会在这里慢慢出现。</p>
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
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsTrendIcon}
              />
              最近 7 天
            </h3>
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
          <h3 className="heading-with-icon">
            <img
              alt=""
              aria-hidden="true"
              className="analytics-icon analytics-icon--heading"
              src={analyticsTrendIcon}
            />
            最近 30 天趋势
          </h3>
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
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--wide"
                src={analyticsIntensityIcon}
              />
              心情强度
            </h3>
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
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsTagsIcon}
              />
              标签 Top 5
            </h3>
          </div>

          {analytics.topTags.length === 0 ? (
            <p className="soft-note">还没有常用标签。记录时加上标签后，这里会开始整理。</p>
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
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsFavoriteIcon}
              />
              收藏回顾
            </h3>
          </div>

          <p className="soft-note">共收藏 {analytics.favoriteSummary.count} 条记录。</p>
          {analytics.favoriteSummary.recent.length > 0 ? (
            <div className="favorite-list">
              {analytics.favoriteSummary.recent.map((record) => (
                <article key={record.id}>
                  <strong>
                    <img
                      alt=""
                      aria-hidden="true"
                      className="mood-icon mood-icon--recent"
                      src={getMoodIconAsset(record)}
                    />
                    {record.emotionLabel}
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
          <div className="card-header card-header--with-icon analytics-card-header">
            <img
              alt=""
              aria-hidden="true"
              className="analytics-icon analytics-icon--heading"
              src={analyticsStreakIcon}
            />
            <span>连续记录</span>
          </div>
          <strong>{analytics.streakDays} 天</strong>
          <p>从今天向前计算，记录只表示留下痕迹，不代表状态好坏。</p>
        </article>
        <article>
          <div className="card-header card-header--with-icon analytics-card-header">
            <img
              alt=""
              aria-hidden="true"
              className="review-icon review-icon--wide"
              src={reviewWeekIcon}
            />
            <span>本周回顾</span>
          </div>
          <p>{analytics.weeklySummary}</p>
        </article>
        <article>
          <div className="card-header card-header--with-icon analytics-card-header">
            <img
              alt=""
              aria-hidden="true"
              className="review-icon review-icon--wide"
              src={reviewMonthIcon}
            />
            <span>本月回顾</span>
          </div>
          <p>{analytics.monthlySummary}</p>
        </article>
      </div>
    </section>
  )
}

export default AnalyticsDashboard
