"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Button } from "@/components/ui/button";

const CourseStart = ({ params }) => {
  const { user } = useUser();
  const { courseId } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const userData = { email: user?.primaryEmailAddress?.emailAddress };

    const res = await fetch("/api/get-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData, courseId }),
    });

    const data = await res.json();
    setCourse(data.result?.[0]);

    if (data.result?.[0]?.courseId) {
      setSelectedChapter(data.result?.[0]?.courseOutput?.Chapters[0]);
      GetSelectedChapterContent(0, data.result?.[0]?.courseId);
    }
  };

  const GetSelectedChapterContent = async (chapId, courseId) => {
    const res = await fetch("/api/get-chapter-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chapterId: chapId, courseId }),
    });

    const data = await res.json();
    setChapterContent(data);
  };

  const handleNextChapter = () => {
    const currentIndex =
      course?.courseOutput?.Chapters?.indexOf(selectedChapter);
    if (currentIndex < course?.courseOutput?.Chapters.length - 1) {
      const nextChapter = course?.courseOutput?.Chapters[currentIndex + 1];
      setSelectedChapter(nextChapter);
      GetSelectedChapterContent(currentIndex + 1, course?.courseId);
    }
  };

  const handlePrevChapter = () => {
    const currentIndex =
      course?.courseOutput?.Chapters?.indexOf(selectedChapter);
    if (currentIndex > 0) {
      const prevChapter = course?.courseOutput?.Chapters[currentIndex - 1];
      setSelectedChapter(prevChapter);
      GetSelectedChapterContent(currentIndex - 1, course?.courseId);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:fixed md:w-72 md:h-screen bg-white border-r shadow-sm z-10 overflow-y-auto scrollbar-hide">
          <h2 className="font-medium text-xl text-white bg-primary p-4">
            {course?.courseOutput?.CourseName}
          </h2>
          <div>
            {course?.courseOutput?.Chapters?.map((chapter, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:bg-purple-50 ${
                  selectedChapter?.ChapterName === chapter?.ChapterName &&
                  "bg-purple-100"
                }`}
                onClick={() => {
                  setSelectedChapter(chapter);
                  GetSelectedChapterContent(index, course?.courseId);
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:ml-72 px-3 md:px-6 lg:px-10 flex-1 overflow-x-hidden">
          <ChapterContent chapter={selectedChapter} content={chapterContent} />

          {/* Mobile Prev/Next Buttons */}
          <div className="flex justify-between mt-5 mb-18 md:hidden">
            <Button
              onClick={handlePrevChapter}
              disabled={
                course?.courseOutput?.Chapters?.indexOf(selectedChapter) === 0
              }
            >
              Previous
            </Button>
            <Button
              onClick={handleNextChapter}
              disabled={
                course?.courseOutput?.Chapters?.indexOf(selectedChapter) ===
                course?.courseOutput?.Chapters?.length - 1
              }
            >
              Next
            </Button>
          </div>

          <div className="m-10 text-center">
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseStart;
