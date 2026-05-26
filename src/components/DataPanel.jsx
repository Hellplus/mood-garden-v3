import { useRef, useState } from 'react'
import { dataIcons, emptyStateImages, warningIcons } from '../assets/uiAssets.js'
import dataChooseFileImage from '../assets/ui/data/data-choose-file.png'
import dataCoverImportConfirmImage from '../assets/ui/data/data-cover-import-confirm.png'
import dataDangerOperationBadgeImage from '../assets/ui/data/data-danger-operation-badge.png'
import dataDeleteAllImage from '../assets/ui/data/data-delete-all.png'
import dataDeleteAllWarningImage from '../assets/ui/data/data-delete-all-warning.png'
import dataDeviceNoSyncImage from '../assets/ui/data/data-device-no-sync.png'
import dataMergeRecommendedBadgeImage from '../assets/ui/data/data-merge-recommended-badge.png'
import dataPwaGuideImage from '../assets/ui/data/data-pwa-guide.png'
import dataRegularBackupImage from '../assets/ui/data/data-regular-backup.png'
import ConfirmDialog from './ConfirmDialog.jsx'

function DataActionButton({
  badgeIcon,
  badgeLabel,
  disabled = false,
  icon,
  title,
  description,
  onClick,
  variant = '',
}) {
  return (
    <button
      className={['data-action-card', variant].filter(Boolean).join(' ')}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <img alt="" aria-hidden="true" className="data-icon" src={icon} />
      <span>
        <strong>
          {title}
          {badgeIcon ? (
            <em className="data-action-badge">
              <img alt="" aria-hidden="true" src={badgeIcon} />
              {badgeLabel}
            </em>
          ) : null}
        </strong>
        <small>{description}</small>
      </span>
    </button>
  )
}

function DataNoteCard({ icon, title, description }) {
  return (
    <article>
      <img
        alt=""
        aria-hidden="true"
        className="data-icon data-icon--note"
        src={icon}
      />
      <strong>{title}</strong>
      <p>{description}</p>
    </article>
  )
}

