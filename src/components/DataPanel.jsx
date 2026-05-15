import { useRef } from 'react'

function DataPanel({
  recordCount = 0,
  onExportText = () => {},
  onExportJson = () => {},
  onImportMerge = () => {},
  onImportReplace = () => {},
}) {
  const mergeInputRef = useRef(null)
  const replaceInputRef = useRef(null)

  function handleFileChange(event, handler) {
    const file = event.target.files?.[0]

    if (file) {
      handler(file)
    }

    event.target.value = ''
  }

  return (
    <section className="surface-panel data-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Data</p>
          <h2>数据管理</h2>
        </div>
        <span className="section-caption">{recordCount} 条记录</span>
      </div>

      <div className="data-actions">
        <button type="button" onClick={onExportText}>
          导出日记 TXT
        </button>
        <button type="button" onClick={onExportJson}>
          导出备份 JSON
        </button>
        <button type="button" onClick={() => mergeInputRef.current?.click()}>
          合并导入 JSON
        </button>
        <button
          className="danger-action"
          type="button"
          onClick={() => replaceInputRef.current?.click()}
        >
          覆盖导入 JSON
        </button>
      </div>

      <input
        accept="application/json,.json"
        className="file-input"
        onChange={(event) => handleFileChange(event, onImportMerge)}
        ref={mergeInputRef}
        type="file"
      />
      <input
        accept="application/json,.json"
        className="file-input"
        onChange={(event) => handleFileChange(event, onImportReplace)}
        ref={replaceInputRef}
        type="file"
      />

      <p className="soft-note">
        导出始终基于全部记录；导入 JSON 后，花园、日历、分析和标签云会自动刷新。
      </p>
    </section>
  )
}

export default DataPanel
