import CreatePostButton from "@/components/post/create-post-button";
import PostFeed from "@/components/post/post-feed";
import PostHeader from "@/components/post/post-header";
import { useCheckRoutineType } from "@/store/routine-type";

export default function IndexPage() {
  const routine = useCheckRoutineType();
  return (
    <div className="flex flex-col gap-5">
      <CreatePostButton />
      <PostHeader />
      <div>{routine}</div>
      <PostFeed />
    </div>
  );
}
