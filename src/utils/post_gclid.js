import { clientAxios } from '@/utils/axios_clients';

export async function postGclid(url = '', gclid) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        gclid: gclid,
      },
    }),
  };

  try {
    console.log('Posting to /api/gclid with data:', requestOptions.body);
    
    const res = await fetch('/api/gclid', requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      console.error('GCLID API Error:', errorData);
      throw new Error(errorData.message || "Failed to submit GCLID");
    }
    const repo = await res.json();
    
    console.log('GCLID response:', repo);
    
    return repo.data;
  } catch (error) {
    console.error('Error posting GCLID:', error);
    throw new Error('Failed to submit GCLID');
  }
}
