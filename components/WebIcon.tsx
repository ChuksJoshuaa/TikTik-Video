import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { WebCountButton, LikeButton, ModalLogin } from "./index";
import useAuthStore from "../store/authStore";
import Link from "next/link";

import { checkNumberValue } from "../utils/numberValidators";

interface Modal {
  openModal: boolean;
}

const WebIcon = ({ comments, handleLike, handleCount, getUrl, post }: any) => {
  const { userProfile }: { userProfile: any; addUser: any } = useAuthStore();
  const [alreadyComment, setAlreadyComment] = useState(false);

  const [openModal, setOpenModal] = useState<Modal["openModal"]>(false);

  useEffect(() => {
    if (comments?.length > 0) {
      setAlreadyComment(true);
    } else {
      setAlreadyComment(false);
    }
  }, [comments]);

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
                <div className="gap-6">
                  <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
                    <div
                      className="bg-primary rounded-full p-2 text-gray-900"
                      onClick={() => setOpenModal(true)}
                    >
                      <MdFavorite className="text-md md:text-2xl font-semibold" />
                    </div>
                    <p
                      className={`text-lg text-gray-900 font-semibold ${
                        post?.likes?.length >= 10 ? "pl-0" : "pl-1"
                      }`}
                    >
                      {checkNumberValue(post?.likes?.length || 0)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="">
            {userProfile ? (
              <Link href={`/detail/${post._id}`}>
                <a>
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    {alreadyComment ? (
                      <div className="bg-primary rounded-full p-2 md:p-2 text-[#F51997]">
                        <FaRegCommentDots className="text-md md:text-2xl font-semibold" />
                      </div>
                    ) : (
                      <div className="bg-primary rounded-full p-2  text-gray-900">
                        <FaRegCommentDots className="text-md md:text-2xl font-semibold" />
                      </div>
                    )}
                    <p
                      className={`text-lg text-gray-900 font-semibold ${
                        comments?.likes?.length >= 10 ? "pl-0" : "pl-1"
                      }`}
                    >
                      {checkNumberValue(comments?.length || 0)}
                    </p>
                  </div>
                </a>
              </Link>
            ) : (
              <>
                <div className="gap-6">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <div
                      className="bg-primary rounded-full p-2  text-gray-900"
                      onClick={() => setOpenModal(true)}
                    >
                      <FaRegCommentDots className="text-md md:text-2xl font-semibold" />
                    </div>
                    <p
                      className={`text-lg text-gray-900 mb-3 font-semibold ${
                        comments?.likes?.length >= 10 ? "pl-0" : "pl-1"
                      }`}
                    >
                      {checkNumberValue(comments?.length || 0)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="">
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
                <div className="gap-6">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <div
                      className="bg-primary rounded-full p-2  text-gray-900"
                      onClick={() => setOpenModal(true)}
                    >
                      <IoArrowRedoOutline className="text-md md:text-2xl font-semibold" />
                    </div>
                    <p
                      className={`text-lg text-gray-900 mb-3 font-semibold ${
                        post?.likes?.length >= 100 ? "pl-1" : "pl-1"
                      }`}
                    >
                      {checkNumberValue(post?.shares?.length || 0)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {openModal && <ModalLogin setOpenModal={setOpenModal} />}
    </>
  );
};

export default WebIcon;
