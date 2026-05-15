import FlowerCard from './FlowerCard.jsx'

function GardenView({ flowers, selectedFlowerId, onSelectFlower }) {
  return (
    <section className="garden-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Garden</p>
          <h2>我的情绪花园</h2>
        </div>
        <div className="garden-summary">
          <span>6 朵展示中</span>
          <span>静态预览</span>
        </div>
      </div>

      <div className="garden-board" aria-label="静态花园花卡">
        {flowers.map((flower) => (
          <FlowerCard
            flower={flower}
            isSelected={flower.id === selectedFlowerId}
            key={flower.id}
            onSelect={onSelectFlower}
          />
        ))}
      </div>
    </section>
  )
}

export default GardenView
