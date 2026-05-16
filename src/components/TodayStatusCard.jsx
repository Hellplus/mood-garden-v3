import { getRecordView } from '../utils/records.js'
import { getFlowerAsset } from '../utils/uiAssets.js'

function TodayStatusCard({ record }) {
  const view = record ? getRecordView(record) : null
  const flowerImage = getFlowerAsset(record)

  return (
    <article className="surface-panel today-status">
      <div className="panel-heading">
        <p className="eyebrow">Today</p>
        <h2>今日状态</h2>
      </div>

      <div className="mood-orbit flower-visual flower-visual--today" aria-hidden="true">
        <img alt="" className="flower-asset" src={flowerImage} />
      </div>

      {view ? (
        <>
          <div className="today-status-body">
            <p className="status-label">{view.emotionLabel}</p>
            <strong>{view.intensityText}</strong>
            <span>情绪强度</span>
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
