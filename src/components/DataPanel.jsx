function DataPanel() {
  return (
    <section className="surface-panel data-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Data</p>
          <h2>数据管理</h2>
        </div>
        <span className="section-caption">仅 UI</span>
      </div>

      <div className="data-actions">
        <button type="button">导入记录</button>
        <button type="button">导出 JSON</button>
        <button type="button">生成备份</button>
      </div>

      <p className="soft-note">
        本阶段只展示操作入口，不执行真实导入、导出或备份。
      </p>
    </section>
  )
}

export default DataPanel
