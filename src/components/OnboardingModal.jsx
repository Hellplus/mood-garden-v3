function OnboardingModal({
  isOpen = false,
  onClose = () => {},
  onComplete = () => {},
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="onboarding-layer">
      <section
        aria-describedby="onboarding-description"
        aria-labelledby="onboarding-title"
        aria-modal="false"
        className="onboarding-card"
        role="dialog"
      >
        <button
          aria-label="关闭新手引导"
          className="icon-button"
          type="button"
          onClick={onClose}
        >
          x
        </button>

        <p className="eyebrow">开始使用</p>
        <h2 id="onboarding-title">先写一句今天的心情</h2>
        <p id="onboarding-description">
          不需要写很长。选一个接近今天的情绪，留下一句话，再把它种成一朵花。
        </p>
        <ol>
          <li>在记录区选择情绪，也可以调整强度和标签。</li>
          <li>点“种下这朵花”后，记录会保存在当前浏览器。</li>
          <li>想长期保存或换设备查看，记得导出 JSON 备份。</li>
        </ol>
        <div className="onboarding-actions">
          <button className="secondary-action" type="button" onClick={onClose}>
            稍后再看
          </button>
          <button className="primary-action" type="button" onClick={onComplete}>
            知道了
          </button>
        </div>
      </section>
    </div>
  )
}

export default OnboardingModal
