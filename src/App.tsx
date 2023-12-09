import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/shared";

import VideoBackground from "./components/shared/BackgoundVid";
import ChatCard from "./features/chat/ChatCard";
import InputLink from "./features/playlist/components/InputLink";
import Playlist from "./features/playlist/components/Playlist";

import { usePlaylist, useSignalRContext } from "./context";
import ConnectedUsers from "./features/chat/ConnectedUsers";
import VideoPlay from "./features/playlist/components/VideoPlay";
import PomodoroCard from "./features/pomodoro/PomodoroCard";
import AllSoundsPlayer from "./features/sounds/AllSoundsPlayer";
import CityRain from "./features/sounds/CityRain";
import Mixer from "./features/sounds/Mixer";
import { IUser } from "./models";

function App() {
  const { connection } = useSignalRContext();
  const {
    addToPlaylist,
    setCurrentAttachment,
    attachments,
    removeFromPlaylist,
  } = usePlaylist();

  const [messages, setMessages] = useState<
    { user: any; message: any; date: any }[]
  >([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const joinRoom = async (user: any, room: any) => {
    if (!connection) return;
    try {
      await connection.invoke("JoinRoom", {
        user: {
          UserId: Math.floor(Math.random() * 1000),
          FirstName: user,
          LastName: "lastName",
          Email: "email",
        },
        RoomId: room,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("adding event listeners: [ReceiveAddAttachment]");
    connection?.on("ReceiveAddAttachment", (userName, newAttachment, date) => {
      addToPlaylist(newAttachment);
      setCurrentAttachment(newAttachment);
    });
    connection?.on("ReceiveDeleteAttachment", (userName, attachment, date) => {
      console.log(
        "🚀 ~ file: App.tsx:65 ~ RecieveDeleteAttachment ~ attachment:",
        attachment
      );
      removeFromPlaylist(attachment.link);
    });
    connection?.on(
      "ReceiveSetCurrentAttachment",
      (userName, attachmentIndex, date) => {
        console.log(
          "🚀 ~ file: App.tsx:65 ~ RecieveCurrentAttachment ~ attachment:",
          attachmentIndex,
          attachments,
          attachments[attachmentIndex]
        );
        setCurrentAttachment(attachments[attachmentIndex]);
      }
    );

    connection?.on("UsersInRoom", (users) => {
      setUsers(users);
    });
    connection?.on("ReceiveMessage", (user, message, date) => {
      setMessages((prev) => [...prev, { user, message, date }]);
    });

    return () => {
      console.log("remove event listeners: [ReceiveAddAttachment]");
      connection?.off("ReceiveAddAttachment");
      connection?.off("ReceiveDeleteAttachment");
      connection?.off("ReceiveSetCurrentAttachment");
      connection?.off("UsersInRoom");
      connection?.off("ReceiveMessage");
    };
  }, [connection]);

  return (
    <VideoBackground>
      <InputLink />
      <Playlist />
      <Mixer />

      <VideoPlay />
      <ConnectedUsers connectedUsers={users} />

      <CityRain />
      <ChatCard messages={messages} />
      <PomodoroCard />
      <Navbar joinRoom={joinRoom} />

      <AllSoundsPlayer />
    </VideoBackground>
  );
}

export default App;
