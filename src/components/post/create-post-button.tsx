import { useOpenPostEditModal } from "@/store/post-editor-modal";
import { PlusCircleIcon } from "lucide-react";

export default function CreatePostButton() {
  const openPostEditorModal = useOpenPostEditModal();

  return (
    <div
      onClick={openPostEditorModal}
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>운동 루틴을 공유해주세요</div>
        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
