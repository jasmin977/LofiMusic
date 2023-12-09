import React, { useState } from "react";
import Login from "./Login"; // Adjust the import path
import Register from "./Register"; // Adjust the import path

interface Props {
  joinRoom: (user: any, room: any) => Promise<void>;
}
const AuthView = ({ joinRoom }: Props) => {
  const [currentView, setCurrentView] = useState<string>("login");

  const switchView = (view: string) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "login" ? (
        <Login switchView={switchView} joinRoom={joinRoom} />
      ) : (
        <Register switchView={switchView} />
      )}
    </>
  );
};

export default AuthView;
