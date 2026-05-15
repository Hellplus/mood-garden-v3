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
import {
  mockAnalytics,
  mockHeroContent,
  mockNavItems,
  mockTags,
} from './data/mockData.js'
import useCalendar from './hooks/useCalendar.js'
import useFilters from './hooks/useFilters.js'
import useRecords from './hooks/useRecords.js'
import { filterRecords, getFilterSummary, getTagCounts, sortRecords } from './utils/records.js'

function App() {
  const {
    records,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    toggleFavorite,
  } = useRecords()
  const {
    filters,
    setFilter,
    toggleTag,
    resetFilters,
    hasActiveFilters,
  } = useFilters()
  const calendar = useCalendar(records)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [detailMode, setDetailMode] = useState('view')
  const [activeNavItem, setActiveNavItem] = useState('garden')
  const [activeTheme, setActiveTheme] = useState('morning')
  const [toastMessage, setToastMessage] = useState('记录系统已经连接到本地花园。')

  const filteredRecords = filterRecords(records, filters)
  const recentRecords = sortRecords(records, 'newest').slice(0, 3)
  const tagCounts = getTagCounts(records)
  const filterSummary = getFilterSummary({
    totalCount: records.length,
    filteredCount: filteredRecords.length,
    hasActiveFilters,
  })

  function showToast(message) {
    setToastMessage(message)
  }

  function handleAddRecord(input) {
    const record = addRecord(input)
    setSelectedRecord(record)
    setDetailMode('view')
    showToast('已经种下一朵新的心情花。')
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
    showToast('这朵花的记录已经更新。')
  }

  function handleDeleteRecord(id) {
    deleteRecord(id)

    if (selectedRecord?.id === id) {
      setSelectedRecord(null)
    }

    showToast('这条记录已经从花园中移除。')
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

    showToast('收藏状态已更新。')
  }

  return (
    <div className="app-shell">
      <HeroSection content={mockHeroContent} />

      <main className="app-main">
        <section className="daily-grid" aria-label="今日情绪记录">
          <TodayStatusCard record={recentRecords[0]} />
          <RecordForm tags={mockTags.slice(0, 5)} onAddRecord={handleAddRecord} />
          <RecentRecords records={recentRecords} onViewRecord={handleViewRecord} />
        </section>

        <section className="garden-workspace" aria-label="花园工作区">
          <div className="workspace-main">
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

          <aside className="workspace-sidebar" aria-label="筛选和偏好">
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
            <ThemeSwitcher activeTheme={activeTheme} onThemeChange={setActiveTheme} />
          </aside>
        </section>

        <section className="insight-grid" aria-label="数据和分析">
          <AnalyticsDashboard analytics={mockAnalytics} />
          <DataPanel />
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
        isVisible={Boolean(toastMessage || error)}
        message={error || toastMessage}
        onDismiss={() => setToastMessage('')}
      />
      <OnboardingModal />
      <MobileBottomNav
        activeItem={activeNavItem}
        items={mockNavItems}
        onChange={setActiveNavItem}
      />
    </div>
  )
}

export default App
