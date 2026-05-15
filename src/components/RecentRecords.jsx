function RecentRecords({ records }) {
  return (
    <section className="surface-panel recent-records">
      <div className="panel-heading">
        <p className="eyebrow">Recent</p>
        <h2>最近记录</h2>
      </div>

      <div className="record-list">
        {records.map((record) => (
          <article className="record-row" key={record.id}>
            <div>
              <strong>{record.mood}</strong>
              <span>
                {record.date} · {record.time}
              </span>
            </div>
            <p>{record.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecentRecords
