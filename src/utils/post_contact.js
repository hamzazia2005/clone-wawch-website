export async function postContactForm(url = "", check, item, size) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  };

  try {
    console.log('Posting to /api/contact with data:', requestOptions.body);
    
    const res = await fetch('/api/contact', requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || "Failed to fetch data");
    }
    const repo = await res.json();
    
    console.log('Contact form response:', repo);
    
    if (check) {
      return repo;
    } else {
      return repo?.data?.attributes;
    }
  } catch (error) {
    console.error("Error posting contact form:", error);
    throw new Error("Failed to submit contact form");
  }
}
