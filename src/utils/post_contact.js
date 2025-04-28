import { BASE_URL, postToken } from "@/utils/axios_instance";

export async function postContactForm(url = "", check, item, size) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${postToken}`,
    },
    body: JSON.stringify({
      data: {
        first_name: item.fName,
        last_name: item.lName,
        company_name: item.company,
        job_title: item.job,
        company_size: size,
        no_of_salespeople: item.salespeople,
        phone: item?.phone ? item?.phone : "",
        email: item.email,
        message: item.message,
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
