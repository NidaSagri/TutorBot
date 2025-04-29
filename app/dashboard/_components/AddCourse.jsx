"use client";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext } from 'react';

const AddCourse = () => {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl">
          Hello, <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Create a new course with AI - Master your skills effortlessly!
        </p>
      </div>

      <Link href={userCourseList.length >= 5 ? '/dashboard/upgrade' : '/create-course'}>
        <Button className="w-full sm:w-auto">+ Create AI Course</Button>
      </Link>
      
    </div>
  );
};

export default AddCourse;
