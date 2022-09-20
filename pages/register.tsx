import React from "react";
import { MainFooter } from "../components";
import useAuthStore from "../store/authStore";
import { BiUser } from "react-icons/bi";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { useRouter } from "next/router"

const register = () => {
  const { addUser }: { addUser: any } = useAuthStore();

  const Router = useRouter()
  return (
    <div>
      <div>
        <p className="text-center text-xl mb-2">Register</p>
        <p className="border-b-2 border-gray-500"></p>

        <div className="flex flex-col justify-center pt-10 items-center mt-15 ">
          <BiUser className="mb-3 text-[#F51997] text-8xl cursor-pointer" />
          <p className="mb-3 text-lg text-gray-900">Sign up for an account</p>
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser);
              Router.back()
            }}
            onError={() => console.log("Error")}
          />
        </div>
      </div>
      <div className="absolute bottom-0 w-full cursor-pointer block md:hidden">
        <div className="h-[3rem]  bg-black border-t-2 border-gray-900 text-gray-400">
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default register;
