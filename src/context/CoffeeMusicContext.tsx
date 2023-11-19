import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  JAZZ_1,
  JAZZ_2,
  JAZZ_3,
  JAZZ_4,
  JAZZ_5,
  chill_1,
  chill_2,
  chill_3,
  chill_4,
  chill_5,
  sleepy_1,
  sleepy_2,
  sleepy_3,
  sleepy_4,
  sleepy_5,
} from "../assets";

interface Song {
  title: string;
  url: string;
  type: string;
}
type SongType = "chill" | "jazz" | "sleepy";

interface MusicContextProps {
  playlist: Song[];
  currentSong: Song | null;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  songType: SongType;
  setSongType: React.Dispatch<React.SetStateAction<SongType>>;
  playNext: () => void;
  playPrev: () => void;
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}
const MusicProvider: React.FC<ProviderProps> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Song[]>([
    {
      title: "Chill Song 1",
      url: chill_1,
      type: "chill",
    },
    {
      title: "Chill Song 2",
      url: chill_2,
      type: "chill",
    },
    {
      title: "Chill Song 3",
      url: chill_3,
      type: "chill",
    },
    {
      title: "Chill Song 4",
      url: chill_4,
      type: "chill",
    },
    {
      title: "Chill Song 5",
      url: chill_5,
      type: "chill",
    },
    {
      title: "Jazz Song 1",
      url: JAZZ_1,
      type: "jazz",
    },
    {
      title: "Jazz Song 2",
      url: JAZZ_2,
      type: "jazz",
    },
    {
      title: "Jazz Song 3",
      url: JAZZ_3,
      type: "jazz",
    },
    {
      title: "Jazz Song 4",
      url: JAZZ_4,
      type: "jazz",
    },
    {
      title: "Jazz Song 5",
      url: JAZZ_5,
      type: "jazz",
    },
    {
      title: "Sleepy Song 1",
      url: sleepy_1,
      type: "sleepy",
    },
    {
      title: "Sleepy Song 2",
      url: sleepy_2,
      type: "sleepy",
    },
    {
      title: "Sleepy Song 3",
      url: sleepy_3,
      type: "sleepy",
    },
    {
      title: "Sleepy Song 4",
      url: sleepy_4,
      type: "sleepy",
    },
    {
      title: "Sleepy Song 5",
      url: sleepy_5,
      type: "sleepy",
    },
  ]);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [songType, setSongType] = useState<SongType>("chill");

  const playNext = () => {
    if (!currentSong) {
      setCurrentSong(playlist[0]);
      return;
    }

    const currentIndex = playlist.findIndex(
      (song) => song.url === currentSong.url
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const playPrev = () => {
    if (!currentSong) {
      setCurrentSong(playlist[playlist.length - 1]);
      return;
    }

    const currentIndex = playlist.findIndex(
      (song) => song.url === currentSong.url
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
  };

  useEffect(() => {
    const filteredPlaylist = playlist.filter((song) => song.type === songType);
    setPlaylist(filteredPlaylist);
  }, [songType]);

  useEffect(() => {}, [currentSong, isPlaying, volume]);
  useEffect(() => {
    setCurrentSong(playlist[0]);
  }, [playlist]);

  const contextValue: MusicContextProps = {
    playlist,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    songType,
    setSongType,
    playNext,
    playPrev,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};

export { MusicProvider, useMusicContext };
