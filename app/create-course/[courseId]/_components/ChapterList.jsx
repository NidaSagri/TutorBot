import React from 'react'
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";
import EditChapters from './EditChapters';

const ChapterList = ({ course, GetCourse, edit = true }) => {
  return (
    <div className="mt-7">
      <h2 className="font-medium text-lg sm:text-xl">Chapters</h2>
      <div className="mt-2 space-y-4">
        {course?.courseOutput?.Chapters?.map((chapter, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center border p-4 rounded-lg gap-4 sm:gap-8 justify-between"
          >
            <div className="flex gap-4 sm:gap-6 items-start sm:items-center">
              <div className="bg-primary w-10 h-10 rounded-full text-white text-center flex items-center justify-center text-sm flex-none">
                {index + 1}
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-base sm:text-lg flex items-center flex-wrap gap-1">
                  {chapter.ChapterName}
                  {!edit && (
                    <EditChapters index={index} course={course} GetCourse={GetCourse} />
                  )}
                </h2>
                <p className="text-sm text-gray-500">{chapter.About}</p>
                <p className="flex gap-1 text-primary items-center text-sm mt-1">
                  <HiOutlineClock />
                  {chapter.Duration}
                </p>
              </div>
            </div>
            <div className="self-end sm:self-center">
              <HiOutlineCheckCircle className="text-2xl sm:text-3xl text-gray-300 flex-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
