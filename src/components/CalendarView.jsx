const weekDays = ['一', '二', '三', '四', '五', '六', '日']

function CalendarView({ days }) {
  return (
    <section className="surface-panel calendar-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2>五月情绪日历</h2>
        </div>
        <span className="section-caption">静态日期格</span>
      </div>

      <div className="calendar-grid calendar-weekdays" aria-hidden="true">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => (
          <div
            className={[
              'calendar-day',
              `tone-${day.tone}`,
              day.isToday ? 'is-today' : '',
            ].join(' ')}
            key={day.id}
          >
            <strong>{day.day}</strong>
            <span>{day.hasRecord ? day.mood : '未记'}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CalendarView
