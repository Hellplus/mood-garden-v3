import { formatDateKey } from './dates.js'
import { createRecordId, getRecordView, normalizeRecords } from './records.js'

const EXPORT_APP = 'Mood Garden'
const EXPORT_VERSION = 'v3'

function getExportTimestamp() {
  return new Date().toISOString()
}

function getReadableValue(value, fallback = '无') {
  return value === undefined || value === null || value === '' ? fallback : String(value)
}

function getUniqueRecordId(usedIds) {
  let nextId = createRecordId()

  while (usedIds.has(nextId)) {
    nextId = createRecordId()
  }

  usedIds.add(nextId)
  return nextId
}

function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return null
  }

  const candidates = [
    payload.records,
    payload.flowers,
    payload.moodRecords,
    payload.entries,
    payload.data?.records,
  ]

  return candidates.find((candidate) => Array.isArray(candidate)) || null
}

export function buildExportFilename(extension = 'json') {
  const safeExtension = String(extension || 'json').replace(/^\./, '')
  return `mood-garden-v3-${formatDateKey(new Date())}.${safeExtension}`
}

export function createJsonExport(records = []) {
  return JSON.stringify(
    {
      app: EXPORT_APP,
      version: EXPORT_VERSION,
      exportedAt: getExportTimestamp(),
      records: normalizeRecords(records),
    },
    null,
    2,
  )
}

export function createTextExport(records = []) {
  const normalizedRecords = normalizeRecords(records)
  const lines = [
    'Mood Garden 日记导出',
    `导出时间：${new Date().toLocaleString('zh-CN')}`,
    `总记录数：${normalizedRecords.length}`,
    '',
  ]

  if (normalizedRecords.length === 0) {
    lines.push('还没有记录。')
    return lines.join('\n')
  }

  normalizedRecords.forEach((record, index) => {
    const view = getRecordView(record)

    lines.push(`## ${index + 1}. ${view.date} ${view.time}`)
    lines.push(`情绪：${view.moodIcon} ${view.emotionLabel}`)
    lines.push(`强度：${view.intensityText}`)
    lines.push(`标签：${view.tags.length > 0 ? view.tags.join('、') : '无'}`)
    lines.push(`收藏：${view.isFavorite ? '是' : '否'}`)
    lines.push(`记录：${getReadableValue(view.note)}`)
    lines.push(`花语：${getReadableValue(view.quote)}`)
    lines.push(`详情：${getReadableValue(view.detailNote)}`)
    lines.push('')
  })

  return lines.join('\n')
}

export function downloadFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const blob = new window.Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)

  return true
}

export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('没有选择文件。'))
      return
    }

    if (typeof window === 'undefined' || !window.FileReader) {
      reject(new Error('当前环境不支持读取文件。'))
      return
    }

    const reader = new window.FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('文件读取失败。'))
    reader.readAsText(file)
  })
}

export function parseImportPayload(text = '') {
  if (!String(text).trim()) {
    return {
      ok: false,
      message: '文件内容为空，没有可导入的记录。',
      records: [],
    }
  }

  let parsedPayload

  try {
    parsedPayload = JSON.parse(text)
  } catch {
    return {
      ok: false,
      message: '这个文件不是可识别的 JSON。',
      records: [],
    }
  }

  const rawRecords = extractRecords(parsedPayload)

  if (!Array.isArray(rawRecords)) {
    return {
      ok: false,
      message: '没有找到 records 数组，无法导入。',
      records: [],
    }
  }

  if (rawRecords.length === 0) {
    return {
      ok: false,
      message: '文件里的 records 是空的。',
      records: [],
    }
  }

  const records = normalizeRecords(rawRecords)

  if (records.length === 0) {
    return {
      ok: false,
      message: '没有找到可用的记录。',
      records: [],
    }
  }

  return {
    ok: true,
    message: `识别到 ${records.length} 条记录。`,
    records,
    count: records.length,
  }
}

export function mergeRecordCollections(currentRecords = [], importedRecords = []) {
  const normalizedCurrentRecords = normalizeRecords(currentRecords)
  const usedIds = new Set(normalizedCurrentRecords.map((record) => record.id))
  const normalizedImportedRecords = normalizeRecords(importedRecords).map((record) => {
    if (!record.id || usedIds.has(record.id)) {
      return {
        ...record,
        id: getUniqueRecordId(usedIds),
      }
    }

    usedIds.add(record.id)
    return record
  })

  return normalizeRecords([...normalizedImportedRecords, ...normalizedCurrentRecords])
}

export function exportRecords(records = []) {
  return createJsonExport(records)
}

export function importRecords(payload = '') {
  return parseImportPayload(payload).records
}
