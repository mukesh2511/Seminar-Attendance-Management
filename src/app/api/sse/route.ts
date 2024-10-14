import { NextRequest, NextResponse } from "next/server";
import { addConnection, removeConnection } from "@/utils/sse";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const classId = searchParams.get("classId");

  if (!classId) {
    return NextResponse.json({ error: "ClassId is required" }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      addConnection(classId, sendEvent);

      // Send an initial message
      sendEvent({ type: "connected", message: "SSE connection established" });

      // Clean up when the connection closes
      req.signal.addEventListener("abort", () => {
        removeConnection(classId, sendEvent);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
