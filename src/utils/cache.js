import { getRedisClient, isRedisAvailable } from "./redis";
import "server-only";

// Default TTL in seconds (1 hour)
const DEFAULT_TTL = parseInt(process.env.CACHE_TTL_SECONDS || "3600", 10);

const CACHE_PREFIX = "wawcd:strapi:website:";

/**
 * Generate a cache key from the API URL
 * @param {string} url - The API URL
 * @returns {string} - The cache key
 */
export function generateCacheKey(url) {
  const normalizedUrl = url.replace(/^\/+/, "").replace(/\s+/g, "");
  return `${CACHE_PREFIX}${normalizedUrl}`;
}

/**
 * Get data from cache
 * @param {string} key - Cache key
 * @returns {Promise<any|null>} - Cached data or null
 */
export async function getFromCache(key) {
  try {
    const available = await isRedisAvailable();
    if (!available) return null;

    const client = getRedisClient();
    if (!client) return null;

    const cached = await client.get(key);
    if (cached) {
      console.log(`[Cache] HIT: ${key}`);
      return JSON.parse(cached);
    }
    console.log(`[Cache] MISS: ${key}`);
    return null;
  } catch (error) {
    console.error("[Cache] Error getting from cache:", error.message);
    return null;
  }
}

/**
 * Set data in cache with TTL
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in seconds (default: DEFAULT_TTL)
 * @returns {Promise<boolean>} - Success status
 */
export async function setInCache(key, data, ttl = DEFAULT_TTL) {
  try {
    const available = await isRedisAvailable();
    if (!available) return false;

    const client = getRedisClient();
    if (!client) return false;

    const serialized = JSON.stringify(data);
    await client.setex(key, ttl, serialized);
    console.log(`[Cache] SET: ${key} (TTL: ${ttl}s)`);
    return true;
  } catch (error) {
    console.error("[Cache] Error setting cache:", error.message);
    return false;
  }
}

/**
 * Delete a specific cache key
 * @param {string} key - Cache key to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteFromCache(key) {
  try {
    const available = await isRedisAvailable();
    if (!available) return false;

    const client = getRedisClient();
    if (!client) return false;

    await client.del(key);
    console.log(`[Cache] DELETE: ${key}`);
    return true;
  } catch (error) {
    console.error("[Cache] Error deleting from cache:", error.message);
    return false;
  }
}

/**
 * Purge all Strapi cache entries
 * @returns {Promise<{success: boolean, deletedCount: number, error?: string}>}
 */
export async function purgeAllCache() {
  try {
    const available = await isRedisAvailable();
    if (!available) {
      return { success: false, deletedCount: 0, error: "Redis not available" };
    }

    const client = getRedisClient();
    if (!client) {
      return {
        success: false,
        deletedCount: 0,
        error: "Redis client not initialized",
      };
    }

    const pattern = `${CACHE_PREFIX}*`;
    const keys = await client.keys(pattern);

    if (keys.length === 0) {
      console.log("[Cache] PURGE: No keys to delete");
      return { success: true, deletedCount: 0 };
    }

    await client.del(...keys);
    console.log(`[Cache] PURGE: Deleted ${keys.length} keys`);
    return { success: true, deletedCount: keys.length };
  } catch (error) {
    console.error("[Cache] Error purging cache:", error.message);
    return { success: false, deletedCount: 0, error: error.message };
  }
}

/**
 * Purge cache entries matching a pattern
 * @param {string} urlPattern - URL pattern to match (e.g., 'api/blog' will match all blog-related cache)
 * @returns {Promise<{success: boolean, deletedCount: number, error?: string}>}
 */
export async function purgeCacheByPattern(urlPattern) {
  try {
    const available = await isRedisAvailable();
    if (!available) {
      return { success: false, deletedCount: 0, error: "Redis not available" };
    }

    const client = getRedisClient();
    if (!client) {
      return {
        success: false,
        deletedCount: 0,
        error: "Redis client not initialized",
      };
    }

    const pattern = `${CACHE_PREFIX}*${urlPattern}*`;
    const keys = await client.keys(pattern);

    if (keys.length === 0) {
      console.log(`[Cache] PURGE PATTERN: No keys matching '${urlPattern}'`);
      return { success: true, deletedCount: 0 };
    }

    await client.del(...keys);
    console.log(
      `[Cache] PURGE PATTERN '${urlPattern}': Deleted ${keys.length} keys`
    );
    return { success: true, deletedCount: keys.length };
  } catch (error) {
    console.error("[Cache] Error purging cache by pattern:", error.message);
    return { success: false, deletedCount: 0, error: error.message };
  }
}

/**
 * Get cache statistics
 * @returns {Promise<{totalKeys: number, keys: string[], error?: string}>}
 */
export async function getCacheStats() {
  try {
    const available = await isRedisAvailable();
    if (!available) {
      return { totalKeys: 0, keys: [], error: "Redis not available" };
    }

    const client = getRedisClient();
    if (!client) {
      return { totalKeys: 0, keys: [], error: "Redis client not initialized" };
    }

    const pattern = `${CACHE_PREFIX}*`;
    const keys = await client.keys(pattern);

    const keysWithTtl = await Promise.all(
      keys.map(async (key) => {
        const ttl = await client.ttl(key);
        return {
          key: key.replace(CACHE_PREFIX, ""),
          ttl,
        };
      })
    );

    return {
      totalKeys: keys.length,
      keys: keysWithTtl,
      prefix: CACHE_PREFIX,
      defaultTtl: DEFAULT_TTL,
    };
  } catch (error) {
    console.error("[Cache] Error getting stats:", error.message);
    return { totalKeys: 0, keys: [], error: error.message };
  }
}

/**
 * Wrapper function to get data with caching
 * @param {string} url - API URL
 * @param {Function} fetchFn - Function to fetch data if not cached
 * @param {number} ttl - TTL in seconds (optional)
 * @returns {Promise<any>} - Data from cache or fresh fetch
 */
export async function withCache(url, fetchFn, ttl = DEFAULT_TTL) {
  const cacheKey = generateCacheKey(url);

  const cachedData = await getFromCache(cacheKey);
  if (cachedData !== null) {
    return cachedData;
  }

  const freshData = await fetchFn();

  if (freshData !== null && freshData !== undefined) {
    setInCache(cacheKey, freshData, ttl).catch(() => {});
  }

  return freshData;
}

export { DEFAULT_TTL, CACHE_PREFIX };
