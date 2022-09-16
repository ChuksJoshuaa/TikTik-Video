import React, { useState, useEffect} from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { ShareFile } from "./index";

interface IState {
  showShare: boolean;
}

const SideIcon = () => {
  const [showShare, setShowShare] =  useState<IState["showShare"]>(false);
  
  return (
    <div className="flex flex-col gap-5 aligns-center font-bold">
      <div className="mt-2 mb-2 text-4xl  text-white hover:text-gray-400">
        <div className="mb-8">
          <MdFavorite />
        </div>
        <div className="mb-8">
          <FaRegCommentDots />
        </div>
        <div className="mb-8" onClick={() => setShowShare(true)}  data-modal-toggle="popup-modal">
          <IoArrowRedoOutline />
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden fixed top-20 right-0 left-0 z-50 md:inset-0 h-modal">
        {showShare && <ShareFile setShowShare={setShowShare} />}
      </div>
    </div>
  );
};

export default SideIcon;
