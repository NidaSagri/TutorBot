import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  const { userData, courseId } = await req.json();

  const result = await db
    .select()
    .from(CourseList)
    .where(
      and(
        eq(CourseList.courseId, courseId),
        eq(CourseList.createdBy, userData.email)
      )
    );

  return new Response(JSON.stringify({ success: true, result }), {
    status: 200,
  });
}
