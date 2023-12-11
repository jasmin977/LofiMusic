import { DraggableCard } from "../../../components/shared";
import { useAppuStatu, usePlaylist } from "../../../context";

import AttachmentItem from "./AttachementItem";
interface Attachement {
  link: string;
  title?: string;
}

function Playlist() {
  const { attachments } = usePlaylist();
  const { playlistCard } = useAppuStatu();

  return (
    <DraggableCard
      x={window.innerWidth / 1.5}
      y={window.innerHeight / 1.5}
      title={"Playlist"}
      isVisible={playlistCard.isVisible}
      onToggleVisibility={playlistCard.toggleVisibility}
      zIndex={playlistCard.zindex}
      bringToFront={playlistCard.bringToFront}
    >
      <div className="flex flex-col h-full mx-auto">
        <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {attachments.map((attachment: Attachement) => (
            <AttachmentItem attachment={attachment} />
          ))}
        </div>
      </div>
    </DraggableCard>
  );
}

export default Playlist;
