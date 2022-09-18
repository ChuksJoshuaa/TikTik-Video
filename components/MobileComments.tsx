import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { MobileNoResults, Loading } from "./index";

interface IProps {
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  isPostingComment: Boolean;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment?: string;
  length?: number;
  _key?: string;
  postedBy: { _ref: string };
}

const MobileComments = ({
  setShowComment,
  isPostingComment,
  comment,
  setComment,
  addComment,
  comments,
}: IProps) => {
  const Router = useRouter();
  const { userProfile, allUsers } = useAuthStore();
  const [isEnter, setIsEnter] = useState(false);

  if (!comments) {
    return <Loading />;
  }

  return (
    <div className="relative p-4 w-full h-full overflow-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white "
          onClick={() => setShowComment(false)}
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
        <div className="p-6 text-center mt-5">
          <p className="text-lg text-gray-900 font-semibold">
            ({comments?.length || 0}){" "}
            {`${comments?.length > 1 ? "Comments" : "Comment"}`}
          </p>
        </div>
        <div className=" px-3 border-t-2 border-gray-700 h-[450px] overflow-auto w-full">
          <div className="">
            {comments?.length ? (
              comments.map((item, idx) => {
                return (
                  <>
                    {allUsers.map(
                      (user: IUser) =>
                        user?._id === item.postedBy?._ref && (
                          <div className="p-2 items-center" key={idx}>
                            <Link href={`/profile/${user._id}`} key={user?._id}>
                              <a>
                                <div
                                  className="flex items-start gap-3"
                                  key={idx}
                                >
                                  <div className="w-8 h-8">
                                    <Image
                                      src={user.image}
                                      width={34}
                                      height={34}
                                      className="rounded-full"
                                      alt="user profile"
                                      layout="responsive"
                                    />
                                  </div>

                                  <div className="block">
                                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                      {user?.userName.replaceAll(" ", "")}
                                      <GoVerified className="text-blue-400" />
                                    </p>
                                    <p className="capitalize text-gray-400 text-xs">
                                      {user?.userName}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </Link>
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                - {item.comment}
                              </p>
                            </div>
                          </div>
                        )
                    )}
                  </>
                );
              })
            ) : (
              <MobileNoResults text="No comments yet" />
            )}
          </div>
          {userProfile && (
            <div className="absolute bottom-0 left-0 px-2 pb-1 border-t-2 border-gray-400 bg-white ">
              <div className="pb-2"></div>
              <form onSubmit={addComment} className="flex gap-1 flex-wrap">
                <input
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setIsEnter(true);
                  }}
                  placeholder="Add Comment..."
                  className="bg-primary px-6 py-2 text-md 
                  font-medium border-2 w-full  
                  border-gray-100 focus:outline-none 
                  focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
                />
                {isEnter && (
                  <button
                    className="text-md text-gray-900"
                    onClick={addComment}
                  >
                    {isPostingComment ? "Commenting..." : "Comment"}
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileComments;
