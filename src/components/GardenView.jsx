import { emptyStateImages } from '../assets/uiAssets.js'
import cardSoftBloomCornerImage from '../assets/ui/backgrounds/card-soft-bloom-corner.png'
import mobileGardenTopWindowImage from '../assets/ui/backgrounds/mobile-garden-top-window.png'
import heroGardenCornerImage from '../assets/ui/decorations/hero-garden-corner.png'
import leafSprigImage from '../assets/ui/decorations/leaf-sprig.png'
import softWindowPlantImage from '../assets/ui/decorations/soft-window-plant.png'
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
  onGoToRecord,
}) {
  const hasNoRecords = totalCount === 0
  const hasNoMatches = totalCount > 0 && records.length === 0

  return (
    <section className="garden-view">
      <div className="garden-blueprint-decor" aria-hidden="true">
        <img
          className="garden-blueprint-decor__window"
          src={mobileGardenTopWindowImage}
          alt=""
        />
        <img
          className="garden-blueprint-decor__plant"
          src={softWindowPlantImage}
          alt=""
        />
        <img
          className="garden-blueprint-decor__corner"
          src={heroGardenCornerImage}
          alt=""
        />
        <img
          className="garden-blueprint-decor__leaf"
          src={leafSprigImage}
          alt=""
        />
        <img
          className="garden-blueprint-decor__bloom"
          src={cardSoftBloomCornerImage}
          alt=""
        />
      </div>

      <div className="section-heading">
        <div>
          <h2>情绪花园</h2>
          <p className="section-intro">这里收藏着你种下的心情花。</p>
        </div>
        <div className="garden-summary">
          <span>{hasActiveFilters ? `${records.length} / ${totalCount} 朵` : `${totalCount} 朵`}</span>
          <span>{hasActiveFilters ? '筛选后的花' : '全部心情花'}</span>
        </div>
      </div>

      {hasNoRecords ? (
        <div className="empty-state garden-empty">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--md empty-state-asset"
            src={emptyStateImages.noRecord}
          />
          <strong>花园还在等第一朵花</strong>
          <p>到记录区选一个情绪，写下一句话，就可以开始照看它。</p>
          {onGoToRecord ? (
            <button className="secondary-action" type="button" onClick={onGoToRecord}>
              去记录
            </button>
          ) : null}
        </div>
      ) : null}

      {hasNoMatches ? (
        <div className="empty-state garden-empty">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--md empty-state-asset"
            src={emptyStateImages.filterNoResult}
          />
          <strong>还没找到这类花</strong>
          <p>换个关键词，或轻轻清掉筛选条件再看看。</p>
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
