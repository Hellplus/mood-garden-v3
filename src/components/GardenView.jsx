import FlowerCard from './FlowerCard.jsx'

function GardenView({
  records,
  selectedRecordId,
  onViewRecord,
  onEditRecord,
  onDeleteRecord,
  onToggleFavorite,
}) {
  return (
    <section className="garden-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Garden</p>
          <h2>我的情绪花园</h2>
        </div>
        <div className="garden-summary">
          <span>{records.length} 朵记录中</span>
          <span>localStorage</span>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="empty-state garden-empty">
          <strong>花园还在等第一朵花</strong>
          <p>在上方写下一句今天的心情，记录会保存在当前浏览器中。</p>
        </div>
      ) : (
        <div className="garden-board" aria-label="真实记录花卡">
          {records.map((record) => (
            <FlowerCard
              isSelected={record.id === selectedRecordId}
              key={record.id}
              onDelete={onDeleteRecord}
              onEdit={onEditRecord}
              onToggleFavorite={onToggleFavorite}
              onView={onViewRecord}
              record={record}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default GardenView
