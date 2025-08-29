import { useQuery } from '@tanstack/react-query'
import { getBabies } from '@services'

export const useBabiesQuery = () => {
  return useQuery({
    queryKey: ['babies'],
    queryFn: getBabies,
    staleTime: 1000 * 60 * 5, // 5 minutes → avoids frequent refetch
    refetchOnWindowFocus: true,  // default, keeps data fresh
  })
}