import { BASE_URL, postToken } from "@/utils/axios_instance";

export async function postAffiliateForm(url = "", check, item, promote) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${postToken}`,
    },
    body: JSON.stringify({
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
    }),
  };

  const res = await fetch(`${BASE_URL}/${url}`, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const repo = await res.json();
  if (check) {
    return repo;
  } else {
    return repo?.data?.attributes;
  }
}
