import { useRef } from 'react'
import { dataIcons, warningIcons } from '../assets/uiAssets.js'

function DataActionButton({ icon, title, description, onClick, variant = '' }) {
  return (
    <button className={variant} type="button" onClick={onClick}>
      <img alt="" aria-hidden="true" className="data-icon" src={icon} />
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </button>
  )
}

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
      <div className="section-heading data-page-heading">
        <div>
          <p className="eyebrow">Data</p>
          <h2>数据</h2>
          <p className="section-intro">管理你的花园备份与本地记录。</p>
        </div>
        <span className="section-caption">{recordCount} 条记录</span>
      </div>

      <section className="data-section data-section--export" aria-labelledby="export-title">
        <div className="data-section-heading">
          <p className="eyebrow">Backup</p>
          <h3 id="export-title">一、备份与导出</h3>
          <p>导出始终基于全部记录，不受当前筛选条件影响。</p>
        </div>

        <div className="data-actions">
          <DataActionButton
            description="适合阅读和保存文字版日记。"
            icon={dataIcons.txtExport}
            onClick={onExportText}
            title="导出 TXT 日记"
          />
          <DataActionButton
            description="适合备份，也适合以后导回花园。"
            icon={dataIcons.jsonBackup}
            onClick={onExportJson}
            title="导出 JSON 备份"
          />
        </div>
      </section>

      <section className="data-section data-section--restore" aria-labelledby="restore-title">
        <div className="data-section-heading">
          <p className="eyebrow">Restore</p>
          <h3 id="restore-title">二、恢复数据</h3>
          <p>导入前会先检查 JSON 文件，并用记录 normalizer 整理旧数据。</p>
        </div>

        <div className="data-actions">
          <DataActionButton
            description="从备份文件中选择 JSON。"
            icon={dataIcons.jsonImport}
            onClick={() => mergeInputRef.current?.click()}
            title="选择 JSON 文件"
          />
          <DataActionButton
            description="把备份追加到当前花园，不会清空已有记录。"
            icon={dataIcons.mergeImport}
            onClick={() => mergeInputRef.current?.click()}
            title="合并导入 JSON"
          />
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

      <section className="data-section data-section--local" aria-labelledby="local-data-title">
        <div className="data-section-heading">
          <p className="eyebrow">Local</p>
          <h3 id="local-data-title">三、本地保存说明</h3>
          <p>记录只保存在当前浏览器里，换设备不会自动同步。</p>
        </div>

        <div className="data-note-grid" aria-label="数据保存说明">
          <article>
            <img
              alt=""
              aria-hidden="true"
              className="data-icon data-icon--note"
              src={dataIcons.localStorage}
            />
            <strong>记录只保存在当前浏览器</strong>
            <p>你的所有心情花都保存在本地设备，刷新页面后会从本机恢复。</p>
          </article>
          <article>
            <img
              alt=""
              aria-hidden="true"
              className="data-icon data-icon--note"
              src={dataIcons.jsonBackup}
            />
            <strong>建议定期导出 JSON 备份</strong>
            <p>清理浏览器数据可能会删除记录，定期备份会更安心。</p>
          </article>
        </div>
      </section>

      <section className="data-section data-section--pwa" aria-labelledby="pwa-title">
        <div className="data-section-heading">
          <p className="eyebrow">PWA</p>
          <h3 id="pwa-title">四、添加到主屏幕</h3>
          <p>添加到主屏幕只是方便打开，不代表账号登录或云同步。</p>
        </div>

        <div className="data-note-grid" aria-label="应用安装说明">
          <article>
            <img
              alt=""
              aria-hidden="true"
              className="data-icon data-icon--note"
              src={dataIcons.pwaInstall}
            />
            <strong>像 App 一样打开</strong>
            <p>如果浏览器提示可以安装，添加后仍然只保存在本设备。</p>
          </article>
        </div>
      </section>

      <section className="data-section data-section--note" aria-labelledby="non-medical-title">
        <div className="data-section-heading">
          <p className="eyebrow">Note</p>
          <h3 id="non-medical-title">五、非医疗建议说明</h3>
        </div>

        <div className="data-note-grid" aria-label="非医疗建议说明">
          <article>
            <img
              alt=""
              aria-hidden="true"
              className="data-icon data-icon--note"
              src={dataIcons.nonMedicalNote}
            />
            <strong>Mood Garden 不是医疗工具</strong>
            <p>这里是你的情绪花园，不提供心理诊断或医疗建议。如有需要，请寻求专业帮助。</p>
          </article>
        </div>
      </section>

      <section className="data-section data-section--danger" aria-labelledby="danger-data-title">
        <div className="data-section-heading">
          <p className="eyebrow">Careful</p>
          <h3 id="danger-data-title">六、危险操作区域</h3>
          <p>覆盖导入会替换当前所有记录，操作前建议先导出当前花园。</p>
        </div>

        <div className="data-actions">
          <DataActionButton
            description="会替换当前所有记录，操作前会再次确认。"
            icon={dataIcons.overwriteImport}
            onClick={() => replaceInputRef.current?.click()}
            title="覆盖导入 JSON"
            variant="danger-action"
          />
        </div>
        <div className="data-danger-note">
          <img alt="" aria-hidden="true" className="data-icon data-icon--note" src={warningIcons.soft} />
          <span>建议先导出当前备份，以防数据丢失。</span>
        </div>
      </section>
    </section>
  )
}

export default DataPanel
