import React, { ChangeEvent, KeyboardEvent } from "react";
import { Palette } from "../../themes";

interface CustomInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;

  placeholder?: string;
}

const MyInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
  onKeyPress,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      className={`p-2  w-full rounded-md text-white bg-[${Palette.background}] focus:outline-none `}
    />
  );
};

export default MyInput;
