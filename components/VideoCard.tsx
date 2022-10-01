import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { WebIcon, FollowButton } from "./index";
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

  console.log(posts.postedBy?._id);

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

  const handleFollow = async (follow: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/follow`, {
        userId: userProfile._id,
        accountId: userProfile._id,
        follow,
      });

      setPosts({ ...posts, follows: data.follows });
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <link
            href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap"
            rel="stylesheet"
          ></link>
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
          <div className="flex items-center gap-2 justify-between items-center">
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
            <div className="px-5"></div>
            <div>
              <FollowButton
                handleFollow={() => handleFollow(true)}
                handleUnFollow={() => handleFollow(false)}
                follows={posts.follows}
                posterId={posts.postedBy?._id}
              />
            </div>
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
          {userProfile ? (
            <Link href={`/detail/${posts._id}`}>
              <a>
                <video
                  ref={videoRef}
                  controls={isHover}
                  src={posts.video.asset.url}
                  className="lg:w-[500px] text-[35px] h-[500px] lg:h-[650px] w-[450px] cursor-pointer rounded-2xl bg-gray-100"
                />
              </a>
            </Link>
          ) : (
            <Link href="">
              <a>
                <video
                  ref={videoRef}
                  controls={isHover}
                  src={posts.video.asset.url}
                  className="lg:w-[500px] text-[35px] h-[500px] lg:h-[650px] w-[450px] cursor-pointer rounded-2xl bg-gray-100"
                />
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-col items-center justify-between">
          <div></div>
          <div className="" onClick={urlParams}>
            <WebIcon
              comments={posts.comments}
              getUrl={post._id}
              post={posts}
              handleLike={handleLike}
              handleCount={handleCount}
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default VideoCard;
