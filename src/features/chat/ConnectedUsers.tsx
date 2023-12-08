import React, { useState } from "react";
import { DraggableCard } from "../../components/shared";
import { useAppState } from "../../context";
import { Palette } from "../../themes";

interface ConnectedUsersProps {
  connectedUsers: string[];
}
function ConnectedUsers({ connectedUsers }: ConnectedUsersProps) {
  const { isInviteUsersCardVisible, toggleInviteUsersCardVisibility } =
    useAppState();
  const [userToAdd, setUserToAdd] = useState("");

  const handleAddUser = () => {
    if (userToAdd.trim() !== "") {
    }
  };

  return (
    <DraggableCard
      h={300}
      w={400}
      isVisible={isInviteUsersCardVisible}
      onToggleVisibility={toggleInviteUsersCardVisibility}
      title="Users in da romm"
    >
      <div className="flex flex-col h-full mx-auto">
        <div className="flex  flex-col  px-2 pt-2 mb-[70px] gap-2 overflow-y-auto  custom-scrollbar">
          {connectedUsers.map((u: string, idx: number) => (
            <div
              className="p-2 text-lg font-normal border-2 rounded-lg "
              style={{
                backgroundColor: true ? Palette.minicard : Palette.background,
                borderColor: Palette.border,
                color: Palette.text,
              }}
              key={idx}
            >
              {u}
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 w-full p-4 ">
          <input
            style={{
              backgroundColor: Palette.background,
              borderColor: Palette.border,
              color: Palette.text,
            }}
            type="text"
            placeholder="Type user name to add..."
            className="w-full p-3 text-lg border rounded"
            value={userToAdd}
            onChange={(e) => setUserToAdd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddUser();
              }
            }}
          />
        </div>
      </div>
    </DraggableCard>
  );
}

export default ConnectedUsers;
