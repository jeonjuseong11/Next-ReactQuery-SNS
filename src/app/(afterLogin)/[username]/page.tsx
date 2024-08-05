"use client";

import style from "./profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = { params: { username: string } };

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydrateState = dehydrate(queryClient);

  const router = useRouter();
  const { data: session } = useSession();

  const onFollow = () => {
    if (!session?.user) {
      router.replace("/i/flow/login");
    }
    console.log("팔로우 버튼 눌림");
  };

  const user = {
    id: "jeo1129",
    nickname: "JEO1129",
    image: "/5Udwvqim.jpg",
  };

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>{user.nickname}</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          <button className={style.followButton} onClick={onFollow}>
            팔로우
          </button>
        </div>
        <div>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </HydrationBoundary>
    </main>
  );
}
