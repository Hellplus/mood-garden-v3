import { getRecordView } from '../utils/records.js'
import { decorationImages, getEmotionAssetKey, getFlowerAsset, strengthIcons } from '../assets/uiAssets.js'
import todayStatusArrowImage from '../assets/ui/cards/recent-view-all-arrow.png'

function TodayStatusCard({ record, todayRecordCount = record ? 1 : 0 }) {
  const view = record ? getRecordView(record) : null
  const flowerKey = getEmotionAssetKey(record)
  const flowerImage = getFlowerAsset(record)
  const todayFlowerCount = todayRecordCount

  return (
    <article className="surface-panel today-status">
      <img
        alt=""
        aria-hidden="true"
        className="today-status-decoration"
        src={decorationImages.leafSprig}
      />
      <div className="panel-heading">
        <h2>今天的花</h2>
        <span className="today-status-arrow" aria-hidden="true">
          <img alt="" src={todayStatusArrowImage} />
        </span>
      </div>

      <div
        className={`today-flower-stage flower-visual flower-visual--today flower-visual--${flowerKey}`}
        aria-hidden="true"
      >
        <img alt="" className="flower-asset" src={flowerImage} />
      </div>

      {view ? (
        <>
          <div className="today-status-body">
            <p className="status-label">{view.emotionLabel}</p>
            <strong>{view.intensityText}</strong>
            <span>情绪强度</span>
          </div>

          <p className="today-status-count">
            记录 {todayRecordCount} 条 · 种了 {todayFlowerCount} 朵花
          </p>

          <div className="today-strength-flowers" aria-label={`情绪强度 ${view.intensityText}`}>
            {[1, 2, 3, 4, 5].map((level) => (
              <img
                alt=""
                aria-hidden="true"
                className="strength-flower-icon"
                key={level}
                src={level <= view.intensity ? strengthIcons.filled : strengthIcons.empty}
              />
            ))}
          </div>

          <div className="progress-track" aria-label={`情绪强度 ${view.intensityText}`}>
            <span style={{ width: `${view.intensityPercent}%` }}></span>
          </div>

          <p className="soft-note">{view.title} 正在花园里舒展。</p>
        </>
      ) : (
        <div className="today-empty">
          <p className="status-label">今天还没有记录</p>
          <strong>0 / 5</strong>
          <p className="today-status-count">记录 0 条 · 种了 0 朵花</p>
          <span>选一个此刻的心情，第一朵花就会出现。</span>
        </div>
      )}
    </article>
  )
}

export default TodayStatusCard
