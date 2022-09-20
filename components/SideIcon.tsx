import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MobileComments, LikeButton, CountButton } from "./index";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import {checkNumberValue}  from "../utils/numberValidators"

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
  }, [comments])


  return (
    <div className="flex flex-col gap-5 aligns-center font-bold">
      <div className=" mb-2 text-4xl text-white hover:text-gray-400">
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
                <div className="bg-gray-400 rounded-full p-2  text-gray-900 mt-4">
                  <MdFavorite className="text-lg md:text-lg font-medium" />
                </div>
                <p className="text-lg text-gray-400 font-medium pl-3">
                  {checkNumberValue(post?.likes?.length || 0)}
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
              <div className="bg-gray-400 rounded-full p-2 md:p-4 text-gray-900">
                <FaRegCommentDots className="text-lg md:text-2xl font-medium" />
              </div>
            )}
            <p className="text-lg text-white font-medium">
              {checkNumberValue(comments?.length || 0)}
            </p>
          </div>
        ) : (
          <Link href="/register">
            <a>
              <div className="bg-gray-400 rounded-full p-2 text-gray-900">
                <FaRegCommentDots className="text-lg  font-medium" />
              </div>
              <p className="text-lg text-gray-400 font-medium pl-3 mb-3">
                {checkNumberValue(comments?.length || 0)}
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
                <div className="bg-gray-400 rounded-full p-2  text-gray-900">
                  <IoArrowRedoOutline className="text-lg md:text-lg font-medium" />
                </div>
                <p className="text-lg text-gray-400 font-medium pl-3">
                  {checkNumberValue(post?.shares?.length || 0)}
                </p>
              </a>
            </Link>
          )}
        </div>
      </div>

      <div className="fixed top-3 mt-20 left-0 w-full z-50">
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
