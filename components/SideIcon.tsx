import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MobileComments, LikeButton, CountButton } from "./index";
import useAuthStore from "../store/authStore";
import Link from "next/link";

const SideIcon = ({ getUrl, handleLike, handleCount, post }: any) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [showComment, setShowComment] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

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
        <div className="mb-8">
          <FaRegCommentDots />
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

      <div className="overflow-y-auto overflow-x-hidden fixed top-5 mt-5 right-0 left-0 z-50 md:inset-0 h-modal">
        {showComment && (
          <MobileComments
            getUrl={getUrl}
            setCount={setCount}
            count={count}
            setShowComment={setShowComment}
          />
        )}
      </div>
    </div>
  );
};

export default SideIcon;
