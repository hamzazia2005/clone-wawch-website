import { serverAxios } from "@/utils/axios_clients";
import "server-only";

/**
 * Fetch data from Strapi API.
 * Cache is disabled for Edge (Cloudflare) compatibility; use skipCache on Node if needed.
 *
 * @param {string} url - The API endpoint URL
 * @param {boolean} check - If true, returns raw response, otherwise returns data property
 * @param {Object} options - Additional options (skipCache, ttl kept for API compatibility)
 * @returns {Promise<any>} - The fetched data
 */
export async function getServerSideData(url = "", check = false, options = {}) {
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

  return fetchFromStrapi();
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
