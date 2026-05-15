import { useMemo, useState } from 'react'
import {
  formatDateKey,
  getCalendarDays,
  getMonthMeta,
  getTodayKey,
  groupRecordsByDate,
} from '../utils/dates.js'

function getMonthDate(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey || '').split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new Date(year, month - 1, day)
}

function useCalendar(records = []) {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => getMonthDate())
  const [selectedDateKey, setSelectedDateKey] = useState(() => getTodayKey())

  const recordsByDate = useMemo(() => groupRecordsByDate(records), [records])
  const monthMeta = useMemo(() => getMonthMeta(currentMonthDate), [currentMonthDate])
  const calendarDays = useMemo(
    () =>
      getCalendarDays({
        monthDate: currentMonthDate,
        recordsByDate,
        selectedDateKey,
      }),
    [currentMonthDate, recordsByDate, selectedDateKey],
  )
  const selectedRecords = recordsByDate.get(selectedDateKey) || []

  function goToPrevMonth() {
    setCurrentMonthDate((currentDate) => {
      const nextDate = getMonthDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      )
      setSelectedDateKey(formatDateKey(nextDate))
      return nextDate
    })
  }

  function goToNextMonth() {
    setCurrentMonthDate((currentDate) => {
      const nextDate = getMonthDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      )
      setSelectedDateKey(formatDateKey(nextDate))
      return nextDate
    })
  }

  function goToToday() {
    const today = new Date()
    setCurrentMonthDate(getMonthDate(today))
    setSelectedDateKey(getTodayKey(today))
  }

  function selectDate(dateKey) {
    if (!dateKey) {
      return
    }

    setSelectedDateKey(dateKey)
    const selectedDate = parseDateKey(dateKey)

    if (selectedDate && !Number.isNaN(selectedDate.getTime())) {
      setCurrentMonthDate(getMonthDate(selectedDate))
    }
  }

  return {
    currentDate: currentMonthDate,
    currentYear: monthMeta.year,
    currentMonth: monthMeta.monthIndex,
    monthLabel: monthMeta.monthLabel,
    calendarDays,
    visibleDays: calendarDays,
    selectedDateKey,
    selectedRecords,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    setCurrentDate: (date) => {
      const nextDate = date instanceof Date ? date : new Date(date)

      if (Number.isNaN(nextDate.getTime())) {
        return
      }

      setCurrentMonthDate(getMonthDate(nextDate))
      setSelectedDateKey(formatDateKey(nextDate))
    },
  }
}

export default useCalendar
