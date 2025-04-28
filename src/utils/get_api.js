import { BASE_URL, getToken } from "@/utils/axios_instance";

export async function getServerSideData(url = "", check = false) {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo = await res.json();
    const data = check ? repo : repo?.data?.attributes;

    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}
