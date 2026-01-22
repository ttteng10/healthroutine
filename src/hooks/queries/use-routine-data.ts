import { fetchRoutines } from "@/api/routine";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useRoutineData() {
  return useQuery({
    queryKey: QUERY_KEYS.routine.list,
    // queryFn: () => fetchRoutines(),
  });
}
