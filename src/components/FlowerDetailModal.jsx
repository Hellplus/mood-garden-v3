function FlowerDetailModal({ flower, isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <aside className="flower-detail-panel" aria-label="静态花朵详情">
      <button className="icon-button" type="button" onClick={onClose} aria-label="关闭详情">
        x
      </button>

      <p className="eyebrow">Flower Detail</p>
      <h2>{flower.name}</h2>
      <p className="detail-mood">
        {flower.date} · {flower.mood} · {flower.stage}
      </p>
      <p>{flower.note}</p>

      <div className="detail-tags">
        {flower.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </aside>
  )
}

export default FlowerDetailModal
