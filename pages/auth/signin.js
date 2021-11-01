import React from "react";
import { getProviders, signIn as SignIntoProviders } from "next-auth/react";
import Header from "../../components/Header";

// ...Browser
function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen px-14 py-2 -mt-32">
        <img src="https://links.papareact.com/ocw" alt="img" className="w-80" />
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
