import {
  actionIcons,
  decorationImages,
  getEmotionAssetKey,
  getFlowerAsset,
  strengthIcons,
} from '../assets/uiAssets.js'
import favoriteBadgeImage from '../assets/ui/badges/badge-favorite.png'
import flowerCardDateChipBgImage from '../assets/ui/cards/flower-card-date-chip-bg.png'
import flowerCardFavoriteCornerImage from '../assets/ui/cards/flower-card-favorite-corner.png'
import { getRecordView } from '../utils/records.js'

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
        src={decorationImages.flowerCardCornerLeaf}
      />
      <img
        alt=""
        aria-hidden="true"
        className="flower-card-decoration flower-card-paper"
        src={decorationImages.flowerCardPaperCorner}
      />
      {view.isFavorite ? (
        <img
          alt=""
          aria-hidden="true"
          className="flower-card-decoration favorite-ribbon"
          src={decorationImages.favoriteRibbon}
        />
      ) : null}
      {view.isFavorite ? (
        <span className="flower-card-favorite-badge" aria-label="已收藏">
          <img alt="" aria-hidden="true" src={favoriteBadgeImage} />
          已收藏
        </span>
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
          <small className="flower-date-chip">
            <img
              alt=""
              aria-hidden="true"
              className="flower-date-chip-bg"
              src={flowerCardDateChipBgImage}
            />
            <img alt="" aria-hidden="true" className="ui-icon ui-icon--xs" src={decorationImages.recordDatePin} />
            {view.date} · {view.emotionLabel}
          </small>
          <span className="flower-card-meta">
            <em>{view.stage}</em>
            <em className="flower-strength-chip">
              <span className="flower-strength-icons" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((level) => (
                  <img
                    alt=""
                    className="strength-flower-icon"
                    key={level}
                    src={level <= view.intensity ? strengthIcons.filled : strengthIcons.empty}
                  />
                ))}
              </span>
              强度 {view.intensityText}
            </em>
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
      {view.isFavorite ? (
        <img
          alt=""
          aria-hidden="true"
          className="flower-card-favorite-corner"
          src={flowerCardFavoriteCornerImage}
        />
      ) : null}

      <div className="flower-card-actions" aria-label="记录操作">
        <button type="button" onClick={() => onToggleFavorite(record.id)}>
          <img
            alt=""
            aria-hidden="true"
            className="ui-icon ui-icon--sm"
            src={view.isFavorite ? actionIcons.starFilled : actionIcons.starEmpty}
          />
          {view.isFavorite ? '取消收藏' : '收藏'}
        </button>
        <button type="button" onClick={() => onView(record)}>
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.more} />
          详情
        </button>
        <button type="button" onClick={() => onEdit(record)}>
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.edit} />
          编辑
        </button>
        <button className="danger-action flower-card-delete-action" type="button" onClick={() => onDelete(record.id)}>
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.delete} />
          删除
        </button>
      </div>
    </article>
  )
}

export default FlowerCard
