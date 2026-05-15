export function createEmptyAnalytics() {
  return {
    totalRecords: 0,
    streakDays: 0,
    moodDistribution: [],
    tagDistribution: [],
  }
}

export function summarizeRecords(records = []) {
  return {
    ...createEmptyAnalytics(),
    totalRecords: records.length,
  }
}
