import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const Footer = () => {
  const List = ({ items, mt }: { items: string[]; mt: boolean }) => {
    return (
      <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
        {items.map((item) => {
          return (
            <p
              key={item}
              className="text-gray-400 text-sm hover:underline cursor-pointer"
            >
              {item}
            </p>
          );
        })}
      </div>
    );
  };
  return (
    <div className="mt-6 sm:block md:hidden xl:block px-2">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">
        {new Date().getFullYear()} D-Coder TikTik
      </p>
    </div>
  );
};

export default Footer;
