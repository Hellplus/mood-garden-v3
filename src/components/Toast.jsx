function Toast({ toast, isVisible, message, type = 'info', onDismiss = () => {} }) {
  const activeToast = toast || (isVisible ? { message, type } : null)

  if (!activeToast?.message) {
    return null
  }

  const toastType = activeToast.type || 'info'
  const role = toastType === 'error' ? 'alert' : 'status'
  const ariaLive = toastType === 'error' ? 'assertive' : 'polite'

  return (
    <div className={`toast toast-${toastType}`} role={role} aria-live={ariaLive}>
      <span>{activeToast.message}</span>
      <button className="toast-close" type="button" onClick={onDismiss} aria-label="关闭通知">
        x
      </button>
    </div>
  )
}

export default Toast
