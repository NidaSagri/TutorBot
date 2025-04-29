import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    const userCourses = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.createdBy, email));

    return new Response(JSON.stringify({ success: true, courses: userCourses }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
