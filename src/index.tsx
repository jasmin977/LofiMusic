import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  AppStateProvider,
  AppuStatuProvidu,
  AuthProvider,
  MusicProvider,
  PlaylistProvider,
  SignalRContextProvider,
} from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SignalRContextProvider>
        <AppStateProvider>
          <AppuStatuProvidu>
            <MusicProvider>
              <PlaylistProvider>
                <App />
              </PlaylistProvider>
            </MusicProvider>
          </AppuStatuProvidu>
        </AppStateProvider>
      </SignalRContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
