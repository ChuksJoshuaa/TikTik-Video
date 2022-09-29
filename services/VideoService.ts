import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export interface IVideo {
  id: number;
  owner: {
    id: number;
    username: string;
    avatar: string;
  };
  title: string;
  standard: string;
  thumbnail: string;
}

export interface IUserData {
  id: number;
  username: string;
  title: string;
  thumbnail: string;
}

export interface IComment {
  id: number;
  owner: {
    id: number;
    username: string;
    avatar: string;
  };
  message: string;
  created_at: string;
}

async function discoverVideos(): Promise<IVideo[]> {
  return axios.get(`${BASE_URL}/api/v1/videos/discover/`);
}

async function getComments(video_id: number): Promise<IComment> {
  return axios.get(`${BASE_URL}/api/v1/videos/${video_id}/comments/`);
}

const VideoService = {
  discoverVideos,
  getComments,
};

export default VideoService;
