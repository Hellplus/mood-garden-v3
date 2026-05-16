import navDataIcon from '../assets/ui/icons/nav-data.png'
import navGardenIcon from '../assets/ui/icons/nav-garden.png'
import navRecordIcon from '../assets/ui/icons/nav-record.png'
import navReviewIcon from '../assets/ui/icons/nav-review.png'

const navIcons = {
  records: navRecordIcon,
  garden: navGardenIcon,
  analytics: navReviewIcon,
  data: navDataIcon,
}

function MobileBottomNav({ items = [], activeItem, onChange = () => {} }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="移动端底部导航">
      {items.map((item) => {
        const isActive = item.id === activeItem

        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            aria-pressed={isActive}
            className={isActive ? 'mobile-nav-button is-active' : 'mobile-nav-button'}
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
          >
            <img
              alt=""
              aria-hidden="true"
              className="nav-icon mobile-nav-icon"
              src={navIcons[item.id]}
            />
            <span className="mobile-nav-label">{item.label}</span>
            {isActive ? <span className="mobile-nav-dot" aria-hidden="true"></span> : null}
          </button>
        )
      })}
    </nav>
  )
}

export default MobileBottomNav
