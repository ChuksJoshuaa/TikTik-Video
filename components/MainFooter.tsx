import React from "react";
import { topics } from "../utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";

const MainFooter = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";

  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <>
      <div className="fixed bottom-0">
        <div className="bg-[#222] h-[4rem] w-full">
          <div className="flex justify-between gap-5 flex-nowrap">
            {topics.slice(0, 4).map((item) => {
              return (
                <Link href={`/?topic=${item.name}`} key={item.name}>
                  <a>
                    <div
                      className={
                        topic === item.name ? activeTopicStyle : topicStyle
                      }
                    >
                      <span className="font-bold text-2xl xl-text-md">
                        {item.icon}
                      </span>
                      <span className="font-medium text-md hidden xl:block capitalize">
                        {item.name}
                      </span>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default MainFooter;
