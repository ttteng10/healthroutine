import type { Database } from "./database.types";

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type RoutineEntity = Database["public"]["Tables"]["routine"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type RoutineItem = {
  id: number;
  order: number;
  exerciseName: string;
  sets: number;
};
