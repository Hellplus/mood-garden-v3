export function createRecordDraft() {
  return {
    mood: '',
    note: '',
    tags: [],
    createdAt: null,
  }
}

export function normalizeRecords(records = []) {
  return Array.isArray(records) ? records : []
}

export function sortRecordsByDate(records = []) {
  return [...records].sort((first, second) => {
    return new Date(second.createdAt || 0) - new Date(first.createdAt || 0)
  })
}
