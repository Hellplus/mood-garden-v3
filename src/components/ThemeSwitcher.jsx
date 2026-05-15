function ThemeSwitcher({
  activeTheme,
  themes = [],
  onThemeChange = () => {},
  onOpenOnboarding = () => {},
}) {
  return (
    <section className="surface-panel theme-switcher">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Theme</p>
          <h2>主题外观</h2>
        </div>
        <button className="text-action" type="button" onClick={onOpenOnboarding}>
          查看引导
        </button>
      </div>

      <div className="theme-options" role="group" aria-label="选择主题外观">
        {themes.map((theme) => (
          <button
            aria-pressed={theme.id === activeTheme}
            className={theme.id === activeTheme ? 'theme-swatch is-active' : 'theme-swatch'}
            key={theme.id}
            type="button"
            onClick={() => onThemeChange(theme.id)}
          >
            <span className={`swatch-dot dot-${theme.id}`} aria-hidden="true"></span>
            <span>
              <strong>{theme.label}</strong>
              <small>{theme.description}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ThemeSwitcher
