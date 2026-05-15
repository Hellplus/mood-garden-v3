function padDatePart(value) {
  return String(value).padStart(2, '0')
}

function getSafeDate(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

function getRecordDate(record) {
  const createdAt = Number(record?.createdAt)

  if (Number.isFinite(createdAt)) {
    return getSafeDate(createdAt)
  }

  const parsedDate = Date.parse(record?.date)
  return Number.isFinite(parsedDate) ? getSafeDate(parsedDate) : null
}

function getRecordsForDate(recordsByDate, dateKey) {
  if (recordsByDate instanceof Map) {
    return recordsByDate.get(dateKey) || []
  }

  return recordsByDate?.[dateKey] || []
}

export function formatDateKey(value = new Date()) {
  const date = getSafeDate(value)

  if (!date) {
    return ''
  }

  return [
    date.getFullYear(),
    padDatePart(date.getMonth() + 1),
    padDatePart(date.getDate()),
  ].join('-')
}

export function getTodayKey(date = new Date()) {
  return formatDateKey(date)
}

export function isSameDateKey(firstKey, secondKey) {
  return Boolean(firstKey) && firstKey === secondKey
}

export function isSameDate(firstDate, secondDate) {
  return isSameDateKey(formatDateKey(firstDate), formatDateKey(secondDate))
}

export function formatDisplayDate(date = new Date()) {
  const safeDate = getSafeDate(date) || new Date()

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(safeDate)
}

export function getMonthMeta(date = new Date()) {
  const safeDate = getSafeDate(date) || new Date()
  const year = safeDate.getFullYear()
  const monthIndex = safeDate.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const leadingBlankCount = (firstDay.getDay() + 6) % 7
  const monthLabel = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
  }).format(firstDay)

  return {
    year,
    monthIndex,
    firstDay,
    daysInMonth,
    leadingBlankCount,
    monthLabel,
  }
}

export function groupRecordsByDate(records = []) {
  const groups = new Map()

  records.forEach((record) => {
    const recordDate = getRecordDate(record)

    if (!recordDate) {
      return
    }

    const dateKey = formatDateKey(recordDate)
    const recordsForDay = groups.get(dateKey) || []
    recordsForDay.push(record)
    groups.set(dateKey, recordsForDay)
  })

  groups.forEach((recordsForDay) => {
    recordsForDay.sort((first, second) => {
      return Number(second.createdAt || 0) - Number(first.createdAt || 0)
    })
  })

  return groups
}

export function getCalendarDays({
  monthDate = new Date(),
  recordsByDate = new Map(),
  selectedDateKey = getTodayKey(),
} = {}) {
  const { year, monthIndex, daysInMonth, leadingBlankCount } = getMonthMeta(monthDate)
  const todayKey = getTodayKey()
  const days = []

  for (let index = 0; index < leadingBlankCount; index += 1) {
    days.push({
      id: `blank-${year}-${monthIndex}-${index}`,
      isBlank: true,
    })
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    const date = new Date(year, monthIndex, dayNumber)
    const dateKey = formatDateKey(date)
    const records = getRecordsForDate(recordsByDate, dateKey)

    days.push({
      id: dateKey,
      date,
      dateKey,
      dayNumber,
      records,
      recordCount: records.length,
      hasRecords: records.length > 0,
      isToday: isSameDateKey(dateKey, todayKey),
      isSelected: isSameDateKey(dateKey, selectedDateKey),
      isCurrentMonth: true,
    })
  }

  return days
}
