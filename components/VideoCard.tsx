import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { WebIcon } from "./index";
import { BASE_URL } from "../utils";
import useAuthStore from "../store/authStore";
import axios from "axios";

interface IProps {
  post: Video;
}

//Another way of using typescript.
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [getUrl, setGetUrl] = useState<any | undefined>("");
  const [posts, setPosts] = useState(post);
  const { userProfile }: { userProfile: any } = useAuthStore();

  const videoRef = useRef<HTMLVideoElement>(null);

  const urlParams: any = () => {
    let vided = videoRef.current?.getAttribute("data-prefix");

    if (vided !== undefined || vided !== null) {
      setGetUrl(vided);
    } else {
      return;
    }
  };

  const handleCount = async (share: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/share`, {
        userId: userProfile._id,
        postId: posts._id,
        share,
      });

      setPosts({ ...posts, shares: data.shares });
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: posts._id,
        like,
      });

      setPosts({ ...posts, likes: data.likes });
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${posts.postedBy?._id}`}>
              <a>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={posts.postedBy?.image}
                  layout="responsive"
                  alt="profile photo"
                />
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/profile/${posts.postedBy?._id}`}>
              <a>
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {posts.postedBy?.userName}
                  {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {posts.postedBy?.userName}
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <Link href={`/detail/${posts._id}`}>
            <a>
              <video
                ref={videoRef}
                controls={isHover}
                src={posts.video.asset.url}
                className="lg:w-[600px] text-[35px]h-[270px] md:h-[400px] lg:h-[530px] w-[550px] cursor-pointer rounded-2xl bg-gray-100"
              />
            </a>
          </Link>
          <div>
            <div
              className="absolute top-[45%] right-0 text-orange-800"
              onClick={urlParams}
            >
              <WebIcon
                comments={posts.comments}
                getUrl={getUrl}
                post={posts}
                handleLike={handleLike}
                handleCount={handleCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
