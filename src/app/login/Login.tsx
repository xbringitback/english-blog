"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const { status, data } = useSession();

  console.log(status, data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="lg:container mx-auto h-full">
      <div className="flex flex-col py-12">
        <div className="flex flex-col justify-center items-center gap-4 mb-8 mx-auto">
          {status === "authenticated" ? (
            <div className="flex flex-col gap-8 justify-center items-center">
              <p className="font-semibold text-xl">Logged in</p>
              <button
                onClick={() => signOut()}
                className="py-2 px-6 w-full mx-auto bg-red-700 text-white font-semibold rounded-md shadow-md hover:bg-red-500 transition duration-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => signIn("google")}
                className="py-2 px-6 w-full mx-auto bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => signIn("github")}
                className="bg-gray-800 hover:bg-black py-2 px-6 w-full mx-auto text-white font-semibold rounded-md shadow-md transition duration-200"
              >
                Sign in with GitHub
              </button>
              <button
                onClick={() => signIn("facebook")}
                className="bg-blue-600 hover:bg-blue-700 py-2 px-6 w-full mx-auto text-white font-semibold rounded-md shadow-md transition duration-200"
              >
                Sign in with Facebook
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
