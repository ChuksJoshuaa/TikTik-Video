import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import userService, {IUserData} from "../services/UserService";

interface IProps {
  showUserVideos: boolean;
}

const SuggestedAccounts = ({ showUserVideos }: IProps) => {
  var [users] = useState<IUserData[]>([]);
  const { discoverUsers } = userService;
  discoverUsers().then((data) => users = data);

  return (
    <div
      className={` pb-4 ${
        showUserVideos
          ? ""
          : "border-b-2 md:border-b-0 xl:border-b-2 border-gray-200"
      }`}
    >
      <p
        className={`text-gray-500 font-semibold m-3  ${
          showUserVideos ? "hidden" : "block mt-4"
        }`}
      >
        Suggested Accounts
      </p>

      <div>
        {users.map((user: IUserData) => {
          return (
            <Link href={`/profile/${user.id}`} key={user.id}>
              <a>
                <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                  <div className="w-8 h-8">
                    <Image
                      src={user.thumbnail}
                      width={34}
                      height={34}
                      className="rounded-full"
                      alt="user profile"
                      layout="responsive"
                    />
                  </div>

                  <div className="sm:block md:hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.username.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.username}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
