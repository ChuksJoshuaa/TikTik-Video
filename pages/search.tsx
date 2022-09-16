import React, { useState, useEffect } from "react";
import {
  MainFooter,
  SuggestedAccounts,
  ProfileVideoCard,
  NoResults,
} from "../components";
import { Video } from "../types";
import { BASE_URL } from "../utils";
import axios from "axios";

interface IState {
  showUserVideos: boolean;
}

interface IProps {
  data: Video[];
}

const search = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] =
    useState<IState["showUserVideos"]>(true);
  const [showAccount, setShowAccount] = useState(false);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setShowAccount(true);
    } else {
      setVideosList(data);
    }
  }, [showUserVideos]);

  return (
    <div className="sm:block md:hidden">
      <div>
        <div>
          <p className="text-center text-xl ">Discover</p>
          <div className="flex gap-10 justify-between mb-2 mt-2 border-b-2 border-gray-200 bg-white w-full">
            <p
              className={`text-lg font-semibold cursor-pointer mt-2 ml-4 md:ml-0 ${videos}`}
              onClick={() => setShowUserVideos(true)}
            >
              Users
            </p>
            <p
              className={`text-lg font-semibold cursor-pointer mt-2 px-7 ${liked}`}
              onClick={() => setShowUserVideos(false)}
            >
              Videos
            </p>
          </div>
        </div>
        {showUserVideos && (
          <SuggestedAccounts showUserVideos={showUserVideos} />
        )}
        {!showUserVideos && (
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
        )}
        <div className="absolute bottom-0 w-full cursor-pointer block md:hidden">
          <div className="h-[3rem]  bg-black border-t-2 border-orange-200 text-gray-50">
            <MainFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  if (!response.data) {
    return {
      msg: "Data not fetched",
    };
  }

  return {
    props: {
      data: response.data,
    },
  };
};

export default search;