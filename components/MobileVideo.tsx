import React, { useState, useEffect, useRef } from "react";
import { MdViewHeadline } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Video } from "../types";
import { NextPage } from "next";
import { MobileSidebar } from "./index";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import axios from "axios";
import { SideIcon, Loading } from "./index";
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
      setPlaying(false);
    } else {
      videoRef?.current?.play();
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

  // bg-blurred-img bg-no-repeat bg-cover bg-center

  return (
    <div className="flex flex-col left-0 top-0 bottom-0 right-0 bg-black">
      <div
        className=" relative flex-1"
        style={{ maxHeight: "calc(100% - 49px)" }}
      >
        <div className="flex justify-center h-full w-full items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
          <div className="fixed top-6 left-2 lg:left-6 flex gap-6 z-50">
            <p
              className="cursor-pointer"
              onClick={() => setShowMobileSidebar(true)}
            >
              <MdViewHeadline
                className="text-gray-200 hover:text-[#F51997] text-[40px]"
                style={{ pointerEvents: "auto" }}
              />
            </p>
          </div>
          {showMobileSidebar && (
            <MobileSidebar setShowMobileSidebar={setShowMobileSidebar} />
          )}
          <div
            className=""
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            <div className="h-full w-full">
              <video
                ref={videoRef}
                src={posts.video.asset.url}
                className="object-cover h-[100vh]"
                key={posts._id}
                data-prefix={posts._id}
              />
            </div>
            {isHover && (
              <div className="absolute top-[38%] left-[40%] cursor-pointer">
                {!playing ? (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-gray-200 text-4xl font-semibold" />
                  </button>
                ) : (
                  <button onClick={onVideoClick}>
                    <BsFillPauseFill className="text-gray-200 text-4xl  font-semibold" />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="absolute bottom-10 left-0">
            <div className="w-full h-full">
              <Link href={`/profile/${posts.postedBy?._id}`}>
                <a className="text-md text-gray-200 font-semibold lowercase mb-1 cursor-pointer px-3">
                  @{posts.postedBy?.userName}
                </a>
              </Link>
              <div className="flex justify-between pr-3 w-[100vw]">
                <p className="text-md text-gray-200 font-semibold lowercase cursor-pointer w-[70%] px-3">
                  {posts.caption}
                </p>
                <p className=" w-[30%] border-l-0 border-red-50"></p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 pt-5"></div>
          <div className="absolute top-[46%] right-3" onClick={urlParams}>
            <div className="font-extralight overflow-visible relative">
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
      </div>
    </div>
  );
};

export default MobileVideo;
