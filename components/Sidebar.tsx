import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { SuggestedAccounts, Footer, Discover } from "./index";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

  const showUserVideos = false;
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <link
            href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap"
            rel="stylesheet"
          ></link>
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <a>
                <div className={normalLink}>
                  <p className="text-2xl text-gray-700">
                    <AiFillHome />
                  </p>
                  <span
                    className="text-xl hidden xl:block text-gray-700"
                    style={{ fontFamily: "Lobster Two" }}
                  >
                    Home
                  </span>
                </div>
              </a>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts showUserVideos={showUserVideos} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