function DataPanel({
  recordCount = 0,
  onExportText = () => {},
  onExportJson = () => {},
  onImportMerge = () => {},
  onImportReplace = () => {},
  onClearRecords,
}) {
  const fileInputRef = useRef(null)
  const [fileAction, setFileAction] = useState('select')
  const [selectedImportFile, setSelectedImportFile] = useState(null)
  const [pendingReplaceFile, setPendingReplaceFile] = useState(null)
  const [isReplaceConfirmOpen, setIsReplaceConfirmOpen] = useState(false)
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false)
  const [isPwaGuideOpen, setIsPwaGuideOpen] = useState(false)
  const canClearRecords = typeof onClearRecords === 'function'

  function openFilePicker(action = 'select') {
    setFileAction(action)
    fileInputRef.current?.click()
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]

    if (file) {
      setSelectedImportFile(file)

      if (fileAction === 'merge') {
        onImportMerge(file)
        setSelectedImportFile(null)
      }

      if (fileAction === 'replace') {
        setPendingReplaceFile(file)
        setIsReplaceConfirmOpen(true)
      }
    }

    setFileAction('select')
    event.target.value = ''
  }

  function handleMergeImport() {
    if (!selectedImportFile) {
      openFilePicker('merge')
      return
    }

    onImportMerge(selectedImportFile)
    setSelectedImportFile(null)
  }

  function handleReplaceImport() {
    if (!selectedImportFile) {
      openFilePicker('replace')
      return
    }

    setPendingReplaceFile(selectedImportFile)
    setIsReplaceConfirmOpen(true)
  }

  function handleCancelReplace() {
    setIsReplaceConfirmOpen(false)
    setPendingReplaceFile(null)
  }

  function handleConfirmReplace() {
    if (pendingReplaceFile) {
      onImportReplace(pendingReplaceFile)
    }

    setIsReplaceConfirmOpen(false)
    setPendingReplaceFile(null)
    setSelectedImportFile(null)
  }

  function handleConfirmClear() {
    if (canClearRecords) {
      onClearRecords()
    }

    setIsClearConfirmOpen(false)
  }

  return (
    <section className="surface-panel data-panel">
      <div className="section-heading data-page-heading">
        <div>
          <h2>数据</h2>
          <p className="section-intro">管理你的花园备份与本地记录。</p>
        </div>
        <span className="section-caption">{recordCount} 条记录</span>
      </div>

      <section className="data-section data-section--export" aria-labelledby="export-title">
        <div className="data-section-heading">
          <h3 id="export-title">备份与导出</h3>
          <p>把花园留成一份可以保存的文件，不受当前筛选影响。</p>
        </div>

        <div className="data-actions">
          <DataActionButton
            description="会保存为 TXT 文件，适合阅读和整理。"
            icon={dataIcons.txtExport}
            onClick={onExportText}
            title="导出文字日记"
          />
          <DataActionButton
            description="会保存为 JSON 文件，适合以后导回花园。"
            icon={dataIcons.jsonBackup}
            onClick={onExportJson}
            title="导出花园备份"
          />
        </div>
      </section>

      <section className="data-section data-section--restore" aria-labelledby="restore-title">
        <div className="data-section-heading">
          <h3 id="restore-title">恢复花园</h3>
          <p>先选择备份文件，再决定把它合并进来或覆盖当前记录。</p>
        </div>

        <div className="data-actions">
          <DataActionButton
            description={selectedImportFile ? `已选择：${selectedImportFile.name}` : '支持 Mood Garden 的 JSON 备份文件。'}
            icon={dataChooseFileImage}
            onClick={() => openFilePicker('select')}
            title="选择备份文件"
          />
          <DataActionButton
            description="把备份追加到当前花园，不会清空已有记录。"
            icon={dataIcons.mergeImport}
            badgeIcon={dataMergeRecommendedBadgeImage}
            badgeLabel="推荐"
            onClick={handleMergeImport}
            title="合并导入"
          />
          <DataActionButton
            description="会用备份文件替换当前记录，建议先导出当前备份。"
            icon={dataIcons.overwriteImport}
            badgeIcon={dataDangerOperationBadgeImage}
            badgeLabel="危险操作"
            onClick={handleReplaceImport}
            title="覆盖导入"
            variant="danger-action"
          />
        </div>
        <div className="data-import-help">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--sm empty-state-asset"
            src={emptyStateImages.importError}
          />
          <span>
            <strong>这份文件没有被认出来时</strong>
            <small>请确认它是 Mood Garden 的备份文件，再重新选择。</small>
          </span>
        </div>
      </section>

      <input
        accept="application/json,.json"
        className="file-input"
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />

      <section className="data-section data-section--local" aria-labelledby="local-data-title">
        <div className="data-section-heading">
          <h3 id="local-data-title">本地保存</h3>
          <p>记录只保存在当前浏览器里，换设备不会自动同步。</p>
        </div>

        <div className="data-note-grid" aria-label="数据保存说明">
          <DataNoteCard
            description="你的心情花保存在本地设备，刷新页面后会从本机恢复。"
            icon={dataIcons.localStorage}
            title="记录只保存在当前浏览器"
          />
          <DataNoteCard
            description="更换手机或浏览器后，记录不会自己同步过去。"
            icon={dataDeviceNoSyncImage}
            title="换设备不会自动同步"
          />
          <DataNoteCard
            description="隔一段时间导出一份备份，就能更安心地保存花园。"
            icon={dataRegularBackupImage}
            title="建议定期导出备份"
          />
        </div>
        <div className="empty-state backup-reminder-state">
          <img
            alt=""
            aria-hidden="true"
            className="ui-illustration ui-illustration--sm empty-state-asset"
            src={emptyStateImages.backupReminder}
          />
          <strong>记得备份你的花园</strong>
          <p>记录只保存在当前浏览器，定期导出备份会更安心。</p>
          <button className="secondary-action" type="button" onClick={onExportJson}>
            导出备份
          </button>
        </div>
      </section>

      <section className="data-section data-section--pwa" aria-labelledby="pwa-title">
        <div className="data-section-heading">
          <h3 id="pwa-title">添加到主屏幕</h3>
          <p>添加到主屏幕只是方便打开，不代表账号登录或云同步。</p>
        </div>

        <div className="data-note-grid" aria-label="应用安装说明">
          <article>
            <img
              alt=""
              aria-hidden="true"
              className="data-icon data-icon--note"
              src={dataPwaGuideImage}
            />
            <strong>像 App 一样打开</strong>
            <p>添加到主屏幕后更方便打开，但不会自动同步，也不代表账号登录。</p>
            <button className="text-action data-guide-toggle" type="button" onClick={() => setIsPwaGuideOpen((value) => !value)}>
              查看教程 ›
            </button>
            {isPwaGuideOpen ? (
              <small className="data-guide-note">在浏览器菜单中选择“添加到主屏幕”或“安装应用”。记录仍只保存在当前设备。</small>
            ) : null}
          </article>
        </div>
      </section>

      <section className="data-section data-section--note" aria-labelledby="non-medical-title">
        <div className="data-section-heading">
          <h3 id="non-medical-title">使用提醒</h3>
        </div>

        <div className="data-note-grid" aria-label="使用提醒">
          <article>
            <img
              alt=""
              aria-hidden="true"
              className="data-icon data-icon--note"
              src={dataIcons.nonMedicalNote}
            />
            <strong>Mood Garden 不是医疗工具</strong>
            <p>这里适合记录和回看心情，不提供心理诊断或医疗建议。如有需要，请寻求专业帮助。</p>
          </article>
        </div>
      </section>

      <section className="data-section data-section--danger" aria-labelledby="danger-data-title">
        <div className="data-section-heading">
          <h3 id="danger-data-title">需要确认的操作</h3>
          <p>这些操作会影响当前花园，执行前会再次确认。</p>
        </div>

        <div className="data-actions">
          {canClearRecords ? (
            <DataActionButton
              description={recordCount > 0 ? '此操作无法撤销，所有记录会被永久删除。' : '当前没有可删除的记录。'}
              disabled={recordCount === 0}
              icon={dataDeleteAllImage}
              onClick={() => setIsClearConfirmOpen(true)}
              title="删除所有数据"
              variant="danger-action"
            />
          ) : null}
        </div>
        <div className="data-danger-note">
          <img alt="" aria-hidden="true" className="data-icon data-icon--note" src={warningIcons.soft} />
          <span>{canClearRecords ? '删除前请先导出当前备份，以防数据丢失。' : '这里暂时没有可以执行的清空入口。'}</span>
        </div>
      </section>

      <ConfirmDialog
        cancelLabel="取消"
        confirmLabel="确认覆盖"
        description="此操作会替换当前所有记录，覆盖后无法撤销。"
        image={dataCoverImportConfirmImage}
        isOpen={isReplaceConfirmOpen}
        note="建议先导出当前备份，以防数据丢失。"
        title="确认覆盖导入？"
        variant="danger"
        onCancel={handleCancelReplace}
        onConfirm={handleConfirmReplace}
      />
      <ConfirmDialog
        cancelLabel="取消"
        confirmLabel="确认删除"
        description="此操作会清空当前浏览器里的所有心情记录，删除后无法撤销。"
        image={dataDeleteAllWarningImage}
        isOpen={isClearConfirmOpen}
        note="建议先导出一份备份，再进行删除。"
        title="删除所有数据？"
        variant="danger"
        onCancel={() => setIsClearConfirmOpen(false)}
        onConfirm={handleConfirmClear}
      />
    </section>
  )
}

export default DataPanel
