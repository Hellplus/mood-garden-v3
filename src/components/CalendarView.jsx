import {
  actionIcons,
  calendarIcons,
  emptyStateImages,
  getFlowerAsset,
} from '../assets/uiAssets.js'
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
          <img
            alt=""
            aria-hidden="true"
            className="mood-icon mood-icon--recent mood-inline-icon"
            src={getFlowerAsset(record)}
          />
          {view.emotionLabel}
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
          <img
            alt=""
            aria-hidden="true"
            className="ui-icon ui-icon--sm"
            src={view.isFavorite ? actionIcons.starFilled : actionIcons.starEmpty}
          />
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
          <h2 className="heading-with-icon">
            <img alt="" aria-hidden="true" className="card-icon card-icon--sm" src={actionIcons.calendar} />
            {monthLabel}
          </h2>
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
              {day.isToday ? (
                <img
                  alt=""
                  aria-hidden="true"
                  className="calendar-day-marker calendar-today-marker"
                  src={calendarIcons.todayFlower}
                />
              ) : null}
              {day.isSelected ? (
                <img
                  alt=""
                  aria-hidden="true"
                  className="calendar-day-marker calendar-selected-marker"
                  src={calendarIcons.selectedMarker}
                />
              ) : null}
              <strong>{day.dayNumber}</strong>
              {day.hasRecords ? (
                <>
                  <span>{day.recordCount} 条记录</span>
                  <span className="calendar-mood-icons" aria-label="当天情绪">
                    {day.records.slice(0, 3).map((record) => (
                      <img alt="" aria-hidden="true" key={record.id} src={calendarIcons.flowerDot} />
                    ))}
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
            <img
              alt=""
              aria-hidden="true"
              className="ui-illustration ui-illustration--sm empty-state-asset"
              src={emptyStateImages.calendarNoRecord}
            />
            <strong>这一天还没有记录</strong>
            <p>可以回到记录区补上一句，也可以让这一天安静地留白。</p>
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
