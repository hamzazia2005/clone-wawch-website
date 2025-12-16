import Redis from "ioredis";
import "server-only";

let redisClient = null;

/**
 * Get Redis client instance (singleton pattern)
 * @returns {Redis|null} Redis client or null if Redis is not configured
 */
export function getRedisClient() {
  if (!process.env.REDIS_URL && process.env.NODE_ENV === "development") {
    console.warn("[Redis] REDIS_URL not configured, caching disabled");
    return null;
  }

  if (redisClient) {
    return redisClient;
  }

  try {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryDelayOnFailover: 100,
      enableReadyCheck: true,
      lazyConnect: true,
      connectTimeout: 10000,
      keepAlive: 30000,
      reconnectOnError: (err) => {
        const targetErrors = ["READONLY", "ECONNRESET", "ETIMEDOUT"];
        if (targetErrors.some((e) => err.message.includes(e))) {
          return true;
        }
        return false;
      },
    });

    redisClient.on("connect", () => {
      console.log("[Redis] Connected successfully");
    });

    redisClient.on("error", (err) => {
      console.error("[Redis] Connection error:", err.message);
    });

    redisClient.on("close", () => {
      console.log("[Redis] Connection closed");
    });

    redisClient.connect().catch((err) => {
      console.error("[Redis] Failed to connect:", err.message);
      redisClient = null;
    });

    return redisClient;
  } catch (error) {
    console.error("[Redis] Failed to create client:", error.message);
    return null;
  }
}

/**
 * Check if Redis is connected and available
 * @returns {Promise<boolean>}
 */
export async function isRedisAvailable() {
  const client = getRedisClient();
  if (!client) return false;

  try {
    await client.ping();
    return true;
  } catch {
    return false;
  }
}

/**
 * Gracefully close Redis connection
 */
export async function closeRedisConnection() {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    console.log("[Redis] Connection closed gracefully");
  }
}

export default getRedisClient;
