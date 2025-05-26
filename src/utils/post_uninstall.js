export async function postUninsallForm(url = '', check, item, difficulty) {
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
    console.log('Posting to /api/uninstall with data:', requestOptions.body);
    
    const res = await fetch('/api/uninstall', requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Uninstall API Error:', errorData);
      throw new Error(errorData.message || "Failed to submit uninstall form");
    }
    const repo = await res.json();
    
    console.log('Uninstall form response:', repo);
    
    return check ? repo : repo?.data?.attributes;
  } catch (error) {
    console.error('Error posting uninstall form:', error);
    throw new Error('Failed to submit uninstall form');
  }
}
