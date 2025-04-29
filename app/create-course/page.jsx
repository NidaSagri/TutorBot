"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDiscussion from "./_components/TopicDiscussion";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiOutlineSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic name",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const { user } = useUser();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    } else if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.includeVideo == undefined ||
        userCourseInput?.noOfChapter == undefined)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const BASIC_PROMPT =
      "generate a course tutorial on the following details with fields as Course Name, Description, Chapter Name, About, Duration:";
    const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NofChapters: ${userCourseInput?.noOfChapter}, in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    const courseLayout = JSON.parse(result.response?.text());

    const userData = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      image: user?.imageUrl,
    };

    const res = await fetch("/api/save-course", {
      method: "POST",
      body: JSON.stringify({ courseLayout, userCourseInput, userData }),
    });

    const data = await res.json();
    setLoading(false);

    if (data?.id) {
      router.replace("/create-course/" + data.id);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-4xl text-primary font-medium ">Create Course</h1>

        {/* stepper */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[90px] sm:w-[100px] md:w-[120px]">
                <div
                  className={`bg-gray-300 p-3 rounded-full text-white text-xl sm:text-2xl md:text-3xl ${
                    activeIndex >= index && "bg-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="text-xs sm:text-sm md:text-base lg:text-lg text-center mt-3 sm:mt-4">
                  {item.name}
                </h2>
              </div>

              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-7 sm:w-12 md:w-24 lg:w-40 rounded-full bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* components */}
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <TopicDiscussion />
        ) : (
          <SelectOption />
        )}

        {/* next and prev buttons */}
        <div className="flex justify-between my-10">
          <Button
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Prev
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;
