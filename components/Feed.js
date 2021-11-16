import Stories from "./stories/Stories";
import Posts from "./posts/Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 sm:max-w-xl md:max-w-[610px] lg:max-w-[920px] lg:grid-cols-3 mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        {/* stories  */}
        <Stories />
        {/* posts  */}
        <Posts />
      </section>
      {session && (
        <section className="hidden lg:inline-grid md:col-span-1">
          <div className="fixed top-20">
            {/* mini profile */}
            <MiniProfile />
            {/* suggestions  */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
