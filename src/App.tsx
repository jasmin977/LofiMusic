import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/shared";
import * as signalR from "@microsoft/signalr";

import VideoBackground from "./components/shared/BackgoundVid";
import ChatCard from "./features/chat/ChatCard";
import InputLink from "./features/playlist/components/InputLink";
import Playlist from "./features/playlist/components/Playlist";

import VideoPlay from "./features/playlist/components/VideoPlay";
import PomodoroCard from "./features/pomodoro/PomodoroCard";
import AllSoundsPlayer from "./features/sounds/AllSoundsPlayer";
import CityRain from "./features/sounds/CityRain";
import Mixer from "./features/sounds/Mixer";
import ConnectedUsers from "./features/chat/ConnectedUsers";

function App() {
  const [connection, setConnection] = useState<signalR.HubConnection>();
  const [messages, setMessages] = useState<
    { user: any; message: any; date: any }[]
  >([]);
  const [users, setUsers] = useState<string[]>([]);
  const joinRomm = async (user: any, room: any) => {
    try {
      //create a connection
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7270/chatHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });
      connection.on("ReceiveMessage", (user, message, date) => {
        setMessages((prev) => [...prev, { user, message, date }]);
        console.log(message);
      });

      connection.onclose((e) => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();

      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message: any) => {
    try {
      if (connection) {
        await connection.invoke("SendMessage", message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VideoBackground>
      <InputLink />
      <Playlist />
      <Mixer />

      <VideoPlay />
      <ConnectedUsers connectedUsers={users} />

      <CityRain />
      <ChatCard messages={messages} sendMessage={sendMessage} />
      <PomodoroCard />
      <Navbar joinRomm={joinRomm} />

      <AllSoundsPlayer />
    </VideoBackground>
  );
}

export default App;
