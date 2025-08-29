import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBaby } from '@services'

export const useCreateBabyMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createBaby,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['babies'] })
        },
    })
  }