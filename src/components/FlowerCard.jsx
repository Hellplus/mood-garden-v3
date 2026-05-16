import deleteIcon from '../assets/ui/icons/action-delete.png'
import editIcon from '../assets/ui/icons/action-edit.png'
import moreIcon from '../assets/ui/icons/action-more.png'
import starEmptyIcon from '../assets/ui/icons/action-star-empty.png'
import starFilledIcon from '../assets/ui/icons/action-star-filled.png'
import favoriteRibbonImage from '../assets/ui/decorations/favorite-ribbon.png'
import flowerCardCornerLeafImage from '../assets/ui/decorations/flower-card-corner-leaf.png'
import flowerCardPaperCornerImage from '../assets/ui/decorations/flower-card-paper-corner.png'
import recordDatePinImage from '../assets/ui/decorations/record-date-pin.png'
import { getRecordView } from '../utils/records.js'
import { getEmotionAssetKey, getFlowerAsset } from '../utils/uiAssets.js'

function FlowerCard({ record, isSelected, onView, onEdit, onDelete, onToggleFavorite }) {
  const view = getRecordView(record)
  const flowerKey = getEmotionAssetKey(record)
  const flowerImage = getFlowerAsset(record)

  return (
    <article
      className={isSelected ? 'flower-card is-selected' : 'flower-card'}
      style={{ '--flower-accent': view.color, '--flower-soft': view.softColor }}
    >
      <img
        alt=""
        aria-hidden="true"
        className="flower-card-decoration flower-card-leaf"
        src={flowerCardCornerLeafImage}
      />
      <img
        alt=""
        aria-hidden="true"
        className="flower-card-decoration flower-card-paper"
        src={flowerCardPaperCornerImage}
      />
      {view.isFavorite ? (
        <img
          alt=""
          aria-hidden="true"
          className="flower-card-decoration favorite-ribbon"
          src={favoriteRibbonImage}
        />
      ) : null}
      <button className="flower-card-main" onClick={() => onView(record)} type="button">
        <span
          className={`flower-visual flower-visual--card flower-visual--${flowerKey}`}
          aria-hidden="true"
        >
          <img className="flower-asset" src={flowerImage} alt="" />
        </span>
        <span className="flower-card-copy">
          <strong>{view.title}</strong>
          <small>
            <img alt="" aria-hidden="true" className="ui-icon ui-icon--xs" src={recordDatePinImage} />
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
          <img
            alt=""
            aria-hidden="true"
            className="ui-icon ui-icon--sm"
            src={view.isFavorite ? starFilledIcon : starEmptyIcon}
          />
          {view.isFavorite ? '取消收藏' : '收藏'}
        </button>
        <button type="button" onClick={() => onView(record)}>
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={moreIcon} />
          详情
        </button>
        <button type="button" onClick={() => onEdit(record)}>
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={editIcon} />
          编辑
        </button>
        <button className="danger-action" type="button" onClick={() => onDelete(record.id)}>
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={deleteIcon} />
          删除
        </button>
      </div>
    </article>
  )
}

export default FlowerCard
