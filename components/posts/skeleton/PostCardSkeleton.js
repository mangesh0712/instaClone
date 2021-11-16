import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function PostCardSkeleton() {
  return (
    <SkeletonTheme width={676} color="#dadada" highlightColor="#f3efef">
      <div className="flex items-center px-5 py-3">
        <Skeleton
          style={{ marginRight: "0.75rem", padding: "1.5px" }}
          circle={true}
          height={32}
          width={32}
        />
        <Skeleton height={17} width={200} />
      </div>
      <div className="h-[680px] w-[550px] sm:h-[681px] sm:w-[559px] md:w-[612px] md:h-[680px] animate-pulse sm:bg-gray-200 bg-gray-50"></div>
    </SkeletonTheme>
  );
}

export default PostCardSkeleton;
