import React, { useContext, useState } from "react";
import DropDown from "../DropDown/DropDown";

import TextArea from "../TextArea/TextArea";
import {
  Memberships,
  Trainers,
  Duration,
  Benefits,
  Types,
} from "../../consts/AdminConsts";

import PrimaryButton from "../Buttons/PrimaryButton";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import CheckBox from "../CheckBox/CheckBox";
import Input from "../inputs/Input";
const AdminAddClass = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(Trainers[0]);
  const [selectedDuration, setSelectedDuration] = useState(Duration[0]);
  const [type, setType] = useState(Types[0]);
  const [checkedState, setCheckedState] = useState(
    new Array(Benefits.length).fill(false)
  );
  const [startTime, setstartTime] = useState("");
  const [membershiptype, setMemberShipType] = useState(Memberships[0]);

  const { values } = useContext(AuthContext);
  const token = values?.user?.token;

  const submitClass = async () => {
    const benefitsArray = checkedState
      .map((box, index) => (box === false ? false : Benefits[index]))
      .filter((box) => box !== false);

    const response = await fetch("/api/classes/add-class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        trainer: selectedTrainer,
        duration: selectedDuration,
        type,
        startTime,
        benefits: benefitsArray,
        membershiptype,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(response);
      toast(data.error, {
        type: "error",
      });
    }
    if (response.ok) {
      toast("Class submitted", { type: "success" });
    }

    console.log(benefitsArray);
  };

  return (
    <div className="bg-white p-8 shadow-lg">
      <ToastContainer />
      <h1 className="text-2xl font-semibold w-full">Add class</h1>
      <div className="relative w-full mb-3 mt-8 text-left">
        <Input label={"Name"} type={"text"} handleChange={setName} />
      </div>
      <div className="relative w-full mb-3 text-left">
        <TextArea label={"Description"} handleChange={setDescription} />
      </div>
      <div className="relative w-full mb-3 text-left">
        <DropDown
          label={"Trainer"}
          values={Trainers}
          handleChange={setSelectedTrainer}
        />
      </div>
      <div className="relative w-full mb-3 text-left">
        <DropDown
          label={"Duration"}
          values={Duration}
          handleChange={setSelectedDuration}
        />
      </div>
      <div className="relative w-full mb-3 text-left">
        <DropDown label={"Type"} values={Types} handleChange={setType} />
      </div>
      <div className="relative w-full mb-3 mt-8 text-left">
        <Input
          label={"Start Time"}
          type={"datetime-local"}
          handleChange={setstartTime}
        />
      </div>
      <div className="relative w-full mb-3 mt-8 text-left">
        <CheckBox
          label={"Benefits"}
          values={Benefits}
          setCheckedState={setCheckedState}
          checkedState={checkedState}
        />
      </div>
      <div className="relative w-full mb-3 text-left">
        <DropDown
          label={"Membership Type"}
          values={Memberships}
          handleChange={setMemberShipType}
        />
      </div>

      <div className="relative w-full mb-3 text-left">
        <PrimaryButton text={"Submit Class"} event={() => submitClass()} />
      </div>
    </div>
  );
};

export default AdminAddClass;
