function Toast({ isVisible, message, onDismiss }) {
  if (!isVisible) {
    return null
  }

  return (
    <div className="toast" role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" onClick={onDismiss} aria-label="关闭通知">
        x
      </button>
    </div>
  )
}

export default Toast
