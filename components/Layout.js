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
import Header from "./header/Header";
import {
  setUserAddedToDb,
  setUsersUid,
  addUser,
} from "../components/redux/auth/actions";

function Layout({ children }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const userAddedToDb = useSelector((state) => state.auth.userAddedToDb);

  const getUserByUserId = async (id) => {
    // get user by uid from db
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    console.log(userSnap.data(), "userData");
    return userSnap.data();
  };

  useEffect(async () => {
    if (session && !userAddedToDb) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "users"),
          where("googleUid", "==", session.user.uid)
        ),
        async (snapshot) => {
          console.log(snapshot.docs, "d");
          if (!snapshot.docs.length) {
            //Adding user to db if its not in db
            const userObj = {
              email: session?.user?.email,
              name: session?.user?.name,
              googleUid: session?.user?.uid,
              username: session?.user?.username,
              userImage: session?.user?.image,
              timestamp: serverTimestamp(),
            };
            const docRef = await addDoc(collection(db, "users"), userObj);
            // set user in store
            dispatch(setUsersUid(docRef.id));
            const user = await getUserByUserId(docRef.id);
            dispatch(addUser(user));
            dispatch(setUserAddedToDb(true));
          } else {
            /// if the user is in the database , grab the id and set user in store
            dispatch(setUserAddedToDb(true));
            dispatch(setUsersUid(snapshot.docs[0].id));
            // add user to store
            const user = await getUserByUserId(snapshot.docs[0].id);
            dispatch(addUser(user));
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
    <div className="bg-[#F8F8F8]">
      {session && <Header />}
      {children}
    </div>
  );
}

export default Layout;
