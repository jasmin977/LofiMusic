import React from "react";

interface CustomButtonProps {
  onClick: () => void;
  label: string;
}

function MyButton({ onClick, label }: CustomButtonProps) {
  return (
    <button
      className="px-6 m-2 py-2 font-medium text-black bg-[#F3A952] rounded-full hover:bg-[#c28744]"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default MyButton;
