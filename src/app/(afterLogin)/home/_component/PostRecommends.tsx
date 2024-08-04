"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 기본값 0 단위는 ms (값을 넣으면 fresh로 변경됨)
    // gcTime : // 기본값 5분 (가비지 컬랙트 타임) inactive 데이터를 5분뒤에 사라짐
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
}
