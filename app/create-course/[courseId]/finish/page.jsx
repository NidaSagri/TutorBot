"use client"
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

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

  return (
    <div className="px-4 md:px-20 lg:px-44 my-7 ">
      <h2 className="text-center font-bold text-3xl my-3 text-primary">
        Congrats! Your Course is Ready!
      </h2>

      <CourseBasicInfo course={course} />

      <h2 className="mt-6">Course URL</h2>
      <h2 className="text-sm text-center text-gray-400 border p-2 rounded flex gap-5 items-center">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}/start
        <HiOutlineClipboardDocumentCheck
          className="h-7 w-7 sm:w-4 sm:h-4 cursor-pointer"
          onClick={async () => {
            await navigator.clipboard.writeText(
              process.env.NEXT_PUBLIC_HOST_NAME +
                "/course/" +
                course?.courseId + '/start'
            );
          }}
        />
      </h2>

      
    </div>
  );
};

export default FinishScreen;
