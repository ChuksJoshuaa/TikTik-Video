import React from "react";

interface IProps {
  getUrl: string;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const MobileComments = ({
  getUrl,
  setShowComment,
  count,
  setCount,
}: IProps) => {
  return <div>MobileComments</div>;
};

export default MobileComments;
