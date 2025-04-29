import { db } from "@/configs/db";  
import { CourseList } from "@/configs/schema";  

// GET /api/get-all-courses
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pageIndex = parseInt(url.searchParams.get('pageIndex') || '0');  
    const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9); 
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
