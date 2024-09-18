import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/LOGO.jsx";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import  gsap  from "gsap";
function Navbar() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const links = [
    { linkName: "Projects", handler: "#", type: "link" },
    { linkName: "Jobs", handler: "#", type: "link" },
    { linkName: "Gigs", handler: "#", type: "link" },
    { linkName: "Aura", handler: "#", type: "link" },
 { linkName: "Sign up", handler: handleSignup, type: "button2" },
  ];

  // useEffect(() => {
  //   if (router.pathname === "/") {
  //     const positionNavbar = () => {
  //       window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(true);
  //     };
  //     window.addEventListener("scroll", positionNavbar);
  //     return () => window.removeEventListener("scroll", positionNavbar);
  //   } else {
  //     setNavFixed(true);
  //   }
  // }, [router.pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          let projectedUserInfo = { ...user };
          if (user.image) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.image,
            };
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          console.log({ user });
          if (user.isProfileSet === false) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo, dispatch]);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();

      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);
  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const logo=useRef(null);
  const searchBox=useRef(null);
  const search=useRef(null);
  const list=useRef(null);
  useEffect(() => {
    if(logo.current && searchBox.current&& search.current && list.current){

      gsap.fromTo(
        [ logo.current,searchBox.current,search.current,list.current], 
        { x: -200, opacity: 0 }, // Initial state (off-screen, invisible)
        { x: 0, opacity: 1, duration: 1, stagger: 0.2 } // End state (in-place, visible with stagger)
      );
    }
  }, [isLoaded]);
  

  return (
    <div>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-1  gap-4 top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-[#A0C7C7] border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div ref={logo}>
            <Link href="/">
              <div className="flex items-center justify-between ">
                <Logo/>
              </div>
            </Link>
          </div>
          <div
            className={`flex ${
              navFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
            ref={searchBox}
              type="text"
              placeholder="What service are you looking for today?"
              className="w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
            ref={search}
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>
          {!userInfo ? (
            <ul className="flex gap-10 items-center" ref={list}>
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                  
                    key={linkName}
                    className={`${
                      navFixed ? "text-black" : "text-white"
                    } font-medium`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}>{linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border   text-md font-semibold py-1 px-3 h-12 w-24  rounded-md ${
                          navFixed
                            ? "border-[#000000] text-[#000000]"
                            : "border-black text-black"
                        } hover:bg-[#E6E6E6] hover:text-black hover:border-[#000000] transition-all duration-500`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center" ref={list}>
              {isSeller && (
                <li
                  className="cursor-pointer text-black font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              <li
                className="cursor-pointer text-[#000000] font-medium"
                onClick={handleOrdersNavigate}
              >
                Orders
              </li>

              {isSeller ? (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Buyer
                </li>
              ) : (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Seller
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full h-12 w-12"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {userInfo &&
                        userInfo?.email &&
                        userInfo?.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </div>
  );
}

export default Navbar;
