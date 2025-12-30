import type { RoutineItem } from "@/types";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { Input } from "../ui/input";

export default function PostRoutine({
  item,
  onUpdate,
  onRemove,
}: {
  item: RoutineItem;
  onUpdate: (id: number, field: keyof RoutineItem, value: any) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div
      key={item.id}
      className="relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:border-blue-300"
    >
      <Button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 z-10 rounded-full bg-red-50 p-1 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
      >
        <Trash2Icon className="h-2 w-4" />
      </Button>
      <div className="mt-1 grid grid-cols-1 items-end gap-3 pt-2 md:grid-cols-6">
        <div className="col-span-1">
          <label className="mb-1 block text-xs font-semibold text-gray-500">
            순서
          </label>
          <Input
            id={`order-${item.id}`}
            type="number"
            value={item.order}
            readOnly
            className="h-10 bg-gray-100 text-center font-bold"
          />
        </div>
        <div className="col-span-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">
            운동
          </label>
          <Input
            id={`name-${item.id}`}
            placeholder="벤치 프레스, 스쿼트 등"
            value={item.exerciseName}
            onChange={(e) => onUpdate(item.id, "exerciseName", e.target.value)}
            className="h-10 w-full"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor={`sets-${item.id}`}
            className="mb-1 block text-xs font-semibold text-gray-500"
          >
            세트 횟수
          </label>
          <Input
            id={`sets-${item.id}`}
            type="number"
            placeholder="세트 수"
            min="1"
            value={item.sets}
            onChange={(e) =>
              onUpdate(item.id, "sets", parseInt(e.target.value) || 0)
            }
            className="h-10 w-full"
          />
        </div>
      </div>
    </div>
  );
}
