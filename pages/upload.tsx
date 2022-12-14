import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";
import { MainFooter } from "../components";

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  //functions like the useHistory or useNavigate in react
  const router = useRouter();

  //Uploading video before posting
  const uploadVideo = (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsLoading(true);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  //Post all files
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption("");
    setCategory("");
  };

  const handleCaption = (e: any) => {
    let value = e.target.value;

    if (value.startsWith("#")) {
      setCaption(value);
    } else {
      let newValue = `#${value}`;
      setCaption(newValue);
    }
  };

  return (
    <>
      <div className="flex w-full h-full md:absolute left-0 top-0 md:top-[60px] mb-10 sm:pt-2  md:pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
        <div className="bg-white rounded-lg xl:h-[80vh] justify-between flex gap-6 flex-wrap justify-center items-center p-14 pt-2 md:pt-6">
          <div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "Lobster Two" }}
              >
                Upload Video
              </p>
              <p className="text-md text-gray-400 mt-1">
                Post a video to your account
              </p>
            </div>
            <div
              className="border-dashed rounded-xl border-4 
                    border-gray-200 flex flex-col justify-center 
                      items-center outline-none mt-10 w-[260px] lg:h-[390px] h-[460px]
                      p-10 cursor-pointer hover:border-gray-900 hover:bg-gray-100"
            >
              {isLoading ? (
                <p className="text-center lg:text-2xl text-lg text-gray-400 font-semibold">
                  Uploading...
                </p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[300px] mt-3  bg-black"
                      />
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-3xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p
                            className="text-xl font-semibold"
                            style={{ fontFamily: "Lobster Two" }}
                          >
                            Upload video
                          </p>
                        </div>
                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          MP4 or WebM or ogg <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>
                        <p className="bg-gray-900 text-center lg:mt-6 mt-10 lg:mb-2 rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Select file
                        </p>
                        <input
                          type="file"
                          name="upload video"
                          className="w-0 h-0"
                          onChange={uploadVideo}
                        />
                      </div>
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px] mb-5 h-auto">
                  Please select a video file
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10 py-4 font-medium">
            <label>Caption</label>
            <input
              type="text"
              value={caption}
              onChange={handleCaption}
              className="rounded outline-none text-md border-2 border-gray-200 p-2"
            />
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none border-2 border-gray-200 text-md capitalize p-2 rounded cursor-pointer "
            >
              <option className="outline-none capitalize  bg-white text-gray-700 text-md p-2 hover:bg-slate-300 ">
                Select Category
              </option>
              {topics.map((topic, index) => (
                <option
                  key={index}
                  value={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 "
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10 ">
              <button
                onClick={handleDiscard}
                type="button"
                className="border-gray-300 hover:bg-[#222] hover:border-0 hover:text-gray-100 border-2 text-md capitalize font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                discard
              </button>
              <button
                onClick={handlePost}
                type="button"
                className="border-gray-300 border-2 hover:border-0 hover:bg-gray-900 hover:text-gray-100  text-md capitalize font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                {savingPost ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
