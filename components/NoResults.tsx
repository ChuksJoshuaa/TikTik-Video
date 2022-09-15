import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";
import { MainFooter } from "./index";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="text-8xl">
          {text === "No comments yet" ? (
            <BiCommentX />
          ) : (
            <MdOutlineVideocamOff />
          )}
        </p>
        <p className="text-2xl text-center">{text}</p>
      </div>
      <div className="absolute bottom-0 w-full cursor-pointer sm:block md:hidden">
        <div className="h-[3rem]  bg-black border-t-2 border-orange-200 text-gray-50">
          <MainFooter />
        </div>
      </div>
    </>
  );
};

export default NoResults;
