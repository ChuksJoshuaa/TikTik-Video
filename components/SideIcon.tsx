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
      <div className="mt-8 mb-2 text-4xl  text-white hover:text-gray-400">
        <div className="mb-2">
          {userProfile ? (
            <LikeButton
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
              likes={post.likes}
            />
          ) : (
            <Link href="/register">
              <a>
                <div className="bg-primary rounded-full p-2  text-gray-900">
                  <MdFavorite className="text-lg md:text-lg font-semibold" />
                </div>
                <p className="text-lg text-white font-semibold pl-3">
                  {post?.likes?.length || 0}
                </p>
              </a>
            </Link>
          )}
        </div>
        {userProfile ? (
          <div
            className="mt-4 flex flex-col justify-center items-center cursor-pointer mb-2"
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
        ) : (
          <Link href="/register">
            <a>
              <div className="bg-primary rounded-full p-2  text-gray-900">
                <FaRegCommentDots className="text-lg  font-semibold" />
              </div>
              <p className="text-lg text-white font-semibold pl-3 mb-3">
                {comments?.length || 0}
              </p>
            </a>
          </Link>
        )}
        <div className="mb-2">
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
                <div className="bg-primary rounded-full p-2  text-gray-900">
                  <IoArrowRedoOutline className="text-lg md:text-lg font-semibold" />
                </div>
                <p className="text-lg text-white font-semibold pl-3">
                  {post?.shares?.length || 0}
                </p>
              </a>
            </Link>
          )}
        </div>
      </div>

      <div className="fixed top-20 mt-20 left-[45%] z-50 bg-gray-50 border border-spacing-2 border-gray-100">
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
