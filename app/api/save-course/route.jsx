import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4  from "uuid4";

export async function POST(req) {
  const { courseLayout, userCourseInput, userData } = await req.json();
  const id = uuid4();

  await db.insert(CourseList).values({
    courseId: id,
    name: userCourseInput.topic,
    level: userCourseInput.level,
    category: userCourseInput.category,
    courseOutput: courseLayout,
    createdBy: userData.email,
    userName: userData.name,
    includeVideo: userCourseInput.includeVideo === "No" ? "No" : "Yes",
    userProfileImage: userData.image,
  });

  return new Response(JSON.stringify({ success: true, id }), {
    status: 200,
  });
}
