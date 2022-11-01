import { toast } from "react-toastify";

const BookClass = async (classId: String, token: String) => {
  const response = await fetch(`/api/booking/add-booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      classId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    toast(data.error, {
      type: "error",
    });
  }
  if (response.ok) {
    toast("Your class has been booked", {
      type: "success",
    });
  }
};

export default BookClass;
