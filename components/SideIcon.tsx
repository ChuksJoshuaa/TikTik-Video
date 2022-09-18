import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MobileComments, LikeButton, CountButton } from "./index";
import useAuthStore from "../store/authStore";
import Link from "next/link";

const SideIcon = ({
  getUrl,
  handleLike,
  handleCount,
  post,
  setComment,
  addComment,
  isPostingComment,
  comments,
  comment,
}: any) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [showComment, setShowComment] = useState<boolean>(false);
  const [alreadyComment, setAlreadyComment] = useState(false);

  useEffect(() => {
    if (comments?.length > 0) {
      setAlreadyComment(true);
    } else {
      setAlreadyComment(false);
    }
  }, [comments]);

  return (
    <div className="flex flex-col gap-5 aligns-center font-bold">
      <div className="mt-2 mb-2 text-4xl  text-white hover:text-gray-400">
        <div className="mb-8">
          {userProfile ? (
            <LikeButton
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
              likes={post.likes}
            />
          ) : (
            <Link href="/register">
              <a>
                <MdFavorite />
              </a>
            </Link>
          )}
        </div>
        <div
          className="mt-4 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setShowComment(true)}
        >
          {alreadyComment ? (
            <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]">
              <FaRegCommentDots className="text-lg md:text-2xl font-semibold" />
            </div>
          ) : (
            <div className="bg-primary rounded-full p-2 md:p-4 text-gray-900">
              <FaRegCommentDots className="text-lg md:text-2xl" />
            </div>
          )}
          <p className="text-lg text-white font-semibold">
            {comments?.length || 0}
          </p>
        </div>
        <div className="mb-8">
          {userProfile ? (
            <div>
              <CountButton
                handleCount={() => handleCount(true)}
                shares={post?.shares}
                getUrl={getUrl}
              />
            </div>
          ) : (
            <Link href="/register">
              <a>
                <IoArrowRedoOutline />
              </a>
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-y-auto overflow-x-hidden fixed top-5 mt-5 right-0 w-full left-0 z-50 md:inset-0 h-modal">
        {showComment && (
          <MobileComments
            setShowComment={setShowComment}
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={comments}
          />
        )}
      </div>
    </div>
  );
};

export default SideIcon;
