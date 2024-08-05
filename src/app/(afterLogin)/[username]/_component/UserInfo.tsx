"use client";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../_lib/getUser";
import { User } from "@/model/User";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  username: string;
};

export default function UserInfo({ username }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const onFollow = () => {
    if (!session?.user) {
      router.replace("/i/flow/login");
    }
    console.log("팔로우 버튼 눌림");
  };
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}>
            <img src={undefined} alt={username} />
          </div>
          <div className={style.userName}>
            <div>{username}</div>
          </div>
          <div className={style.noAccountContents}>계정이 존재하지 않음</div>
        </div>
      </>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
