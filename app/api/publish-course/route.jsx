import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { courseId } = body;

    if (!courseId) {
      return new Response(JSON.stringify({ error: "Missing courseId" }), {
        status: 400,
      });
    }

    await db.update(CourseList)
      .set({ publish: true })
      .where(CourseList.courseId.eq(courseId));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Publish error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
