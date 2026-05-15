function TodayStatusCard({ record }) {
  return (
    <article className="surface-panel today-status">
      <div className="panel-heading">
        <p className="eyebrow">Today</p>
        <h2>今日状态</h2>
      </div>

      <div className="mood-orbit" aria-hidden="true">
        <span></span>
      </div>

      <div className="today-status-body">
        <p className="status-label">{record.mood}</p>
        <strong>{record.intensity}%</strong>
        <span>情绪强度预览</span>
      </div>

      <div className="progress-track" aria-label={`情绪强度 ${record.intensity}%`}>
        <span style={{ width: `${record.intensity}%` }}></span>
      </div>

      <p className="soft-note">{record.flowerName} 正在盛开。</p>
    </article>
  )
}

export default TodayStatusCard
