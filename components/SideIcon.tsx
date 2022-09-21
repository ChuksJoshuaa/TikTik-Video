import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MobileComments, MobileLikeButton, CountButton } from "./index";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import { checkNumberValue } from "../utils/numberValidators";

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
      <div className=" mb-2 text-4xl text-white hover:text-gray-400">
        <div className="mb-2">
          {userProfile ? (
            <MobileLikeButton
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
              likes={post.likes}
            />
          ) : (
            <>
              <div className="gap-6">
                <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
                  <Link href="/register">
                    <a>
                      <div className=" rounded-full  text-gray-400 ">
                        <MdFavorite className="text-4xl font-semibold" />
                      </div>
                      <p className="text-sm text-gray-400 font-semibold pl-4">
                        {checkNumberValue(post?.likes?.length || 0)}
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        {userProfile ? (
          <div
            className="mt-4 flex flex-col justify-center items-center cursor-pointer mb-2"
            onClick={() => setShowComment(true)}
          >
            {alreadyComment ? (
              <>
                <div className=" rounded-full text-[#F51997]">
                  <FaRegCommentDots className="text-4xl font-semibold" />
                </div>
                <p className="text-sm text-white font-semibold pl-0">
                  {checkNumberValue(comments?.length || 0)}
                </p>
              </>
            ) : (
              <>
                <div className=" rounded-full text-gray-400">
                  <FaRegCommentDots className="text-4xl font-semibold" />
                </div>
                <p className="text-sm text-gray-400 font-semibold pl-0">
                  {checkNumberValue(comments?.length || 0)}
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            <div>
              <div className="mt-4 flex flex-col justify-center items-center cursor-pointer mb-2">
                <Link href="/register">
                  <a>
                    <div className="rounded-full text-gray-400">
                      <FaRegCommentDots className="text-4xl  font-semibold" />
                    </div>
                    <p className="text-sm text-gray-400 font-semibold pl-4">
                      {checkNumberValue(comments?.length || 0)}
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          </>
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
            <>
              <div>
                <div className="mt-4 flex flex-col justify-center items-center cursor-pointer mb-2">
                  <Link href="/register">
                    <a>
                      <div className="rounded-full text-gray-400">
                        <IoArrowRedoOutline className="text-4xl font-semibold" />
                      </div>
                      <p className="text-sm text-gray-400 font-semibold pl-3">
                        {checkNumberValue(post?.shares?.length || 0)}
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
            </>
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
