import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Script from "next/script"; // Import Script
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsChatDots } from "react-icons/bs"; // Chat icon
import { AiOutlineClose } from "react-icons/ai"; // Close icon

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cookies] = useCookies();
  const [isBotVisible, setIsBotVisible] = useState(false);

  // Ensure user is authenticated for certain routes
  useEffect(() => {
    if (
      router.pathname.includes("/seller") ||
      router.pathname.includes("/buyer")
    ) {
      if (!cookies.jwt) {
        router.push("/");
      }
    }
  }, [cookies, router]);

  // Toggle chatbot visibility
  const toggleBot = () => {
    setIsBotVisible((prev) => !prev);
  };

  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Hire Junc.</title>
        </Head>

        {/* Using next/script for bot script */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v2/embed.js"
          strategy="lazyOnload" // Loads the script lazily
        />

        <div className="relative flex flex-col h-screen justify-between">
          <Navbar />
          <ToastContainer />
          <div
            className={`${
              router.pathname !== "/" ? "mt-36" : ""
            } mb-auto w-full mx-auto`}
          >
            <Component {...pageProps} />
          </div>
          <Footer />

          {/* Chat Icon - Bottom Right */}
          <button
            onClick={toggleBot}
            className="fixed bottom-5 right-5 bg-[#A0C7C7] text-white p-4 rounded-full shadow-lg hover:bg-[#506b6b]"
          >
            <BsChatDots size={32} />
          </button>

          {/* Chatbot iframe */}
          {isBotVisible && (
            <div className="fixed bottom-16 right-5 w-[400px] h-[600px] z-50 bg-[#A0C7C7] rounded-lg shadow-lg p-2">
              {/* Close button */}
              <button
                onClick={toggleBot}
                className="absolute top-2 right-2 text-black hover:text-red-600"
              >
                <AiOutlineClose size={24} />
              </button>
              <iframe
                src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=fb5267b7-5717-45ee-a051-d3d8a3ecd78f"
                title="Chatbot"
                className="w-full h-full border rounded-lg"
                allow="microphone; geolocation"
              ></iframe>
            </div>
          )}
        </div>
      </StateProvider>
    </>
  );
}
