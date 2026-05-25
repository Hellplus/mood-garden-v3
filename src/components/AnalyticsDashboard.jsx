import { analyticsIcons, emptyStateImages, getMoodIconAsset } from '../assets/uiAssets.js'
import { getRecordView } from '../utils/records.js'

function getMobileReviewContentClass(activeView, views, className = '') {
  const visibleViews = Array.isArray(views) ? views : [views]

  return [
    className,
    'mobile-review-content',
    visibleViews.includes(activeView) ? 'is-mobile-review-active' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function InsightCard({ insight, icon, className = '' }) {
  return (
    <article className={['analytics-insight-card', className].filter(Boolean).join(' ')}>
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

function TodayReviewPanel({ records = [], onGoToRecord = () => {} }) {
  const todayLabel = new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date())

  return (
    <section className="analytics-panel today-review-panel">
      <div className="panel-heading">
        <h3 className="heading-with-icon">
          <img
            alt=""
            aria-hidden="true"
            className="review-icon review-icon--wide"
            src={analyticsIcons.reviewToday}
          />
          今日小日历
        </h3>
      </div>

      <div className="today-review-card">
        <div className="today-review-date">
          <strong>{todayLabel}</strong>
          <span>{records.length} 条记录</span>
        </div>

        {records.length > 0 ? (
          <div className="today-review-list">
            {records.slice(0, 2).map((record) => {
              const view = getRecordView(record)

              return (
                <article key={record.id}>
                  <img
                    alt=""
                    aria-hidden="true"
                    className="mood-icon mood-icon--recent"
                    src={getMoodIconAsset(record)}
                  />
                  <span>
                    <strong>{view.emotionLabel}</strong>
                    <small>{view.note}</small>
                  </span>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="empty-state compact-empty today-review-empty">
            <img
              alt=""
              aria-hidden="true"
              className="ui-illustration ui-illustration--sm empty-state-asset"
              src={emptyStateImages.todayNoFlower}
            />
            <strong>今天还没有种花</strong>
            <p>选一个此刻的心情，给今天留一朵小花。</p>
          </div>
        )}

        <button className="secondary-action" type="button" onClick={onGoToRecord}>
          去记录
        </button>
      </div>
    </section>
  )
}

function AnalyticsDashboard({
  analytics,
  mobileView = 'today',
  todayRecords = [],
  onGoToRecord = () => {},
}) {
  if (!analytics || analytics.isEmpty) {
    return (
      <section className="surface-panel analytics-dashboard">
        <div className="section-heading">
          <div>
            <h2>数据回顾</h2>
          </div>
          <span className="section-caption">全部记录</span>
        </div>

        <div className="empty-state analytics-empty">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--md empty-state-asset"
            src={emptyStateImages.analyticsInsufficient}
          />
          <strong>记录还不够形成回顾</strong>
          <p>写下第一条心情后，这里会慢慢出现总览、趋势和温柔回顾。</p>
          <button className="secondary-action" type="button" onClick={onGoToRecord}>
            去记录
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="surface-panel analytics-dashboard">
      <div className="section-heading analytics-dashboard-heading">
        <div>
          <h2>数据回顾</h2>
        </div>
        <span className="section-caption">基于全部记录</span>
      </div>

      <div className={getMobileReviewContentClass(mobileView, 'today', 'analytics-summary')}>
        {analytics.summaryCards.map((card) => (
          <article className="analytics-tile" key={card.label}>
            <img
              alt=""
              aria-hidden="true"
              className="analytics-icon analytics-icon--tile"
              src={analyticsIcons.overview}
            />
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.hint}</small>
          </article>
        ))}
      </div>

      <div className={getMobileReviewContentClass(mobileView, 'today')}>
        <TodayReviewPanel records={todayRecords} onGoToRecord={onGoToRecord} />
      </div>

      <div className="analytics-insights">
        <InsightCard
          className={getMobileReviewContentClass(mobileView, 'today')}
          icon={analyticsIcons.today}
          insight={analytics.todayInsight}
        />
        <InsightCard
          className={getMobileReviewContentClass(mobileView, 'week')}
          icon={analyticsIcons.week}
          insight={analytics.weekInsight}
        />
        <InsightCard
          className={getMobileReviewContentClass(mobileView, 'month')}
          icon={analyticsIcons.month}
          insight={analytics.monthInsight}
        />
      </div>

      <div className="analytics-content">
        <section className={getMobileReviewContentClass(mobileView, 'month', 'analytics-panel')}>
          <div className="panel-heading">
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsIcons.overview}
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

        <section className={getMobileReviewContentClass(mobileView, 'week', 'analytics-panel')}>
          <div className="panel-heading">
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsIcons.trend}
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

      <section className={getMobileReviewContentClass(mobileView, 'month', 'analytics-panel')}>
        <div className="panel-heading">
          <h3 className="heading-with-icon">
            <img
              alt=""
              aria-hidden="true"
              className="analytics-icon analytics-icon--heading"
              src={analyticsIcons.month}
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
        <section
          className={getMobileReviewContentClass(
            mobileView,
            ['today', 'month'],
            'analytics-panel',
          )}
        >
          <div className="panel-heading">
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--wide"
                src={analyticsIcons.intensity}
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

        <section
          className={getMobileReviewContentClass(
            mobileView,
            ['week', 'month'],
            'analytics-panel',
          )}
        >
          <div className="panel-heading">
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsIcons.tags}
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

        <section className={getMobileReviewContentClass(mobileView, 'month', 'analytics-panel')}>
          <div className="panel-heading">
            <h3 className="heading-with-icon">
              <img
                alt=""
                aria-hidden="true"
                className="analytics-icon analytics-icon--heading"
                src={analyticsIcons.favorite}
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
          ) : (
            <div className="empty-state compact-empty">
              <img
                alt=""
                aria-hidden="true"
                className="ui-illustration ui-illustration--sm empty-state-asset"
                src={emptyStateImages.noFavorites}
              />
              <strong>还没有收藏的瞬间</strong>
              <p>遇到想保留的心情，可以轻轻点一下星星。</p>
            </div>
          )}
        </section>
      </div>

      <div className="analytics-review">
        <article className={getMobileReviewContentClass(mobileView, 'week')}>
          <div className="card-header card-header--with-icon analytics-card-header">
            <img
              alt=""
              aria-hidden="true"
              className="analytics-icon analytics-icon--heading"
              src={analyticsIcons.streak}
            />
            <span>连续记录</span>
          </div>
          <strong>{analytics.streakDays} 天</strong>
          <p>从今天向前计算，记录只表示留下痕迹，不代表状态好坏。</p>
        </article>
        <article className={getMobileReviewContentClass(mobileView, 'week')}>
          <div className="card-header card-header--with-icon analytics-card-header">
            <img
              alt=""
              aria-hidden="true"
              className="review-icon review-icon--wide"
              src={analyticsIcons.reviewWeek}
            />
            <span>本周回顾</span>
          </div>
          <p>{analytics.weeklySummary}</p>
        </article>
        <article className={getMobileReviewContentClass(mobileView, 'month')}>
          <div className="card-header card-header--with-icon analytics-card-header">
            <img
              alt=""
              aria-hidden="true"
              className="review-icon review-icon--wide"
              src={analyticsIcons.reviewMonth}
            />
            <span>本月回顾</span>
          </div>
          <p>{analytics.monthlySummary}</p>
        </article>
      </div>

      <article
        className={getMobileReviewContentClass(
          mobileView,
          ['today', 'week', 'month'],
          'analytics-encouragement',
        )}
      >
        <div>
          <strong>再多记录几天，趋势会更清楚</strong>
          <p>不用急着分析自己，先把每一天轻轻留下来。</p>
        </div>
        <button className="primary-action" type="button" onClick={onGoToRecord}>
          去记录
        </button>
      </article>
    </section>
  )
}

export default AnalyticsDashboard
