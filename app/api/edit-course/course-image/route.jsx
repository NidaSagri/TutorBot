import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PUT(request) {
  try {
    const { id, downloadUrl } = await request.json();

    // Update the courseBanner field directly
    const result = await db
      .update(CourseList)
      .set({ courseBanner: downloadUrl })
      .where(eq(CourseList.id, id));

    return new Response(
      JSON.stringify({ message: "Course image updated successfully", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating course banner:", error);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
