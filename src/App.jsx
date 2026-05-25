import { useRef, useState } from 'react'
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
import { analyticsIcons } from './assets/uiAssets.js'
import entryDataCardImage from './assets/ui/entries/entry-data-card.png'
import entryDataSmallImage from './assets/ui/entries/entry-data-small.png'
import entryGardenCardImage from './assets/ui/entries/entry-garden-card.png'
import entryGardenSmallImage from './assets/ui/entries/entry-garden-small.png'
import entryReviewCardImage from './assets/ui/entries/entry-review-card.png'
import entryReviewSmallImage from './assets/ui/entries/entry-review-small.png'
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
import { formatDateKey, getTodayKey } from './utils/dates.js'
import { filterRecords, getFilterSummary, getTagCounts, sortRecords } from './utils/records.js'

const mobileNavItems = [
  { id: 'records', label: '记录' },
  { id: 'garden', label: '花园' },
  { id: 'analytics', label: '回顾' },
  { id: 'data', label: '数据' },
]

const mobileReviewTabs = [
  { id: 'today', label: '今日', icon: analyticsIcons.reviewToday },
  { id: 'week', label: '本周', icon: analyticsIcons.reviewWeek },
  { id: 'month', label: '本月', icon: analyticsIcons.reviewMonth },
]

const mobileEntryCards = [
  {
    id: 'garden',
    label: '花园',
    hint: '看看今天长出的花',
    cardImage: entryGardenCardImage,
    smallImage: entryGardenSmallImage,
  },
  {
    id: 'analytics',
    label: '回顾',
    hint: '翻一翻近期心情',
    cardImage: entryReviewCardImage,
    smallImage: entryReviewSmallImage,
  },
  {
    id: 'data',
    label: '数据',
    hint: '照看本地记录',
    cardImage: entryDataCardImage,
    smallImage: entryDataSmallImage,
  },
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

function getMobileReviewPaneClass(activeTab, tabId, className = '') {
  return [
    className,
    'mobile-review-pane',
    activeTab === tabId ? 'is-mobile-review-active' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function MobileRecordEntryCards({ onNavigate }) {
  return (
    <nav className="mobile-record-entry-cards" aria-label="记录页轻量入口">
      {mobileEntryCards.map((item) => (
        <button
          className={`mobile-record-entry-card mobile-record-entry-card--${item.id}`}
          key={item.id}
          onClick={() => onNavigate(item.id)}
          type="button"
        >
          <img
            alt=""
            aria-hidden="true"
            className="mobile-record-entry-card-bg"
            src={item.cardImage}
          />
          <span className="mobile-record-entry-copy">
            <strong>{item.label}</strong>
            <small>{item.hint}</small>
          </span>
          <img
            alt=""
            aria-hidden="true"
            className="mobile-record-entry-small"
            src={item.smallImage}
          />
        </button>
      ))}
    </nav>
  )
}

function App() {
  const {
    records,
    error,
    addRecord,
    clearRecords,
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
  const [mobileReviewTab, setMobileReviewTab] = useState('today')
  const [dismissedRecordError, setDismissedRecordError] = useState('')
  const recordSectionRef = useRef(null)
  const recordFormRef = useRef(null)
  const recordNoteInputRef = useRef(null)

  const filteredRecords = filterRecords(records, filters)
  const recentRecords = sortRecords(records, 'newest').slice(0, 3)
  const todayKey = getTodayKey()
  const todayRecords = sortRecords(
    records.filter((record) => {
      const createdAt = Number(record.createdAt)
      const dateSource = Number.isFinite(createdAt) ? createdAt : record.date

      return formatDateKey(dateSource) === todayKey
    }),
    'newest',
  )
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
    const importedRecords = await getImportedRecords(file)

    if (!importedRecords) {
      return
    }

    replaceRecords(importedRecords)
    setSelectedRecord(null)
    showToast(`已用 ${importedRecords.length} 条记录替换当前花园。`, 'success')
  }

  function handleClearRecords() {
    clearRecords()
    setSelectedRecord(null)
    showToast('所有记录已清空。', 'info')
  }

  function handleGoToRecord() {
    setMobileActiveSection('records')

    if (typeof window === 'undefined') {
      return
    }

    window.setTimeout(() => {
      const target = recordFormRef.current || recordSectionRef.current
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      window.setTimeout(() => {
        try {
          recordNoteInputRef.current?.focus({ preventScroll: true })
        } catch {
          recordNoteInputRef.current?.focus()
        }
      }, 220)
    }, 0)
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <HeroSection content={mockHeroContent} />

      <main className="app-main">
        <section
          className={getMobileSectionClass(mobileActiveSection, 'records', 'daily-grid')}
          aria-label="今日情绪记录"
          data-mobile-section="records"
          ref={recordSectionRef}
        >
          <TodayStatusCard record={todayRecords[0]} todayRecordCount={todayRecords.length} />
          <RecordForm
            formRef={recordFormRef}
            noteInputRef={recordNoteInputRef}
            tags={mockTags.slice(0, 5)}
            onAddRecord={handleAddRecord}
          />
          <RecentRecords records={recentRecords} onViewRecord={handleViewRecord} />
          <MobileRecordEntryCards onNavigate={setMobileActiveSection} />
        </section>

        <section
          className={getMobileContainerClass(
            mobileActiveSection,
            ['garden'],
            'garden-workspace',
          )}
          aria-label="花园工作区"
        >
          <div className="mobile-page-heading mobile-garden-page-heading">
            <h1>花园</h1>
            <p>这里收藏着你种下的心情花。</p>
          </div>

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
                onGoToRecord={handleGoToRecord}
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
                'analytics',
                'calendar-panel-wrap desktop-calendar-panel-wrap',
              )}
              data-mobile-section="analytics"
            >
              <CalendarView
                days={calendar.calendarDays}
                monthLabel={calendar.monthLabel}
                onDeleteRecord={handleDeleteRecord}
                onGoToRecord={handleGoToRecord}
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
            <div className="mobile-page-heading mobile-review-page-heading">
              <h1>回顾</h1>
              <p>看看最近的心情花园。</p>
              <div className="mobile-review-tabs" role="tablist" aria-label="回顾范围">
                {mobileReviewTabs.map((tab) => {
                  const isActive = mobileReviewTab === tab.id

                  return (
                    <button
                      aria-selected={isActive}
                      className={isActive ? 'mobile-review-tab is-active' : 'mobile-review-tab'}
                      key={tab.id}
                      onClick={() => setMobileReviewTab(tab.id)}
                      role="tab"
                      type="button"
                    >
                      <img alt="" aria-hidden="true" className="review-tab-icon" src={tab.icon} />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className={getMobileReviewPaneClass(mobileReviewTab, 'month', 'mobile-review-calendar')}>
              <CalendarView
                days={calendar.calendarDays}
                monthLabel={calendar.monthLabel}
                onDeleteRecord={handleDeleteRecord}
                onGoToRecord={handleGoToRecord}
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
            <AnalyticsDashboard
              analytics={analytics}
              calendarDays={calendar.calendarDays}
              calendarMonthLabel={calendar.monthLabel}
              mobileView={mobileReviewTab}
              onGoToRecord={handleGoToRecord}
              todayRecords={todayRecords}
            />
          </div>
          <div
            className={getMobileSectionClass(mobileActiveSection, 'data', 'data-panel-wrap')}
            data-mobile-section="data"
          >
            <DataPanel
              onClearRecords={handleClearRecords}
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
