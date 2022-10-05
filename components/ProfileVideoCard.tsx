import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}

//Another way of using typescript.
const ProfileVideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);


  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <a>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy?.image}
                  layout="responsive"
                  alt="profile photo"
                />
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <a>
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy?.userName}
                  {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy?.userName}
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <a>
              <video
                ref={videoRef}
                loop
                controls={isHover}
                src={post.video.asset.url}
                className="lg:w-[500px] h-[350px] md:h-[400px] lg:h-[530px] w-full object-fill cursor-pointer rounded-lg bg-gray-100"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileVideoCard;
