import React, { useState, useEffect } from "react";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";
import { IoArrowRedoOutline } from "react-icons/io5";
import { ShareFile } from "./index";

interface IProps {
  handleCount: () => void;
  shares: any[];
  getUrl: string;
}

interface IState {
  showShare: boolean;
}

const CountButton: NextPage<IProps> = ({ handleCount, shares, getUrl }) => {
  const [alreadyCount, setAlreadyCount] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const filterCount = shares?.filter((item) => item._ref === userProfile?._id);

  const [showShare, setShowShare] = useState<IState["showShare"]>(false);

  useEffect(() => {
    if (filterCount?.length > 0) {
      setAlreadyCount(true);
    } else {
      setAlreadyCount(false);
    }
  }, [shares, filterCount]);

  const shareButton = () => {
    setShowShare(true);
  };

  return (
    <div className="gap-6">
      <div
        className="mt-4 flex flex-col justify-center items-center cursor-pointer"
        onClickCapture={shareButton}
      >
        {alreadyCount ? (
          <div className="bg-primary rounded-full p-2  text-[#F51997]">
            <IoArrowRedoOutline className="text-lg md:text-lg font-semibold" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2  text-gray-900">
            <IoArrowRedoOutline className="text-lg md:text-lg" />
          </div>
        )}
        <p className="text-lg text-gray-900 font-semibold">
          {shares?.length || 0}
        </p>
      </div>
      <div className="overflow-y-auto overflow-x-hidden fixed top-20 mt-20 right-0 left-0 z-50 md:inset-0 h-modal">
        {showShare && (
          <ShareFile
            setShowShare={setShowShare}
            getUrl={getUrl}
            handleCount={handleCount}
          />
        )}
      </div>
    </div>
  );
};

export default CountButton;
