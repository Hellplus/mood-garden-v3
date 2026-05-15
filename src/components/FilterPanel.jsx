function FilterPanel() {
  return (
    <section className="surface-panel filter-panel">
      <div className="panel-heading">
        <p className="eyebrow">Filter</p>
        <h2>筛选预览</h2>
      </div>

      <div className="filter-group">
        <span>情绪</span>
        <div className="segmented-control" aria-label="静态情绪筛选">
          <button className="is-active" type="button">
            全部
          </button>
          <button type="button">平静</button>
          <button type="button">期待</button>
        </div>
      </div>

      <div className="filter-group">
        <span>时间</span>
        <div className="segmented-control" aria-label="静态时间筛选">
          <button className="is-active" type="button">
            本周
          </button>
          <button type="button">本月</button>
          <button type="button">全部</button>
        </div>
      </div>
    </section>
  )
}

export default FilterPanel
