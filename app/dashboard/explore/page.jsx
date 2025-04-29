"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourses();
  }, [pageIndex]);

  const GetAllCourses = async () => {
    // Passing pageIndex as a query parameter in the URL
    const response = await fetch(`/api/get-all-courses?pageIndex=${pageIndex}`);
    const data = await response.json();
    setCourseList(data);
    console.log(data);
  };

  return (
    <div className="min-h-[66vh] ">
      <h2 className="font-bold text-3xl ">Explore More Projects</h2>
      <p className="mt-1 text-gray-500 ">
        Explore more projects built with AI by other users
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courseList?.map((course, index) => (
          <CourseCard key={index} course={course} displayUser={true} />
        ))}
      </div>

      {courseList.length > 9 && (
        <div className="flex justify-between mt-7">
          <Button
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Previous Page
          </Button>

          <Button
            disabled={courseList.length < 9}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explore;
