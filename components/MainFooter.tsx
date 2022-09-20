import React, { useState, useEffect } from "react";
import { BiCommentMinus } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import useAuthStore from "../store/authStore";

const MainFooter = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [confirmRegister, setConfirmRegister] = useState(false);

  const checkIfRegister = () => {
    if (
      userProfile?._id === null ||
      userProfile?._id === undefined ||
      !userProfile?._id
    ) {
      setConfirmRegister(true);
    } else {
      setConfirmRegister(false);
    }
  };

  useEffect(() => {
    checkIfRegister();
  }, [checkIfRegister]);
  return (
    <div>
      <div
        className="flex px-2 justify-between align-center pt-3"
        style={{ fontSize: "1.4em" }}
      >
        <Link href="/">
          <a>
            <AiFillHome />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <BiSearch />
          </a>
        </Link>
        <Link href="/upload">
          <a>
            <IoMdAdd className="text-white" />
          </a>
        </Link>
        <Link href="">
          <a>
            <BiCommentMinus />
          </a>
        </Link>
        {confirmRegister ? (
          <Link href="/register">
            <a>
              <FaUser />
            </a>
          </Link>
        ) : (
          <Link href={`/profile/${userProfile?._id}`}>
            <a>
              <FaUser />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainFooter;
