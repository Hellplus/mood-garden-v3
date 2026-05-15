import { formatDisplayDate } from '../utils/dates.js'
import { getRecordView } from '../utils/records.js'

const weekDays = ['一', '二', '三', '四', '五', '六', '日']

function formatSelectedDate(dateKey) {
  const [year, month, day] = String(dateKey || '').split('-').map(Number)

  if (!year || !month || !day) {
    return '选中日期'
  }

  return formatDisplayDate(new Date(year, month - 1, day))
}

function CalendarRecordCard({ record, onViewRecord, onToggleFavorite, onDeleteRecord }) {
  const view = getRecordView(record)

  return (
    <article className="calendar-record-card">
      <button className="calendar-record-main" type="button" onClick={() => onViewRecord(record)}>
        <strong>
          {view.moodIcon} {view.emotionLabel}
        </strong>
        <span>
          {view.time || '当天'} · 强度 {view.intensityText}
        </span>
        <p>{view.note}</p>
      </button>

      <div className="calendar-record-actions">
        <button type="button" onClick={() => onViewRecord(record)}>
          详情
        </button>
        <button type="button" onClick={() => onToggleFavorite(record.id)}>
          {view.isFavorite ? '取消收藏' : '收藏'}
        </button>
        <button className="danger-action" type="button" onClick={() => onDeleteRecord(record.id)}>
          删除
        </button>
      </div>
    </article>
  )
}

function CalendarView({
  monthLabel,
  days = [],
  selectedDateKey,
  selectedRecords = [],
  onSelectDate = () => {},
  onPrevMonth = () => {},
  onNextMonth = () => {},
  onToday = () => {},
  onViewRecord = () => {},
  onToggleFavorite = () => {},
  onDeleteRecord = () => {},
}) {
  return (
    <section className="surface-panel calendar-view">
      <div className="section-heading calendar-heading">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2>{monthLabel}</h2>
        </div>
        <div className="calendar-controls" aria-label="日历月份切换">
          <button type="button" onClick={onPrevMonth}>
            上一月
          </button>
          <button type="button" onClick={onToday}>
            今天
          </button>
          <button type="button" onClick={onNextMonth}>
            下一月
          </button>
        </div>
      </div>

      <div className="calendar-grid calendar-weekdays" aria-hidden="true">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid" aria-label="真实记录月历">
        {days.map((day) =>
          day.isBlank ? (
            <div className="calendar-day is-blank" key={day.id} aria-hidden="true"></div>
          ) : (
            <button
              className={[
                'calendar-day',
                day.hasRecords ? 'has-records' : '',
                day.isToday ? 'is-today' : '',
                day.isSelected ? 'is-selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={day.id}
              onClick={() => onSelectDate(day.dateKey)}
              type="button"
            >
              <strong>{day.dayNumber}</strong>
              {day.hasRecords ? (
                <>
                  <span>{day.recordCount} 条记录</span>
                  <span className="calendar-mood-icons" aria-label="当天情绪">
                    {day.records.slice(0, 3).map((record) => {
                      const view = getRecordView(record)
                      return <i key={record.id}>{view.moodIcon}</i>
                    })}
                  </span>
                </>
              ) : (
                <span>未记</span>
              )}
            </button>
          ),
        )}
      </div>

      <div className="calendar-selected-panel">
        <div className="panel-heading">
          <p className="eyebrow">Selected Day</p>
          <h3>{formatSelectedDate(selectedDateKey)}</h3>
        </div>

        {selectedRecords.length === 0 ? (
          <div className="empty-state compact-empty">
            <strong>这一天还没有记录</strong>
            <p>如果愿意，可以在上方写下一句心情，让这一天也开出一朵花。</p>
          </div>
        ) : (
          <div className="calendar-record-list">
            {selectedRecords.map((record) => (
              <CalendarRecordCard
                key={record.id}
                onDeleteRecord={onDeleteRecord}
                onToggleFavorite={onToggleFavorite}
                onViewRecord={onViewRecord}
                record={record}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CalendarView
