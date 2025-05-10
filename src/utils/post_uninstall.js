import { clientAxios } from '@/utils/axios_clients';

export async function postUninsallForm(url = "", check, item, difficulty) {
  try {
    const payload = {
      data: {
        email: item.email,
        difficulty: difficulty,
        detail: item.details,
      },
    };

    const response = await clientAxios.post(url, payload);
    const repo = response.data;
    
    return check ? repo : repo?.data?.attributes;
  } catch (error) {
    console.error("Error posting uninstall form:", error);
    throw new Error("Failed to submit uninstall form");
  }
}
