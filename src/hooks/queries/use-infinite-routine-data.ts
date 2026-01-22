import { fetchRoutines } from "@/api/routine";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfiniteRoutineData() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.routine.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const routines = await fetchRoutines({ from, to });
      return routines;
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPage.length;
    },
  });
}
