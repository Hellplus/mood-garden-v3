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
  mockFlowers,
  mockHeroContent,
  mockNavItems,
  mockRecords,
  mockTags,
} from './data/mockData.js'

function App() {
  const [selectedFlower, setSelectedFlower] = useState(mockFlowers[0])
  const [isDetailOpen, setIsDetailOpen] = useState(true)
  const [activeNavItem, setActiveNavItem] = useState('garden')
  const [activeTheme, setActiveTheme] = useState('morning')
  const [isToastVisible, setIsToastVisible] = useState(true)

  function handleFlowerSelect(flower) {
    setSelectedFlower(flower)
    setIsDetailOpen(true)
  }

  function handlePreviewSave() {
    setIsToastVisible(true)
  }

  return (
    <div className="app-shell">
      <HeroSection content={mockHeroContent} />

      <main className="app-main">
        <section className="daily-grid" aria-label="今日情绪记录">
          <TodayStatusCard record={mockRecords[0]} />
          <RecordForm tags={mockTags.slice(0, 5)} onPreviewSave={handlePreviewSave} />
          <RecentRecords records={mockRecords} />
        </section>

        <section className="garden-workspace" aria-label="花园工作区">
          <div className="workspace-main">
            <GardenView
              flowers={mockFlowers}
              onSelectFlower={handleFlowerSelect}
              selectedFlowerId={selectedFlower.id}
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
        flower={selectedFlower}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
      <Toast isVisible={isToastVisible} onDismiss={() => setIsToastVisible(false)} />
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
