import React, { useState } from "react";
import Login from "./Login"; // Adjust the import path
import Register from "./Register"; // Adjust the import path
import { Carousel } from "../themed";
import EnterRoom from "./EnterRoom";
import MyRooms from "./MyRooms";

interface Props {
  joinRoom: (room: any) => Promise<void>;
}
const AuthView = ({ joinRoom }: Props) => {
  const [currentView, setCurrentView] = useState<string>("login");

  const switchView = (view: string) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "login" ? (
        <Carousel>
          <Login switchView={switchView} />
          <MyRooms joinRoom={joinRoom} />
        </Carousel>
      ) : (
        <Carousel>
          <Register switchView={switchView} />
          <EnterRoom joinRoom={joinRoom} />
        </Carousel>
      )}
    </>
  );
};

export default AuthView;
