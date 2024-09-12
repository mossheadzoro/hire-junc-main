import { useCookies } from "react-cookie";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { useRouter } from "next/router";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AuthWrapper({ type }) {
  const [cookies, setCookies] = useCookies();
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();
  const router = useRouter();

  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (cookies.jwt) {
      dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
      router.push("/dashboard");
    }
  }, [cookies, dispatch, router]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleClick = async () => {
  //   try {
  //     const { email, password } = values;
  //     if (email && password) {
  //       const {
  //         data: { user, jwt },
  //       } = await axios.post(
  //         type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
  //         { email, password },
  //         { withCredentials: true }
  //       );
  //       setCookies("jwt", { jwt: jwt });
  //       dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });

  //       if (user) {
  //         dispatch({ type: reducerCases.SET_USER, userInfo: user });
  //         window.location.reload();
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleClick = async () => {
    try {
      const { email, password } = values;
      if (email && password) {
        const {
          data: { user, jwt, message }, // assuming message is sent in response
        } = await axios.post(
          type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
  
        setCookies("jwt", { jwt: jwt });
        dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
  
        if (user) {
          dispatch({ type: reducerCases.SET_USER, userInfo: user });
          toast.success(message || "Successfully Signed in"); // Show success message
          window.location.reload();
        }
      }
    } catch (err) {
     
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Show error message
      } 
      if(err.response.data==="Email Already Registered"){
        toast.error("User already exist!! Try Logging in")
      }
      console.log(err.response.data);
    }
  };
  

  const closeModal=()=>{
    dispatch({ type: reducerCases.CLOSE_AUTH_MODAL })
  }

  useEffect(() => {
    const html = document.querySelector("html");
    const authModal = document.querySelector("#auth-modal");
    const blurDiv = document.querySelector("#blur-div");
    html.style.overflowY = "hidden";
    const handleBlurDivClick = () => {
      // dispatch(closeAuthModal());
    };
    const handleAuthModalClick = (e) => {
      // e.stopPropagation();
    };
    authModal?.addEventListener("click", handleAuthModalClick);
    blurDiv?.addEventListener("click", handleBlurDivClick);

    return () => {
      const html = document.querySelector("html");
      html.style.overflowY = "initial";
      blurDiv?.removeEventListener("click", handleBlurDivClick);
      authModal?.removeEventListener("click", handleAuthModalClick);
    };
  }, [dispatch, showLoginModal, showSignupModal]);





  return (
    <div className="fixed top-0 z-[100]">
      <div
        className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0"
        id="blur-div" onClick={closeModal}
      ></div>
     
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
     
        <div
          className="fixed z-[101] h-[80vh] w-[60%] bg-gradient-to-tl from-teal-200 via-gray-200 to-teal-200 flex flex-col justify-center items-center"
          id="auth-modal"
        >
 <div className="absolute top-0 left-8  ">
  <img src="./login-1-image.png"height={50} width={250} alt="image"/>
  
  </div>

<div className="absolute top-48 left-0">
  <img src="./login-2-image.png" height={50} width={250} alt="imag2"/>
</div>

<div className="absolute bottom-0 left-32">
  <img src="./login-3-image.png" height={50} width={250} alt="image3"/>
</div>


          <div className="flex flex-col justify-center items-center ml-60 gap-5 mt-4">
            <h3 className="text-4xl font-semibold text-slate-700">
              {type === "login" ? "Login " : "Sign "}
              in to your Account
            </h3>
            <div className="flex flex-col items-center justify-center">
            <span className="text-sm  text-slate-700 font-semibold">
              {" "}
              {type === "login" ? (
                <>
                  Don't have an account?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });
                    }}
                  >
                    Join In
                  </span>
                </>
              ) : (
                <>
                  Already a have an account?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: false,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: true,
                      });
                    }}
                  >
                    Log in
                  </span>
                </>
              )}
            </span>
            </div>

          

            <div className="flex flex-col gap-5">
              <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative rounded-full">
                <MdFacebook className="absolute left-4 text-2xl" />
                Continue with Facebook
              </button>
              <button className="border border-slate-300 bg-white p-3 font-medium w-80 flex items-center justify-center rounded-full relative">
                <FcGoogle className="absolute left-4 text-2xl" />
                Continue with Google
              </button>

          
            </div>
            <div className="relative  w-full text-center">
             <span className="text-xl font-semibold">OR</span>
            </div>
            <div className="flex flex-col  gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="border border-slate-300 p-3 w-80 rounded-full"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 p-3 w-80 rounded-full"
                name="password"
                onChange={handleChange}
              />
              <button
                className="bg-[#219dad] text-white   text-lg font-semibold  p-3 rounded-full"
                onClick={handleClick}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default AuthWrapper;
