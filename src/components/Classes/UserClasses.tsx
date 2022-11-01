import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ClassCard from "./ClassCard";
import { LoadingContext } from "../../context/LoadingContext";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface bookings {
  _id: String;
  class: any;
  event: (argo: String) => void;
  btnText: String;
}

const UserClasses = () => {
  const { values } = useContext(AuthContext);
  const [booking, setBookings] = useState<bookings[]>([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const token = values?.user?.token;
  const navigate = useNavigate();

  const cancelClass = async (classId: String, bookingId: String) => {
    const response = await fetch(`/api/booking/${bookingId}`, {
      method: "DELETE",
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
      toast("Your class has been canceled", {
        type: "success",
      });

      const bookedClasses = booking.filter((b) => b._id !== bookingId);
      setBookings(bookedClasses);
    }
  };

  useEffect(() => {
    if (token) {
      const getAllClasses = async () => {
        setLoading(true);
        const response = await fetch("/api/booking/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setBookings(data);
          setLoading(false);
        }

        if (data.error === "You do not have a subscription") {
          navigate("/pricing");
        }
        if (!response.ok) {
          console.log(data);

          setLoading(false);
        }
      };

      getAllClasses();
    }
  }, [token, navigate, setLoading]);
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="relative mx-auto">
            <Audio
              height="100"
              width="100"
              color=""
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {booking.map((bookingData) => {
              return (
                <ClassCard
                  key={bookingData.class._id}
                  classData={bookingData?.class}
                  event={() =>
                    cancelClass(bookingData.class._id, bookingData._id)
                  }
                  btnText={"Cancel"}
                />
              );
            })}
          </div>
        )}
      </div>

      {booking.length <= 0 && !loading ? (
        <div className="content-cenr">
          <h1 className="font-extrabold text-2xl mt-8">No classes booked</h1>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserClasses;
