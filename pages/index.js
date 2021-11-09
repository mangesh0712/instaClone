import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { addUser } from "./redux/auth/actions";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      dispatch(addUser(session.user));
    }
  }, []);
  return (
    <div className="bg-gray-50 h-screen scrollbar-hide overflow-y-scroll">
      <Head>
        <title>Insta 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header  */}
      <Header />

      {/* Feeds */}
      <Feed />

      {/* Modal */}
      <Modal />
    </div>
  );
}
