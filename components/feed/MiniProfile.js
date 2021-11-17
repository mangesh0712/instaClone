import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../pages/redux/auth/actions";

function MiniProfile({ userDetails }) {
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(removeUser());
    signOut({
      callbackUrl: "http://localhost:3000/auth/signin",
    });
  };

  return (
    <div className="flex items-center justify-between mt-11 ml-7">
      <img
        src={userDetails.userImage}
        alt=""
        className="h-14 w-14 rounded-full p-[2px] border"
      />
      <div className="flex-1 mx-4">
        <h3 className="font-bold">{userDetails.username}</h3>
        <h4 className="text-sm text-gray-400">Welcome to INSTAGRAM</h4>
      </div>
      <button
        className="font-semibold text-xs text-blue-400"
        onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
