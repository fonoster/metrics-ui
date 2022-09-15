import { useQuery } from 'react-query'

import { API } from '@/libs/api'

interface Metric {
  id: string
  label: string
  count: number | string
}

export const useMetrics = (queryKey = 'metrics') => {
  const { data, isLoading, isSuccess } = useQuery<Metric[]>(
    [queryKey],
    async () => (await API.get('/metrics')).data.data
  )

  return {
    metrics: data ?? [],
    isLoading,
    isSuccess,
  }
}
