import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { ProfileVideoCard, NoResults, MainFooter } from "../../components";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [showUserVideos, setShowUserVideos] = useState(true);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <>
      <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
            <div className="w-8 h-16 md:w-32 md:h-32">
              <Image
                src={user?.image}
                width={34}
                height={34}
                className="rounded-full"
                alt="user profile"
                layout="responsive"
              />
            </div>

            <div
              className="flex flex-col justify-center"
              style={{ marginTop: "-1.5em" }}
            >
              <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
                {user?.userName.replaceAll(" ", "")}
                <GoVerified className="text-blue-400" />
              </p>
              <p className="capitalize md:text-xl text-gray-400 text-xs">
                {user.userName}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full ">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ml-4 md:ml-0 ${videos}`}
              onClick={() => setShowUserVideos(true)}
            >
              Videos
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
              onClick={() => setShowUserVideos(false)}
            >
              Liked
            </p>
          </div>

          <div className="flex gap-6 flex-wrap md:justify-center  px-3">
            {videosList.length > 0 ? (
              videosList.map((post: Video, idx: number) => {
                return <ProfileVideoCard post={post} key={idx} />;
              })
            ) : (
              <NoResults
                text={`No ${showUserVideos ? "" : "Liked"} Videos Yet `}
                showUserVideos={showUserVideos}
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full cursor-pointer md:hidden block">
        <div className="h-[3rem]  bg-black text-white border-orange-200 text-gray-50">
          <MainFooter />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
