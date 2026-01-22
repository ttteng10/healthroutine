import { Link, useLocation } from "react-router";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { formatTimeAgo } from "@/lib/time";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircle } from "lucide-react";

interface Routine {
  name: string;
  sets: number | string;
}

const parseRoutine = (routineString: string) => {
  const match = routineString.match(/(.+)\s*\((.+)\)/);
  if (match) {
    return { name: match[1].trim(), sets: match[2].trim() };
  }
  return { name: routineString, sets: null };
};

export default function DetailPage() {
  const location = useLocation();
  const post = location.state?.post;
  const routines = location.state?.post.routines || [];
  const userData = location.state?.post.author || {};
  const previewRoutines: Routine[] = (routines || []).map(parseRoutine);
  return (
    <div className="flex flex-col gap-4 border-gray-200/60 bg-white p-6 pb-8">
      <div className="flex justify-between">
        {/* 1-1. 유저 정보 */}
        <div className="flex items-start gap-4">
          <Link to={`profile/${userData.author_id}`}>
            <img
              src={userData.avatar_url || defaultAvatar}
              alt={`${userData.nickname}의 프로필 이미지`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="cursor-pointer font-bold hover:underline">
              {userData.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        {/* 1-2. 수정/삭제 버튼 */}
        <div className="text-muted-foreground flex text-sm">
          <Button className="cursor-pointer" variant={"ghost"}>
            수정
          </Button>
          <Button className="cursor-pointer" variant={"ghost"}>
            삭제
          </Button>
        </div>
      </div>

      {/*2. 컨텐츠 */}
      <div className="flex flex-col gap-2.5">
        {previewRoutines.map((routine, index) => (
          <div
            key={index}
            className="group flex items-center justify-between gap-4 py-1"
          >
            {/* 왼쪽: 번호와 운동 이름 */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {/* 인덱스 번호 배지 */}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-[10px] font-bold text-gray-400 shadow-sm transition-colors group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* 운동 이름: 길어질 경우 말줄임 처리 */}
              <span className="truncate text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900">
                {routine.name}
              </span>
            </div>

            {/* 오른쪽: 세트 수 배지 */}
            <div className="flex shrink-0 items-center">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[12px] font-bold tracking-wider text-gray-500 uppercase shadow-sm transition-all group-hover:bg-blue-300 group-hover:text-white">
                {routine.sets}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-2"></div>

      <div className="flex gap-2">
        {/* 3-1. 좋아요 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-l">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        {/* 3-2. 댓글 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-l">
          <MessageCircle className="h-4 w-4" />
          <span>댓글</span>
        </div>
      </div>
    </div>
  );
}
