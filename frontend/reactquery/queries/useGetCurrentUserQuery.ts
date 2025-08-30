 import { useQuery } from '@tanstack/react-query'
 import { getCurrentUser } from '@services'

 export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey:['currentUser'],
    queryFn: getCurrentUser,
  })
 }