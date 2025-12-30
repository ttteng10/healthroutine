import { useCheckRoutineType, useRoutineActions } from "@/store/routine-type";

const headerTag = [
  "전체",
  "등",
  "가슴",
  "어깨",
  "팔",
  "하체",
  "복근",
  "유산소",
];

export default function PostHeader() {
  const selectedRoutine = useCheckRoutineType();
  const routineAction = useRoutineActions();
  function handleRoutineType(routine: string) {
    routineAction(routine);
  }

  return (
    <div className="flex gap-3">
      {headerTag.map((item) => {
        const isActive = selectedRoutine === item;

        const buttonCss = isActive
          ? "bg-blue-300 text-white"
          : "bg-blue-100 hover:bg-blue-300";
        return (
          <div
            key={item}
            onClick={() => handleRoutineType(item)}
            className={`flex cursor-pointer items-center rounded-xl px-3 py-2 ${buttonCss}`}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
