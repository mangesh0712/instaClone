import React, { useEffect, useState } from "react";
import faker from "faker";
import SuggestedProfiles from "./SuggestedProfiles";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between  items-center mb-5">
        <button className="font-bold text-sm text-gray-400"> 
          Seggestions For You
        </button>
        <span className="text-xs font-semibold">See All</span>
      </div>
      {/* suggestions */}
      <div className="g">
        {suggestions.map((profile) => (
          <SuggestedProfiles
            key={profile.id}
            img={profile.avatar}
            userName={profile.username}
            worksAt={profile.company.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
