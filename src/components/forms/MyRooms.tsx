import axios from "axios";
import React, { useState } from "react";
import { RoomList } from "../shared";

interface props {
  joinRoom: (room: any) => Promise<void>;
}

function MyRooms({ joinRoom }: props) {
  const [myrooms, setmyroom] = useState([]);

  React.useEffect(() => {
    axios
      .get("https://localhost:7270/api/Rooms")
      .then((res) => {
        setmyroom(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 ">
      <RoomList
        h="400px"
        joinRoom={joinRoom}
        title={<span className="text-4xl font-semibold">My rooms</span>}
        rooms={myrooms}
      />
    </div>
  );
}

export default MyRooms;
