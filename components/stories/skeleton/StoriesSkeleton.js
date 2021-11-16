import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function StoriesSkeleton() {
  return (
    <SkeletonTheme width={676} color="#dadada" highlightColor="#f3efef">
      <div className="storyContainer">
        <Skeleton circle={true} height={64} width={64} />
      </div>
    </SkeletonTheme>
  );
}

export default StoriesSkeleton;
