import { clientAxios } from '@/utils/axios_clients';

export async function postGclid(url = '', gclid) {
  try {
    const payload = {
      data: {
        gclid: gclid,
      },
    };

    const response = await clientAxios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting GCLID:', error);
    throw new Error('Failed to submit GCLID');
  }
}
