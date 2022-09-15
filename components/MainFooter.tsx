import React from "react";
import { BiCommentX } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import useAuthStore from "../store/authStore";

const MainFooter = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  return (
    <div>
      <div
        className="flex px-2 justify-between align-center pt-3"
        style={{ fontSize: "2em" }}
      >
        <Link href="/">
          <a>
            <AiFillHome />
          </a>
        </Link>
        <Link href="">
          <a>
            <BiSearch />
          </a>
        </Link>
        <Link href="/upload">
          <a>
            <IoMdAdd />
          </a>
        </Link>
        <Link href="">
          <a>
            <BiCommentX />
          </a>
        </Link>
        <Link href={`/profile/${userProfile?._id}`}>
          <a>
            <FaUser />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MainFooter;
