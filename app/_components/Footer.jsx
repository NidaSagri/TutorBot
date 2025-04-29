import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    // <footer className="bg-white mt-auto border-t shadow-sm ">
    //   <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
    //     <div className="sm:flex sm:items-center sm:justify-between">
    //       <Image src="/logo.png" alt="TutorBot" width={100} height={100} />

    //       <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
    //         Copyright &copy; 2025. All rights reserved.
    //       </p>
    //     </div>
    //   </div>
    // </footer>

    <footer className="bg-white mt-auto border-t shadow-sm w-full">
  <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
      <Image src="/logo.png" alt="TutorBot" width={100} height={100} className="mb-4 sm:mb-0" />
      
      <p className="text-center text-sm text-gray-500 sm:text-right">
        © 2025 TutorBot. All rights reserved.
      </p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
