function FlowerCard({ flower, isSelected, onSelect }) {
  return (
    <button
      className={isSelected ? 'flower-card is-selected' : 'flower-card'}
      onClick={() => onSelect(flower)}
      style={{ '--flower-accent': flower.color, '--flower-soft': flower.softColor }}
      type="button"
    >
      <span className="flower-visual" aria-hidden="true">
        <span className="petal petal-one"></span>
        <span className="petal petal-two"></span>
        <span className="petal petal-three"></span>
        <span className="petal petal-four"></span>
        <span className="flower-center"></span>
        <span className="flower-stem"></span>
      </span>
      <span className="flower-card-copy">
        <strong>{flower.name}</strong>
        <small>
          {flower.date} · {flower.mood}
        </small>
        <em>{flower.stage}</em>
      </span>
    </button>
  )
}

export default FlowerCard
