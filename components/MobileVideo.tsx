import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdViewHeadline } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../utils";
import { Video } from "../types";
import { NextPage } from "next";
import useAuthStore from "../store/authStore";
import { MobileSidebar } from "./index";

import { MainFooter, SideIcon } from "./index";

interface IProps {
  post: Video;
}

interface IState {
  showMobileSidebar: boolean;
}

const MobileVideo: NextPage<IProps> = ({ post }) => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] =
    useState<IState["showMobileSidebar"]>(false);
  //   const [comment, setComment] = useState("");
  //   const [isPostingComment, setIsPostingComment] = useState(false);
  const router = useRouter();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if (!post) return null;

  return (
    <div className="flex w-full h-full bg-black flex-wrap mb-[1em]">
      <div className="h-[550px] w-[1000px] flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer"
            onClick={() => setShowMobileSidebar(true)}
          >
            <MdViewHeadline className="text-gray-400 text-[35px]" />
          </p>
        </div>
        {showMobileSidebar && (
          <MobileSidebar setShowMobileSidebar={setShowMobileSidebar} />
        )}
        <div
          className="relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className=" w-full ">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              className="w-full cursor-pointer object-none h-[550px]"
              onClick={() => {}}
              key={post._id}
            />
          </div>
          {isHover && (
            <div className="absolute top-[45%] left-[45%]">
              {!playing ? (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className="text-white text-6xl" />
                </button>
              ) : (
                <button onClick={onVideoClick}>
                  <BsFillPauseFill className="text-white text-4xl" />
                </button>
              )}
            </div>
          )}
          <div className="absolute top-[47%] right-3">
            <div className="text-white">
              <SideIcon />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full cursor-pointer">
          <div className="h-[3rem]  bg-black border-t-2 border-orange-200 text-gray-50">
            <MainFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileVideo;
