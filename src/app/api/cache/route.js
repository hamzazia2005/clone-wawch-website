import { NextResponse } from "next/server";
import {
  purgeAllCache,
  purgeCacheByPattern,
  getCacheStats,
  deleteFromCache,
  generateCacheKey,
} from "@/utils/cache";

export const runtime = "nodejs";

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
 *
 * Headers:
 *   Authorization: Bearer <CACHE_PURGE_SECRET>
 *
 * Response:
 * {
 *   "success": true,
 *   "stats": {
 *     "totalKeys": 10,
 *     "keys": [...],
 *     "prefix": "wawcd:strapi:website:",
 *     "defaultTtl": 3600
 *   }
 * }
 */
export async function GET(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const stats = await getCacheStats();
    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cache - Purge cache
 *
 * Headers:
 *   Authorization: Bearer <CACHE_PURGE_SECRET>
 *   Content-Type: application/json
 *
 * Body (optional):
 * {
 *   "pattern": "api/blog"  // Purge only keys matching this pattern
 * }
 *
 * Or:
 * {
 *   "url": "api/blog?pagination[page]=1"  // Purge specific URL cache
 * }
 *
 * Or empty body to purge all cache
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Cache purged successfully",
 *   "deletedCount": 10
 * }
 */
export async function POST(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
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
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cache - Purge all cache (alternative to POST with empty body)
 *
 * Headers:
 *   Authorization: Bearer <CACHE_PURGE_SECRET>
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "All cache purged successfully",
 *   "deletedCount": 10
 * }
 */
export async function DELETE(request) {
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
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
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
