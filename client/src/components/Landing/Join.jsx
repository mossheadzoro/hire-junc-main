import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";

function Join() {
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
  useStateProvider();
  
  return (
    <div className="mx-32 my-16 relative">
      <div className="absolute z-10 top-1/3 left-10">
        <h4 className="text-white text-5xl mb-10">
          Suddenly it&apos;s all so <i>doable.</i>
        </h4>
        <button
          className="border text-base font-medium px-5 py-2   border-[#22877f] bg-[#177672] text-white rounded-md"
          type="button" onClick={()=>{
            dispatch({
              type: reducerCases.TOGGLE_SIGNUP_MODAL,
              showSignupModal: true,
            });
          }}
        >
          Join HireJunc.
        </button>
      </div>
      <div className=" w-full h-96">
        <Image src="/bg-signup.webp" fill alt="signup" className="rounded-sm" />
      </div>
    </div>
  );
}

export default Join;
