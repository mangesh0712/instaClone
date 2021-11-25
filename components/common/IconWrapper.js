import React from "react";
import { useRouter } from "next/router";
import ToolTip from "./ToolTipBox";

function IconWrapper({ children, path, label, showTootlip, notifications }) {
  const active = "border-b-2 border-black relative";
  const [hoverState, setHoverState] = React.useState(false);
  const router = useRouter();
  const handlePath = () => {
    router.push(path);
  };
  return (
    <div
      className=""
      onClick={handlePath}
      className={router.pathname === path ? active : "relative"}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}>
      {children}
      {hoverState && showTootlip && <ToolTip label={label} left="" top="" />}
      {notifications && (
        <div className="hidden sm:flex absolute text-xs -top-1 -right-2 bg-red-400 rounded-full animate-bounce w-5 h-5  items-center  justify-center text-white">
          3
        </div>
      )}
    </div>
  );
}

export default IconWrapper;
