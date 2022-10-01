import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { BiUser } from "react-icons/bi";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

interface IModal {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalLogin = ({ setOpenModal }: IModal) => {
  const { addUser }: { addUser: any } = useAuthStore();
  const Router = useRouter();
  return (
    <div
      className="fixed top-20 mt-20 left-[45%] z-50 bg-gray-50 border border-spacing-2 border-gray-100"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap"
        rel="stylesheet"
      ></link>
      <div className="relative p-2 w-full h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-0 right-0 text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white "
            onClick={() => setOpenModal(false)}
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
        </div>
        <div className="p-6 text-center mt-4">
          <p
            className="text-2xl text-gray-900 font-semibold border-b-2 border-gray-800"
            style={{ fontFamily: "Lobster Two" }}
          >
            Log In To S-cam
          </p>
          <div className="pt-5">
            <div className="flex flex-col justify-center pt-10 items-center mt-15 ">
              <BiUser className="mb-3 text-gray-900 text-8xl cursor-pointer" />
              <GoogleLogin
                onSuccess={(response) => {
                  createOrGetUser(response, addUser);
                  setOpenModal(false);
                }}
                onError={() => console.log("Error")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
