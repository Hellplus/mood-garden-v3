const themeOptions = [
  { id: 'morning', label: '晨光' },
  { id: 'paper', label: '手账' },
  { id: 'night', label: '夜色' },
]

function ThemeSwitcher({ activeTheme, onThemeChange }) {
  return (
    <section className="surface-panel theme-switcher">
      <div className="panel-heading">
        <p className="eyebrow">Theme</p>
        <h2>主题外观</h2>
      </div>

      <div className="theme-options">
        {themeOptions.map((theme) => (
          <button
            className={theme.id === activeTheme ? 'theme-swatch is-active' : 'theme-swatch'}
            key={theme.id}
            type="button"
            onClick={() => onThemeChange(theme.id)}
          >
            <span className={`swatch-dot dot-${theme.id}`}></span>
            {theme.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default ThemeSwitcher
