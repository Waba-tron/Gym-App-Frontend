import React from "react";

interface DropDownProps {
  label: String;
  values: any;
  handleChange: any;
}

const DropDown = ({ label, values, handleChange }: DropDownProps) => {
  return (
    <>
      <label
        className="block uppercase text-xs font-bold mb-2 text-gray-900"
        htmlFor={String(label)}
      >
        {label}
      </label>

      <select
        className="px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-full"
        onChange={(e) => handleChange(e.target.value)}
      >
        {values?.map(
          (
            v:
              | string
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
          ) => (
            <option value={String(v)}>{v}</option>
          )
        )}
      </select>
    </>
  );
};

export default DropDown;
