import React, { useState, useEffect, useRef } from "react";
import { MdViewHeadline } from "react-icons/md";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { Video } from "../types";
import { NextPage } from "next";
import { MobileSidebar } from "./index";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import axios from "axios";
import { SideIcon, Loading } from "./index";
import Image from "next/image";
import Link from "next/link";
import useElementOnScreen from "../utils/useElementOnScreen";

interface IProps {
  post: Video;
  index: number;
}

interface IState {
  showMobileSidebar: boolean;
}

const MobileVideo: NextPage<IProps> = ({ post, index }) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [playing, setPlaying] = useState(false);
  const videoRef = React.useRef() as React.MutableRefObject<HTMLVideoElement>;

  const [isHover, setIsHover] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] =
    useState<IState["showMobileSidebar"]>(false);
  const [getUrl, setGetUrl] = useState<any | undefined>("");
  const [posts, setPosts] = useState(post);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showMute, setShowMute] = useState(false);

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

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(!playing);
    } else {
      videoRef?.current?.play();
      setPlaying(!playing);
    }
  };

  const onEnded = () => {
    let answer = videoRef.current.scrollTop;
    let windowHeight = videoRef.current.getBoundingClientRect().height;
    answer = answer + windowHeight;
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
    if (isVisibile) {
      if (!playing) {
        // setShowMute(true)
        videoRef.current.load();
        videoRef?.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        // videoRef.current.load();
        videoRef?.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  useEffect(() => {
    setTimeout(() => {
      if (index === 0) {
        // setShowMute(true)
        videoRef.current.play();
        videoRef.current.load();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (posts && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
      setShowMute(true);
    }
  }, [posts]);

  const Unmute = () => {
    setShowMute(false);
    if (videoRef?.current.getAttribute("data-prefix")) {
      videoRef.current.muted = !isVideoMuted;
      videoRef.current.play();
      setIsHover(false);
      setPlaying(true);
    }
  };

  return (
    <>
      <div className="flex flex-col left-0 top-0 bottom-0 right-0 bg-black">
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap"
          rel="stylesheet"
        ></link>
        <div className="relative flex-auto">
          <div
            className="flex justify-center h-[100vh] w-full items-center bg-black bg-no-repeat bg-cover bg-center "
            // style={{ maxHeight: "calc(100% - 55px)" }}
          >
            <div className="fixed top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p
                className="cursor-pointer"
                onClick={() => setShowMobileSidebar(true)}
              >
                <MdViewHeadline
                  className="text-gray-200 hover:text-gray-900 text-[40px]"
                  style={{ pointerEvents: "auto" }}
                />
              </p>
            </div>
            {showMobileSidebar && (
              <MobileSidebar setShowMobileSidebar={setShowMobileSidebar} />
            )}
            <div
              onMouseEnter={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
              }}
            >
              <div className=" relative h-full w-full snap-start">
                <video
                  ref={videoRef}
                  src={posts.video.asset.url}
                  className="object-cover h-[100vh] object-contain w-[100vw]"
                  key={posts._id}
                  loop
                  muted={false}
                  data-prefix={posts._id}
                  playsInline
                  onEnded={onEnded}
                  preload="none"
                />
                <div className="relative bottom-[155px] left-0 z-[5] leading-4 pb-3 mix-blend-difference">
                  <div className="z-[5]">
                    <Link href={`/profile/${posts.postedBy?._id}`}>
                      <a className="text-md text-gray-100 font-[450] lowercase mb-1 cursor-pointer px-3">
                        @{posts.postedBy?.userName}
                      </a>
                    </Link>
                    <div
                      className="flex justify-between pr-3 w-[100vw] pt-2 "
                      style={{ height: "fit-content" }}
                    >
                      <p className="text-md text-gray-100 font-[450] lowercase cursor-pointer w-[70%] px-3">
                        {posts.caption}
                      </p>
                      <p className=" w-[30%] border-l-0 border-red-50"></p>
                    </div>
                  </div>
                </div>
                {showMute && (
                  <div
                    className="absolute top-[140px] left-10"
                    onClick={Unmute}
                  >
                    <div
                      className="bg-white h-[34px] w-[100px] flex text-center rounded-md gap-1 justify-center items-center"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        fontFamily: "Lobster Two",
                      }}
                    >
                      <BsFillVolumeMuteFill className="text-gray-900 text-4xl pl-2 font-bold" />
                      <p className="text-gray-900 text-sm pr-3 leading-tight font-semibold">
                        Unmute
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {isHover && (
                <div className="absolute top-[34%] left-[40%] cursor-pointer ">
                  {!playing ? (
                    <button onClick={onVideoClick}>
                      <BsFillPlayFill className="text-gray-200 text-8xl font-bold" />
                    </button>
                  ) : (
                    <button onClick={onVideoClick}>
                      <BsFillPauseFill className="text-gray-200 text-9xl  font-semibold opacity-0" />
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="absolute top-[28%] right-3" onClick={urlParams}>
              <div className="font-extralight overflow-visible relative ">
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
    </>
  );
};

export default MobileVideo;
