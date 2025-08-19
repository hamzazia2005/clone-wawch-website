export async function postUninsallForm(check, item, difficulty) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        email: item.email,
        difficulty: difficulty,
        detail: item.details,
      },
    }),
  };

  try {
    const res = await fetch("/api/uninstall", requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to submit uninstall form");
    }
    const repo = await res.json();
    return check ? repo : repo?.data?.attributes;
  } catch (error) {
    throw new Error("Failed to submit uninstall form");
  }
}
