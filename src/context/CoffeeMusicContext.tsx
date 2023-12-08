import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { playlistData } from "../data/songs";

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
  const [playlist, setPlaylist] = useState<Song[]>([]);

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
    const filteredPlaylist = playlistData.filter(
      (song) => song.type === songType
    );
    setPlaylist(filteredPlaylist);
  }, [songType]);
  useEffect(() => {
    setCurrentSong(playlist[0]);
  }, [playlist]);
  useEffect(() => {
    const filteredPlaylist = playlistData.filter(
      (song) => song.type === songType
    );
    setPlaylist(filteredPlaylist);
  }, []);
  useEffect(() => {
    setCurrentSong(playlist.length > 0 ? playlist[0] : null);
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
