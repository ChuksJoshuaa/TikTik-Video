import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { Navbar, Sidebar, MainFooter } from "../components";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, []);

  if (isSSR) {
    return null;
  } else {
    return (
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
          <div className="md:block hidden">
            <Navbar />
          </div>

          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto md:block hidden">
              <Sidebar />
            </div>
            <div className="mt-0 md:mt-4 flex flex-col gap-4 md:gap-10 snap-y snap-mandatory snap-always h-[100vh] overflow-y-scroll  videos">
              <div className="mb-0 md:mb-4">
                <Component {...pageProps} />
              </div>
              <div className="mt-0 md:mt-9"></div>
            </div>
          </div>
          <div className="fixed bottom-0 w-full cursor-pointer block md:hidden z-50">
            <div className="h-[3rem]  bg-black border-t-2 border-gray-100 text-gray-200 font-small">
              <MainFooter />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  }
};

{
  /* <div
            className="h-[52px] py-[12px] px-[12px] absolute bottom-0 w-[100vw] z-[11] items-center font-[600]"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          >
            Hello Wold
          </div> */
}

export default MyApp;
