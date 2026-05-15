function useCalendar() {
  return {
    currentDate: new Date(),
    visibleDays: [],
    goToToday: () => {},
    setCurrentDate: () => {},
  }
}

export default useCalendar
