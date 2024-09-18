import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function PopularServices() {
  const router = useRouter();
  const servicesRef = useRef(null);
  const heading=useRef(null);

  const popularServicesData = [
    { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
    { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
    { name: "Wordpress", label: "Customize your site", image: "/service3.jpeg" },
    { name: "Voice Over", label: "Share your message", image: "/service4.jpeg" },
    { name: "Social Media", label: "Reach more customers", image: "/service5.jpeg" },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    { name: "Illustration", label: "Color your dreams", image: "/service7.jpeg" },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];

 

  useEffect(() => {
    gsap.fromTo(
      [".heading"], 
      { x: -200, opacity: 0 }, // Initial state (off-screen, invisible)
      { x: 0, opacity: 1, duration: 1, stagger: 0.2 ,scrollTrigger: {
        trigger: heading.current,
        start: "top 250px",
        end: "top 250px",
        scrub: 1,
       
      },} 
      // End state (in-place, visible with stagger)
    );
    gsap.fromTo(
      [".service-item"],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 250px",
          end: "center 350px",
          scrub: 1,
         
        },
      }
    );
  }, []);

  return (
    <div className="mx-20 my-16" >
      <div className="mb-8 -mt-12 ml-auto mr-auto w-fit heading" ref={heading}>
        <h2 className="text-4xl w-fit text-[#404145] font-bold">
          Most Popular Services
        </h2>
      </div>
      <ul className="flex flex-wrap gap-16" ref={servicesRef}>
        {popularServicesData.map(({ name, label, image }) => {
          return (
            <li
              key={name}
              className="relative cursor-pointer service-item hover:animate-shake"
              onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
            >
              <div className="absolute z-10 text-white left-5 top-4">
                <span>{label}</span>
                <h6 className="font-extrabold text-2xl">{name}</h6>
              </div>
              <div className="h-80 w-72 hover:shadow-2xl hover:shadow-slate-600 duration-300">
                <Image src={image} fill alt="service" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PopularServices;
