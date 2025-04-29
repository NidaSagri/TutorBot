import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen, HiMiniEllipsisVertical} from "react-icons/hi2";
import DropdownOption from "./DropdownOption";
import Link from "next/link";
import { toast } from 'sonner';

const CourseCard = ({ course, setCourseList, displayUser=false }) => {

const handleOnDelete = async () => {

  try {
    const res = await fetch('/api/delete-course', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: course?.id }),
    });

    if (res.ok) {
      toast.success("Course deleted successfully!");
      setCourseList((prev) => prev.filter((c) => c.id !== course.id));
    } else {
      toast.error("Failed to delete course");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="shadow-sm rounded-lg mt-4 border p-2 transition-all cursor-pointer hover:border-primary ">
      <Link href={'/course/' + course?.courseId}>
      <Image
        src={course?.courseBanner}
        alt="course"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover rounded-lg"/>
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-xl mt-2 flex justify-between items-center">
          {course?.courseOutput?.CourseName}{" "}
          {!displayUser && <DropdownOption handleOnDelete={handleOnDelete}>
            <span>
              <HiMiniEllipsisVertical />
            </span>
          </DropdownOption>}
        </h2>
        <p className="text-sm text-gray-400 my-2">{course?.category}</p>
        <div className="flex items-center justify-between my-2">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary rounded-sm text-sm font-medium">
            <HiOutlineBookOpen className="font-medium text-lg" /> Chapters:{" "}
            {course?.courseOutput?.NoOfChapters}
          </h2>
          <h2 className="p-1 bg-purple-50 text-primary rounded-sm text-sm font-medium">
            {course?.level}
          </h2>
        </div>

        <div className="flex gap-2 items-center mt-5">
          <Image src={course?.userProfileImage} alt={'UserProfile'} width={30} height={30} className="rounded-full"/>
          <h2 className="text-sm">{course?.userName}</h2>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;
