import Image from "next/image";
import React from "react";

const Upgrade = () => {
  return (
    <div className='min-h-[66vh]'>
      <h2 className="font-bold text-3xl ">Upgrade App Now</h2>
      <p className="mt-1 text-gray-500 ">
        Upgrade now to create more amazing AI courses
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="shadow-sm rounded-lg mt-4 border p-2 transition-all cursor-pointer hover:border-primary hover:shadow-md hover:scale-105">
          <div className="relative">
            <Image
              src={"/course.png"}
              alt="course"
              width={300}
              height={200}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md">
              Best Deal
            </div>
          </div>

          <div className="p-2">
            <h2 className="font-medium text-xl mt-2 flex justify-between items-center">
              $5{" "}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
                Limited Offer
              </span>
            </h2>

            <p className="text-sm text-gray-400 my-2">
              Generate 5 more courses
            </p>

            <ul className="text-xs text-gray-500 mb-4 space-y-1">
              <li>✅ No Ads</li>
              <li>✅ Access to new templates</li>
              <li>✅ Priority support</li>
            </ul>

            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg mt-2 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="shadow-sm rounded-lg mt-4 border p-2 transition-all cursor-pointer hover:border-primary hover:shadow-md hover:scale-105">
            <Image
              src={"/course.png"}
              alt="course"
              width={300}
              height={200}
              className="w-full h-[200px] object-cover rounded-lg"
            />

          <div className="p-2">
            <h2 className="font-medium text-xl mt-2 flex justify-between items-center">
              $10{" "}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
                Limited Offer
              </span>
            </h2>

            <p className="text-sm text-gray-400 my-2">
              Generate 15 more courses
            </p>

            <ul className="text-xs text-gray-500 mb-4 space-y-1">
            <li>✅ Priority Email Support (faster response within 24 hours)</li>
            <li>✅ Analytics Access (View course views & enrollments)</li>
            <li>✅ Coding Playground for practicing code</li>
            </ul>

            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg mt-2 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="shadow-sm rounded-lg mt-4 border p-2 transition-all cursor-pointer hover:border-primary hover:shadow-md hover:scale-105">
            <Image
              src={"/course.png"}
              alt="course"
              width={300}
              height={200}
              className="w-full h-[200px] object-cover rounded-lg"
            />

          <div className="p-2">
            <h2 className="font-medium text-xl mt-2 flex justify-between items-center">
              $12{" "}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
                Limited Offer
              </span>
            </h2>

            <p className="text-sm text-gray-400 my-2">
              Generate 30 more courses
            </p>

            <ul className="text-xs text-gray-500 mb-4 space-y-1">
              <li>✅ Priority Chat Support (instant help inside app)</li>
              <li>✅ Advanced Analytics (course engagement graphs, time tracking)</li>
              <li>✅ Coding Playground for practicing code</li>
            </ul>

            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg mt-2 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>


      </div>


    </div>
  );
};

export default Upgrade;
