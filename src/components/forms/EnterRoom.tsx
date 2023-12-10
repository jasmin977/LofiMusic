import React from "react";
import { MyButton, MyInput } from "../themed";
import { Controller, useForm } from "react-hook-form";
import { Palette } from "../../themes";
import { useAuth } from "../../context";
import generateRandomRoomId from "../../utilities/generateRandomRoomId";

interface roomDTO {
  roomid: string;
}
interface props {
  joinRoom: (user: any, room: any) => Promise<void>;
}
function EnterRoom({ joinRoom }: props) {
  const { user, setRoomId } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<roomDTO>({
    defaultValues: {
      roomid: "",
    },
  });

  const handleEnterRoom = (data: roomDTO) => {
    joinRoom(user?.username, data.roomid);
    setRoomId(data.roomid);
  };
  const handleCreateRoom = () => {
    const newRoomId = generateRandomRoomId();
    joinRoom(user?.username, newRoomId);
    setRoomId(newRoomId);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-2 text-white">
        <span className="text-2xl font-medium text-white">
          Welcome {user?.username} 🥰
        </span>
        {/*    <span className="text-5xl font-semibold">Choose between</span> */}
      </div>

      <div className="flex flex-col items-center pt-8 justify-evenly ">
        <div className="flex flex-col items-center gap-5">
          <span className="text-2xl font-light text-white">
            Enter an existing room
          </span>
          <div
            className={`  flex flex-col items-center w-full px-4 py-2 bg-[${Palette.background}] `}
          >
            <Controller
              control={control}
              rules={{
                required: "Room Id can't be empty.",
              }}
              render={({ field: { onChange, value } }) => (
                <MyInput
                  placeholder="room id goes here.."
                  onChange={onChange}
                  value={value}
                />
              )}
              name="roomid"
            />
          </div>
          <div>
            <MyButton label="Enter" onClick={handleSubmit(handleEnterRoom)} />
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-1 ">
          <div className="flex-1 border-b-[0.2px] border-[#0000006c]"></div>
          <span
            className={`text-lg font-medium px-4 hover:cursor-pointer text-white `}
          >
            or continue with
          </span>
          <div className="flex-1 border-b-[0.2px] border-[#0000006c]"></div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div>
            <MyButton label="Creating new room" onClick={handleCreateRoom} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterRoom;
