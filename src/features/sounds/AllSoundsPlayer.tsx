import React from "react";
import AudioPlayer from "./AudioPlayer";
import { useAppState, useMusicContext } from "../../context";
import {
  city_rain,
  city_traffic,
  keyboard,
  people_talk_inside,
} from "../../assets";

function AllSoundsPlayer() {
  const {
    rainvolume,
    rainIsPlaying,
    setIsRainPlaying,
    trafficvolume,
    trafficIsPlaying,
    setIstrafficPlaying,
    keyboardIsPlaying,
    keyboardVolume,
    setIsKeyboardPlaying,
    talkIsPlaying,
    talkvolume,
    setIstalkPlaying,
  } = useAppState();

  const { currentSong, volume, isPlaying, setIsPlaying } = useMusicContext();
  return (
    <div>
      <AudioPlayer
        setisPlaying={setIsRainPlaying}
        audioUrl={city_rain}
        volume={rainvolume / 100}
        isPlaying={rainIsPlaying}
      />
      <AudioPlayer
        setisPlaying={setIstrafficPlaying}
        audioUrl={city_traffic}
        volume={trafficvolume / 100}
        isPlaying={trafficIsPlaying}
      />
      <AudioPlayer
        setisPlaying={setIstalkPlaying}
        audioUrl={people_talk_inside}
        volume={talkvolume / 100}
        isPlaying={talkIsPlaying}
      />
      <AudioPlayer
        setisPlaying={setIsKeyboardPlaying}
        audioUrl={keyboard}
        volume={keyboardVolume / 100}
        isPlaying={keyboardIsPlaying}
      />
      {currentSong && isPlaying && (
        <AudioPlayer
          setisPlaying={setIsPlaying}
          audioUrl={currentSong.url}
          volume={volume / 100}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
}

export default AllSoundsPlayer;
