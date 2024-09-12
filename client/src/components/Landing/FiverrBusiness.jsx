import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

import Logo from "../LOGO";

function FiverrBusiness() {
  return (
    <div className="bg-[#A0C7C7] px-20 py-16 flex gap-10">
      <div className="text-black flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-2 ">
          <Logo  />
          <span className="text-black mt-1 p-2 text-3xl font-bold">Business</span>
        </div>
        <h2 className="text-3xl font-bold text-black">A solution built for business</h2>
        <h4 className="text-xl text-black">
          Upgrade to a curated experience to access vetted talent and exclusive
          tools
        </h4>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-black text-2xl" />
            <span>Talent matching</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-black text-2xl" />
            <span>Dedicated account management</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-black text-2xl" />
            <span>Team collaboration tools</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-black text-2xl" />
            <span>Business payment solutions</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-black text-2xl" />
            <span>AI based suggestions</span>
          </li>
        </ul>
        <button
          className="border text-base font-medium px-5 py-2   border-[#017f7b] bg-[#017f7b] text-white rounded-md"
          type="button"
        >
          Explore our Business
        </button>
      </div>
      <div className="relative h-[512px] w-2/3">
        <Image src="/business.webp" alt="bsiness" fill />
      </div>
    </div>
  );
}

export default FiverrBusiness;
