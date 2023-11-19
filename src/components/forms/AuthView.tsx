import React, { useState } from "react";
import Login from "./Login"; // Adjust the import path
import Register from "./Register"; // Adjust the import path

const AuthView: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("login");
  console.log("🚀 ~ file: AuthView.tsx:7 ~ currentView:", currentView);

  const switchView = (view: string) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "login" ? (
        <Login switchView={switchView} />
      ) : (
        <Register switchView={switchView} />
      )}
    </>
  );
};

export default AuthView;
