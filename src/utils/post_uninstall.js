import { BASE_URL, postToken } from "@/utils/axios_instance";

export async function postUninsallForm(url = "", check, item, difficulty) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${postToken}`,
    },
    body: JSON.stringify({
      data: {
        email: item.email,
        difficulty: difficulty,
        detail: item.details,
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
