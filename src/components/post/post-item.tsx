import type { Post } from "@/types";
import { Link } from "react-router";
import { formatTimeAgo } from "@/lib/time";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Button } from "../ui/button";
import { ChevronRight, HeartIcon, MessageCircle } from "lucide-react";
import EditPostButton from "./edit-post-button";

const parseRoutine = (routineString: string) => {
  const match = routineString.match(/(.+)\s*\((.+)\)/);
  if (match) {
    return { name: match[1].trim(), sets: match[2].trim() };
  }
  return { name: routineString, sets: null };
};

export default function PostItem(post: Post) {
  const previewRoutines = (post.routines || []).slice(0, 3).map(parseRoutine);
  const remainingCount = Math.max(0, (post.routines?.length || 0) - 3);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200/60 bg-white p-6 pb-8 shadow-sm">
      {/* 1. 유저 정보*/}
      <div className="flex justify-between">
        {/* 1-1. 유저 정보 */}
        <div className="flex items-start gap-4">
          <Link to={`profile/${post.author_id}`}>
            <img
              src={post.author.avatar_url || defaultAvatar}
              alt={`${post.author.nickname}의 프로필 이미지`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="cursor-pointer font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        {/* 1-2. 수정/삭제 버튼 */}
        <div className="text-muted-foreground flex text-sm">
          <EditPostButton {...post} />
          <Button className="cursor-pointer" variant={"ghost"}>
            삭제
          </Button>
        </div>
      </div>

      {/*2. 컨텐츠 */}
      <Link
        to={"/detail"}
        state={{ post: post }}
        className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all hover:border-blue-100 hover:bg-blue-50/50"
      >
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

        {/* 3개 초과 시 '더보기' 뱃지 표시 */}
        {remainingCount > 0 && (
          <div className="mt-1 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-gray-600 shadow-sm">
              외 {remainingCount}개의 루틴 더보기
            </span>
            <div className="flex items-center text-xs font-bold text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
              자세히 보기
              <ChevronRight className="ml-0.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        )}
      </Link>

      {/* 3. 좋아요, 댓글 버튼 */}
      <div className="flex gap-2">
        {/* 3-1. 좋아요 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        {/* 3-2. 댓글 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
