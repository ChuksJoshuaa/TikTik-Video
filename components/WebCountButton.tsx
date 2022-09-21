import React, { useState, useEffect } from "react";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";
import { IoArrowRedoOutline } from "react-icons/io5";
import { WebShareFile } from "./index";

interface IProps {
  handleCount: () => void;
  shares: any[];
  getUrl: string;
}

interface IState {
  showShare: boolean;
}

const WebCountButton: NextPage<IProps> = ({ handleCount, shares, getUrl }) => {
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
        onClick={shareButton}
      >
        {alreadyCount ? (
          <div className="bg-primary rounded-full p-2  text-[#F51997]">
            <IoArrowRedoOutline className="text-md md:text-2xl font-semibold" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2  text-gray-900">
            <IoArrowRedoOutline className="text-md md:text-2xl font-semibold" />
          </div>
        )}
        <p
          className={`text-lg text-gray-900 font-semibold ${
            shares?.length >= 10 ? "pl-0" : "pl-1"
          }`}
        >
          {shares?.length || 0}
        </p>
      </div>
      <div className="fixed top-20 mt-20 right-10 z-50">
        {showShare && (
          <WebShareFile
            setShowShare={setShowShare}
            getUrl={getUrl}
            handleCount={handleCount}
          />
        )}
      </div>
    </div>
  );
};

export default WebCountButton;
