import { NextRequest, NextResponse } from "next/server";

declare global {
  var sseConnections: Map<string, Set<(data: any) => void>>;
}

if (!global.sseConnections) {
  global.sseConnections = new Map();
}

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

      if (!global.sseConnections.has(classId)) {
        global.sseConnections.set(classId, new Set());
      }
      global.sseConnections.get(classId)!.add(sendEvent);

      // Send an initial message
      sendEvent({ type: "connected", message: "SSE connection established" });

      // Clean up when the connection closes
      req.signal.addEventListener("abort", () => {
        global.sseConnections.get(classId)?.delete(sendEvent);
        if (global.sseConnections.get(classId)?.size === 0) {
          global.sseConnections.delete(classId);
        }
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

export function broadcastToClass(classId: string, data: any) {
  const connections: any = global.sseConnections.get(classId);
  if (connections) {
    for (const sendEvent of connections) {
      sendEvent(data);
    }
  }
}
