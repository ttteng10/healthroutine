import { usePostEditorModal } from "@/store/post-editor-modal";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import PostRoutine from "./post-routine";
import { useState } from "react";
import type { RoutineItem } from "@/types";
import { toast } from "sonner";
import { useCreatePost } from "@/hooks/mutations/use-create-post";
import { useSession } from "@/store/session";

const CATEGORIES = [
  "전체",
  "등",
  "가슴",
  "어깨",
  "팔",
  "하체",
  "복근",
  "유산소",
];

export default function PostEditorModal() {
  const session = useSession();
  const { isOpen, close } = usePostEditorModal();
  const [routines, setRoutines] = useState<RoutineItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("루틴 공유에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleCloseModal = () => {
    setRoutines([]);
    setNextId(1);
    close();
  };

  const handleAddRoutine = () => {
    const newRoutine: RoutineItem = {
      id: nextId,
      order: routines.length + 1,
      exerciseName: "",
      sets: 1, // 초기 세트 횟수
    };
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
    setNextId(nextId + 1);
  };

  const handleChangeRoutine = (
    id: number,
    field: keyof RoutineItem,
    value: any,
  ) => {
    setRoutines((prevRoutines) =>
      prevRoutines.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleRemoveRoutine = (id: number) => {
    setRoutines((prevRoutines) =>
      prevRoutines
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, order: index + 1 })),
    );
  };

  const handleSaveRoutine = () => {
    if (routines.length === 0) return;
    const hasEmptyExerciseName = routines.some(
      (item) => item.exerciseName.trim().length === 0,
    );
    if (hasEmptyExerciseName) return;
    createPost({
      routines,
      category: selectedCategory,
      userId: session!.user.id,
    });
    setRoutines([]);
    setNextId(1);
    close();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="mxa-h-[90vh]">
        <DialogTitle>루틴 작성</DialogTitle>
        <div className="py-2">
          <label className="mb-2 block text-sm font-semibold text-gray-600">
            운동 부위 선택
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "border-blue-300 bg-blue-300 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-1">
          {routines.map((item) => (
            <PostRoutine
              key={item.id}
              item={item}
              onUpdate={handleChangeRoutine}
              onRemove={handleRemoveRoutine}
            />
          ))}
          {routines.length === 0 && (
            <p className="rounded-lg border border-dashed bg-gray-50 p-6 text-center text-gray-500">
              <PlusCircleIcon className="mx-auto mb-2 h-5 w-5 text-gray-400" />
              '루틴 추가' 버튼을 눌러 운동 항목을 작성하세요.
            </p>
          )}
        </div>
        <Button
          onClick={handleAddRoutine}
          variant={"outline"}
          className="flex cursor-pointer items-center justify-center gap-1"
        >
          <PlusCircleIcon className="h-3 w-3" />
          루틴 추가
        </Button>
        <Button onClick={handleSaveRoutine} className="cursor-pointer">
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
