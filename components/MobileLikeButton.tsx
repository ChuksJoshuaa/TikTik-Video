import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";
import { checkNumberValue } from "../utils/numberValidators";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const MobileLikeButton: NextPage<IProps> = ({
  handleLike,
  handleDislike,
  likes,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <>
            <div
              className="rounded-full text-[#F51997]"
              onClick={handleDislike}
            >
              <MdFavorite className="text-4xl font-semibold" />
            </div>
            <p className={`text-sm text-white font-semibold pl-0`}>
              {checkNumberValue(likes?.length || 0)}
            </p>
          </>
        ) : (
          <>
            <div className="rounded-full text-gray-400" onClick={handleLike}>
              <MdFavorite className="text-4xl font-semibold" />
            </div>
            <p className={`text-sm text-gray-400 font-semibold pl-0`}>
              {checkNumberValue(likes?.length || 0)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileLikeButton;
