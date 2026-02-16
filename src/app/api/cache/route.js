import { NextResponse } from "next/server";

export const runtime = "edge";

const CACHE_SECRET = process.env.CACHE_PURGE_SECRET || "wawcd-cache-secret";

const CACHE_UNAVAILABLE_MESSAGE =
  "Cache is not available in this environment (Edge). Redis is required. Use a Node runtime for cache operations.";

function verifyAuth(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return token === CACHE_SECRET;
}

/**
 * GET /api/cache - Get cache statistics
 * On Edge (e.g. Cloudflare) Redis is not available; returns 503.
 */
export async function GET(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { success: false, error: CACHE_UNAVAILABLE_MESSAGE },
    { status: 503 }
  );
}

/**
 * POST /api/cache - Purge cache
 * On Edge (e.g. Cloudflare) Redis is not available; returns 503.
 */
export async function POST(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { success: false, error: CACHE_UNAVAILABLE_MESSAGE },
    { status: 503 }
  );
}

/**
 * DELETE /api/cache - Purge all cache
 * On Edge (e.g. Cloudflare) Redis is not available; returns 503.
 */
export async function DELETE(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { success: false, error: CACHE_UNAVAILABLE_MESSAGE },
    { status: 503 }
  );
}
