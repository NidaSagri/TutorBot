"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";

const LogoutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      toast.success("Logged out successfully. See you soon! 👋");
      await signOut();
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[66vh] text-center p-4">
      <h2 className="text-3xl font-bold">Thank you for being with us!</h2>
      <p className="text-gray-500 mt-2">We hope to see you again soon! 🚀</p>

      <Button onClick={handleLogout} className="px-5 py-5 rounded mt-6 text-lg">
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
