"use client";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

const UserCourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    setLoading(true);
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const res = await fetch("/api/get-user-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await res.json();
    setCourseList(data.courses);
    setUserCourseList(data.courses);
    setLoading(false);
  };

  return (
    <div className="mt-10">
      { courseList.length > 0 && <h2 className="font-medium text-2xl text-center">My AI Generated Courses</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
          [1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 animate-pulse rounded-lg h-[300px]"
            ></div>
          ))
        ) : courseList.length > 0 ? (
          courseList.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              setCourseList={setCourseList}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg mt-35 min-h-[30vh]">
            No courses yet. Start creating one!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourseList;
