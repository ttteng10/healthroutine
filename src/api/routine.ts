import supabase from "@/lib/supabase";
import type { RoutineEntity, RoutineItem } from "@/types";

export async function fetchRoutines({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  const { data, error } = await supabase
    .from("routine")
    .select("*, author: profile!author_id (*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}

export async function createRoutines({
  routines,
  category,
  userId,
}: {
  routines: RoutineItem[];
  category: string;
  userId: string;
}) {
  // 1. RoutineItem 객체 배열을 text[] 저장용 문자열 배열로 변환
  // 예: "벤치 프레스 (3세트)" 형태의 문자열 배열로 만듭니다.
  const routineStrings = routines.map(
    (item) => `${item.exerciseName} (${item.sets}세트)`,
  );

  const { data, error } = await supabase
    .from("routine")
    .insert({
      routines: routineStrings, // text[] 컬럼
      category: category,
      author_id: userId, // uuid 컬럼
      like_count: 0, // int8 컬럼 (초기값)
    })
    .select();

  if (error) {
    console.error("루틴 저장 중 오류 발생:", error);
    throw error;
  }

  return data;
}

export async function updateRoutines(
  post: Partial<RoutineEntity> & { id: number },
) {
  const { data, error } = await supabase
    .from("routine")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
