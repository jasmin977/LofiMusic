import React, { ReactNode, useRef, useState } from "react";
import Clock from "./Clock";
import {
  Coffee,
  Copy,
  Link,
  ListMusic,
  MessageCircle,
  PauseCircle,
  PlayCircle,
  Settings,
  SkipBack,
  SkipForward,
  Sliders,
  SmilePlus,
  Timer,
  UserCircle2,
  Volume1,
  VolumeX,
} from "lucide-react";
import { Palette } from "../../themes";
import { useAppuStatu, useAuth, useMusicContext } from "../../context";

import { MyButton, MyDialog } from "../themed";
import AuthView from "../forms/AuthView";
import Drawer from "../themed/Drawer";
import Fullscreen from "../../features/Fullscreen";
import VolumeSlider from "../themed/Slider";
import RoomList from "./RoomsList";

interface NavbarItemProps {
  onClick: () => void;
  tooltipText: string;

  children: ReactNode;
}
const NavBarItem = ({ children, onClick, tooltipText }: NavbarItemProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };
  return (
    <div
      className="cursor-pointer   hover:bg-[#c4ad9448] p-1 rounded-md transition-transform transform hover:scale-110"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && (
        <div className=" flex text-center whitespace-nowrap  absolute bottom-1 px-2 py-1 mb-8 text-white w-fit bg-[#363533cb] rounded-sm left-1/2 transform -translate-x-1/2">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

interface NavbarProps {
  joinRoom: (user: any, room: any) => Promise<void>;
}
function Navbar({ joinRoom }: NavbarProps) {
  const {
    musicCard,
    mixerCard,
    playlistCard,
    chatCard,
    pomodoroCard,
    inviteUsersCard,
  } = useAppuStatu();

  const [isRoomDrawerOpen, setRoomDrawerOpen] = useState(false);
  const [isAccountDrawerOpen, setAccountDrawerOpen] = useState(false);

  const openRoomDrawer = () => {
    setRoomDrawerOpen(true);
    setAccountDrawerOpen(false);
  };

  const openAccountDrawer = () => {
    setAccountDrawerOpen(true);
    setRoomDrawerOpen(false);
  };

  const closeDrawer = () => {
    setRoomDrawerOpen(false);
    setAccountDrawerOpen(false);
  };
  const [isHovered, setIsHovered] = useState(false);
  const { roomId } = useAuth();

  // background music
  const {
    volume,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,

    setVolume,
  } = useMusicContext();

  return (
    <>
      <div className="bg-[#372C20] rounded-md border border-[#4D4337] w-[97%] flex-row bottom-10 p-2 py-3 absolute items-center   flex  justify-between">
        <Clock />

        <div className="flex gap-2">
          <NavBarItem tooltipText="Prev" onClick={() => playPrev()}>
            <SkipBack size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Play"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying ? (
              <PlayCircle size={25} color={Palette.text} />
            ) : (
              <PauseCircle size={25} color={Palette.text} />
            )}
          </NavBarItem>
          <NavBarItem tooltipText="Next" onClick={() => playNext()}>
            <SkipForward size={25} color={Palette.text} />
          </NavBarItem>

          <div
            className="flex flex-row items-center transition-all ease-in-out duration-350"
            onMouseLeave={() => setIsHovered(false)}
          >
            <NavBarItem tooltipText="Volume" onClick={() => setIsHovered(true)}>
              <Volume1 size={25} color={Palette.text} />
            </NavBarItem>

            {isHovered ? (
              <div className="relative ">
                <VolumeSlider setValue={setVolume} value={volume} />
              </div>
            ) : null}
          </div>

          <NavBarItem tooltipText="Mute all" onClick={() => setVolume(0)}>
            <VolumeX size={25} color={Palette.text} />
          </NavBarItem>

          <div className="h-8 border-l border-[#4D4337]   mx-2"></div>

          <NavBarItem tooltipText="Mixer" onClick={mixerCard.toggleVisibility}>
            <Sliders size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem tooltipText="Links" onClick={musicCard.toggleVisibility}>
            <Link size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Pomodoro"
            onClick={pomodoroCard.toggleVisibility}
          >
            <Timer size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Invite friends"
            onClick={inviteUsersCard.toggleVisibility}
          >
            <SmilePlus size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Playlist"
            onClick={playlistCard.toggleVisibility}
          >
            <ListMusic size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem tooltipText="Chat" onClick={chatCard.toggleVisibility}>
            <MessageCircle size={25} color={Palette.text} />
          </NavBarItem>
          <div className="h-8 border-l border-[#4D4337]   mx-2"></div>

          <NavBarItem tooltipText="Fullscreen" onClick={() => {}}>
            <Fullscreen />
          </NavBarItem>
          <NavBarItem
            tooltipText="Copy room link"
            onClick={() => {
              navigator.clipboard.writeText(roomId as string);
            }}
          >
            <Copy size={25} color={Palette.text} />
          </NavBarItem>
        </div>

        <div className="flex gap-2">
          <NavBarItem tooltipText="Change room" onClick={openRoomDrawer}>
            <Coffee size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem tooltipText="Account" onClick={openAccountDrawer}>
            <UserCircle2 size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Settings"
            onClick={() => console.log("settings")}
          >
            <Settings size={25} color={Palette.text} />
          </NavBarItem>
        </div>
      </div>

      <Drawer isOpen={isRoomDrawerOpen} onClose={closeDrawer}>
        <RoomList
          h="500px"
          joinRoom={joinRoom}
          title={<span className="text-2xl font-semibold">Switch rooms</span>}
          rooms={[
            "room1",
            "room2",
            "room3",
            "room4",
            "room5",
            "room6",
            "room2",
            "room3",
            "room4",
            "room5",
          ]}
        />
      </Drawer>

      <Drawer isOpen={isAccountDrawerOpen} onClose={closeDrawer}>
        <h2 className="mb-4 text-xl font-bold text-center">Account</h2>
        <div className="flex justify-center ">
          <MyButton label="Log out" onClick={() => {}} />
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
