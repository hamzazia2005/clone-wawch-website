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
    const res = await fetch('/api/contact', requestOptions);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }
    const repo = await res.json();    
    if (check) {
      return repo;
    } else {
      return repo?.data?.attributes;
    }
  } catch (error) {
    throw new Error("Failed to submit contact form");
  }
}
