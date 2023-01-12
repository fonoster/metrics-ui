import { useQuery } from 'react-query'

import { API } from '@/libs/api'

interface Metric {
  id: string
  label: string
  count: number | string
}

export const useMetrics = (
  params?: { start?: string; end?: string; range?: string },
  refetchInterval = 0,
  queryKey = 'metrics'
) => {
  const { data, isLoading, isSuccess, isRefetching, isFetching } = useQuery<
    Metric[]
  >(
    [queryKey, params],
    async () =>
      (
        await API.get('/metrics', {
          params,
        })
      ).data.data,
    {
      refetchInterval,
    }
  )

  return {
    metrics: data ?? [],
    isLoading,
    isSuccess,
    isRefetching,
    isFetching,
  }
}
