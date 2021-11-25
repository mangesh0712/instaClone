import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/auth/actions";
import Skeleton from "react-loading-skeleton";

function MiniProfile({ userDetails, showLogOut, containerClass }) {
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(removeUser());
    signOut({
      callbackUrl: "http://localhost:3000/auth/signin",
    });
  };

  return (
    <div className={`flex items-center justify-between ${containerClass}`}>
      {!userDetails.userImage ? (
        <Skeleton circle={true} height={56} width={56} />
      ) : (
        <img
          src={userDetails.userImage}
          alt=""
          className="h-14 w-14 rounded-full p-[2px] border"
        />
      )}
      <div className="flex-1 mx-4">
        <h3 className="font-bold hover:underline cursor-pointer">
          {userDetails.username}
        </h3>
        {showLogOut && (
          <h4 className="text-sm text-gray-400">Welcome to INSTAGRAM</h4>
        )}
      </div>
      {showLogOut && (
        <button
          className="font-semibold text-xs text-blue-400"
          onClick={onSignOut}>
          Sign Out
        </button>
      )}
    </div>
  );
}

export default MiniProfile;
