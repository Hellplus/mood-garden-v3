export function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

export function formatDisplayDate(date = new Date()) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function isSameDate(firstDate, secondDate) {
  return getTodayKey(firstDate) === getTodayKey(secondDate)
}
