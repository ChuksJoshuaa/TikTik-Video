import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { checkNumberValue } from "../utils/numberValidators";
import useAuthStore from "../store/authStore";

interface IFollow {
  handleFollow: () => void;
  handleUnFollow: () => void;
  follows: any[];
  posterId: string | number;
}

const FollowButton: NextPage<IFollow> = ({
  handleFollow,
  handleUnFollow,
  follows,
  posterId,
}) => {
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const filterFollows = follows?.filter(
    (item) => item._ref === userProfile._id
  );

  console.log(filterFollows, posterId);

  useEffect(() => {
    if (filterFollows?.length > 0) {
      setAlreadyFollowed(true);
    } else {
      setAlreadyFollowed(false);
    }
  }, [filterFollows, follows]);

  return (
    <div>
      {userProfile?._id !== posterId ? (
        alreadyFollowed ? (
          <div
            className="border-2 border-gray-400 px-5 tracking-widest"
            style={{ fontFamily: "Lobster Two" }}
            onClick={handleUnFollow}
          >
            Following
          </div>
        ) : (
          <div
            className="border-2 border-red-500 px-5 tracking-widest text-red-500"
            style={{ fontFamily: "Lobster Two" }}
            onClick={handleFollow}
          >
            Follow
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default FollowButton;
