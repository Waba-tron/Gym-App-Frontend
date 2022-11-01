import { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import AllClasses from "../../components/Classes/AllClasses";
import UserClasses from "../../components/Classes/UserClasses";
import { ToastContainer } from "react-toastify";

const Classes = () => {
  const [classToggle, setClassToggle] = useState<number>(1);

  return (
    <div
      className="relative pt-16 pb-16 flex content-center items-center justify-center font-roboto"
      style={{ minHeight: "100vh" }}
    >
      <ToastContainer />
      <div className="absolute top-0 w-full h-full bg-top bg-cover bg-orange-500"></div>

      <div className="container relative mx-auto px-20" data-aos="fade-in">
        <div className="bg-white p-5 flex flex-row text-center">
          <div className="basis-1/6 text-2xl flex flex-col my-auto items-center">
            <PrimaryButton
              text={"All Classes"}
              event={() => setClassToggle(0)}
            />

            <SecondaryButton
              text={"My Classes"}
              event={() => setClassToggle(1)}
            />
          </div>
          <div className="basis-5/6 border-l-2 border-solid border-orange-500">
            {classToggle === 1 && <UserClasses />}
            {classToggle === 0 && <AllClasses />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
