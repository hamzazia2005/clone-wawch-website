import { BASE_URL, postToken } from "@/utils/axios_instance";

export async function postGclid(url = "", gclid) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${postToken}`,
    },
    body: JSON.stringify({
      data: {
        gclid: gclid,
      },
    }),
  };

  const res = await fetch(`${BASE_URL}/${url}`, requestOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const repo = await res.json();
  return repo;
}
