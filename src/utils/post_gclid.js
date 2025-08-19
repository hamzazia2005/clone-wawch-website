export async function postGclid(gclid) {
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
    const res = await fetch("/api/gclid", requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to submit GCLID");
    }
    const repo = await res.json();
    return repo.data;
  } catch (error) {
    throw new Error("Failed to submit GCLID");
  }
}
