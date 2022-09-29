import axios from "axios";
import { IVideo } from "../services/VideoService";
import { VideoCard, NoResults, MobileVideo } from "../components";
import { BASE_URL } from "../utils";
import { useRouter } from "next/router";
import { AiTwotonePicture } from "react-icons/ai";

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
      {/* <div
        className="flex flex-col bg-black md:hidden block h-full"
        id="scroll-window"
      >
        {videos.map((video: IVideo, index: number) => {
          return <MobileVideo post={video} key={video.id} index={index} />;
        })}
      </div> */}
    </>
  );
};

export async function getServerSideProps({
  query: { topic },
}: {
  query: { topic: string };
}) {
  // Fetch data from external API

  let response = null;
  let data;

  if (topic) {
    response = await fetch(`https://api.teammato.com/api/v1/videos/${topic}`);
    data = await response.json();
  } else {
    let response = await fetch(`https://api.teammato.com/api/v1/videos/`);
    data = await response.json();
  }

  // Pass data to the page via props
  return { props: { videos: data } };
}

export default Home;
