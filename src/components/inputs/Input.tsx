import React from "react";

interface InputProps {
  label: String;
  type: any;
  handleChange: any;
}

const Input = ({ label, type, handleChange }: InputProps) => {
  return (
    <>
      <label
        className="block uppercase text-xs font-bold mb-2 text-gray-900"
        htmlFor={String(label)}
      >
        {label}
      </label>
      <input
        type={type}
        name={String(label)}
        className="px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-full"
        placeholder={String(label)}
        onChange={(e) => handleChange(e.target.value)}
        style={{ transition: "all 0.15s ease 0s" }}
      />
    </>
  );
};

export default Input;
