import React from "react";

interface primaryButtonProps {
  text: String;
  event: () => void;
}

const PrimaryButton = ({ text, event }: primaryButtonProps) => {
  return (
    <button
      className="bg-gray-900 w-fit text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
      onClick={() => event()}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
