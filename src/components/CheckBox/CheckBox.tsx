import React from "react";

interface CheckBoxProps {
  label: String;
  values: any;
  setCheckedState: any;
  checkedState: any;
}

const CheckBox = ({
  label,
  values,
  setCheckedState,
  checkedState,
}: CheckBoxProps) => {
  const handleOnChange = (position: string | number) => {
    const updatedCheckedState = checkedState.map((item: any, index: any) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  return (
    <>
      <label
        className="block uppercase text-xs font-bold mb-4 text-gray-900"
        htmlFor={String(label)}
      >
        {label}

        <br />

        <div className="flex justify-between flex-row mt-4">
          {values?.map((v: string, index: string | number) => (
            <>
              <label className="font-thin">{v}</label>
              <input
                type="checkbox"
                name="membership"
                value={String(v)}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              ></input>
            </>
          ))}
        </div>
      </label>
    </>
  );
};

export default CheckBox;
