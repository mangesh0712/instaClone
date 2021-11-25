import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "../components/profile/Profile";
import { db } from "../firebase";

function UsersProfile({ userDetails }) {
  const stories = useSelector((state) => state.posts.stories);
  return (
    <div>
      <Profile userDetails={userDetails} stories={stories} />
    </div>
  );
}

export default UsersProfile;

export async function getServerSideProps(context) {
  const docRef = doc(db, "users", context.params.userId);
  const snapShot = await getDoc(docRef);
  const { timestamp, ...user } = snapShot.data();
  return {
    props: {
      userDetails: { uid: snapShot.id, ...user },
    }, // will be passed to the page component as props
  };
}
