import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Header = ({dashboardBtn = true}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src={"/favicon.png"} alt="TutotBot" width={50} height={40} />
      <div className="flex gap-5 items-center">
        {dashboardBtn && <Button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>}

        <UserButton />
      </div>
    </div>
  );
};

export default Header;
