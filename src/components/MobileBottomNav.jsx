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
            <span className="mobile-nav-label">{item.label}</span>
            {isActive ? <span className="mobile-nav-dot" aria-hidden="true"></span> : null}
          </button>
        )
      })}
    </nav>
  )
}

export default MobileBottomNav
