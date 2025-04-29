import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PUT(request) {
  const { id, name, description } = await request.json();

  // Step 1: Get the current course from the DB
  const currentCourse = await db.select().from(CourseList).where(eq(CourseList.id, id));

  if (!currentCourse || currentCourse.length === 0) {
    return new Response(JSON.stringify({ message: "Course not found" }), { status: 404 });
  }

  const existingOutput = currentCourse[0].courseOutput;

  // Step 2: Merge the existing output with new values
  const updatedOutput = {
    ...existingOutput,
    CourseName: name,
    Description: description,
  };

  // Step 3: Update the DB with merged output
  const result = await db.update(CourseList)
    .set({ courseOutput: updatedOutput })
    .where(eq(CourseList.id, id));

  return new Response(
    JSON.stringify({ message: "Course updated successfully", result }),
    { status: 200 }
  );
}
