import { useEffect, useId, useRef } from 'react'

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
  const descriptionId = useId()
  const noteId = useId()
  const dialogRef = useRef(null)
  const cancelButtonRef = useRef(null)
  const onCancelRef = useRef(onCancel)
  const describedBy = [
    description ? descriptionId : null,
    note ? noteId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  useEffect(() => {
    onCancelRef.current = onCancel
  }, [onCancel])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousFocus = document.activeElement
    const focusTarget = cancelButtonRef.current || dialogRef.current
    focusTarget?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancelRef.current()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [isOpen])

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
        aria-describedby={describedBy}
        aria-labelledby={titleId}
        aria-modal="true"
        className={['confirm-dialog', variant ? `confirm-dialog--${variant}` : ''].filter(Boolean).join(' ')}
        ref={dialogRef}
        role="alertdialog"
        tabIndex="-1"
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
          {description ? <p id={descriptionId}>{description}</p> : null}
          {note ? <p className="confirm-dialog-note" id={noteId}>{note}</p> : null}
        </div>
        <div className="confirm-dialog-actions">
          <button className="secondary-action" type="button" onClick={onCancel} ref={cancelButtonRef}>
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
