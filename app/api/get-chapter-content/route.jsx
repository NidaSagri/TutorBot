import { db } from "@/configs/db";
import { Chapters } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request) {
  try {
    const { chapterId, courseId } = await request.json();

    if (chapterId == null || !courseId) {
      return new Response(JSON.stringify({ message: "Missing chapterId or courseId" }), { status: 400 });
    }

    // Query the chapter
    const result = await db.select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, courseId)
        )
      );

    if (result.length === 0) {
      return new Response(JSON.stringify({ message: "Chapter not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(result[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
