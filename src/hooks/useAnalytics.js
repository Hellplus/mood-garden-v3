function useAnalytics() {
  return {
    summary: {
      totalRecords: 0,
      streakDays: 0,
      moodDistribution: [],
    },
    refreshAnalytics: () => {},
  }
}

export default useAnalytics
