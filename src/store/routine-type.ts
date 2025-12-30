import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

type State = {
  routine: string;
};

const initialState: State = {
  routine: "전체",
};

const useRoutineType = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setRoutinType: (newRoutine: string) => {
          set({ routine: newRoutine });
        },
      },
    })),
    { name: "RoutineTypeStore" },
  ),
);

export const useRoutineActions = () => {
  const routineAction = useRoutineType((store) => store.actions.setRoutinType);
  return routineAction;
};

export const useCheckRoutineType = () => {
  const checkRoutinType = useRoutineType((store) => store.routine);
  return checkRoutinType;
};
