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
    <div>
      {/* 탭 컨테이너 */}
      <div className="flex flex-wrap gap-2">
        {headerTag.map((item) => {
          const isActive = selectedRoutine === item;

          return (
            <button
              key={item}
              onClick={() => handleRoutineType(item)}
              className={`relative rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${
                isActive
                  ? "bg-white text-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.15)] ring-1 ring-blue-100"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              } cursor-pointer border-none focus:outline-none active:scale-95`}
            >
              {/* 활성화 상태일 때 작은 점 표시 (디자인 포인트) */}
              {isActive && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
              )}
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
