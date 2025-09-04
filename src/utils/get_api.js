import { serverAxios } from '@/utils/axios_clients';

export async function getServerSideData(url = '', check = false) {
  try {
    // console.log(`🔍 API request: ${url}`);
    
    const response = await serverAxios.get(url);
    const repo = response.data;
    
    // console.log('📦 Response data structure:', {
    //   hasData: !!repo?.data,
    //   dataKeys: repo?.data ? Object.keys(repo.data) : [],
    //   isArray: Array.isArray(repo?.data)
    // });

    // For most requests, return plain `data`
    const data = check ? repo : repo?.data;
    // console.log('DATTATATATAT ======> ', data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}
