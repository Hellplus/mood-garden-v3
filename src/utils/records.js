const DEFAULT_EMOTION = 'calm'
const DEFAULT_INTENSITY = 3
const MIN_INTENSITY = 1
const MAX_INTENSITY = 5
const MAX_TAG_COUNT = 8
const MAX_TAG_LENGTH = 14

export const EMOTION_OPTIONS = [
  {
    key: 'happy',
    label: '开心',
    moodIcon: '🌼',
    flowerQuote: '阳光已经落在你的小花瓣上。',
    color: '#efb45f',
    softColor: '#fff1d3',
  },
  {
    key: 'calm',
    label: '平静',
    moodIcon: '🌿',
    flowerQuote: '安静也是一种很温柔的力量。',
    color: '#76b99c',
    softColor: '#e2f2e9',
  },
  {
    key: 'anxious',
    label: '焦虑',
    moodIcon: '☁️',
    flowerQuote: '先呼吸一下，今天不用一次长成森林。',
    color: '#79aee6',
    softColor: '#e4f0fb',
  },
  {
    key: 'tired',
    label: '疲惫',
    moodIcon: '🌙',
    flowerQuote: '慢慢休息，花也会在夜里生长。',
    color: '#9a95c9',
    softColor: '#eeeafa',
  },
  {
    key: 'excited',
    label: '兴奋',
    moodIcon: '✨',
    flowerQuote: '把这份亮晶晶的能量好好收藏。',
    color: '#e89aa6',
    softColor: '#fde8ec',
  },
]

const emotionMap = EMOTION_OPTIONS.reduce((map, emotion) => {
  map[emotion.key] = emotion
  return map
}, {})

const emotionAliases = {
  开心: 'happy',
  快乐: 'happy',
  轻松: 'happy',
  calm: 'calm',
  平静: 'calm',
  专注: 'calm',
  焦虑: 'anxious',
  紧张: 'anxious',
  疲惫: 'tired',
  有点疲惫: 'tired',
  tired: 'tired',
  期待: 'excited',
  兴奋: 'excited',
  被支持: 'excited',
}

function clampNumber(value, min, max, fallback) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return fallback
  }

  return Math.min(max, Math.max(min, Math.round(numberValue)))
}

export function createRecordId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function normalizeEmotion(value) {
  const rawValue = typeof value === 'string' ? value.trim() : ''

  if (emotionMap[rawValue]) {
    return rawValue
  }

  return emotionAliases[rawValue] || DEFAULT_EMOTION
}

export function getEmotionMeta(value) {
  return emotionMap[normalizeEmotion(value)] || emotionMap[DEFAULT_EMOTION]
}

export function normalizeIntensity(value) {
  const numberValue = Number(value)

  if (Number.isFinite(numberValue) && numberValue > MAX_INTENSITY && numberValue <= 100) {
    return clampNumber(numberValue / 20, MIN_INTENSITY, MAX_INTENSITY, DEFAULT_INTENSITY)
  }

  return clampNumber(value, MIN_INTENSITY, MAX_INTENSITY, DEFAULT_INTENSITY)
}

