import { useEffect, useState } from "react";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite"
import { checkIsLiked } from "@/lib/utils";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document)=> user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecords = currentUser?.save.find((record: Models.Document)=> record.post.$id === post?.$id);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id)=> userId !== id);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecords) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecords.$id);
    } else { 
      savePost({ postId: post?.$id || '', userId });
      setIsSaved(true);
    }
  }

  useEffect(()=> {
    setIsSaved(!!savedPostRecords);
  },[currentUser])

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        {isLikingPost ? (
          <Loader />
        ) : ( 
          <img 
            src={`/assets/icons/${checkIsLiked(likes, userId) ? 'liked' : 'like'}.svg`} 
            alt="like" 
            width={20} 
            height={20} 
            onClick={handleLikePost} 
            className="cursor-pointer" 
          />
        )}
        <p className="small-medium lg:base-medium">{likes.length || 0}</p>
      </div>
      <div className="flex gap-2"> 
        {(isSavingPost || isDeletingSaved) ? (
          <Loader />
        ) : (
          <img src={`/assets/icons/${isSaved ? 'saved' : 'save'}.svg`} alt="save" width={20} height={20} onClick={handleSavePost} className="cursor-pointer" />
        )}
      </div>
    </div>
  )
}

export default PostStats
