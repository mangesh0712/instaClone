import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtoms";

export default function Home() {
  const open = useRecoilValue(modalState);
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
