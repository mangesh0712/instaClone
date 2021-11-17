import React from "react";

function SuggestedProfiles({ img, key, userName, worksAt }) {
  return (
    <>
      {/* PROFILE SUGGESTIONS */}
      <div className="flex items-center justify-between mt-3">
        <img
          src={img}
          alt="img"
          className="w-10 h-10  rounded-full border p-[2px]"
        />
        <div className="flex-1 ml-4 ">
          <h3 className="font-semibold text-sm">{userName}</h3>
          <h4 className="text-gray-400 text-xs truncate w-36">
            Works at {worksAt}
          </h4>
        </div>
        <button className="text-xs font-medium text-blue-500">Follow</button>
      </div>
    </>
  );
}

export default SuggestedProfiles;
