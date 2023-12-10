import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../models";

type AuthContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  roomId: string | null;
  setRoomId: (room: string | null) => void;
};
interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  roomId: null,
  setRoomId: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  /* useEffect(() => {
    const fetchData = async () => {
      setUser(user);
    };

    fetchData();
  }, []); */
  return (
    <AuthContext.Provider
      value={{
        user,
        roomId,
        setUser,
        setRoomId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
