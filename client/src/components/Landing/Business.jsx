import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Logo from "../LOGO";

gsap.registerPlugin(ScrollTrigger);

function Business() {
  const textRef = useRef(null); // Reference for the text
  const imageRef = useRef(null); // Reference for the image

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: -100, opacity: 0 }, // Start position for the text (from the top)
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 50%", // Animation will start when text is near 80% from the top of the viewport
          end: "top 30%",
          scrub: 1, // Adds smooth animation on scroll
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { y: 100, opacity: 0 }, // Start position for the image (from the bottom)
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 50%",
          end: "top 30%",
          scrub: 1, // Adds smooth animation on scroll
        },
      }
    );
  }, []);

  return (
    <div className="bg-[#A0C7C7] px-20 py-16 flex gap-10">
      <div
        ref={textRef} // Attach the text ref
        className="text-black flex flex-col gap-6 justify-center items-start"
      >
        <div className="flex gap-2">
          <Logo />
        </div>
        <h2 className="text-3xl font-bold text-black">
          A solution built for business
        </h2>
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
          className="border text-base font-medium px-5 py-2 border-[#017f7b] bg-[#017f7b] text-white rounded-md"
          type="button"
        >
          Explore our Business
        </button>
      </div>
      <div className="relative h-[512px] w-2/3" ref={imageRef}>
        <Image src="/business.webp" alt="business" fill />
      </div>
    </div>
  );
}

export default Business;
