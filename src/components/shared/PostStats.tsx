import { useState } from "react";
import { useLocation } from "react-router-dom";

import { IPost } from "@/types";
import { useLikePost } from "./PostStats/hooks/useLikePost";
import { useUnlikePost } from "./PostStats/hooks/useUnlikePost";

type PostStatsProps = {
  post: IPost;
};

const PostStats = ({ post }: PostStatsProps) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost(post.id);
  const { mutate: unlikePost } = useUnlikePost(post.id);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const [like, setLike] = useState(post.likes);

  // const { mutate: likePost } = useLikePost();
  // const { mutate: savePost } = useSavePost();
  // const { mutate: deleteSavePost } = useDeleteSavedPost();

  // const { data: currentUser } = useGetCurrentUser();

  // const savedPostRecord = currentUser?.save.find(
  //   (record: Models.Document) => record.post.$id === post.$id
  // );

  // useEffect(() => {
  //   setIsSaved(!!savedPostRecord);
  // }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLiked(true);
    setLike((prev) => prev + 1);
    likePost();
  };

  const handleUnlikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLiked(false);
    setLike((prev) => prev - 1);
    unlikePost();
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    // if (savedPostRecord) {
    //   setIsSaved(false);
    //   return deleteSavePost(savedPostRecord.$id);
    // }

    // savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => (isLiked ? handleUnlikePost(e) : handleLikePost(e))}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{like}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};

export default PostStats;
