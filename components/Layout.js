import {
  addDoc,
  collection,
  doc,
  getDoc,
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
import {
  setUserAddedToDb,
  setUsersUid,
  addUser,
} from "../pages/redux/auth/actions";

function Layout({ children }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const userAddedToDb = useSelector((state) => state.auth.userAddedToDb);

  useEffect(async () => {
    if (session && !userAddedToDb) {
      const unsubscribe = onSnapshot(
        query(collection(db, "users"), where("uid", "==", session.user.uid)),
        async (snapshot) => {
          console.log(snapshot.docs, "d");
          if (!snapshot.docs.length) {
            //Adding user to db if its not in db
            const userObj = {
              email: session?.user?.email,
              name: session?.user?.name,
              uid: session?.user?.uid,
              username: session?.user?.username,
              userImage: session?.user?.image,
              timestamp: serverTimestamp(),
            };
            const docRef = await addDoc(collection(db, "users"), userObj);
            // set user in store
            dispatch(setUsersUid(docRef.id));
            dispatch(addUser(userObj));
            dispatch(setUserAddedToDb(true));
          } else {
            /// if the user is in the database , grab the id and set user in store
            dispatch(setUserAddedToDb(true));
            dispatch(setUsersUid(snapshot.docs[0].id));
            // get user by uid from db
            const usersRef = doc(db, "users", snapshot.docs[0].id);
            const userSnap = await getDoc(usersRef);
            console.log(userSnap.data());
            // add user to store
            dispatch(addUser(userSnap.data()));
          }
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