export function normalizeTags(tags) {
  const sourceTags = Array.isArray(tags) ? tags : parseTagsInput(tags)
  const seen = new Set()
  const normalized = []

  sourceTags.forEach((tag) => {
    const safeTag = String(tag || '').trim().replace(/^#/, '').slice(0, MAX_TAG_LENGTH)

    if (!safeTag || seen.has(safeTag)) {
      return
    }

    seen.add(safeTag)
    normalized.push(safeTag)
  })

  return normalized.slice(0, MAX_TAG_COUNT)
}

export function parseTagsInput(text) {
  if (Array.isArray(text)) {
    return text
  }

  if (typeof text !== 'string') {
    return []
  }

  return text.split(/[\s,，、#]+/).filter(Boolean)
}

export function formatRecordDate(createdAt) {
  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) {
    return '未知日期'
  }

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRecordTime(createdAt) {
  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function normalizeCreatedAt(record, fallbackCreatedAt) {
  const createdAt = Number(record?.createdAt)

  if (Number.isFinite(createdAt) && !Number.isNaN(new Date(createdAt).getTime())) {
    return createdAt
  }

  const parsedDate = Date.parse(record?.date)

  if (Number.isFinite(parsedDate)) {
    return parsedDate
  }

  return fallbackCreatedAt
}

function normalizeId(id, usedIds) {
  let nextId = typeof id === 'string' || typeof id === 'number' ? String(id).trim() : ''

  while (!nextId || usedIds.has(nextId)) {
    nextId = createRecordId()
  }

  usedIds.add(nextId)
  return nextId
}

export function createRecordDraft() {
  return {
    emotion: DEFAULT_EMOTION,
    note: '',
    intensity: DEFAULT_INTENSITY,
    tags: [],
    detailNote: '',
  }
}

export function normalizeRecord(record, index = 0, usedIds = new Set(), now = Date.now()) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    return null
  }

  const fallbackCreatedAt = now - index
  const createdAt = normalizeCreatedAt(record, fallbackCreatedAt)
  const emotion = normalizeEmotion(record.emotion || record.mood)
  const emotionMeta = getEmotionMeta(emotion)
  const note =
    typeof record.note === 'string'
      ? record.note
      : String(record.text || record.content || '').trim()

  return {
    ...record,
    id: normalizeId(record.id, usedIds),
    mood: normalizeEmotion(record.mood || emotion),
    emotion,
    note,
    createdAt,
    date:
      typeof record.date === 'string' && record.date.trim()
        ? record.date.trim()
        : formatRecordDate(createdAt),
    moodIcon:
      typeof record.moodIcon === 'string' && record.moodIcon.trim()
        ? record.moodIcon.trim()
        : emotionMeta.moodIcon,
    flowerQuote:
      typeof record.flowerQuote === 'string' && record.flowerQuote.trim()
        ? record.flowerQuote.trim()
        : record.flowerLanguage || emotionMeta.flowerQuote,
    intensity: normalizeIntensity(record.intensity),
    tags: normalizeTags(record.tags),
    isFavorite: record.isFavorite === true,
    detailNote: typeof record.detailNote === 'string' ? record.detailNote : '',
  }
}

export function normalizeRecords(records = []) {
  if (!Array.isArray(records)) {
    return []
  }

  const usedIds = new Set()
  const now = Date.now()

  return records
    .map((record, index) => normalizeRecord(record, index, usedIds, now))
    .filter(Boolean)
}

export function createRecord(input = {}) {
  const createdAt = Date.now()
  const emotion = normalizeEmotion(input.emotion || input.mood)
  const emotionMeta = getEmotionMeta(emotion)

  return normalizeRecord({
    ...input,
    id: createRecordId(),
    mood: emotion,
    emotion,
    note: typeof input.note === 'string' ? input.note.trim() : '',
    createdAt,
    date: formatRecordDate(createdAt),
    moodIcon: input.moodIcon || emotionMeta.moodIcon,
    flowerQuote: input.flowerQuote || emotionMeta.flowerQuote,
    intensity: normalizeIntensity(input.intensity),
    tags: normalizeTags(input.tags),
    isFavorite: false,
    detailNote:
      typeof input.detailNote === 'string' && input.detailNote.trim()
        ? input.detailNote.trim()
        : '',
  })
}

export function updateRecordById(records = [], id, patch = {}) {
  const nextRecords = records.map((record) => {
    if (record.id !== id) {
      return record
    }

    return {
      ...record,
      ...patch,
      tags: patch.tags === undefined ? record.tags : normalizeTags(patch.tags),
      intensity:
        patch.intensity === undefined ? record.intensity : normalizeIntensity(patch.intensity),
      updatedAt: Date.now(),
    }
  })

  return normalizeRecords(nextRecords)
}

export function deleteRecordById(records = [], id) {
  return records.filter((record) => record.id !== id)
}

export function toggleFavoriteById(records = [], id) {
  return records.map((record) =>
    record.id === id
      ? {
          ...record,
          isFavorite: !record.isFavorite,
          updatedAt: Date.now(),
        }
      : record,
  )
}

export function getRecordView(record) {
  const emotionMeta = getEmotionMeta(record?.emotion || record?.mood)
  const intensity = normalizeIntensity(record?.intensity)

  return {
    id: record?.id || '',
    title: `${emotionMeta.label}小花`,
    emotionLabel: emotionMeta.label,
    moodIcon: record?.moodIcon || emotionMeta.moodIcon,
    quote: record?.flowerQuote || emotionMeta.flowerQuote,
    date: record?.date || formatRecordDate(record?.createdAt || Date.now()),
    time: formatRecordTime(record?.createdAt),
    note: record?.note || '这条记录还没有内容。',
    detailNote: record?.detailNote || '',
    intensity,
    intensityText: `${intensity} / ${MAX_INTENSITY}`,
    intensityPercent: (intensity / MAX_INTENSITY) * 100,
    tags: normalizeTags(record?.tags),
    isFavorite: record?.isFavorite === true,
    color: emotionMeta.color,
    softColor: emotionMeta.softColor,
    stage: intensity >= 4 ? '盛开' : intensity <= 2 ? '新芽' : '舒展',
  }
}

export function sortRecordsByDate(records = []) {
  return [...records].sort((first, second) => {
    return new Date(second.createdAt || 0) - new Date(first.createdAt || 0)
  })
}
