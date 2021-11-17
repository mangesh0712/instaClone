import { collection, doc, getDoc, onSnapshot } from "@firebase/firestore";
import Head from "next/head";
import Feed from "../components/feed/Feed";
import AddPostModal from "../components/AddPostModal";

export default function Home() {
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
