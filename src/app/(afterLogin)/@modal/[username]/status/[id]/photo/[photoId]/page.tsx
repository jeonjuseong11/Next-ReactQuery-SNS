import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import { faker } from "@faker-js/faker";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";

type Props = {
  params: { id: string };
};
export default async function Default({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["posts", id], queryFn: getSinglePost });
  await queryClient.prefetchQuery({ queryKey: ["posts", id, "comments"], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient);

  const photo = {
    imageId: 1,
    link: faker.image.urlLoremFlickr(),
    Post: {
      content: faker.lorem.text(),
    },
  };
  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <div className={style.imageZone}>
          <img src={photo.link} alt={photo.Post?.content} />
          <div className={style.image} style={{ backgroundImage: `url(${photo.link})` }} />
          <div className={style.buttonZone}>
            <div className={style.buttonInner}>
              <ActionButtons white />
            </div>
          </div>
        </div>
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
