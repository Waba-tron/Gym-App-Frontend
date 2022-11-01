const getPricies = async (
  setLoading: (open: boolean) => void,
  toast: any,
  setPricies: any
) => {
  setLoading(true);
  const response = await fetch(`/api/stripe/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    toast(data.error, {
      type: "error",
    });
  }
  if (response.ok) {
    setPricies(data?.data);
    setLoading(false);
  }
};

export default getPricies;
