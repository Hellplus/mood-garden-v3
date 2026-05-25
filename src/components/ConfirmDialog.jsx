import { useId } from 'react'

function ConfirmDialog({
  isOpen = false,
  image,
  title,
  description,
  note,
  cancelLabel = '取消',
  confirmLabel = '确认',
  variant = '',
  onCancel = () => {},
  onConfirm = () => {},
}) {
  const titleId = useId()

  if (!isOpen) {
    return null
  }

  function handleLayerMouseDown(event) {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }

  return (
    <div className="confirm-dialog-layer" role="presentation" onMouseDown={handleLayerMouseDown}>
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className={['confirm-dialog', variant ? `confirm-dialog--${variant}` : ''].filter(Boolean).join(' ')}
        role="alertdialog"
      >
        {image ? (
          <img
            alt=""
            aria-hidden="true"
            className="confirm-dialog-asset"
            src={image}
          />
        ) : null}
        <div className="confirm-dialog-copy">
          <h3 id={titleId}>{title}</h3>
          {description ? <p>{description}</p> : null}
          {note ? <p className="confirm-dialog-note">{note}</p> : null}
        </div>
        <div className="confirm-dialog-actions">
          <button className="secondary-action" type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="danger-action" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmDialog
