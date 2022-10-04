import React, { Dispatch, SetStateAction } from "react";
import logo from "../utils/logos.jpeg";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { SuggestedAccounts, Footer, Discover } from "./index";
import { googleLogout, GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

interface IProps {
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({ setShowMobileSidebar }: IProps) => {
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();

  const showUserVideos = false;
  const normalLink =
    "flex items-center gap-3  hover:bg-primary  flex-start p-2 xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const buttonLink =
    " text-white mt-2 hover:bg-gray-900 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-900 bg-gray-900 w-full";
  return (
    <div className="bg-white w-72 fixed sidebar h-[95vh] dark:bg-secondary-dark-bg z-50 fixed top-0 left-0 overflow-auto">
      <div className="flex justify-between p-2 mb-1">
        <Link href="/">
          <a>
            <div className="flex justify-between">
              <div className="w-[70px]">
                <Image
                  className="cursor-pointer"
                  src={logo}
                  alt="tiktik"
                  layout="responsive"
                />
              </div>
              <div
                className="text-gray-900 text-3xl  px-2 mt-4 leading-3"
                style={{ fontFamily: "Lobster Two" }}
              >
                TikTik
              </div>
            </div>
          </a>
        </Link>
        <p
          className="cursor-pointer"
          onClick={() => setShowMobileSidebar(false)}
        >
          <MdOutlineCancel className="text-gray-900 text-3xl" />
        </p>
      </div>

      <div className="flex flex-col justify-start mb-10 border-r-2 border-gray-100">
        <div className="">
          <Link href="/">
            <a>
              <div className={normalLink}>
                <p className="text-2xl text-gray-900">
                  <AiFillHome />
                </p>
                <span
                  className="text-xl block text-gray-900"
                  style={{ fontFamily: "Lobster Two" }}
                >
                  Home
                </span>
              </div>
            </a>
          </Link>
        </div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10  mt-4 border-b-2 md:border-b-0 xl:border-b-2 p-2">
            <button
              type="button"
              className={buttonLink}
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="border-b-2 md:border-b-0 xl:border-b-2 p-2">
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Error")}
            />
          </div>
        )}
        <Discover />
        <SuggestedAccounts showUserVideos={showUserVideos} />
        <Footer />
      </div>
    </div>
  );
};

export default MobileSidebar;
