import { formatDateKey, getTodayKey, groupRecordsByDate } from './dates.js'
import {
  getEmotionMeta,
  getRecordView,
  normalizeIntensity,
  normalizeRecords,
  normalizeTags,
} from './records.js'

const WEEKDAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

function startOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date, amount) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

function getRecordDate(record) {
  const createdAt = Number(record?.createdAt)

  if (Number.isFinite(createdAt)) {
    const date = new Date(createdAt)
    return Number.isNaN(date.getTime()) ? null : date
  }

  const parsedDate = Date.parse(record?.date)

  if (!Number.isFinite(parsedDate)) {
    return null
  }

  const date = new Date(parsedDate)
  return Number.isNaN(date.getTime()) ? null : date
}

function getRecordDateKey(record) {
  const date = getRecordDate(record)
  return date ? formatDateKey(date) : ''
}

function getWeekStart(date = new Date()) {
  const localDay = startOfDay(date)
  const mondayOffset = (localDay.getDay() + 6) % 7
  return addDays(localDay, -mondayOffset)
}

function getWeekEnd(date = new Date()) {
  return addDays(getWeekStart(date), 7)
}

function getMonthStart(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getNextMonthStart(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

function isWithinRange(record, startDate, endDate) {
  const recordDate = getRecordDate(record)

  if (!recordDate) {
    return false
  }

  return recordDate >= startDate && recordDate < endDate
}

function getRecordsForDateKey(records, dateKey) {
  return records.filter((record) => getRecordDateKey(record) === dateKey)
}

function getRecordsForRange(records, startDate, endDate) {
  return records.filter((record) => isWithinRange(record, startDate, endDate))
}

function getDateSeries(dayCount, now = new Date()) {
  const today = startOfDay(now)

  return Array.from({ length: dayCount }, (_, index) => {
    const offset = dayCount - 1 - index
    const date = addDays(today, -offset)
    return {
      date,
      dateKey: formatDateKey(date),
    }
  })
}

function getPrimaryEmotion(records) {
  const distribution = getMoodDistribution(records)
  return distribution[0] || null
}

function formatAverage(value) {
  return Number.isFinite(value) ? value.toFixed(1) : '0.0'
}

function toRecordPreview(record) {
  const view = getRecordView(record)

  return {
    id: record.id,
    note: view.note,
    date: view.date,
    moodIcon: view.moodIcon,
    emotionLabel: view.emotionLabel,
    isFavorite: view.isFavorite,
  }
}

export function createEmptyAnalytics() {
  return {
    isEmpty: true,
    overviewStats: {
      totalRecords: 0,
      activeDays: 0,
      favoriteCount: 0,
      streakDays: 0,
      todayCount: 0,
      weekCount: 0,
      monthCount: 0,
    },
    summaryCards: [],
    todayInsight: null,
    weekInsight: null,
    monthInsight: null,
    moodDistribution: [],
    moodBars: [],
    last7DaysStats: [],
    weeklyCurve: [],
    last30DaysTrend: [],
    intensityStats: {
      average: 0,
      averageText: '0.0',
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      maxIntensityCount: 0,
    },
    topTags: [],
    favoriteSummary: {
      count: 0,
      recent: [],
    },
    streakDays: 0,
    weeklySummary: '还没有足够的记录形成回顾。',
    monthlySummary: '先从一条记录开始，慢慢会有属于你的节奏。',
  }
}

export function getOverviewStats(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const recordsByDate = groupRecordsByDate(normalizedRecords)
  const todayCount = getTodayInsight(normalizedRecords, now).count
  const weekCount = getWeekInsight(normalizedRecords, now).count
  const monthCount = getMonthInsight(normalizedRecords, now).count
  const favoriteCount = normalizedRecords.filter((record) => record.isFavorite).length
  const streakDays = getStreakDays(normalizedRecords, now)

  return {
    totalRecords: normalizedRecords.length,
    activeDays: recordsByDate.size,
    favoriteCount,
    streakDays,
    todayCount,
    weekCount,
    monthCount,
  }
}

export function getTodayInsight(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const todayRecords = getRecordsForDateKey(normalizedRecords, getTodayKey(now))
  const primaryEmotion = getPrimaryEmotion(todayRecords)
  const intensityStats = getIntensityStats(todayRecords)

  return {
    count: todayRecords.length,
    primaryEmotion,
    averageIntensity: intensityStats.average,
    title: '今日洞察',
    text:
      todayRecords.length > 0
        ? `今天留下了 ${todayRecords.length} 条记录，平均强度 ${intensityStats.averageText} / 5。`
        : '今天还没有记录，给自己留一点空白也很好。',
  }
}

export function getWeekInsight(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const weekRecords = getRecordsForRange(normalizedRecords, getWeekStart(now), getWeekEnd(now))
  const activeDays = groupRecordsByDate(weekRecords).size
  const primaryEmotion = getPrimaryEmotion(weekRecords)

  return {
    count: weekRecords.length,
    activeDays,
    primaryEmotion,
    title: '本周洞察',
    text:
      weekRecords.length > 0
        ? `本周已有 ${weekRecords.length} 条记录，覆盖 ${activeDays} 天。`
        : '本周还没有记录，下一次写下时就会出现在这里。',
  }
}

export function getMonthInsight(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const monthRecords = getRecordsForRange(
    normalizedRecords,
    getMonthStart(now),
    getNextMonthStart(now),
  )
  const activeDays = groupRecordsByDate(monthRecords).size
  const intensityStats = getIntensityStats(monthRecords)

  return {
    count: monthRecords.length,
    activeDays,
    averageIntensity: intensityStats.average,
    title: '本月洞察',
    text:
      monthRecords.length > 0
        ? `本月记录了 ${monthRecords.length} 次，活跃 ${activeDays} 天。`
        : '本月还在等待第一朵心情花。',
  }
}

export function getMoodDistribution(records = []) {
  const normalizedRecords = normalizeRecords(records)
  const total = normalizedRecords.length
  const counts = normalizedRecords.reduce((map, record) => {
    const emotionMeta = getEmotionMeta(record.emotion || record.mood)
    const current = map.get(emotionMeta.label) || {
      key: record.emotion,
      label: emotionMeta.label,
      count: 0,
      percent: 0,
      color: emotionMeta.color,
    }

    current.count += 1
    map.set(emotionMeta.label, current)
    return map
  }, new Map())

  return [...counts.values()]
    .map((item) => ({
      ...item,
      percent: total > 0 ? Math.round((item.count / total) * 100) : 0,
    }))
    .sort((first, second) => {
      if (second.count !== first.count) {
        return second.count - first.count
      }

      return first.label.localeCompare(second.label, 'zh-CN')
    })
}

export function getLast7DaysStats(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const recordsByDate = groupRecordsByDate(normalizedRecords)
  const series = getDateSeries(7, now)
  const maxCount = Math.max(
    1,
    ...series.map(({ dateKey }) => (recordsByDate.get(dateKey) || []).length),
  )

  return series.map(({ date, dateKey }) => {
    const count = (recordsByDate.get(dateKey) || []).length

    return {
      dateKey,
      label: WEEKDAY_LABELS[(date.getDay() + 6) % 7],
      count,
      percent: Math.max(8, Math.round((count / maxCount) * 100)),
    }
  })
}

export function getLast30DaysTrend(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const recordsByDate = groupRecordsByDate(normalizedRecords)
  const series = getDateSeries(30, now)
  const maxCount = Math.max(
    1,
    ...series.map(({ dateKey }) => (recordsByDate.get(dateKey) || []).length),
  )

  return series.map(({ date, dateKey }) => {
    const count = (recordsByDate.get(dateKey) || []).length

    return {
      dateKey,
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      count,
      percent: Math.max(6, Math.round((count / maxCount) * 100)),
    }
  })
}

export function getIntensityStats(records = []) {
  const normalizedRecords = normalizeRecords(records)

  if (normalizedRecords.length === 0) {
    return {
      average: 0,
      averageText: '0.0',
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      maxIntensityCount: 0,
    }
  }

  const intensities = normalizedRecords.map((record) => normalizeIntensity(record.intensity))
  const total = intensities.reduce((sum, intensity) => sum + intensity, 0)
  const average = total / intensities.length

  return {
    average,
    averageText: formatAverage(average),
    highCount: intensities.filter((intensity) => intensity >= 4).length,
    mediumCount: intensities.filter((intensity) => intensity === 3).length,
    lowCount: intensities.filter((intensity) => intensity <= 2).length,
    maxIntensityCount: intensities.filter((intensity) => intensity === 5).length,
  }
}

export function getTopTags(records = [], limit = 5) {
  const normalizedRecords = normalizeRecords(records)
  const counts = normalizedRecords.reduce((map, record) => {
    normalizeTags(record.tags).forEach((tag) => {
      map.set(tag, (map.get(tag) || 0) + 1)
    })

    return map
  }, new Map())
  const maxCount = Math.max(1, ...counts.values())

  return [...counts.entries()]
    .map(([label, count]) => ({
      label,
      count,
      percent: Math.round((count / maxCount) * 100),
    }))
    .sort((first, second) => {
      if (second.count !== first.count) {
        return second.count - first.count
      }

      return first.label.localeCompare(second.label, 'zh-CN')
    })
    .slice(0, limit)
}

export function getFavoriteSummary(records = []) {
  const normalizedRecords = normalizeRecords(records)
  const favoriteRecords = normalizedRecords
    .filter((record) => record.isFavorite)
    .sort((first, second) => {
      const firstTime = Number(first.updatedAt || first.createdAt || 0)
      const secondTime = Number(second.updatedAt || second.createdAt || 0)
      return secondTime - firstTime
    })

  return {
    count: favoriteRecords.length,
    recent: favoriteRecords.slice(0, 3).map(toRecordPreview),
  }
}

export function getStreakDays(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const recordsByDate = groupRecordsByDate(normalizedRecords)
  let cursor = startOfDay(now)
  let streak = 0

  while (recordsByDate.has(formatDateKey(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }

  return streak
}

export function generateWeeklySummary(weekInsight, intensityStats) {
  if (!weekInsight || weekInsight.count === 0) {
    return '这一周还没有形成记录节奏，等第一条记录出现后，这里会给出轻量回顾。'
  }

  const moodText = weekInsight.primaryEmotion
    ? `最常出现的是「${weekInsight.primaryEmotion.label}」。`
    : ''

  return `这周你留下了 ${weekInsight.count} 条记录，覆盖 ${weekInsight.activeDays} 天，平均强度 ${intensityStats.averageText} / 5。${moodText}`
}

export function generateMonthlySummary(monthInsight, topTags) {
  if (!monthInsight || monthInsight.count === 0) {
    return '本月还没有记录，先从一句简单的心情开始就很好。'
  }

  const tagText =
    topTags.length > 0
      ? `常见标签有 ${topTags.map((tag) => `「${tag.label}」`).join('、')}。`
      : '这个月还没有形成明显标签。'

  return `这个月已经记录 ${monthInsight.count} 次，活跃 ${monthInsight.activeDays} 天。${tagText}`
}

export function buildAnalytics(records = [], now = new Date()) {
  const normalizedRecords = normalizeRecords(records)
  const isEmpty = normalizedRecords.length === 0
  const overviewStats = getOverviewStats(normalizedRecords, now)
  const todayInsight = getTodayInsight(normalizedRecords, now)
  const weekInsight = getWeekInsight(normalizedRecords, now)
  const monthInsight = getMonthInsight(normalizedRecords, now)
  const moodDistribution = getMoodDistribution(normalizedRecords)
  const last7DaysStats = getLast7DaysStats(normalizedRecords, now)
  const last30DaysTrend = getLast30DaysTrend(normalizedRecords, now)
  const intensityStats = getIntensityStats(normalizedRecords)
  const topTags = getTopTags(normalizedRecords)
  const favoriteSummary = getFavoriteSummary(normalizedRecords)
  const weeklySummary = generateWeeklySummary(weekInsight, intensityStats)
  const monthlySummary = generateMonthlySummary(monthInsight, topTags)

  return {
    isEmpty,
    overviewStats,
    summaryCards: [
      {
        label: '记录总数',
        value: String(overviewStats.totalRecords),
        hint: `${overviewStats.activeDays} 个活跃日期`,
      },
      {
        label: '连续记录',
        value: `${overviewStats.streakDays} 天`,
        hint: '从今天向前计算',
      },
      {
        label: '本月记录',
        value: String(overviewStats.monthCount),
        hint: `${monthInsight.activeDays} 个活跃日`,
      },
      {
        label: '收藏记录',
        value: String(overviewStats.favoriteCount),
        hint: '被你特别留下的花',
      },
    ],
    todayInsight,
    weekInsight,
    monthInsight,
    moodDistribution,
    moodBars: moodDistribution,
    last7DaysStats,
    weeklyCurve: last7DaysStats,
    last30DaysTrend,
    intensityStats,
    topTags,
    favoriteSummary,
    streakDays: overviewStats.streakDays,
    weeklySummary,
    monthlySummary,
  }
}

export function summarizeRecords(records = []) {
  return buildAnalytics(records)
}
