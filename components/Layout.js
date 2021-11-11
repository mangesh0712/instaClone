import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import Header from "./Header";
import { setUserAddedToDb } from "../pages/redux/auth/actions";

function Layout({ children }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const userAddedToDb = useSelector((state) => state.auth.userAddedToDb);

  useEffect(async () => {
    if (session && !userAddedToDb) {
      const unsubscribe = onSnapshot(
        query(collection(db, "users"), where("uid", "==", session.user.uid)),
        async (snapshot) => {
          console.log(snapshot.docs, "snap");
          if (!snapshot.docs.length)
            await addDoc(collection(db, "users"), {
              email: session?.user?.email,
              name: session?.user?.name,
              uid: session?.user?.uid,
              username: session?.user?.username,
              userImage: session?.user?.image,
              timestamp: serverTimestamp(),
            });
          dispatch(setUserAddedToDb(true));
        }
      );
      /// remove snapshot event listener
      return () => {
        unsubscribe();
      };
    }
  }, [db, session]);

  return (
    <div className="bg-gray-50">
      {session && <Header />}
      {children}
    </div>
  );
}

export default Layout;
