import { clientAxios } from '@/utils/axios_clients';

export async function postAffiliateForm(url = "", check, item, promote) {
  try {
    const payload = {
      data: {
        first_name: item?.fName,
        last_name: item?.lName,
        email: item?.email,
        whatsapp_number: item?.whatsapp,
        company_name: item?.company ? item?.company : "",
        url: item?.url ? item?.url : "",
        promote: promote,
        message: item?.note ? item?.note : "",
      },
    };

    const response = await clientAxios.post(url, payload);
    const repo = response.data;
    
    return check ? repo : repo?.data?.attributes;
  } catch (error) {
    console.error("Error posting affiliate form:", error);
    throw new Error("Failed to submit affiliate form");
  }
}
