import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import useAuthStore from "../store/authStore";

const Discover = () => {
  const router = useRouter();
  const { fetchAllTags, topics } = useAuthStore();

  useEffect(() => {
    fetchAllTags();
  }, [fetchAllTags]);

  //To specify the topic that was clicked
  const { topic } = router.query;

  //We added this particluar style to it. so once a topic is clicked, add this style
  const activeTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";

  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className="border-b-2 md:border-b-0 xl:border-b-2 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 sm:block md:hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item: any) => {
          return (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <a>
                <div
                  className={
                    topic === item.name ? activeTopicStyle : topicStyle
                  }
                >
                  <span className="font-medium text-md sm:block md:hidden xl:block capitalize">
                    {item.name}
                  </span>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
