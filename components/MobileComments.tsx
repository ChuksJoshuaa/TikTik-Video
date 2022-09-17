import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { MobileNoResults } from "./index";

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
    <div className="text-center">
      <div role="status">
        <svg
          className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>;
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
