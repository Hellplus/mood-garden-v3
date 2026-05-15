import { useState } from 'react'
import { EMOTION_OPTIONS } from '../utils/records.js'

const INTENSITY_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'low', label: '轻柔 1-2' },
  { value: 'medium', label: '中等 3' },
  { value: 'high', label: '饱满 4-5' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: '最新' },
  { value: 'oldest', label: '最早' },
]

function FilterPanel({
  filters = {},
  summary,
  totalCount = 0,
  filteredCount = 0,
  hasActiveFilters = false,
  onFilterChange = () => {},
  onResetFilters = () => {},
}) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const safeFilters = {
    selectedEmotion: 'all',
    searchQuery: '',
    selectedTag: '',
    favoriteOnly: false,
    selectedIntensity: 'all',
    sortOrder: 'newest',
    ...filters,
  }

  return (
    <section className="surface-panel filter-panel">
      <div className="panel-heading filter-heading">
        <div>
          <p className="eyebrow">Filter</p>
          <h2>筛选与排序</h2>
        </div>
        <button
          aria-controls="garden-filter-body"
          aria-expanded={isMobileFilterOpen}
          className="filter-collapse-toggle"
          onClick={() => setIsMobileFilterOpen((isOpen) => !isOpen)}
          type="button"
        >
          {isMobileFilterOpen ? '收起' : '展开'}
        </button>
      </div>

      <div className="filter-status" role="status">
        <strong>{summary || `当前显示 ${filteredCount} / ${totalCount} 条`}</strong>
        <span>筛选只影响当前花园显示</span>
      </div>

      {!isMobileFilterOpen && hasActiveFilters ? (
        <button
          className="filter-reset mobile-filter-reset"
          onClick={onResetFilters}
          type="button"
        >
          重置筛选
        </button>
      ) : null}

      <div
        className={isMobileFilterOpen ? 'filter-body is-open' : 'filter-body'}
        id="garden-filter-body"
      >
        <label className="filter-search">
          <span>关键词搜索</span>
          <input
            onChange={(event) => onFilterChange('searchQuery', event.target.value)}
            placeholder="搜索记录、备注或标签"
            type="search"
            value={safeFilters.searchQuery}
          />
        </label>

        <div className="filter-group">
          <span>情绪</span>
          <div className="segmented-control flexible-control" aria-label="情绪筛选">
            <button
              className={safeFilters.selectedEmotion === 'all' ? 'is-active' : ''}
              onClick={() => onFilterChange('selectedEmotion', 'all')}
              type="button"
            >
              全部
            </button>
            {EMOTION_OPTIONS.map((emotion) => (
              <button
                className={safeFilters.selectedEmotion === emotion.key ? 'is-active' : ''}
                key={emotion.key}
                onClick={() => onFilterChange('selectedEmotion', emotion.key)}
                type="button"
              >
                {emotion.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span>排序</span>
          <div className="segmented-control two-column-control" aria-label="排序方式">
            {SORT_OPTIONS.map((option) => (
              <button
                className={safeFilters.sortOrder === option.value ? 'is-active' : ''}
                key={option.value}
                onClick={() => onFilterChange('sortOrder', option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span>强度</span>
          <div className="segmented-control flexible-control" aria-label="强度筛选">
            {INTENSITY_OPTIONS.map((option) => (
              <button
                className={safeFilters.selectedIntensity === option.value ? 'is-active' : ''}
                key={option.value}
                onClick={() => onFilterChange('selectedIntensity', option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          aria-pressed={safeFilters.favoriteOnly}
          className={safeFilters.favoriteOnly ? 'filter-toggle is-active' : 'filter-toggle'}
          onClick={() => onFilterChange('favoriteOnly', !safeFilters.favoriteOnly)}
          type="button"
        >
          只看收藏
        </button>

        <button
          className="filter-reset"
          disabled={!hasActiveFilters}
          onClick={onResetFilters}
          type="button"
        >
          重置筛选
        </button>
      </div>
    </section>
  )
}

export default FilterPanel
