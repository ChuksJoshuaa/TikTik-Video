import React from "react";
import { BASE_URL } from "../utils";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
} from "next-share";

interface IProps {
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  getUrl: string;
  handleCount: any;
}

import { useRouter } from "next/router";

const ShareFile = ({ setShowShare, getUrl, handleCount }: IProps) => {
  let result = `${BASE_URL}/detail/${getUrl}`;

  const urlDecoded = (info: string) => {
    const data = decodeURI(info);
    return data;
  };

  const Router = useRouter();

  return (
    <div className="relative p-4 w-full h-full md:h-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white "
          onClick={() => setShowShare(false)}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
          </svg>
          <span className="sr-only " onClickCapture={() => Router.back()}>
            Close modal
          </span>
        </button>
        <div className="p-6 text-center pb-4">
          <p className="text-lg text-gray-900 font-semibold pb-0">Share to</p>
          <div className="border-t-2 border-gray-900 pt-1 flex m-2 flex-wrap">
            <div className="pr-3" onClick={handleCount}>
              <FacebookShareButton
                url={` ${urlDecoded(result)}`}
                quote={
                  "next-share is a social share buttons for your next React apps."
                }
                hashtag={"#video"}
              >
                <FacebookIcon size={32} className="rounded-full" />
              </FacebookShareButton>
            </div>
            <div className="pr-3" onClick={handleCount}>
              <WhatsappShareButton
                url={`${urlDecoded(result)}`}
                title={"Watch video from TikTik by clicking this link"}
              >
                <WhatsappIcon size={32} className="rounded-full" />
              </WhatsappShareButton>
            </div>
            <div className="pr-3" onClick={handleCount}>
              <TwitterShareButton
                url={` ${urlDecoded(result)}`}
                title={"Watch video from TikTik by clicking this link."}
              >
                <TwitterIcon size={32} className="rounded-full" />
              </TwitterShareButton>
            </div>
            <div className="pr-3" onClick={handleCount}>
              <TelegramShareButton
                url={`${urlDecoded(result)}`}
                title={"Watch video from TikTik by clicking this link."}
              >
                <TelegramIcon size={32} className="rounded-full" />
              </TelegramShareButton>
            </div>
            <div className="pr-3" onClick={handleCount}>
              <LinkedinShareButton
                url={`${urlDecoded(result)}`}
                title={"Watch video from TikTik by clicking this link."}
              >
                <LinkedinIcon size={32} className="rounded-full" />
              </LinkedinShareButton>
            </div>
            <div className="pr-3" onClick={handleCount}>
              <PinterestShareButton
                url={`${urlDecoded(result)}`}
                media={"Watch video from TikTik by clicking this link."}
              >
                <PinterestIcon size={32} className="rounded-full" />
              </PinterestShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareFile;
