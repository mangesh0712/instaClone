import React from "react";

function ToolTip({ label, left, top }) {
  return (
    <div
      className={`absolute z-50 bg-gray-800  shadow-2xl px-2 py-1 text-sm rounded-md text-white top-9 left-1 `}
    >
      {label}
    </div>
  );
}

export default ToolTip;
