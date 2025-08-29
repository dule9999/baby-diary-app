import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBaby } from '@services'

export const useDeleteBabyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBaby,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['babies'] })
    },
  })
}
