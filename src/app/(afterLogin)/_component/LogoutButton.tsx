"use client";
import style from "./logOutButton.module.css";

export default function LogoutButton() {
  const me = {
    id: "JEO1129",
    nickname: "주성",
    image: "/5Udwvqim.jpg",
  };

  const onLogout = () => {};

  return (
    <div className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </div>
  );
}
