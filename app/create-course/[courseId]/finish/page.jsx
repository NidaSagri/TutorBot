"use client";
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { toast } from 'sonner';

const FinishScreen = ({ params }) => {
  const { user } = useUser();
  const { courseId } = use(params);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const userData = { email: user?.primaryEmailAddress?.emailAddress };

    const res = await fetch("/api/get-course", {
      method: "POST",
      body: JSON.stringify({ userData, courseId }),
    });

    const data = await res.json();
    setCourse(data.result?.[0]);
  };

  const handleCopyLink = async () => {
    const link =
      process.env.NEXT_PUBLIC_HOST_NAME +
      "/course/" +
      course?.courseId +
      "/start";
    await navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-center font-bold text-2xl sm:text-3xl mb-6 text-primary">
        🎉 Congrats! Your Course is Ready!
      </h2>

      <CourseBasicInfo course={course} edit={false}/>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-2">Course URL</h3>
        <div className="flex items-center justify-between gap-3 text-sm sm:text-base text-gray-600 border rounded px-3 py-2">
          <span>
            {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}/start
          </span>
          <HiOutlineClipboardDocumentCheck
            className="h-6 w-6 sm:h-5 sm:w-5 text-primary cursor-pointer flex-shrink-0"
            onClick={handleCopyLink}
          />
        </div>
      </div>
    </div>
  );
};

export default FinishScreen;
