import brandFlowerImage from '../assets/ui/decorations/brand-flower.png'
import closeIcon from '../assets/ui/icons/action-close.png'
import onboardingMoodIcon from '../assets/ui/icons/onboarding-mood.png'
import onboardingPlantIcon from '../assets/ui/icons/onboarding-plant.png'
import onboardingWriteIcon from '../assets/ui/icons/onboarding-write.png'

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
          <img alt="" aria-hidden="true" className="ui-icon ui-icon--sm" src={closeIcon} />
        </button>

        <img
          alt=""
          aria-hidden="true"
          className="ui-illustration ui-illustration--sm onboarding-brand-asset"
          src={brandFlowerImage}
        />
        <p className="eyebrow">开始使用</p>
        <h2 id="onboarding-title">先写一句今天的心情</h2>
        <p id="onboarding-description">
          不需要写很长。选一个接近今天的情绪，留下一句话，再把它种成一朵花。
        </p>
        <ol className="onboarding-steps">
          <li>
            <img alt="" aria-hidden="true" className="onboarding-step-icon" src={onboardingMoodIcon} />
            <span>在记录区选择情绪，也可以调整强度和标签。</span>
          </li>
          <li>
            <img alt="" aria-hidden="true" className="onboarding-step-icon" src={onboardingWriteIcon} />
            <span>点“种下这朵花”后，记录会保存在当前浏览器。</span>
          </li>
          <li>
            <img alt="" aria-hidden="true" className="onboarding-step-icon" src={onboardingPlantIcon} />
            <span>想长期保存或换设备查看，记得导出 JSON 备份。</span>
          </li>
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
