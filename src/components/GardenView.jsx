import FlowerCard from './FlowerCard.jsx'

function GardenView({
  records = [],
  totalCount = records.length,
  hasActiveFilters = false,
  selectedRecordId,
  onViewRecord,
  onEditRecord,
  onDeleteRecord,
  onToggleFavorite,
  onResetFilters,
}) {
  const hasNoRecords = totalCount === 0
  const hasNoMatches = totalCount > 0 && records.length === 0

  return (
    <section className="garden-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Garden</p>
          <h2>我的情绪花园</h2>
        </div>
        <div className="garden-summary">
          <span>{hasActiveFilters ? `${records.length} / ${totalCount} 朵` : `${totalCount} 朵`}</span>
          <span>{hasActiveFilters ? '筛选结果' : '全部记录'}</span>
        </div>
      </div>

      {hasNoRecords ? (
        <div className="empty-state garden-empty">
          <strong>花园还在等第一朵花</strong>
          <p>到记录区选一个情绪，写下一句话，就可以开始照看它。</p>
        </div>
      ) : null}

      {hasNoMatches ? (
        <div className="empty-state garden-empty">
          <strong>没有找到符合条件的花</strong>
          <p>可以换个关键词，取消一些筛选条件，或一键重置筛选。</p>
          {onResetFilters ? (
            <button className="secondary-action" type="button" onClick={onResetFilters}>
              重置筛选
            </button>
          ) : null}
        </div>
      ) : null}

      {!hasNoRecords && !hasNoMatches ? (
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
      ) : null}
    </section>
  )
}

export default GardenView
