import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  volume: number;
  isPlaying: boolean;
  setisPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioUrl: string;
}

const AudioPlayer = ({
  audioUrl,
  isPlaying,
  volume,
  setisPlaying,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio = audioRef.current;

  useEffect(() => {
    if (audio) {
      audio.volume = volume;

      if (audio.volume > 0) {
        audio.play();
        setisPlaying(true);
      } else {
        audio.pause();
        setisPlaying(false);
      }
    }
  }, [volume, setisPlaying]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.src = audioUrl;
      audio.play().then(() => setisPlaying(true));
    }
  }, [audioUrl, setisPlaying]);

  return (
    <div>
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src={audioUrl} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
