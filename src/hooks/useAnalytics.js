import { useMemo } from 'react'
import { buildAnalytics } from '../utils/analytics.js'

function useAnalytics(records = []) {
  return useMemo(() => buildAnalytics(records), [records])
}

export default useAnalytics
