import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import logo from "../utils/logos.jpeg";
import { googleLogout, GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState("");
  const Router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchTerm) {
      Router.push(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap"
        rel="stylesheet"
      ></link>
      <Link href="/">
        <a>
          <div className="flex justify-between items-start">
            <div className="w-[60px] lg:w-[90px]">
              <Image
                className="cursor-pointer rounded-lg"
                src={logo}
                alt="tiktik"
                layout="responsive"
                onClick={() => setSearchTerm("")}
              />
            </div>
            <div
              className="text-gray-900 text-md md:text-2xl lg:text-5xl px-2 mt-1 leading-[240px]"
              style={{ fontFamily: "Lobster Two" }}
            >
              S-cam
            </div>
          </div>
        </a>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 
            border-gray-100 focus:outline-none focus:border-2
             focus:border-gray-300 w-[300px] md:w-[350px] 
             rounded-full md:top-0"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4
             border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <a>
                <button className="border-2 px-2 mt-2 md:px-4 text-md font-semibold flex items-center gap-2">
                  <IoMdAdd className="text-xl" />
                  {` `}
                  <span
                    className="hidden md:block"
                    style={{ fontFamily: "Lobster Two" }}
                  >
                    upload
                  </span>
                </button>
              </a>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <a>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </a>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <HiOutlineLogout color="black" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
