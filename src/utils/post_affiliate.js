export async function postAffiliateForm(url = '', check, item, promote) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        first_name: item?.fName,
        last_name: item?.lName,
        email: item?.email,
        whatsapp_number: item?.whatsapp,
        company_name: item?.company ? item?.company : '',
        url: item?.url ? item?.url : '',
        promote: promote,
        message: item?.note ? item?.note : '',
      },
    }),
  };

  try {    
    const res = await fetch('/api/affiliate', requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to submit affiliate form");
    }
    const repo = await res.json();
        
    return check ? repo : repo?.data?.attributes;
  } catch (error) {
    console.error('Error posting affiliate form:', error);
    throw new Error('Failed to submit affiliate form');
  }
}
