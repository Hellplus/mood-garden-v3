import { useEffect, useRef, useState } from 'react'
import {
  actionIcons,
  getEmotionAssetKey,
  getFlowerAsset,
  warningIcons,
} from '../assets/uiAssets.js'
import detailBottomSheetHandleImage from '../assets/ui/detail/detail-bottom-sheet-handle.png'
import detailOverlayFlowerImage from '../assets/ui/detail/detail-overlay-flower.png'
import detailStrengthFlowerRowImage from '../assets/ui/detail/detail-strength-flower-row.png'
import strengthFlowerEmptyImage from '../assets/ui/strength/strength-flower-empty.png'
import strengthFlowerFilledImage from '../assets/ui/strength/strength-flower-filled.png'
import { getRecordView, parseTagsInput } from '../utils/records.js'

function DetailBackdrop({ onClose }) {
  return (
    <div className="flower-detail-backdrop" role="presentation" onClick={onClose}>
      <img
        alt=""
        aria-hidden="true"
        className="flower-detail-backdrop__asset"
        src={detailOverlayFlowerImage}
      />
    </div>
  )
}

function DetailSheetHandle() {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="detail-bottom-sheet-handle"
      src={detailBottomSheetHandleImage}
    />
  )
}

function DetailStrengthRow({ intensity }) {
  const safeIntensity = Math.min(5, Math.max(1, Number(intensity) || 3))

  return (
    <div className="detail-strength-row" aria-label={`情绪强度 ${safeIntensity} / 5`}>
      <img
        alt=""
        aria-hidden="true"
        className="detail-strength-row__asset"
        src={detailStrengthFlowerRowImage}
      />
      <span className="detail-strength-row__flowers" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <img
            alt=""
            className="detail-strength-row__flower"
            key={index}
            src={index < safeIntensity ? strengthFlowerFilledImage : strengthFlowerEmptyImage}
          />
        ))}
      </span>
      <strong>强度 {safeIntensity} / 5</strong>
    </div>
  )
}

function FlowerDetailModal({ record, mode, onClose, onSave, onDelete, onToggleFavorite }) {
  const [isEditing, setIsEditing] = useState(mode === 'edit')
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [note, setNote] = useState(record?.note || '')
  const [detailNote, setDetailNote] = useState(record?.detailNote || '')
  const [intensity, setIntensity] = useState(record?.intensity || 3)
  const [tagsText, setTagsText] = useState(Array.isArray(record?.tags) ? record.tags.join(' ') : '')
  const panelRef = useRef(null)
  const previousFocusRef = useRef(null)
  const deleteConfirmOpenRef = useRef(false)
  const titleId = `flower-detail-title-${record?.id || 'missing'}`
  const confirmTitleId = `flower-delete-title-${record?.id || 'missing'}`

  useEffect(() => {
    deleteConfirmOpenRef.current = isDeleteConfirmOpen
  }, [isDeleteConfirmOpen])

  useEffect(() => {
    if (!record) {
      return undefined
    }

    previousFocusRef.current = document.activeElement
    panelRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key !== 'Escape') {
        return
      }

      if (deleteConfirmOpenRef.current) {
        setIsDeleteConfirmOpen(false)
        return
      }

      onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [onClose, record])

  if (!record) {
    return null
  }

  if (!record.id) {
    return (
      <>
      <DetailBackdrop onClose={onClose} />
      <aside
        aria-labelledby={titleId}
        aria-modal="true"
        className="flower-detail-panel missing-detail-panel"
        ref={panelRef}
        role="dialog"
        tabIndex="-1"
      >
        <DetailSheetHandle />
        <button className="icon-button" type="button" onClick={onClose} aria-label="关闭详情">
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.close} />
        </button>

        <img alt="" aria-hidden="true" className="detail-hero-image" src={warningIcons.soft} />
        <h2 id={titleId}>没有找到这条记录</h2>
        <p>这朵花可能已经被删除。关闭面板后，可以继续查看其他记录。</p>

        <div className="detail-actions">
          <button className="secondary-action" type="button" onClick={onClose}>
            <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.close} />
            关闭
          </button>
        </div>
      </aside>
      </>
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
    <>
    <DetailBackdrop onClose={onClose} />
    <aside
      aria-labelledby={titleId}
      aria-modal="true"
      className={isEditing ? 'flower-detail-panel is-editing' : 'flower-detail-panel'}
      ref={panelRef}
      role="dialog"
      tabIndex="-1"
    >
      <DetailSheetHandle />
      <button className="icon-button" type="button" onClick={onClose} aria-label="关闭详情">
        <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.close} />
      </button>

      <img
        alt=""
        aria-hidden="true"
        className={`flower-visual--modal detail-hero-image flower-visual--${flowerKey}`}
        src={getFlowerAsset(record)}
      />
      <h2 id={titleId}>{view.title}</h2>
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
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.check} />
              保存修改
            </button>
            <button className="secondary-action" type="button" onClick={() => setIsEditing(false)}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.cancel} />
              取消
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{view.note}</p>
          <p className="flower-quote">{view.quote}</p>
          {view.detailNote ? <p className="detail-extra">{view.detailNote}</p> : null}
          <DetailStrengthRow intensity={view.intensity} />

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
                src={view.isFavorite ? actionIcons.starFilled : actionIcons.starEmpty}
              />
              {view.isFavorite ? '取消收藏' : '收藏'}
            </button>
            <button type="button" onClick={() => setIsEditing(true)}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.edit} />
              编辑
            </button>
            <button className="danger-action" type="button" onClick={() => setIsDeleteConfirmOpen(true)}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.delete} />
              删除
            </button>
          </div>
        </>
      )}
    </aside>
    {isDeleteConfirmOpen ? (
      <div className="delete-dialog-layer" role="presentation">
        <section
          aria-labelledby={confirmTitleId}
          aria-modal="true"
          className="delete-confirm-dialog"
          role="alertdialog"
        >
          <img
            alt=""
            aria-hidden="true"
            className="delete-confirm-asset"
            src={warningIcons.deleteConfirmFlower}
          />
          <div>
            <h3 id={confirmTitleId}>确认删除这条心情记录？</h3>
            <p>删除后将无法恢复，但不会影响其他记录。</p>
          </div>
          <div className="delete-confirm-actions">
            <button className="secondary-action" type="button" onClick={() => setIsDeleteConfirmOpen(false)}>
              取消
            </button>
            <button className="danger-action" type="button" onClick={handleDelete}>
              <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={actionIcons.delete} />
              确认删除
            </button>
          </div>
        </section>
      </div>
    ) : null}
    </>
  )
}

export default FlowerDetailModal
