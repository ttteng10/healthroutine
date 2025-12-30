import { createRoutines } from "@/api/routine";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoutines,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks?.onSuccess();
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks?.onError(error);
    },
  });
}
