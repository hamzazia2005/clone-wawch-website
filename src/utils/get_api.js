import { serverAxios } from "@/utils/axios_clients";
import { withCache } from "@/utils/cache";
import "server-only";

/**
 * Fetch data from Strapi API with Redis caching
 *
 * @param {string} url - The API endpoint URL
 * @param {boolean} check - If true, returns raw response, otherwise returns data property
 * @param {Object} options - Additional options
 * @param {boolean} options.skipCache - Skip cache and always fetch fresh data
 * @param {number} options.ttl - Custom TTL in seconds (default: from env CACHE_TTL_SECONDS or 3600)
 * @returns {Promise<any>} - The fetched data
 */
export async function getServerSideData(url = "", check = false, options = {}) {
  const { skipCache = false, ttl } = options;

  const fetchFromStrapi = async () => {
    try {
      const response = await serverAxios.get(url);
      const repo = response.data;
      const data = check ? repo : repo?.data;
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  };

  if (skipCache) {
    return fetchFromStrapi();
  }

  try {
    const cacheKey = check ? `${url}:check` : url;
    const data = await withCache(cacheKey, fetchFromStrapi, ttl);
    return data;
  } catch (error) {
    console.error(
      `Cache error for ${url}, falling back to direct fetch:`,
      error
    );
    return fetchFromStrapi();
  }
}

/**
 * Fetch data without caching - useful for dynamic content that should always be fresh
 *
 * @param {string} url - The API endpoint URL
 * @param {boolean} check - If true, returns raw response, otherwise returns data property
 * @returns {Promise<any>} - The fetched data
 */
export async function getServerSideDataNoCache(url = "", check = false) {
  return getServerSideData(url, check, { skipCache: true });
}
