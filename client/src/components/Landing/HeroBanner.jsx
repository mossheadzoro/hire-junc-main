import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import gsap from "gsap";




function HomeBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  const [loaded,isLoaded]=useState(false);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

const mainText=useRef(null);
const searchBar=useRef(null);
const list =useRef(null);

useEffect(()=>{
  if(mainText.current && searchBar.current && list.current){
    gsap.fromTo(
      [mainText.current , searchBar.current , list.current ], 
      { x: -200, opacity: 0 }, // Initial state (off-screen, invisible)
      { x: 0, opacity: 1, duration: 2, stagger: 0.2 } // End state (in-place, visible with stagger)
    );
  }
},[isLoaded])



  return (
    <div className="h-[680px] relative bg-cover">
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image
          alt="hero"
          src="/big-hero1.webp"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/big-hero2.webp"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/big-hero3.webp"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/big-hero4.webp"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/big-hero5.webp"
          fill
          className={`${
            image === 5 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/big-hero6.webp"
          fill
          className={`${
            image === 6 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
      </div>
      <div  className="hero-overlay z-10 absolute w-[650px] flex justify-center flex-col h-full gap-5  items-center ">
       <div ref={mainText}>
        <h1 className="text-white text-4xl text-center leading-snug mt-64 px-4 font-bold ">
      
          Transforming Ideas into Reality with
          <br/>
<span className="text-5xl font-semibold">HIRE JUNC.</span>
        </h1>
        </div>
        <div ref={searchBar} className="flex align-middle">
          <div className="relative">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-14 w-[450px] pl-10 rounded-md rounded-r-none"
              placeholder={`Try "building mobile app"`}
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
          <button
            className="bg-[#18857e] text-white px-12 text-lg font-semibold rounded-r-md"
            onClick={() => router.push(`/search?q=${searchData}`)}
          >
            Search
          </button>
        </div>
        <div ref={list} className="text-white flex gap-4">
          Popular:
          <ul  className="flex gap-5">
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=website design")}
            >
              Website Design
            </li>
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=wordpress")}
            >
              Wordpress
            </li>
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=logo design")}
            >
              Logo Design
            </li>
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=ai services")}
            >
              AI Services
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
