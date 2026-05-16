import { getRecordView } from '../utils/records.js'
import { decorationImages, getEmotionAssetKey, getFlowerAsset, strengthIcons } from '../assets/uiAssets.js'

function TodayStatusCard({ record }) {
  const view = record ? getRecordView(record) : null
  const flowerKey = getEmotionAssetKey(record)
  const flowerImage = getFlowerAsset(record)

  return (
    <article className="surface-panel today-status">
      <img
        alt=""
        aria-hidden="true"
        className="today-status-decoration"
        src={decorationImages.leafSprig}
      />
      <div className="panel-heading">
        <p className="eyebrow">Today</p>
        <h2>今日状态</h2>
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
          <span>选一个情绪，写下一句话，第一朵花就会出现。</span>
        </div>
      )}
    </article>
  )
}

export default TodayStatusCard
