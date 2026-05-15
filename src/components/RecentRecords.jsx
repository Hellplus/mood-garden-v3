import { getRecordView } from '../utils/records.js'

function RecentRecords({ records, onViewRecord }) {
  return (
    <section className="surface-panel recent-records">
      <div className="panel-heading">
        <p className="eyebrow">Recent</p>
        <h2>最近记录</h2>
      </div>

      {records.length === 0 ? (
        <div className="empty-state compact-empty">
          <strong>还没有最近记录</strong>
          <p>种下第一朵花后，它会出现在这里。</p>
        </div>
      ) : (
        <div className="record-list">
          {records.map((record) => {
            const view = getRecordView(record)

            return (
              <button
                className="record-row"
                key={record.id}
                onClick={() => onViewRecord(record)}
                type="button"
              >
                <div>
                  <strong>
                    {view.moodIcon} {view.emotionLabel}
                  </strong>
                  <span>
                    {view.date} · {view.time}
                  </span>
                </div>
                <p>{view.note}</p>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default RecentRecords
