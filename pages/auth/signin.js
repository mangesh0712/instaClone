import React, { useEffect } from "react";
import {
  getProviders,
  signIn as SignIntoProviders,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";

// ...Browser
function signIn({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <>
      <div className="flex flex-col   items-center h-screen px-14 py-2">
        <div className="flex flex-col rounded-md shadow-sm mt-32 items-center bg-white py-8 px-4">
          <img
            src="https://links.papareact.com/ocw"
            alt="img"
            className="w-80"
          />
          <p className="font-xs italic">
            This is not a REAL app, it is build for educational purposes only
          </p>
          <div className="mt-32">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="p-3 bg-blue-500 rounded-lg text-white"
                  onClick={() =>
                    SignIntoProviders(provider.id, { callbackUrl: "/" })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ...server side rendering
export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
export default signIn;
