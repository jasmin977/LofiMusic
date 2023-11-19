import { Circle, Disc3 } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { Palette } from "../../themes";
import { city_rain } from "../../assets";
import AudioPlayer from "./AudioPlayer";
import { useAppState } from "../../context";

const CityRain = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { rainvolume, rainIsPlaying, setRainVolume, setIsRainPlaying } =
    useAppState();

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRainVolume(Number(event.target.value));
  };
  return (
    <div
      className="flex-row items-center gap-2 w-fit group hover:cursor-pointer "
      style={{ transform: "translate(500px, 200px) " }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Disc3
          size={40}
          color={Palette.primary}
          onClick={() => {
            setIsRainPlaying(!rainIsPlaying);
          }}
        />
      ) : (
        <Circle
          size={40}
          color={Palette.text}
          onClick={() => {
            setIsRainPlaying(!rainIsPlaying);
          }}
        />
      )}

      <div className=" w-fit m-2 gap-2 flex items-center flex-col  p-2 transition-transform transform scale-0 bg-[#2f2924b6] rounded-md group-hover:scale-105 hover:cursor-pointers">
        <p className="font-semibold text-white">City Rain</p>
        <input
          style={{ accentColor: Palette.primary }}
          id="myinput"
          type="range"
          name="volumeSlider"
          min="0"
          max="100"
          value={rainvolume}
          onChange={handleVolumeChange}
        />
      </div>

      {/* <AudioPlayer
        audioUrl={city_rain}
        volume={rainvolume / 100}
        isPlaying={rainIsPlaying}
      /> */}
    </div>
  );
};

export default CityRain;
