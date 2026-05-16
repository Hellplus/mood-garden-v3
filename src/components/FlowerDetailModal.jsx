import { useState } from 'react'
import cancelIcon from '../assets/ui/icons/action-cancel.png'
import checkIcon from '../assets/ui/icons/action-check.png'
import closeIcon from '../assets/ui/icons/action-close.png'
import deleteIcon from '../assets/ui/icons/action-delete.png'
import editIcon from '../assets/ui/icons/action-edit.png'
import starEmptyIcon from '../assets/ui/icons/action-star-empty.png'
import starFilledIcon from '../assets/ui/icons/action-star-filled.png'
import warningIcon from '../assets/ui/icons/warning-soft.png'
import { getRecordView, parseTagsInput } from '../utils/records.js'
import { getEmotionAssetKey, getFlowerAsset } from '../utils/uiAssets.js'

function FlowerDetailModal({ record, mode, onClose, onSave, onDelete, onToggleFavorite }) {
  const [isEditing, setIsEditing] = useState(mode === 'edit')
  const [note, setNote] = useState(record?.note || '')
  const [detailNote, setDetailNote] = useState(record?.detailNote || '')
  const [intensity, setIntensity] = useState(record?.intensity || 3)
  const [tagsText, setTagsText] = useState(Array.isArray(record?.tags) ? record.tags.join(' ') : '')

  if (!record) {
    return null
  }

  if (!record.id) {
    return (
      <aside className="flower-detail-panel missing-detail-panel" aria-label="记录不存在">
        <button className="icon-button" type="button" onClick={onClose} aria-label="关闭详情">
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={closeIcon} />
        </button>

        <img alt="" aria-hidden="true" className="detail-hero-image" src={warningIcon} />
        <p className="eyebrow">Flower Detail</p>
        <h2>没有找到这条记录</h2>
        <p>这朵花可能已经被删除。关闭面板后，可以继续查看其他记录。</p>

        <div className="detail-actions">
          <button className="secondary-action" type="button" onClick={onClose}>
            <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={closeIcon} />
            关闭
          </button>
        </div>
      </aside>
    )
  }

  const view = getRecordView(record)
  const flowerKey = getEmotionAssetKey(record)

  function handleSave(event) {
    event.preventDefault()

    onSave(record.id, {
      note,
      detailNote,
      intensity,
      tags: parseTagsInput(tagsText),
    })

    setIsEditing(false)
  }

  function handleDelete() {
    onDelete(record.id)
    onClose()
  }

  return (
    <aside className="flower-detail-panel" aria-label="真实记录详情">
      <button className="icon-button" type="button" onClick={onClose} aria-label="关闭详情">
        <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={closeIcon} />
      </button>

      <img
        alt=""
        aria-hidden="true"
        className={`flower-visual--modal detail-hero-image flower-visual--${flowerKey}`}
        src={getFlowerAsset(record)}
      />
      <p className="eyebrow">Flower Detail</p>
      <h2>{view.title}</h2>
      <p className="detail-mood">
        {view.date} · {view.emotionLabel} · {view.intensityText}
      </p>

      {isEditing ? (
        <form className="detail-form" onSubmit={handleSave}>
          <label className="form-field">
            记录片段
            <textarea onChange={(event) => setNote(event.target.value)} value={note} />
          </label>

          <label className="form-field">
            情绪强度：{intensity} / 5
            <input
              max="5"
              min="1"
              onChange={(event) => setIntensity(Number(event.target.value))}
              type="range"
              value={intensity}
            />
          </label>

          <label className="form-field">
            标签
            <input
              onChange={(event) => setTagsText(event.target.value)}
              placeholder="用空格或逗号分隔"
              type="text"
              value={tagsText}
            />
          </label>

          <label className="form-field">
            详情备注
            <textarea
              onChange={(event) => setDetailNote(event.target.value)}
              placeholder="可以补充一点只有自己看得懂的细节。"
              value={detailNote}
            />
          </label>

          <div className="detail-actions">
            <button className="primary-action" type="submit">
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={checkIcon} />
              保存修改
            </button>
            <button className="secondary-action" type="button" onClick={() => setIsEditing(false)}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={cancelIcon} />
              取消
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{view.note}</p>
          <p className="flower-quote">{view.quote}</p>
          {view.detailNote ? <p className="detail-extra">{view.detailNote}</p> : null}

          <div className="detail-tags">
            {view.tags.length > 0 ? (
              view.tags.map((tag) => <span key={tag}>{tag}</span>)
            ) : (
              <span>无标签</span>
            )}
          </div>

          <div className="detail-actions">
            <button type="button" onClick={() => onToggleFavorite(record.id)}>
              <img
                alt=""
                aria-hidden="true"
                className="ui-icon ui-icon--sm"
                src={view.isFavorite ? starFilledIcon : starEmptyIcon}
              />
              {view.isFavorite ? '取消收藏' : '收藏'}
            </button>
            <button type="button" onClick={() => setIsEditing(true)}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={editIcon} />
              编辑
            </button>
            <button className="danger-action" type="button" onClick={handleDelete}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={deleteIcon} />
              删除
            </button>
          </div>
        </>
      )}
    </aside>
  )
}

export default FlowerDetailModal
