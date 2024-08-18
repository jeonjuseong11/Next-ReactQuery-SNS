"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useSuspenseInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0, // 보이고나서 몇픽셀이 될 때 호출 되게 할것이다.
    delay: 0, //보이고나서 몇초 후에 호출되게 할 것이다
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage(); // 불러오는 중이 아니고 다음 페이지가 있을 때만 실행
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]); // ref로 지정한 것이 화면에 보일 때를 나타낸 것이 inView

  return data?.pages.map((page, i) => (
    <>
      <Fragment key={i}>
        {page.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </Fragment>
      <div ref={ref} style={{ height: 50 }} />
    </>
  ));
}
