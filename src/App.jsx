import AnalyticsDashboard from './components/AnalyticsDashboard.jsx'
import CalendarView from './components/CalendarView.jsx'
import DataPanel from './components/DataPanel.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import FlowerCard from './components/FlowerCard.jsx'
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

function App() {
  return (
    <div className="app-shell">
      <HeroSection />

      <main className="app-main">
        <section className="overview-grid" aria-label="今日记录入口">
          <TodayStatusCard />
          <RecordForm />
          <RecentRecords />
        </section>

        <section className="workspace-grid" aria-label="花园工作区">
          <GardenView />
          <FlowerCard />
          <FlowerDetailModal />
          <FilterPanel />
          <TagCloud />
          <CalendarView />
          <AnalyticsDashboard />
          <DataPanel />
          <ThemeSwitcher />
        </section>
      </main>

      <Toast />
      <OnboardingModal />
      <MobileBottomNav />
    </div>
  )
}

export default App
