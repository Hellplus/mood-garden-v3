import { actionIcons, toastIcons } from '../assets/uiAssets.js'

function getDisplayMessage(message = '') {
  const messageOverrides = {
    '没有读懂这份备份文件，请重新选择。': '没有读懂这份 JSON 备份，请重新选择。',
    '文字日记已导出。': '文字日记已导出，适合阅读和整理。',
    '花园备份已导出。': 'JSON 备份已导出，可以用于以后恢复花园。',
  }
  const mergeMatch = message.match(/^已把 (\d+) 条记录带回花园。$/)
  const replaceMatch = message.match(/^已用备份中的 (\d+) 条记录整理花园。$/)

  if (mergeMatch) {
    return `已合并 ${mergeMatch[1]} 条记录，当前记录已保留。`
  }

  if (replaceMatch) {
    return `已用备份覆盖当前花园，共 ${replaceMatch[1]} 条记录。`
  }

  return messageOverrides[message] || message
}

function Toast({ toast, isVisible, message, type = 'info', onDismiss = () => {} }) {
  const activeToast = toast || (isVisible ? { message, type } : null)

  if (!activeToast?.message) {
    return null
  }

  const toastType = activeToast.type || 'info'
  const role = toastType === 'error' ? 'alert' : 'status'
  const ariaLive = toastType === 'error' ? 'assertive' : 'polite'
  const icon = toastIcons[toastType] || toastIcons.info
  const displayMessage = getDisplayMessage(activeToast.message)

  return (
    <div className={`toast toast-${toastType}`} role={role} aria-live={ariaLive}>
      <span className="toast-icon-frame" aria-hidden="true">
        <img alt="" className="toast-icon" src={icon} />
      </span>
      <span className="toast-message">{displayMessage}</span>
      <button className="toast-close" type="button" onClick={onDismiss} aria-label="关闭通知">
        <img alt="" aria-hidden="true" className="ui-icon ui-icon--xs" src={actionIcons.close} />
      </button>
    </div>
  )
}

export default Toast
