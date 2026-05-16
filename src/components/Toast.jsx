import { actionIcons, toastIcons } from '../assets/uiAssets.js'

function Toast({ toast, isVisible, message, type = 'info', onDismiss = () => {} }) {
  const activeToast = toast || (isVisible ? { message, type } : null)

  if (!activeToast?.message) {
    return null
  }

  const toastType = activeToast.type || 'info'
  const role = toastType === 'error' ? 'alert' : 'status'
  const ariaLive = toastType === 'error' ? 'assertive' : 'polite'
  const icon = toastIcons[toastType] || toastIcons.info

  return (
    <div className={`toast toast-${toastType}`} role={role} aria-live={ariaLive}>
      <span className="toast-icon-frame" aria-hidden="true">
        <img alt="" className="toast-icon" src={icon} />
      </span>
      <span className="toast-message">{activeToast.message}</span>
      <button className="toast-close" type="button" onClick={onDismiss} aria-label="关闭通知">
        <img alt="" aria-hidden="true" className="ui-icon ui-icon--xs" src={actionIcons.close} />
      </button>
    </div>
  )
}

export default Toast
