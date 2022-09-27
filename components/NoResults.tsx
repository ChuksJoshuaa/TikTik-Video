import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";
import { MainFooter } from "./index";

interface IProps {
  text: string;
  showUserVideos: boolean;
}

const NoResults = ({ text, showUserVideos }: IProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-8xl mt-8 md:mt-0 pt-7 md:pt-0">
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

export default NoResults;
