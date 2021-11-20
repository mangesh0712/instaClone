import React from "react";
import Skeleton from "react-loading-skeleton";

function StoriesSkeleton() {
  const n = 10;
  return (
    <div className="storyContainer overflow-x-scroll scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      {[...Array(n)].map((elementInArray, index) => (
        <Skeleton circle={true} height={64} width={64} key={index} />
      ))}
    </div>
  );
}

export default StoriesSkeleton;
