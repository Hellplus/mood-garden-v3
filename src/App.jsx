import { useState } from 'react'
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx'
import CalendarView from './components/CalendarView.jsx'
import DataPanel from './components/DataPanel.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import FlowerDetailModal from './components/FlowerDetailModal.jsx'
import GardenView from './components/GardenView.jsx'
import HeroSection from './components/HeroSection.jsx'
import MobileBottomNav from './components/MobileBottomNav.jsx'
import OnboardingModal from './components/OnboardingModal.jsx'
import RecentRecords from './components/RecentRecords.jsx'
import RecordForm from './components/RecordForm.jsx'
import TagCloud from './components/TagCloud.jsx'
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import TodayStatusCard from './components/TodayStatusCard.jsx'
import Toast from './components/Toast.jsx'
import { mockHeroContent, mockTags } from './data/mockData.js'
import useAnalytics from './hooks/useAnalytics.js'
import useCalendar from './hooks/useCalendar.js'
import useFilters from './hooks/useFilters.js'
import useOnboarding from './hooks/useOnboarding.js'
import useRecords from './hooks/useRecords.js'
import useTheme from './hooks/useTheme.js'
import useToast from './hooks/useToast.js'
import {
  buildExportFilename,
  createJsonExport,
  createTextExport,
  downloadFile,
  parseImportPayload,
  readFileAsText,
} from './utils/importExport.js'
import { filterRecords, getFilterSummary, getTagCounts, sortRecords } from './utils/records.js'

const mobileNavItems = [
  { id: 'records', label: '记录' },
  { id: 'garden', label: '花园' },
  { id: 'analytics', label: '分析' },
  { id: 'data', label: '数据' },
]

function getMobileSectionClass(activeSection, sectionId, className = '') {
  return [className, 'mobile-section', activeSection === sectionId ? 'is-mobile-active' : '']
    .filter(Boolean)
    .join(' ')
}

