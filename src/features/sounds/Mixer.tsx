import React from "react";
import { DraggableCard, MiniCard } from "../../components/shared";
import VolumeSlider from "../../components/themed/Slider";
import { useAppState, useAppuStatu, useMusicContext } from "../../context";
import { Coffee, Disc3, Moon, Volume1, Volume2 } from "lucide-react";
import { Palette } from "../../themes";

interface MiniCardItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}
const MiniCardItem = ({ icon, label, onClick }: MiniCardItemProps) => {
  return (
    <div className="flex flex-col gap-1 hover:cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#544F49]">
        {icon}
      </div>
      <span className="w-full font-normal text-center text-gray-400">
        {label}
      </span>
    </div>
  );
};

const SoundItem = ({
  label,
  volume,
  setvolume,
  cssClass,
}: {
  label: string;
  volume: number;
  setvolume: React.Dispatch<React.SetStateAction<number>>;
  cssClass?: string;
}) => {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-2">
      <span className="w-full font-medium text-gray-400">{label}</span>
      <VolumeSlider cssClass={cssClass} setValue={setvolume} value={volume} />
    </div>
  );
};

function Mixer() {
  const {
    rainvolume,

    setRainVolume,

    talkvolume,
    setTalkVolume,
    keyboardVolume,
    setKeyboardVolume,
    setTrafficVolume,
    trafficvolume,
  } = useAppState();
  const { mixerCard } = useAppuStatu();

  const { volume, setVolume, setSongType, songType } = useMusicContext();
  return (
    <DraggableCard
      x={window.innerWidth / 1.5}
      y={20}
      h={500}
      w={350}
      isVisible={mixerCard.isVisible}
      onToggleVisibility={mixerCard.toggleVisibility}
      zIndex={mixerCard.zindex}
      bringToFront={mixerCard.bringToFront}
      // title={mixerCard.zindex.toString()}
    >
      <div className="flex flex-col gap-4 p-2">
        <div className="flex gap-2 ">
          <MiniCard title="Music ">
            <div className="flex justify-between gap-3">
              <MiniCardItem
                icon={
                  <Moon
                    fill={`${
                      songType === "sleepy"
                        ? Palette.primary
                        : Palette.secondary
                    }`}
                    strokeWidth={1}
                    size={30}
                    color={`${
                      songType === "sleepy"
                        ? Palette.primary
                        : Palette.secondary
                    }`}
                  />
                }
                label="Sleepy"
                onClick={() => setSongType("sleepy")}
              />
              <MiniCardItem
                icon={
                  <Disc3
                    size={30}
                    color={`${
                      songType === "jazz" ? Palette.primary : Palette.secondary
                    }`}
                  />
                }
                label="Jazz"
                onClick={() => setSongType("jazz")}
              />
              <MiniCardItem
                icon={
                  <Coffee
                    size={30}
                    color={`${
                      songType === "chill" ? Palette.primary : Palette.secondary
                    }`}
                  />
                }
                label="Chill"
                onClick={() => setSongType("chill")}
              />
            </div>
          </MiniCard>

          <div className="flex flex-col justify-between w-full h-full gap-4 ">
            <div className="bg-[#312b25c2] hover:cursor-pointer flex flex-col p-4  w-full h-full  rounded-md border   border-[#F3A952]">
              <span className="font-medium text-white capitalize">
                {" "}
                Bobo.io
              </span>
            </div>
            <div className="bg-[#312b25c2] hover:cursor-pointer flex flex-col p-4  w-full h-full  rounded-md border   border-[#4d4337]">
              <span className="font-medium text-white capitalize">
                {" "}
                spotify
              </span>
            </div>
          </div>
        </div>

        <MiniCard title="Music volume">
          <div className="flex gap-3">
            <Volume1 color={Palette.primary} size={40} />
            <VolumeSlider setValue={setVolume} value={volume} />
            <Volume2 color={Palette.primary} size={40} />
          </div>
        </MiniCard>
        <MiniCard title="sounds">
          <SoundItem
            cssClass="city-rain"
            volume={rainvolume}
            setvolume={setRainVolume}
            label="City Rain"
          />
          <SoundItem
            cssClass="city-traffic"
            volume={trafficvolume}
            setvolume={setTrafficVolume}
            label="City Traffic"
          />
          <SoundItem
            cssClass="people-talking"
            volume={talkvolume}
            setvolume={setTalkVolume}
            label="People Talking"
          />
          <SoundItem
            cssClass="keyboard"
            volume={keyboardVolume}
            setvolume={setKeyboardVolume}
            label="Keyboard"
          />
        </MiniCard>
      </div>
    </DraggableCard>
  );
}

export default Mixer;
