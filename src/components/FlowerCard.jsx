import { getRecordView } from '../utils/records.js'

function FlowerCard({ record, isSelected, onView, onEdit, onDelete, onToggleFavorite }) {
  const view = getRecordView(record)

  return (
    <article
      className={isSelected ? 'flower-card is-selected' : 'flower-card'}
      style={{ '--flower-accent': view.color, '--flower-soft': view.softColor }}
    >
      <button className="flower-card-main" onClick={() => onView(record)} type="button">
        <span className="flower-visual" aria-hidden="true">
          <span className="petal petal-one"></span>
          <span className="petal petal-two"></span>
          <span className="petal petal-three"></span>
          <span className="petal petal-four"></span>
          <span className="flower-center">{view.moodIcon}</span>
          <span className="flower-stem"></span>
        </span>
        <span className="flower-card-copy">
          <strong>{view.title}</strong>
          <small>
            {view.date} · {view.emotionLabel}
          </small>
          <span className="flower-card-meta">
            <em>{view.stage}</em>
            <em>强度 {view.intensityText}</em>
            {view.isFavorite ? <em>已收藏</em> : null}
          </span>
          <span className="flower-note">{view.note}</span>
          {view.tags.length > 0 ? (
            <span className="flower-card-tags">
              {view.tags.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          ) : null}
        </span>
      </button>

      <div className="flower-card-actions" aria-label="记录操作">
        <button type="button" onClick={() => onToggleFavorite(record.id)}>
          {view.isFavorite ? '取消收藏' : '收藏'}
        </button>
        <button type="button" onClick={() => onView(record)}>
          详情
        </button>
        <button type="button" onClick={() => onEdit(record)}>
          编辑
        </button>
        <button className="danger-action" type="button" onClick={() => onDelete(record.id)}>
          删除
        </button>
      </div>
    </article>
  )
}

export default FlowerCard
