"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, use, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

const CourseLayout = ({ params }) => {
  const router = useRouter();
  const { user } = useUser();
  const { courseId } = use(params);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log(course);
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters || [];

    try {
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];

        const PROMPT = `Explain the concept in detail on Topic: ${course?.name}, Chapter: ${chapter?.ChapterName}, in JSON format with an array of objects having fields: title, description, and Code example (use <precode> tags if applicable).`;

        // Get Youtube video URL
        let videoId = "";

        if (course?.includeVideo === "Yes") {
          const ytRes = await service.getVideos(
            `${course?.name}: ${chapter?.ChapterName}`
          );
          videoId = ytRes?.[0]?.id?.videoId || "";
        }

        // Generate chapter content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const contentText = result?.response?.text();
        const content = JSON.parse(contentText);

        // Save single chapter
        await fetch("/api/save-chapter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chapterId: index,
            courseId: course?.courseId,
            content,
            videoId, // pass only if it exists
          }),
        });
      }

      // Publish the course after all chapters are saved
      await fetch("/api/publish-course", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course?.courseId }),
      });

      setLoading(false);
      router.replace(`/create-course/${course?.courseId}/finish`);
    } catch (error) {
      console.error("Generation failed:", error);
      setLoading(false);
    }
  };

  return (
    // <div className="mt-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36">
    //   <h2 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    //     Course Layout
    //   </h2>

    //   <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
    //     <LoadingDialog loading={loading} />
    //     <CourseBasicInfo course={course} edit={true} />
    //     <CourseDetails course={course} />
    //     <ChapterList course={course} edit={false} />
    //     <Button
    //       className="my-10 text-lg sm:text-xl py-4 sm:py-6 px-6 sm:px-8"
    //       onClick={GenerateChapterContent}
    //     >
    //       Generate Course Content
    //     </Button>
    //   </div>
    // </div>

    <div className="mt-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36">
  <h2 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
    Course Layout
  </h2>

  <div className="w-full max-w-6xl mx-auto space-y-8">
    <LoadingDialog loading={loading} />
    <CourseBasicInfo course={course} edit={true} />
    <CourseDetails course={course} />
    <ChapterList course={course} edit={false} />
    <div className="flex justify-center">
      <Button
        className="my-6 sm:my-10 text-base sm:text-xl py-3 sm:py-6 px-6 sm:px-8"
        onClick={GenerateChapterContent}
      >
        Generate Course Content
      </Button>
    </div>
  </div>
</div>

  );
};

export default CourseLayout;

