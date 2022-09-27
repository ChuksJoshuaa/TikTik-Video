import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
  text: string;
}

const MobileNoResults = ({ text }: IProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full pt-9 mt-5">
        <p className="text-3xl">
          {text === "No comments yet" ? (
            <BiCommentX />
          ) : (
            <MdOutlineVideocamOff />
          )}
        </p>
        <p className="text-2xl text-center">{text}</p>
      </div>
    </>
  );
};

export default MobileNoResults;
