import axios from "axios";
import { IVideo } from "../services/VideoService";
import { VideoCard, NoResults, MobileVideo } from "../components";
import { BASE_URL } from "../utils";
import { useRouter } from "next/router";

interface IProps {
  videos: IVideo[];
}

const Home = ({ videos }: IProps) => {
  const showUserVideos = false;
  const Router = useRouter();

  const { topic } = Router.query;

  if (!videos.length && topic) {
    return (
      <NoResults
        text={`No video associated with ${topic}`}
        showUserVideos={showUserVideos}
      />
    );
  }
  if (!videos.length && !topic) {
    return (
      <NoResults text={`No video posted yet`} showUserVideos={showUserVideos} />
    );
  }
  return (
    <>
      <div className="flex flex-col gap-10 videos md:block hidden  ">
        {videos.map((video: IVideo) => {
          return <VideoCard post={video} key={video.id} />;
        })}
      </div>
      <div
        className="flex flex-col bg-black md:hidden block h-full"
        id="scroll-window"
      >
        {videos.map((video: IVideo, index: number) => {
          return <MobileVideo post={video} key={video.id} index={index} />;
        })}
      </div>
    </>
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
    response = await axios.get(`${BASE_URL}/api/v1/videos/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/v1/videos/`);
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

export default Home;
