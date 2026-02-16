import { NextResponse } from "next/server";

export const runtime = "edge";

const CACHE_SECRET = process.env.CACHE_PURGE_SECRET || "wawcd-cache-secret";

/**
 * Verify the authorization header
 * @param {Request} request
 * @returns {boolean}
 */
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
 * On Edge (e.g. Cloudflare), Redis is not available; returns 503.
 */
export async function GET(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { getCacheStats } = await import("@/utils/cache");
    const stats = await getCacheStats();
    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Cache is not available in this environment (e.g. Edge). Redis is required.",
      },
      { status: 503 }
    );
  }
}

/**
 * POST /api/cache - Purge cache
 * On Edge (e.g. Cloudflare), Redis is not available; returns 503.
 */
export async function POST(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const {
      purgeAllCache,
      purgeCacheByPattern,
      deleteFromCache,
      generateCacheKey,
    } = await import("@/utils/cache");

    let body = {};
    try {
      body = await request.json();
    } catch {
      // Empty body is allowed for purging all cache
    }

    const { pattern, url } = body;

    let result;

    if (url) {
      const cacheKey = generateCacheKey(url);
      const deleted = await deleteFromCache(cacheKey);
      result = {
        success: deleted,
        deletedCount: deleted ? 1 : 0,
      };
    } else if (pattern) {
      result = await purgeCacheByPattern(pattern);
    } else {
      result = await purgeAllCache();
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: pattern
          ? `Cache purged for pattern: ${pattern}`
          : url
            ? `Cache purged for URL: ${url}`
            : "All cache purged successfully",
        deletedCount: result.deletedCount,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Cache is not available in this environment (e.g. Edge). Redis is required.",
      },
      { status: 503 }
    );
  }
}

/**
 * DELETE /api/cache - Purge all cache
 * On Edge (e.g. Cloudflare), Redis is not available; returns 503.
 */
export async function DELETE(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { purgeAllCache } = await import("@/utils/cache");
    const result = await purgeAllCache();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "All cache purged successfully",
        deletedCount: result.deletedCount,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Cache is not available in this environment (e.g. Edge). Redis is required.",
      },
      { status: 503 }
    );
  }
}
