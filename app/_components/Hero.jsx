import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRobot, FaUserGraduate, FaYoutube } from "react-icons/fa"; 
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50 min-h-[81vh]">
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex lg:flex-col lg:items-center">
        
        {/* Top Hero Text */}
        <div className="mx-auto max-w-3xl text-center flex flex-col">
          <h1 className="text-5xl font-extrabold text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            AI Course Generator
          </h1>

          <p className="font-extrabold text-black text-3xl sm:text-2xl md:text-3xl lg:text-4xl mt-4">
            Custom Learning Paths, Powered by AI
          </p>

          <p className="mt-5 text-gray-600 sm:text-lg">
            Unlock personalized education with AI-driven course creation. Tailor
            your learning journey to fit your unique goals and pace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={"/dashboard"}>
              <Button className="text-lg px-6 py-6">Get Started 🚀</Button>
            </Link>
          </div>
        </div>

        {/* Features Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaRobot className="text-primary text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Instant Course Creation</h3>
            <p className="text-gray-600">
              Generate complete, structured courses in seconds using AI based on your input topics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaUserGraduate className="text-primary text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Personalized Learning</h3>
            <p className="text-gray-600">
              Courses are customized for your learning goals, preferred pace, and skill level.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaYoutube className="text-primary text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Add Video Tutorials</h3>
            <p className="text-gray-600">
              Enhance your courses by embedding YouTube video tutorials for better visual learning.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
