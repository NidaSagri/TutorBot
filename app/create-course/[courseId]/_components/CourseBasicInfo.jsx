import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import Link from "next/link";

const CourseBasicInfo = ({ course, GetCourse, edit=true }) => {
  const [selectedFile, setSelectedFile] = useState();

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "tutorbot");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    const downloadUrl = data.secure_url;

    // Save image URL to DB
    await fetch("/api/edit-course/course-image", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: course.courseId,
        downloadUrl,
      }),
    });

    GetCourse();
  };

  return (
    <div className="p-6 border rounded-xl shadow-sm mt-5 ">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 ">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.CourseName}{" "}
            {edit && <EditCourseBasicInfo course={course} GetCourse={GetCourse} />}
          </h2>
          <p className="text-sm text-gray-400 mt-3 ">
            {course?.courseOutput?.Description}
          </p>
          <h2 className="font-medium flex gap-2 items-center text-primary mt-2 ">
            <HiOutlinePuzzle />
            {course?.courseOutput?.Category}
          </h2>
          {!edit && <Link href={'/course/'+course?.courseId+'/start'}><Button className="mt-6 text-lg py-5">Start</Button></Link>}
        </div>
        <div>
          <label htmlFor="upload-file">
            <Image
              src={
                selectedFile
                  ? selectedFile
                  : course?.courseBanner
                  ? course.courseBanner
                  : "/course.png"
              }
              alt="course"
              width={200}
              height={200}
              className="w-full h-[200px] md:h-[250px] object-cover rounded-xl cursor-pointer"
            />
          </label>
         {
          edit && (
            <input
            type="file"
            id="upload-file"
            className="opacity-0"
            onChange={onFileSelected}
          />
          )
         }
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
