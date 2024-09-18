import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import gsap from "gsap";
function Everything() {

  const text=useRef(null);
  const image=useRef(null);
  const heading=useRef(null);

  useEffect(() => {
    if(text.current && image.current && heading.current){

      gsap.fromTo(
        [ text.current,heading.current,image.current], 
        { x: -200, opacity: 0 }, // Initial state (off-screen, invisible)
        { x: 0, opacity: 1, duration: 2, stagger: 0.2 ,scrollTrigger:{
          trigger: heading.current,
          start: "top 250px",
          end: "bottom 350px",
          scrub: 1,
        
        }} // End state (in-place, visible with stagger)
      );


     
    }
  }, []);

  const everythingData = [
    {
      title: "Stick to your budget",
      subtitle:
        "Find the right service for every price point. No hourly rates, just project-based pricing.",
    },
    {
      title: "Get quality work done quickly",
      subtitle:
        "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
    },
    {
      title: "Pay when you're happy",
      subtitle:
        "Upfront quotes mean no surprises. Payments only get released when you approve.",
    },
    {
      title: "Count on 24/7 support",
      subtitle:
        "Our round-the-clock support team is available to help anytime, anywhere.",
    },
  ];
  return (
    <div className="bg-teal-100 flex py-20 justify-between px-24">
      <div >
        <h2 ref={heading} className="text-4xl mb-5 text-[#404145] font-bold">
          The best part? Everything.
        </h2>
        <ul ref={text} className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <div >
              <li key={title}>
                <div className="flex gap-2 items-center text-xl">
                  <BsCheckCircle className="text-[#62646a]" />
                  <h4>{title}</h4>
                </div>
                <p  className="text-[#62646a]">{subtitle}</p>
              </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div ref={image} className="relative h-96 w-2/4">
        <Image src="/everything.webp" fill alt="everything" />
      </div>
    </div>
  );
}

export default Everything;
