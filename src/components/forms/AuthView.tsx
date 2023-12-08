import React, { useState } from "react";
import Login from "./Login"; // Adjust the import path
import Register from "./Register"; // Adjust the import path

interface Props {
  joinRomm: (user: any, room: any) => Promise<void>;
}
const AuthView = ({ joinRomm }: Props) => {
  const [currentView, setCurrentView] = useState<string>("login");

  const switchView = (view: string) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "login" ? (
        <Login switchView={switchView} joinRomm={joinRomm} />
      ) : (
        <Register switchView={switchView} />
      )}
    </>
  );
};

export default AuthView;
