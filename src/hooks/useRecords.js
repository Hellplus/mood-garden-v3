import { useRef, useState } from 'react'
import {
  createRecord,
  deleteRecordById,
  normalizeRecords,
  toggleFavoriteById,
  updateRecordById,
} from '../utils/records.js'
import { readRecords, writeRecords } from '../utils/storage.js'

function getInitialRecords() {
  try {
    return normalizeRecords(readRecords())
  } catch (error) {
    console.warn('Failed to initialize records.', error)
    return []
  }
}

function useRecords() {
  const [records, setRecords] = useState(getInitialRecords)
  const [error, setError] = useState(null)
  const recordsRef = useRef(records)

  function commitRecords(updater) {
    const currentRecords = recordsRef.current
    const nextRecordsInput =
      typeof updater === 'function' ? updater(currentRecords) : updater
    const normalizedRecords = normalizeRecords(nextRecordsInput)
    const saved = writeRecords(normalizedRecords)

    recordsRef.current = normalizedRecords
    setRecords(() => normalizedRecords)
    setError(saved ? null : '记录暂时没有保存成功，请稍后再试。')

    return normalizedRecords
  }

  function addRecord(input) {
    const nextRecord = createRecord(input)
    commitRecords((currentRecords) => [nextRecord, ...currentRecords])
    return nextRecord
  }

  function updateRecord(id, patch) {
    const nextRecords = commitRecords((currentRecords) =>
      updateRecordById(currentRecords, id, patch),
    )

    return nextRecords.find((record) => record.id === id) || null
  }

  function deleteRecord(id) {
    commitRecords((currentRecords) => deleteRecordById(currentRecords, id))
  }

  function toggleFavorite(id) {
    commitRecords((currentRecords) => toggleFavoriteById(currentRecords, id))
  }

  function clearRecords() {
    commitRecords(() => [])
  }

  return {
    records,
    isReady: true,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    toggleFavorite,
    clearRecords,
  }
}

export default useRecords
