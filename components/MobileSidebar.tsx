import React, { Dispatch, SetStateAction } from "react";
import logo from "../utils/tiktik-logo.png";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";

interface IProps {
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({ setShowMobileSidebar }: IProps) => {
  return (
    <div
      className="bg-white w-72 fixed sidebar h-screen dark:bg-secondary-dark-bg fixed top-0 left-0"
      style={{ zIndex: "10000000" }}
    >
      <div className="flex justify-between p-2 mb-3">
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
          <MdOutlineCancel className="text-[crimson] text-2xl" />
        </p>
      </div>
    </div>
  );
};

export default MobileSidebar;
