import { collection, doc, getDoc, onSnapshot } from "@firebase/firestore";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../components/Feed";
import AddPostModal from "../components/AddPostModal";
import { db } from "../firebase";
import { addUser } from "../pages/redux/auth/actions";

export default function Home() {
  const uid = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();

  // useEffect(async () => {
  //   // get user by uid from db
  //   const usersRef = doc(db, "users", uid);
  //   const userSnap = await getDoc(usersRef);
  //   console.log(userSnap.data());
  //   // add user to store
  //   dispatch(addUser(userSnap.data()));
  // }, [db]);
  return (
    <div className="bg-gray-50 h-screen scrollbar-hide overflow-y-scroll">
      <Head>
        <title>Insta 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Feeds */}
      <Feed />

      {/* Modal */}
      <AddPostModal />
    </div>
  );
}
