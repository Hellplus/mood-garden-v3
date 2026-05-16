import { useRef } from 'react'
import jsonBackupIcon from '../assets/ui/icons/data-json-backup.png'
import jsonImportIcon from '../assets/ui/icons/data-json-import.png'
import localStorageIcon from '../assets/ui/icons/data-local-storage.png'
import mergeImportIcon from '../assets/ui/icons/data-merge-import.png'
import nonMedicalIcon from '../assets/ui/icons/data-non-medical-note.png'
import overwriteImportIcon from '../assets/ui/icons/data-overwrite-import.png'
import pwaInstallIcon from '../assets/ui/icons/data-pwa-install.png'
import txtExportIcon from '../assets/ui/icons/data-txt-export.png'

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

      <section className="data-section" aria-labelledby="backup-title">
        <div>
          <h3 id="backup-title">备份与恢复</h3>
          <p>导出始终基于全部记录；导入前会先检查 JSON 文件。</p>
        </div>

        <div className="data-actions">
          <button type="button" onClick={onExportText}>
            <img alt="" aria-hidden="true" className="data-icon" src={txtExportIcon} />
            <span>
              <strong>导出日记 TXT</strong>
              <small>适合阅读和保存文字版日记。</small>
            </span>
          </button>
          <button type="button" onClick={onExportJson}>
            <img alt="" aria-hidden="true" className="data-icon" src={jsonBackupIcon} />
            <span>
              <strong>导出备份 JSON</strong>
              <small>适合备份，也适合以后导回花园。</small>
            </span>
          </button>
          <button type="button" onClick={() => mergeInputRef.current?.click()}>
            <img alt="" aria-hidden="true" className="data-icon" src={mergeImportIcon} />
            <span>
              <strong>合并导入 JSON</strong>
              <small>把备份追加到当前花园，不会清空现有记录。</small>
            </span>
          </button>
          <button
            className="danger-action"
            type="button"
            onClick={() => replaceInputRef.current?.click()}
          >
            <img alt="" aria-hidden="true" className="data-icon" src={overwriteImportIcon} />
            <span>
              <strong>覆盖导入 JSON</strong>
              <small>会替换当前所有记录，操作前会再次确认。</small>
            </span>
          </button>
        </div>
      </section>

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

      <section className="data-section" aria-labelledby="local-data-title">
        <div>
          <h3 id="local-data-title">本地数据说明</h3>
          <p>记录保存在当前浏览器中，换设备不会自动同步。</p>
        </div>

        <div className="data-note-grid" aria-label="数据保存说明">
          <article>
            <img alt="" aria-hidden="true" className="data-icon data-icon--note" src={localStorageIcon} />
            <strong>本地保存</strong>
            <p>记录只保存在当前浏览器里，刷新页面后会从本机恢复。</p>
          </article>
          <article>
            <img alt="" aria-hidden="true" className="data-icon data-icon--note" src={jsonImportIcon} />
            <strong>备份建议</strong>
            <p>清理浏览器数据可能会删除记录，建议定期导出 JSON 备份。</p>
          </article>
        </div>
      </section>

      <section className="data-section" aria-labelledby="app-note-title">
        <div>
          <h3 id="app-note-title">应用说明</h3>
          <p>可以添加到主屏幕使用，但这不代表账号登录或云同步。</p>
        </div>

        <div className="data-note-grid" aria-label="应用安装说明">
          <article>
            <img alt="" aria-hidden="true" className="data-icon data-icon--note" src={pwaInstallIcon} />
            <strong>安装到主屏幕</strong>
            <p>如果浏览器提示可以安装，添加后仍然是本地保存。</p>
          </article>
          <article>
            <img alt="" aria-hidden="true" className="data-icon data-icon--note" src={nonMedicalIcon} />
            <strong>非医疗建议</strong>
            <p>这里的回顾只用于个人记录，不提供心理诊断或医疗建议。</p>
          </article>
        </div>
      </section>
    </section>
  )
}

export default DataPanel
