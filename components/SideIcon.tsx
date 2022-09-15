import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";

const SideIcon = () => {
  return (
    <div className="flex flex-col gap-5 aligns-center">
      <div className="mt-2 mb-2 text-4xl">
        <div className="mb-8">
          <MdFavorite />
        </div>
        <div className="mb-8">
          <FaRegCommentDots />
        </div>
        <div className="mb-8">
          <IoArrowRedoOutline />
        </div>
      </div>
    </div>
  );
};

export default SideIcon;
