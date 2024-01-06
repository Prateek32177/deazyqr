export const apiRequest = async (data) => {
    // const res = await fetch("http://localhost:3000/api/generateqr/shorten",
    const res = await fetch(`https://deazyqr-git-test-env-prateek32177.vercel.app/api/${data.id}/update`,
    
    {
      // Adding method type
      method: "PATCH",
  
      // Adding body or contents to send
      body: JSON.stringify(data),
  
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  
    const jsonRes = res.json();
    return jsonRes;
  };
  