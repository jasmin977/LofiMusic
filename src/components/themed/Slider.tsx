import React, { ChangeEvent } from "react";
import "../../App.css";
import { Palette } from "../../themes";
interface CustomSliderProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  cssClass?: string;
}
const VolumeSlider = ({ value, setValue, cssClass }: CustomSliderProps) => {
  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };
  return (
    <div
      className={`flex w-full ${
        cssClass ? cssClass + "  customslider" : null
      } `}
    >
      <input
        style={{ accentColor: Palette.primary, width: "100%" }}
        type="range"
        //className=" myslider"
        name="volumeSlider"
        min="0"
        max="100"
        value={value}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeSlider;
