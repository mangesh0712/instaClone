import React from "react";
import Footer from "../common/Footer";

function SuggestionFooter() {
  return (
    <Footer
      itemClass="cursor-pointer flex flex-wrap space-x-2 text-[10px]"
      containerClass="ml-7 mt-8 w-72 text-gray-400 opacity-70"
      bottomClass="text-xs mt-2 font-mono"
    />
  );
}

export default SuggestionFooter;
