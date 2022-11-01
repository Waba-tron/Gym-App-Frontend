import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ClassCard from "./ClassCard";
import Calendar from "../Calendar/Calendar";
import { DateContext } from "../../context/DateContext";
import { LoadingContext } from "../../context/LoadingContext";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
interface bookingclass {
  _id: String;
  event: (argo: String) => void;
  btnText: String;
}
const AllClasses = () => {
  const { values } = useContext(AuthContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [classes, setClasses] = useState<bookingclass[]>([]);
  const { date } = useContext(DateContext);
  const token = values?.user?.token;
  const navigate = useNavigate();

  const bookClass = async (classId: String) => {
    console.log("booked for class " + classId);

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

  const ViewClass = (classId: String) => {
    navigate(`/classes/${classId}`);
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      const getAllClasses = async () => {
        const response = await fetch("/api/classes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date,
            //        date: "Fri May 06 2022 23:30:00 (British Summer Time)",
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setClasses(data);
          setLoading(false);
        }
        if (!response.ok) {
          setLoading(false);
        }
      };
      getAllClasses();
    }
  }, [token, date, setLoading]);

  return (
    <div>
      <Calendar />
      {loading ? (
        <div className="flex relative mx-auto w-fit">
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
          {classes.map((classData) => (
            <ClassCard
              key={String(classData._id)}
              classData={classData}
              event={() => ViewClass(classData._id)}
              btnText={"View Class"}
            />
          ))}
        </div>
      )}

      {classes.length <= 0 && !loading ? (
        <h1 className="  font-extrabold text-2xl mr-10">
          No classes on this date
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};

export default AllClasses;
