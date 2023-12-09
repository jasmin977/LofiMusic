import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import React, { useEffect } from "react";

interface ISignalRContext {
  connection: HubConnection | undefined;
}

const SignalRContext = React.createContext<ISignalRContext>({
  connection: undefined,
});

export const useSignalRContext = () => React.useContext(SignalRContext);

interface Props {
  children: React.ReactNode;
}

export const SignalRContextProvider: React.FC<Props> = ({ children }) => {
  const [connection, setConnection] = React.useState<signalR.HubConnection>();

  useEffect(() => {
    //create a connection
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7270/chatHub")
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        setConnection(connection);
      })
      .catch((err) => console.error(err));

    return () => {
      connection.onclose((e) => {
        setConnection(undefined);
      });
    };
  }, []);

  return (
    <SignalRContext.Provider
      value={{
        connection: connection,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
