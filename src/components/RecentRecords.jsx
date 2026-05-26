import { actionIcons, emptyStateImages, getMoodIconAsset } from '../assets/uiAssets.js'
import { getRecordView } from '../utils/records.js'

function RecentRecords({ records, onViewRecord }) {
  return (
    <section className="surface-panel recent-records">
      <div className="panel-heading">
        <h2>最近记录</h2>
      </div>

      {records.length === 0 ? (
        <div className="empty-state compact-empty">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--sm empty-state-asset"
            src={emptyStateImages.noRecord}
          />
          <strong>还没有新的心情花</strong>
          <p>种下第一朵花后，这里会留下最近的心情片段。</p>
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
                <span className="recent-record-icon-frame" aria-hidden="true">
                  <img className="mood-icon mood-icon--recent" src={getMoodIconAsset(record)} alt="" />
                </span>
                <div className="recent-record-copy">
                  <strong>
                    {view.emotionLabel}
                  </strong>
                  <span>
                    <img alt="" aria-hidden="true" className="ui-icon ui-icon--xs" src={actionIcons.clock} />
                    {view.date} · {view.time}
                  </span>
                  <p>{view.note}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default RecentRecords
