import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq } from "drizzle-orm";

// POST /api/delete-course
export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Course ID is required" }), { status: 400 });
    }

    await db.delete(CourseList).where(eq(CourseList.id, id));

    return new Response(JSON.stringify({ message: "Course and its chapters deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
