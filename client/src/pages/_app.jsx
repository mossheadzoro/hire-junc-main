import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import Head from "next/head";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cookies] = useCookies();
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


   


  return (
    <>

    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Hire Junc.</title>
      </Head>
      <div className="relative flex flex-col h-screen justify-between">
     
        <Navbar />
     <ToastContainer/>
        <div
          className={`${
            router.pathname !== "/" ? "mt-36" : ""
          } mb-auto w-full mx-auto`}
        >   
          <Component {...pageProps} />
        </div>
        
        <Footer />
      </div>
    </StateProvider>
  
    </>
  );
}
