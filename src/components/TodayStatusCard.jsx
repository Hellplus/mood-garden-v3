import { getRecordView } from '../utils/records.js'

function TodayStatusCard({ record }) {
  const view = record ? getRecordView(record) : null

  return (
    <article className="surface-panel today-status">
      <div className="panel-heading">
        <p className="eyebrow">Today</p>
        <h2>今日状态</h2>
      </div>

      <div className="mood-orbit" aria-hidden="true">
        <span>{view?.moodIcon || '🌱'}</span>
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
          <p className="status-label">还没有记录</p>
          <strong>0 / 5</strong>
          <span>写下一句话，第一朵花就会出现。</span>
        </div>
      )}
    </article>
  )
}

export default TodayStatusCard
