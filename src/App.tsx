import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/shared";

import VideoBackground from "./components/shared/BackgoundVid";
import ChatCard from "./features/chat/ChatCard";
import InputLink from "./features/playlist/components/InputLink";
import Playlist from "./features/playlist/components/Playlist";

import { useAuth, usePlaylist, useSignalRContext } from "./context";
import ConnectedUsers from "./features/chat/ConnectedUsers";
import VideoPlay from "./features/playlist/components/VideoPlay";
import PomodoroCard from "./features/pomodoro/PomodoroCard";
import AllSoundsPlayer from "./features/sounds/AllSoundsPlayer";
import CityRain from "./features/sounds/CityRain";
import Mixer from "./features/sounds/Mixer";
import { IMessage, IRoom, IUser } from "./models";
import { MyDialog } from "./components/themed";
import AuthView from "./components/forms/AuthView";

function App() {
  const { connection } = useSignalRContext();
  const { user, setRoom } = useAuth();
  const {
    setIsPlaying,
    addToPlaylist,
    setCurrentAttachment,
    attachments,
    removeFromPlaylist,
    setAttachments,
  } = usePlaylist();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  const joinRoom = async (room: any) => {
    if (!connection) return;
    try {
      await connection.invoke("JoinRoom", {
        User: user,
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
    connection?.on("ReceiveMessage", (message, date) => {
      setMessages((prev) => [...prev, message]);
    });
    connection?.on("ReceiveRoomData", (room: IRoom) => {
      console.log("🚀 ~ file: App.tsx:88 ~ connection?.on ~ room:", room);
      setRoom(room);
      setAttachments(room.syncPlayer.playlist);
      setCurrentAttachment(
        room.syncPlayer.playlist[room.syncPlayer.currentAttachmentIndex]
      );
      setIsPlaying(room.syncPlayer.isPlaying);
      setMessages(room.conversation);
    });

    return () => {
      console.log("remove event listeners: [ReceiveAddAttachment]");
      connection?.off("ReceiveAddAttachment");
      connection?.off("ReceiveDeleteAttachment");
      connection?.off("ReceiveSetCurrentAttachment");
      connection?.off("UsersInRoom");
      connection?.off("ReceiveMessage");
      connection?.off("ReceiveRoomData");
    };
  }, [connection, attachments]);

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
      <MyDialog isOpen={isDialogOpen} onClose={closeDialog}>
        <AuthView joinRoom={joinRoom} />
      </MyDialog>
    </VideoBackground>
  );
}

export default App;
