import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  isMusicCardVisible: boolean;
  isMixerCardVisible: boolean;
  isPlaylistCardVisible: boolean;
  isChatCardVisible: boolean;
  isPomodoroCardVisible: boolean;
  isInviteUsersCardVisible: boolean;
  toggleMusicCardVisibility: () => void;
  toggleChatCardVisibility: () => void;
  toggleMixerCardVisibility: () => void;
  togglePlaylistCardVisibility: () => void;
  togglePomodoroCardVisibility: () => void;
  toggleInviteUsersCardVisibility: () => void;
  //city rain sound
  rainIsPlaying: boolean;
  setIsRainPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  rainvolume: number;
  setRainVolume: React.Dispatch<React.SetStateAction<number>>;

  //city traffic sound
  trafficIsPlaying: boolean;
  setIstrafficPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  trafficvolume: number;
  setTrafficVolume: React.Dispatch<React.SetStateAction<number>>;

  //people talking sound
  talkIsPlaying: boolean;
  setIstalkPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  talkvolume: number;
  setTalkVolume: React.Dispatch<React.SetStateAction<number>>;

  //keybord sound
  keyboardIsPlaying: boolean;
  setIsKeyboardPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  keyboardVolume: number;
  setKeyboardVolume: React.Dispatch<React.SetStateAction<number>>;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [isMusicCardVisible, setIsMusicCardVisible] = useState(false);
  const [isMixerCardVisible, setIsMixerCardVisible] = useState(false);
  const [isPlaylistCardVisible, setIsPlaylistCardVisible] = useState(false);
  const [isChatCardVisible, setIsChatCardVisible] = useState(false);
  const [isPomodoroCardVisible, setIsPomodoroCardVisible] = useState(false);
  const [isInviteUsersCardVisible, setIsInviteUsersCardVisible] =
    useState(false);
  //rain sounds
  const [rainIsPlaying, setIsRainPlaying] = useState(false);
  const [rainvolume, setRainVolume] = useState(0.5);

  //traffic
  const [trafficIsPlaying, setIstrafficPlaying] = useState(false);
  const [trafficvolume, setTrafficVolume] = useState(0.5);

  //keyboard
  const [keyboardIsPlaying, setIsKeyboardPlaying] = useState(false);
  const [keyboardVolume, setKeyboardVolume] = useState(0.5);

  //talking people
  const [talkIsPlaying, setIstalkPlaying] = useState(false);
  const [talkvolume, setTalkVolume] = useState(0.5);

  const toggleMusicCardVisibility = () => {
    setIsMusicCardVisible((prev) => !prev);
  };
  const toggleMixerCardVisibility = () => {
    setIsMixerCardVisible((prev) => !prev);
  };
  const togglePlaylistCardVisibility = () => {
    setIsPlaylistCardVisible((prev) => !prev);
  };
  const toggleChatCardVisibility = () => {
    setIsChatCardVisible((prev) => !prev);
  };
  const togglePomodoroCardVisibility = () => {
    setIsPomodoroCardVisible((prev) => !prev);
  };
  const toggleInviteUsersCardVisibility = () => {
    setIsInviteUsersCardVisible((prev) => !prev);
  };

  const contextValue: AppState = {
    isMusicCardVisible,
    isPomodoroCardVisible,
    isMixerCardVisible,
    isPlaylistCardVisible,
    isChatCardVisible,
    isInviteUsersCardVisible,
    toggleMusicCardVisibility,
    toggleInviteUsersCardVisibility,
    toggleMixerCardVisibility,
    togglePlaylistCardVisibility,
    toggleChatCardVisibility,
    togglePomodoroCardVisibility,
    rainIsPlaying,
    rainvolume,
    setIsRainPlaying,
    setRainVolume,
    trafficIsPlaying,
    setIstrafficPlaying,
    trafficvolume,
    setTrafficVolume,
    keyboardIsPlaying,
    setIsKeyboardPlaying,
    keyboardVolume,
    setKeyboardVolume,
    talkIsPlaying,
    setIstalkPlaying,
    talkvolume,
    setTalkVolume,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
