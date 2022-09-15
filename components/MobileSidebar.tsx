import React, { Dispatch, SetStateAction } from "react";
import logo from "../utils/tiktik-logo.png";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { SuggestedAccounts, Footer, Discover } from "./index";

interface IProps {
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({ setShowMobileSidebar }: IProps) => {
  const normalLink =
    "flex items-center gap-3  hover:bg-primary  flex-start p-2 xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

  return (
    <div
      className="bg-white w-72 fixed sidebar h-screen dark:bg-secondary-dark-bg fixed top-0 left-0 overflow-auto"
      style={{ zIndex: "10000000" }}
    >
      <div className="flex justify-between p-2 mb-1">
        <Link href="/">
          <a>
            <div className="w-[100px]">
              <Image
                className="cursor-pointer"
                src={logo}
                alt="tiktik"
                layout="responsive"
              />
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
        <div className="border-b-2 md:border-b-0 xl:border-b-2">
          <Link href="/">
            <a>
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl block ">For you</span>
              </div>
            </a>
          </Link>
        </div>
        <Discover />
        <SuggestedAccounts />
        <Footer />
      </div>
    </div>
  );
};

export default MobileSidebar;
