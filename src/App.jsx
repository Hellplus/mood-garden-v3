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
  mockCalendarDays,
  mockHeroContent,
  mockNavItems,
  mockTags,
} from './data/mockData.js'
import useRecords from './hooks/useRecords.js'

function App() {
  const {
    records,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    toggleFavorite,
  } = useRecords()
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [detailMode, setDetailMode] = useState('view')
  const [activeNavItem, setActiveNavItem] = useState('garden')
  const [activeTheme, setActiveTheme] = useState('morning')
  const [toastMessage, setToastMessage] = useState('记录系统已连接到本地花园。')

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
          <TodayStatusCard record={records[0]} />
          <RecordForm tags={mockTags.slice(0, 5)} onAddRecord={handleAddRecord} />
          <RecentRecords records={records.slice(0, 3)} onViewRecord={handleViewRecord} />
        </section>

        <section className="garden-workspace" aria-label="花园工作区">
          <div className="workspace-main">
            <GardenView
              onDeleteRecord={handleDeleteRecord}
              onEditRecord={handleEditRecord}
              onToggleFavorite={handleToggleFavorite}
              onViewRecord={handleViewRecord}
              records={records}
              selectedRecordId={selectedRecord?.id}
            />
            <CalendarView days={mockCalendarDays} />
          </div>

          <aside className="workspace-sidebar" aria-label="筛选和偏好">
            <FilterPanel />
            <TagCloud tags={mockTags} />
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
