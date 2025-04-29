import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PUT(request) {
  const { id, name, about, index } = await request.json();

  // Fetch the course
  const course = await db
    .select()
    .from(CourseList)
    .where(eq(CourseList.id, id));

  const courseData = course[0]?.courseOutput;

  if (!courseData || !courseData.Chapters || courseData.Chapters.length <= index) {
    return new Response(JSON.stringify({ message: "Invalid chapter index or course not found" }), { status: 400 });
  }

  // Update the chapter
  courseData.Chapters[index].ChapterName = name;
  courseData.Chapters[index].About = about;

  // Update the course in DB
  await db
    .update(CourseList)
    .set({
      courseOutput: courseData,
    })
    .where(eq(CourseList.id, id));

  return new Response(JSON.stringify({ message: "Chapter updated successfully" }), { status: 200 });
}
