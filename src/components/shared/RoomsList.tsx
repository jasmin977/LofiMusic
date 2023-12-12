import { MyButton } from "../themed";
import { useAuth } from "../../context";
import generateRandomRoomId from "../../utilities/generateRandomRoomId";
import { ReactNode } from "react";

type Room = {
  id: number;
  name: string;
};

interface RoomListProps {
  title: ReactNode;
  h: string;
  rooms: Room[];
  joinRoom: (room: any) => Promise<void>;
}
const RoomList = ({ title, rooms, joinRoom, h }: RoomListProps) => {
  const handleCreateRoom = () => {
    const newRoomId = generateRandomRoomId();
    joinRoom(newRoomId);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-2 text-white">{title}</div>

      <div
        className={`flex flex-col items-center gap-2 pt-8   h-[${h}] overflow-y-auto custom-scrollbar`}
      >
        {rooms.map((room, index) => (
          <div
            key={room.id + "rooms"}
            className="px-4 py-2 text-2xl font-light text-white rounded-md hover:bg-[#292017ef]  hover:cursor-pointer  transition-transform transform hover:scale-110"
            onClick={() => joinRoom(room.id)}
          >
            {room.name}
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
