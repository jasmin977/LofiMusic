import "./App.css";
import { Navbar } from "./components/shared";

import VideoBackground from "./components/shared/BackgoundVid";
import ChatCard from "./features/chat/ChatCard";
import InputLink from "./features/playlist/components/InputLink";
import Playlist from "./features/playlist/components/Playlist";

import VideoPlay from "./features/playlist/components/VideoPlay";
import PomodoroCard from "./features/pomodoro/PomodoroCard";
import AllSoundsPlayer from "./features/sounds/AllSoundsPlayer";
import CityRain from "./features/sounds/CityRain";
import Mixer from "./features/sounds/Mixer";

function App() {
  return (
    <VideoBackground>
      <InputLink />
      <Playlist />
      <Mixer />

      <VideoPlay />

      <CityRain />
      <ChatCard />
      <PomodoroCard />
      <Navbar />

      {/** backgound sounds */}
      <AllSoundsPlayer />
    </VideoBackground>
  );
}

export default App;
