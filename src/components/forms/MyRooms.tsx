import { useAuth } from "../../context";
import generateRandomRoomId from "../../utilities/generateRandomRoomId";
import { RoomList } from "../shared";
import { MyButton } from "../themed";

interface props {
  joinRoom: (user: any, room: any) => Promise<void>;
}

function MyRooms({ joinRoom }: props) {
  return (
    <div className="p-4 ">
      <RoomList
        h="400px"
        joinRoom={joinRoom}
        title={<span className="text-4xl font-semibold">My rooms</span>}
        rooms={[
          "room1",
          "room2",
          "room3",
          "room4",
          "room5",
          "room6",
          "room2",
          "room3",
          "room4",
          "room5",
        ]}
      />
    </div>
  );
}

export default MyRooms;
