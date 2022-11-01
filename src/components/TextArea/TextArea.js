import React from "react";

const TextArea = ({ label, handleChange }) => {
  return (
    <>
      <label
        className="block uppercase text-xs font-bold mb-2 text-gray-900"
        htmlFor={label}
      >
        {label}
      </label>
      <textarea
        className="px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-full"
        placeholder={label}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};

export default TextArea;
