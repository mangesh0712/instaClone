import React from "react";

function SuggestionFooter() {
  return (
    <div className="ml-7 mt-8 w-72 text-gray-400 opacity-50 ">
      <div
        className="cursor-pointer font-medium flex flex-wrap space-x-2"
        style={{ fontSize: "10px", lineHeight: "16px" }}
      >
        <p>About</p>
        <p>Help</p>
        <p>Press</p>
        <p>API</p>
        <p>Jobs</p>
        <p>Privacy</p>
        <p>Locations</p>
        <p>Hashtags</p>
        <p>Top Accounts</p>
        <p>Language</p>
      </div>
      <div className="text-xs mt-2 font-mono">2021 INSTAGRAM CLONE</div>
    </div>
  );
}

export default SuggestionFooter;
