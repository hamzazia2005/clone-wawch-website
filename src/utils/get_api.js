import { serverAxios } from '@/utils/axios_clients';

export async function getServerSideData(url = '', check = false) {
  try {
    const response = await serverAxios.get(url);
    const repo = response.data;
    const data = check ? repo : repo?.data;
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}
