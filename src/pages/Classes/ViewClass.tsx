import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { LoadingContext } from "../../context/LoadingContext";
import { Audio } from "react-loader-spinner";
import BookClass from "../../hooks/bookingClassHooks/BookClass";
const ViewClass = () => {
  let classId = useParams();
  const [hasBooked, setHasBooked] = useState<Boolean>(false);
  const [classData, setclassData] = useState<any>();
  const { loading, setLoading } = useContext(LoadingContext);

  const { values } = useContext(AuthContext);
  const token = values?.user?.token;

  useEffect(() => {
    const getClassData = async () => {
      setLoading(true);
      const response = await fetch(`/api/classes/${classId.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setclassData(data);
        setLoading(false);
      }
    };

    getClassData();

    const checkBooking = async () => {
      const response = await fetch(`/api/booking/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.find((b: any) => b.class._id === classId.id)) {
          setHasBooked(true);

          console.log("has booked");
        } else {
          console.log("has not booked");
          setHasBooked(false);
        }
      }
    };

    checkBooking();
  }, [token, classId.id, setLoading]);
  return (
    <>
      <div
        className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto"
        style={{ minHeight: "100vh" }}
      >
        <ToastContainer />
        <div className="absolute top-0 w-full h-full bg-top bg-cover bg-orange-500"></div>

        {loading === true ? (
          <div className="relative mx-auto">
            <Audio
              height="100"
              width="100"
              color="white"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : (
          <div className="container relative mx-auto px-20" data-aos="fade-in">
            <div className="bg-white text-center">
              <img
                className=" h-60 w-full object-fill"
                alt=""
                src={`/images/${classData?.type}.jpg`}
              />

              <div className="text-left p-5 grid grid-cols-4">
                <div className="col-span-3">
                  <h1>{classData?.name}</h1>
                  <div className="my-3">
                    <h1 className="text-2xl">Description</h1>
                    <p>{classData?.description}</p>
                  </div>

                  <div>
                    <div className="my-5">
                      <h1 className="text-2xl">Start Time: </h1>
                      <p>
                        {classData?.startTime.substring(0, 10)}{" "}
                        {classData?.startTime.substring(11, 16)}
                      </p>
                    </div>{" "}
                    <div className="my-5">
                      <h1 className="text-2xl">Number of spaces: </h1>
                      <p>{classData?.numberofspaces}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col my-auto">
                  <div className="text-center items-center">
                    <h1 className="text-2xl">Benefits</h1>
                    {classData?.benefits.map((benefit: String) => (
                      <div className="grid grid-cols-2 items-center">
                        <h1 className="text-right">{benefit}</h1>
                        <span className="material-icons text-3xl text-orange-500 text-left ml-5">
                          {benefit === "Muscle Build"
                            ? "fitness_center"
                            : benefit === "Muscle Tone"
                            ? "accessibility_new"
                            : benefit === "Fat Burn"
                            ? "local_fire_department"
                            : "directions_run"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mx-auto mt-5">
                    {hasBooked ? (
                      <PrimaryButton
                        text={"Already booked"}
                        event={() => console.log("already booked")}
                      />
                    ) : (
                      <PrimaryButton
                        text={"Book now"}
                        event={() => BookClass(classData._id, token)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewClass;
