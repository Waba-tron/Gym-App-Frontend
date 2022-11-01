import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
interface cardData {
  classData: any;
  event: (argo: String) => void;
  btnText: String;
}
const ClassCard = ({ classData, event, btnText }: cardData) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-5 shadow-md h-72 bg-orange-500 text-white text-center">
        <div className="w-full">
          <h1 className="font-extrabold text-3xl uppercase">
            {classData.name}
          </h1>
        </div>

        <div className="mt-2">
          <div>
            <span className="material-icons text-4xl">
              local_fire_department
            </span>
            <span className="material-icons text-4xl">fitness_center</span>
            <span className="material-icons text-4xl">accessibility_new</span>
            <span className="material-icons text-4xl">directions_run</span>
          </div>

          <div className="mb-3">
            <h1 className="font-extrabold text-sm">
              Number of places: {classData.numberofspaces}
            </h1>
            <h1 className="font-extrabold text-sm">
              Date: {classData?.startTime.substring(0, 10)}
            </h1>
          </div>

          <PrimaryButton event={() => event(classData.id)} text={btnText} />

          {btnText === "Cancel" && (
            <p
              className="cursor-pointer"
              onClick={() => navigate(`/classes/${classData._id}`)}
            >
              View Class
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassCard;
