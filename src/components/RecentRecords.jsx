import { actionIcons, emptyStateImages, getMoodIconAsset } from '../assets/uiAssets.js'
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
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--sm empty-state-asset"
            src={emptyStateImages.noRecord}
          />
          <strong>还没有最近记录</strong>
          <p>完成第一条记录后，这里会显示最近的心情花，方便你回看。</p>
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
                    <img
                      alt=""
                      aria-hidden="true"
                      className="mood-icon mood-icon--recent"
                      src={getMoodIconAsset(record)}
                    />
                    {view.emotionLabel}
                  </strong>
                  <span>
                    <img alt="" aria-hidden="true" className="ui-icon ui-icon--xs" src={actionIcons.clock} />
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
