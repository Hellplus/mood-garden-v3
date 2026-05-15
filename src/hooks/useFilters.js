import { useMemo, useState } from 'react'

export const DEFAULT_FILTERS = {
  selectedEmotion: 'all',
  searchQuery: '',
  selectedTag: '',
  favoriteOnly: false,
  selectedIntensity: 'all',
  sortOrder: 'newest',
}

function getHasActiveFilters(filters) {
  return (
    filters.selectedEmotion !== DEFAULT_FILTERS.selectedEmotion ||
    filters.searchQuery.trim() !== DEFAULT_FILTERS.searchQuery ||
    filters.selectedTag !== DEFAULT_FILTERS.selectedTag ||
    filters.favoriteOnly !== DEFAULT_FILTERS.favoriteOnly ||
    filters.selectedIntensity !== DEFAULT_FILTERS.selectedIntensity ||
    filters.sortOrder !== DEFAULT_FILTERS.sortOrder
  )
}

function useFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  function setFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  function toggleTag(tag) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      selectedTag: currentFilters.selectedTag === tag ? '' : tag,
    }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  const hasActiveFilters = useMemo(() => getHasActiveFilters(filters), [filters])

  return {
    filters,
    setFilter,
    toggleTag,
    resetFilters,
    clearFilters: resetFilters,
    hasActiveFilters,
  }
}

export default useFilters
