import React, { ReactNode, useRef, useState } from "react";
import Clock from "./Clock";
import {
  Coffee,
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
import { useAppState, useMusicContext } from "../../context";

import { MyDialog } from "../themed";
import AuthView from "../forms/AuthView";
import Drawer from "../themed/Drawer";
import Fullscreen from "../../features/Fullscreen";
import VolumeSlider from "../themed/Slider";

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
    toggleMusicCardVisibility,
    toggleMixerCardVisibility,
    togglePlaylistCardVisibility,
    toggleChatCardVisibility,
    togglePomodoroCardVisibility,
    toggleInviteUsersCardVisibility,
  } = useAppState();
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // background music
  const {
    volume,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,

    setVolume,
  } = useMusicContext();
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

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

          <NavBarItem tooltipText="Mixer" onClick={toggleMixerCardVisibility}>
            <Sliders size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem tooltipText="Links" onClick={toggleMusicCardVisibility}>
            <Link size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Pomodoro"
            onClick={togglePomodoroCardVisibility}
          >
            <Timer size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Invite friends"
            onClick={toggleInviteUsersCardVisibility}
          >
            <SmilePlus size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem
            tooltipText="Playlist"
            onClick={togglePlaylistCardVisibility}
          >
            <ListMusic size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem tooltipText="Chat" onClick={toggleChatCardVisibility}>
            <MessageCircle size={25} color={Palette.text} />
          </NavBarItem>
          <div className="h-8 border-l border-[#4D4337]   mx-2"></div>

          <NavBarItem
            tooltipText="Fullscreen"
            onClick={toggleMusicCardVisibility}
          >
            <Fullscreen />
          </NavBarItem>
        </div>

        <div className="flex gap-2">
          <NavBarItem tooltipText="Change room" onClick={() => openDrawer()}>
            <Coffee size={25} color={Palette.text} />
          </NavBarItem>
          <NavBarItem tooltipText="Account" onClick={() => openDialog()}>
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
      <MyDialog isOpen={isDialogOpen} onClose={closeDialog}>
        <AuthView joinRoom={joinRoom} />
      </MyDialog>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <h2 className="mb-4 text-xl font-bold">Switch rooms</h2>
        <ul>
          <li className="mb-2">Room 1</li>
          <li className="mb-2">Room 2</li>
          <li className="mb-2">Room 3</li>
        </ul>
      </Drawer>
    </>
  );
}

export default Navbar;
