"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineShieldCheck,
  HiOutlinePower,
} from "react-icons/hi2";

const Sidebar = () => {

  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquares2X2 />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <HiOutlinePower />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  return (
    <div className="md:w-64 fixed h-full p-5 border-r shadow-md">
      <Image src={"/logo.png"} alt="TutorBot" width={150} height={100} />
      <hr className="my-5" />

      <ul>
        {Menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer mb-3 hover:bg-gray-100 hover:text-black rounded-lg ${
                item.path === path && "bg-gray-100 text-black"}`}>
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length/5)*100} />
        <h2 className="text-sm my-2">{userCourseList?.length} out of 5 Course created</h2>
        <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited course generation</h2>
      </div>

    </div>
  );
};

export default Sidebar;