function getMobileContainerClass(activeSection, sectionIds, className = '') {
  return [
    className,
    'mobile-container',
    sectionIds.includes(activeSection) ? 'is-mobile-container-active' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function App() {
  const {
    records,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    toggleFavorite,
    replaceRecords,
    mergeRecords,
  } = useRecords()
  const {
    filters,
    setFilter,
    toggleTag,
    resetFilters,
    hasActiveFilters,
  } = useFilters()
  const { theme, themes, setTheme } = useTheme()
  const { toast, showToast, dismissToast } = useToast()
  const {
    isOnboardingOpen,
    openOnboarding,
    closeOnboarding,
    completeOnboarding,
  } = useOnboarding()
  const calendar = useCalendar(records)
  const analytics = useAnalytics(records)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [detailMode, setDetailMode] = useState('view')
  const [mobileActiveSection, setMobileActiveSection] = useState('records')
  const [dismissedRecordError, setDismissedRecordError] = useState('')

  const filteredRecords = filterRecords(records, filters)
  const recentRecords = sortRecords(records, 'newest').slice(0, 3)
  const tagCounts = getTagCounts(records)
  const filterSummary = getFilterSummary({
    totalCount: records.length,
    filteredCount: filteredRecords.length,
    hasActiveFilters,
  })
  const visibleRecordError = error && error !== dismissedRecordError
  const activeToast = visibleRecordError ? { message: error, type: 'error' } : toast

  function handleToastDismiss() {
    if (visibleRecordError) {
      setDismissedRecordError(error)
    }

    dismissToast()
  }

  function handleThemeChange(nextTheme) {
    setTheme(nextTheme)
    showToast('主题外观已更新。', 'info')
  }

  function handleCloseOnboarding() {
    closeOnboarding()
    showToast('新手引导已收起，可以在主题外观里重新查看。', 'info')
  }

  function handleCompleteOnboarding() {
    completeOnboarding()
    showToast('准备好了，慢慢照看你的心情花园。', 'success')
  }

  function handleAddRecord(input) {
    const record = addRecord(input)
    setSelectedRecord(record)
    setDetailMode('view')
    showToast('已经种下一朵新的心情花。', 'success')
  }

  function handleViewRecord(record) {
    setSelectedRecord(record)
    setDetailMode('view')
  }

  function handleEditRecord(record) {
    setSelectedRecord(record)
    setDetailMode('edit')
  }

  function handleSaveRecord(id, patch) {
    const updatedRecord = updateRecord(id, patch)
    setSelectedRecord(updatedRecord)
    setDetailMode('view')
    showToast('这朵花的记录已经更新。', 'success')
  }

  function handleDeleteRecord(id) {
    deleteRecord(id)

    if (selectedRecord?.id === id) {
      setSelectedRecord(null)
    }

    showToast('这条记录已经从花园中移除。', 'info')
  }

  function handleToggleFavorite(id) {
    toggleFavorite(id)

    if (selectedRecord?.id === id) {
      setSelectedRecord({
        ...selectedRecord,
        isFavorite: !selectedRecord.isFavorite,
        updatedAt: Date.now(),
      })
    }

    showToast('收藏状态已更新。', 'info')
  }

  async function getImportedRecords(file) {
    try {
      const content = await readFileAsText(file)
      const result = parseImportPayload(content)

      if (!result.ok) {
        showToast(result.message, 'error')
        return null
      }

      return result.records
    } catch (importError) {
      showToast(importError?.message || '读取文件失败，请确认是 JSON 备份。', 'error')
      return null
    }
  }

  function handleExportText() {
    const exported = downloadFile(
      buildExportFilename('txt'),
      createTextExport(records),
      'text/plain;charset=utf-8',
    )

    showToast(
      exported ? '已导出 TXT 日记。' : '当前环境暂时无法下载文件。',
      exported ? 'success' : 'error',
    )
  }

  function handleExportJson() {
    const exported = downloadFile(
      buildExportFilename('json'),
      createJsonExport(records),
      'application/json;charset=utf-8',
    )

    showToast(
      exported ? '已导出 JSON 备份。' : '当前环境暂时无法下载文件。',
      exported ? 'success' : 'error',
    )
  }

  async function handleImportMerge(file) {
    const importedRecords = await getImportedRecords(file)

    if (!importedRecords) {
      return
    }

    mergeRecords(importedRecords)
    showToast(`已合并导入 ${importedRecords.length} 条记录。`, 'success')
  }

  async function handleImportReplace(file) {
    const confirmed =
      typeof window !== 'undefined'
        ? window.confirm('覆盖导入会替换当前所有记录，确定继续吗？')
        : false

    if (!confirmed) {
      showToast('已取消覆盖导入。', 'info')
      return
    }

    const importedRecords = await getImportedRecords(file)

    if (!importedRecords) {
      return
    }

    replaceRecords(importedRecords)
    setSelectedRecord(null)
    showToast(`已用 ${importedRecords.length} 条记录替换当前花园。`, 'success')
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <HeroSection content={mockHeroContent} />

      <main className="app-main">
        <section
          className={getMobileSectionClass(mobileActiveSection, 'records', 'daily-grid')}
          aria-label="今日情绪记录"
          data-mobile-section="records"
        >
          <TodayStatusCard record={recentRecords[0]} />
          <RecordForm tags={mockTags.slice(0, 5)} onAddRecord={handleAddRecord} />
          <RecentRecords records={recentRecords} onViewRecord={handleViewRecord} />
        </section>

        <section
          className={getMobileContainerClass(
            mobileActiveSection,
            ['garden', 'data'],
            'garden-workspace',
          )}
          aria-label="花园工作区"
        >
          <div className="workspace-main">
            <div
              className={getMobileSectionClass(
                mobileActiveSection,
                'garden',
                'garden-panel-wrap',
              )}
              data-mobile-section="garden"
            >
              <GardenView
                hasActiveFilters={hasActiveFilters}
                onDeleteRecord={handleDeleteRecord}
                onEditRecord={handleEditRecord}
                onResetFilters={resetFilters}
                onToggleFavorite={handleToggleFavorite}
                onViewRecord={handleViewRecord}
                records={filteredRecords}
                selectedRecordId={selectedRecord?.id}
                totalCount={records.length}
              />
            </div>
            <div
              className={getMobileSectionClass(
                mobileActiveSection,
                'data',
                'calendar-panel-wrap',
              )}
              data-mobile-section="data"
            >
              <CalendarView
                days={calendar.calendarDays}
                monthLabel={calendar.monthLabel}
                onDeleteRecord={handleDeleteRecord}
                onNextMonth={calendar.goToNextMonth}
                onPrevMonth={calendar.goToPrevMonth}
                onSelectDate={calendar.selectDate}
                onToday={calendar.goToToday}
                onToggleFavorite={handleToggleFavorite}
                onViewRecord={handleViewRecord}
                selectedDateKey={calendar.selectedDateKey}
                selectedRecords={calendar.selectedRecords}
              />
            </div>
          </div>

          <aside
            className={getMobileSectionClass(
              mobileActiveSection,
              'garden',
              'workspace-sidebar',
            )}
            aria-label="筛选和偏好"
            data-mobile-section="garden"
          >
            <FilterPanel
              filteredCount={filteredRecords.length}
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              summary={filterSummary}
              totalCount={records.length}
            />
            <TagCloud
              onSelectTag={toggleTag}
              selectedTag={filters.selectedTag}
              tags={tagCounts}
            />
            <ThemeSwitcher
              activeTheme={theme}
              onOpenOnboarding={openOnboarding}
              onThemeChange={handleThemeChange}
              themes={themes}
            />
          </aside>
        </section>

        <section
          className={getMobileContainerClass(
            mobileActiveSection,
            ['analytics', 'data'],
            'insight-grid',
          )}
          aria-label="数据和分析"
        >
          <div
            className={getMobileSectionClass(
              mobileActiveSection,
              'analytics',
              'analytics-panel-wrap',
            )}
            data-mobile-section="analytics"
          >
            <AnalyticsDashboard analytics={analytics} />
          </div>
          <div
            className={getMobileSectionClass(mobileActiveSection, 'data', 'data-panel-wrap')}
            data-mobile-section="data"
          >
            <DataPanel
              onExportJson={handleExportJson}
              onExportText={handleExportText}
              onImportMerge={handleImportMerge}
              onImportReplace={handleImportReplace}
              recordCount={records.length}
            />
          </div>
        </section>
      </main>

      <FlowerDetailModal
        key={selectedRecord ? `${selectedRecord.id}-${detailMode}` : 'closed'}
        mode={detailMode}
        onClose={() => setSelectedRecord(null)}
        onDelete={handleDeleteRecord}
        onSave={handleSaveRecord}
        onToggleFavorite={handleToggleFavorite}
        record={selectedRecord}
      />
      <Toast
        toast={activeToast}
        onDismiss={handleToastDismiss}
      />
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
        onComplete={handleCompleteOnboarding}
      />
      <MobileBottomNav
        activeItem={mobileActiveSection}
        items={mobileNavItems}
        onChange={setMobileActiveSection}
      />
    </div>
  )
}

export default App
