"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BaseApi from "@/utils/libs/BaseApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CartProduct from "./CartProduct";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    getToken();
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    getCategoryList();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

// get data Category
  const getCategoryList: any = () => {
    BaseApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };
// Login User
  const getToken = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLogin(true);
      setUsername(JSON.parse(user).username);
    }
  };
  // Logout Account
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <nav
      className={`p-4 fixed transition-all ease-in-out w-full  z-10 ${
        isScroll ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <Link href="/">
          <h2
            className={`${
              isScroll ? "text-emerald-600" : "text-black"
            } text-2xl font-bold`}
          >
            Sportyz
          </h2>
        </Link>
        {/* dropDown */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={`${
                isScroll
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-600"
              } rounded-full md:flex hidden`}
            >
              <h2 className="font-bold flex p-3 flex-row gap-2 ">
                <DashboardCustomizeIcon /> Category
              </h2>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Brands</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category: any, index: number) => (
              <DropdownMenuItem key={index}>
                <Link
                  href={`/brands/${category?.attributes?.name}`}
                  className="flex flex-row gap-2"
                >
                  <Image
                    src={`/${category?.attributes?.image?.data?.attributes?.name}`}
                    alt=""
                    width={30}
                    height={30}
                    priority
                  />
                  <h2>{category?.attributes?.name}</h2>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* hamburgerMenu */}
        <div className="md:hidden ml-40">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex md:items-center md:space-x-6 ${
            isOpen ? "ml-0" : "ml-[-550px]"
          } absolute md:relative md:ml-2 ml-0 w-60 rounded-2xl h-screen md:h-auto md:w-auto bg-emerald-600 md:bg-transparent transition-all ease-in-out left-0 top-full md:top-auto`}
        >
          <li>
            <Link href="/shop">
              <span
                className={`block px-4 py-2 ${
                  isScroll ? "text-black" : "text-emerald-400"
                }`}
              >
                Shop
              </span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span
                className={`block px-4 py-2 ${
                  isScroll ? "text-black" : "text-emerald-400"
                }`}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <span
                className={`block px-4 py-2 ${
                  isScroll ? "text-black" : "text-emerald-400"
                }`}
              >
                Contact
              </span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
                <CartProduct/>
          </div>
          <div className="">
            {isLogin ? (
              <div>
                <HoverCard>
                  <HoverCardTrigger>
                  <Avatar>
                      <AvatarImage src="/icon _user.png" alt="avatar" />
                       <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex flex-row gap-2">
                  <Avatar>
                      <AvatarImage src="/icon _user.png" alt="avatar" />
                       <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h2 className="text-white font-bold">{username}</h2>
                     </div>
                    <button
                  onClick={handleLogout}
                  className="flex flex-row gap-2 bg-emerald-500 p-3 rounded-md text-white"
                >
                  logout
                </button>
                  </HoverCardContent>
                </HoverCard>

                
              </div>
            ) : (
              <CustomButton
                Click={() => router.push("/auth/login")}
                titles="Login"
                img="/icon _user.png"
                style="p-2 bg-emerald-500 hidden md:flex md:flex-row text-lg justify-center items-center text-slate-50 hover:bg-white hover:text-[#007153] hover:text-[#007153] gap-3 rounded-full flex"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
