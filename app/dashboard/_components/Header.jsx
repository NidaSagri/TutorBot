import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = ({ dashboardBtn = false }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center p-4 border-b">
      <div className="md:hidden">
        <HiOutlineMenu
          className="text-2xl cursor-pointer"
          onClick={() => setMobileOpen(true)}
        />
      </div>

      <Image src={"/favicon.png"} alt="TutotBot" width={50} height={40} />

      <div className="flex gap-5 items-center">
      {dashboardBtn && (
        <Button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      )}

      <UserButton />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="w-64 h-full bg-white shadow-lg z-50 p-5 relative">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
            <Sidebar /> {/* Use the same sidebar so routes are consistent */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
