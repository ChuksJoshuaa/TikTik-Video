import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import { VideoCard, NoResults } from "../components";
import { BASE_URL } from "../utils";
import { useRouter } from "next/router";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  const Router = useRouter();

  const { topic } = Router.query;

  if (!videos.length && topic) {
    return <NoResults text={`No video associated with ${topic}`} />;
  }
  if (!videos.length && !topic) {
    return <NoResults text={`No video posted yet`} />;
  }
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.map((video: Video) => {
        return <VideoCard post={video} key={video._id} />;
      })}
    </div>
  );
};

//we are making a request to this url http://localhost:3000/api/post since the backend is in api/post in our project folder.

//We use getServerSideProps to fetch data in next.js backend. in this case we are trying to fetch the videos from sanity once the page loads
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
      videos: response.data,
    },
  };
};

// http://localhost:3000/
export default Home;
