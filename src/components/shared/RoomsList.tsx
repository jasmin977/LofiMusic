import { MyButton } from "../themed";
import { useAuth } from "../../context";
import generateRandomRoomId from "../../utilities/generateRandomRoomId";
import { ReactNode } from "react";

interface RoomListProps {
  title: ReactNode;
  h: string;
  rooms: string[];
  joinRoom: (user: any, room: any) => Promise<void>;
}
const RoomList = ({ title, rooms, joinRoom, h }: RoomListProps) => {
  const { user, setRoomId } = useAuth();

  const handleCreateRoom = () => {
    const newRoomId = generateRandomRoomId();
    joinRoom(user?.username, newRoomId);
    setRoomId(newRoomId);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-2 text-white">{title}</div>

      <div
        className={`flex flex-col items-center gap-2 pt-8   h-[${h}] overflow-y-auto custom-scrollbar`}
      >
        {rooms.map((room, index) => (
          <div
            key={index}
            className="px-4 py-2 text-2xl font-light text-white rounded-md hover:bg-[#292017ef]  hover:cursor-pointer  transition-transform transform hover:scale-110"
            //  onClick={() => onRoomClick(room)}
          >
            {room}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <MyButton label="Create new room" onClick={handleCreateRoom} />
      </div>
    </div>
  );
};

export default RoomList;
