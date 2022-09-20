import React, { useState, useEffect, useRef } from "react";
import { MdViewHeadline } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Video } from "../types";
import { NextPage } from "next";
import { MobileSidebar } from "./index";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import axios from "axios";
import { MainFooter, SideIcon, Loading } from "./index";
import Image from "next/image";
import Link from "next/link";

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
  const [isDark, setIsDark] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] =
    useState<IState["showMobileSidebar"]>(false);
  const [getUrl, setGetUrl] = useState<any | undefined>("");
  const [posts, setPosts] = useState(post);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

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

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setIsDark(true);
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsDark(false);
      setPlaying(true);
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${posts._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPosts({ ...posts, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if (!posts) {
    return <Loading />;
  }

  return (
    <div className="flex w-full h-full bg-black flex-wrap mb-[1em] mb-8">
      <div className="h-[600px] w-[1000px] flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer"
            onClick={() => setShowMobileSidebar(true)}
          >
            <MdViewHeadline className="text-gray-400 hover:text-[#F51997] text-[35px]" />
          </p>
        </div>
        {showMobileSidebar && (
          <MobileSidebar setShowMobileSidebar={setShowMobileSidebar} />
        )}
        <div
          className="relative"
          onMouseEnter={() => {
            setIsHover(true);
            setIsDark(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div className={`w-full ${isDark ? "opacity-25" : ""}`}>
            <video
              ref={videoRef}
              src={posts.video.asset.url}
              className="w-full cursor-pointer object-cover h-[600px] mb-8"
              key={posts._id}
              data-prefix={posts._id}
            />
          </div>
          <div className="py-4 mb-5"></div>
          {isHover && (
            <div className="absolute top-[45%] left-[40%]">
              {!playing ? (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className="text-gray-400 text-6xl" />
                </button>
              ) : (
                <button onClick={onVideoClick}>
                  <BsFillPauseFill className="text-gray-400 text-4xl" />
                </button>
              )}
            </div>
          )}
          <div className="absolute top-[82%] left-3 mb-4">
            <Link href={`/profile/${posts.postedBy?._id}`}>
              <a className="text-md text-gray-400 font-medium lowercase mb-1">
                @{posts.postedBy?.userName}
              </a>
            </Link>
            <div className="flex flex-wrap w-50">
              <p className="text-md text-gray-400 font-medium lowercase">
                {posts.caption}
              </p>
            </div>
          </div>
          <div className="absolute top-[51%] right-3" onClick={urlParams}>
            <div className={` ${isDark ? "opacity-100" : ""}`}>
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
              <SideIcon
                getUrl={getUrl}
                handleLike={handleLike}
                handleCount={handleCount}
                post={posts}
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                isPostingComment={isPostingComment}
                comments={posts.comments}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full cursor-pointer">
          <div className="h-[3rem]  bg-black border-t-2 border-gray-900 text-gray-400 font-small">
            <MainFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileVideo;
