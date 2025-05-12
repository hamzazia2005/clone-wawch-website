import { clientAxios } from '@/utils/axios_clients';

export async function postContactForm(url = '', check, item, size) {
  try {
    const payload = {
      data: {
        first_name: item.fName,
        last_name: item.lName,
        company_name: item.company,
        job_title: item.job,
        company_size: size,
        no_of_salespeople: item.salespeople,
        phone: item?.phone ? item?.phone : '',
        email: item.email,
        message: item.message,
      },
    };

    const response = await clientAxios.post(url, payload);
    const repo = response.data;
    
    return check ? repo : repo?.data?.attributes;
  } catch (error) {
    console.error('Error posting contact form:', error);
    throw new Error('Failed to submit contact form');
  }
}
