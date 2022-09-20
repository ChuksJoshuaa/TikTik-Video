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
import { BiUser } from "react-icons/bi";

const WebIcon = ({ comments, handleLike, handleCount, getUrl, post }: any) => {
  const { userProfile, addUser }: { userProfile: any; addUser: any } =
    useAuthStore();
  const [alreadyComment, setAlreadyComment] = useState(false);
  const Router = useRouter();
  const [openModal, setOpenModal] = useState(false);

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
                <div
                  className="bg-primary rounded-full p-2  text-gray-900"
                  onClick={() => setOpenModal(true)}
                >
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
              <div
                className="bg-primary rounded-full p-2  text-gray-900"
                onClick={() => setOpenModal(true)}
              >
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
                <div
                  className="bg-primary rounded-full p-2  text-gray-900"
                  onClick={() => setOpenModal(true)}
                >
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
      {openModal && (
        <div
          className="fixed top-20 mt-20 left-[45%] z-50 bg-gray-50 border border-spacing-2 border-gray-100"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <div className="relative p-2 w-full h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-0 right-0 text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white "
                onClick={() => setOpenModal(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
                <span className="sr-only " onClickCapture={() => Router.back()}>
                  Close modal
                </span>
              </button>
            </div>
            <div className="p-6 text-center mt-4">
              <p className="text-2xl text-gray-900 font-semibold border-b-2 border-gray-800">
                Log In To TikTik
              </p>
              <div className="pt-5">
                <div className="flex flex-col justify-center pt-10 items-center mt-15 ">
                  <BiUser className="mb-3 text-gray-900 text-8xl cursor-pointer" />
                  <GoogleLogin
                    onSuccess={(response) => {
                      createOrGetUser(response, addUser);
                      setOpenModal(false);
                    }}
                    onError={() => console.log("Error")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebIcon;
