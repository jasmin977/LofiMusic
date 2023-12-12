import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRoom, IUser } from "../models";

type AuthContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  room: IRoom | null;
  setRoom: (room: IRoom | null) => void;
};
interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  room: null,
  setRoom: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [room, setRoom] = useState<IRoom | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        room,
        setUser,
        setRoom,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
