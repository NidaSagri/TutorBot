'use client'
import Header from "@/app/_components/Header";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetails from "@/app/create-course/[courseId]/_components/CourseDetails";
import { useUser } from "@clerk/nextjs";
import React, { use, useEffect, useState } from "react";

const Course = ({ params }) => {
  const { courseId } = use(params);
  const {user} = useUser();
  const [course, setCourse] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

const GetCourse = async ()=>{
    const userData = {email: user?.primaryEmailAddress?.emailAddress};

    const res = await fetch("/api/get-course", {
      method: "POST",
      body: JSON.stringify({userData, courseId }),
    });

    const data = await res.json();
    setCourse(data.result?.[0]);
    console.log(data.result?.[0]);

  }

  return (
    <div>
        <Header/>
        <div className="px-4 md:px-20 lg:px-44">
            <CourseBasicInfo course={course} edit={false}/>
            <CourseDetails course={course}/>
            <ChapterList course={course} edit={false}/>
        </div>
    </div>
  );
};

export default Course;
