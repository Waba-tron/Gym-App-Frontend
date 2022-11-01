import React from "react";

interface secondaryButtonProps {
  text: String;
  event: () => void;
}

const SecondaryButton = ({ text, event }: secondaryButtonProps) => {
  return (
    <button
      className="bg-orange-500 w-fit text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
      onClick={() => event()}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
