declare global {
  var sseConnections: Map<string, Set<(data: any) => void>>;
}

if (typeof global.sseConnections === "undefined") {
  global.sseConnections = new Map();
}

export function addConnection(classId: string, sendEvent: (data: any) => void) {
  if (!global.sseConnections.has(classId)) {
    global.sseConnections.set(classId, new Set());
  }
  global.sseConnections.get(classId)!.add(sendEvent);
}

export function removeConnection(
  classId: string,
  sendEvent: (data: any) => void
) {
  global.sseConnections.get(classId)?.delete(sendEvent);
  if (global.sseConnections.get(classId)?.size === 0) {
    global.sseConnections.delete(classId);
  }
}

export function broadcastToClass(classId: string, data: any) {
  const connections: any = global.sseConnections.get(classId);
  if (connections) {
    for (const sendEvent of connections) {
      sendEvent(data);
    }
  }
}
