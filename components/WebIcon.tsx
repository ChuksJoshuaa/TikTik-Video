import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { WebCountButton, LikeButton } from "./index";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { useRouter } from "next/router";

const WebIcon = ({ comments, handleLike, handleCount, getUrl, post }: any) => {
  const { userProfile, addUser }: { userProfile: any; addUser: any } =
    useAuthStore();
  const [alreadyComment, setAlreadyComment] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    if (comments?.length > 0) {
      setAlreadyComment(true);
    } else {
      setAlreadyComment(false);
    }
  }, [comments]);

  // <GoogleLogin
  //   onSuccess={(response) => createOrGetUser(response, addUser)}
  //   onError={() => console.log("Error")}
  // />;

  return (
    <>
      <div className="flex flex-col gap-2 aligns-center font-bold">
        <div className="mb-2 text-lg text-white hover:text-gray-400">
          <div className="mb-3">
            {userProfile ? (
              <LikeButton
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                likes={post.likes}
              />
            ) : (
              <>
                <div className="bg-primary rounded-full p-2  text-gray-900">
                  <MdFavorite className="text-md md:text-lg font-semibold" />
                </div>
                <p className="text-lg text-gray-900 font-semibold pl-3">
                  {post?.likes?.length || 0}
                </p>
              </>
            )}
          </div>
          {userProfile ? (
            <Link href={`/detail/${post._id}`}>
              <a>
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  {alreadyComment ? (
                    <div className="bg-primary rounded-full p-2 md:p-2 text-[#F51997]">
                      <FaRegCommentDots className="text-md md:text-lg font-semibold" />
                    </div>
                  ) : (
                    <div className="bg-primary rounded-full p-2  text-gray-900">
                      <FaRegCommentDots className="text-md md:text-lg" />
                    </div>
                  )}
                  <p className="text-lg text-gray-900 font-semibold">
                    {comments?.length || 0}
                  </p>
                </div>
              </a>
            </Link>
          ) : (
            <>
              <div className="bg-primary rounded-full p-2  text-gray-900">
                <FaRegCommentDots className="text-md md:text-lg" />
              </div>
              <p className="text-lg text-gray-900 font-semibold pl-3 mb-3">
                {comments?.length || 0}
              </p>
            </>
          )}
          <div className="mb-8">
            {userProfile ? (
              <div>
                <WebCountButton
                  handleCount={() => handleCount(true)}
                  shares={post?.shares}
                  getUrl={getUrl}
                />
              </div>
            ) : (
              <>
                <div className="bg-primary rounded-full p-2  text-gray-900">
                  <IoArrowRedoOutline className="text-md md:text-lg" />
                </div>
                <p className="text-lg text-gray-900 font-semibold pl-3">
                  {post?.shares?.length || 0}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebIcon;
