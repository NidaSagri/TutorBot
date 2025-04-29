import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-full justify-between p-2 shadow-sm items-center">
      <Image src="/logo.png" alt="TutorBot" width={150} height={100} />
      <Link href={"/dashboard"}>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
};

export default Header;
