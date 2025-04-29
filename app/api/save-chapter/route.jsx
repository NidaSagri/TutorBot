import { db } from "@/configs/db"; 
import { Chapters } from "@/configs/schema"; 

export async function POST(req) {
  try {
    const body = await req.json();
    const { courseId, chapterId, content, videoId } = body;

    if (!courseId || chapterId === undefined || !content) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const chapterData = {
      courseId,
      chapterId: String(chapterId),
      content,
    };

    if (videoId) {
      chapterData.videoId = videoId;
    }

    await db.insert(Chapters).values(chapterData);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error saving chapter:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
