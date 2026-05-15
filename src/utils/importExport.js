export function exportRecords(records = []) {
  return JSON.stringify({ records }, null, 2)
}

export function importRecords(payload = '') {
  try {
    const parsedPayload = JSON.parse(payload)
    return Array.isArray(parsedPayload.records) ? parsedPayload.records : []
  } catch {
    return []
  }
}
