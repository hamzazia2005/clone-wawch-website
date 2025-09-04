
import { serverAxios } from '@/utils/axios_clients';

export async function getServerSideData(url = '', check = false) {
  try {
    console.log(`🔍 API request: ${url}`);
    
    const response = await serverAxios.get(url);
    const repo = response.data;
    
    console.log('📦 Response data structure:', {
      hasData: !!repo?.data,
      dataKeys: repo?.data ? Object.keys(repo.data) : [],
      isArray: Array.isArray(repo?.data)
    });

    // For most requests, return plain `data`
    const data = check ? repo : repo?.data;
    return data;
  } catch (error) {
    console.error(`❌ API Error (${url}):`, error.message);
    if (error.code === 'ECONNREFUSED') {
      console.warn('⚠️  Connection refused - check if Strapi server is running');
    }
    return null;
  }
}
