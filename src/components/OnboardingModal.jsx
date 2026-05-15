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

        <p className="eyebrow">Onboarding</p>
        <h2 id="onboarding-title">从一条小记录开始</h2>
        <p id="onboarding-description">
          这里已经是你的 V3 花园：记录会保存在本机，筛选、日历、分析和备份都会围绕这些记录工作。
        </p>
        <ol>
          <li>写下今天的心情和一个小片段。</li>
          <li>在花园里查看、编辑、收藏或删除记录。</li>
          <li>用日历、分析和备份慢慢照看这座花园。</li>
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
