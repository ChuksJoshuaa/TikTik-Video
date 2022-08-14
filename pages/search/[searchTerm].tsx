import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { VideoCard, NoResults } from "../../components";
import { IUser, Video } from "../../types";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const Router = useRouter();
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers } = useAuthStore();

  //To get the word that was searched
  const { searchTerm }: any = Router.query;

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
            onClick={() => setIsAccounts(true)}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className="md:mt-16">
            {searchAccounts.length > 0 ? (
              searchAccounts.map((user: IUser) => (
                <Link href={`/profile/${user._id}`} key={user?._id}>
                  <a>
                    <div className="flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3">
                      <div>
                        <Image
                          src={user?.image}
                          width={50}
                          height={50}
                          className="rounded-full"
                          alt="user profile"
                        />
                      </div>

                      <div className="hidden xl:block mb-4">
                        <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                          {user.userName.replaceAll(" ", "")}
                          <GoVerified className="text-blue-400" />
                        </p>
                        <p className="capitalize text-gray-400 text-xs">
                          {user.userName}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              ))
            ) : (
              <NoResults text={`No account associated with ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {videos.length ? (
              videos.map((video: Video, idx) => (
                <div key={idx}>
                  <h1 className="text-center text-gray-500 lg:text-2xl text-lg font-semibold mb-5">
                    Search Video Result for {searchTerm}{" "}
                  </h1>
                  <VideoCard post={video} key={idx} />
                </div>
              ))
            ) : (
              <NoResults text={`No video results for ${searchTerm}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
