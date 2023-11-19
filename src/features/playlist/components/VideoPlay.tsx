import { DraggableCard } from "../../../components/shared";
import { usePlaylist } from "../../../context";
import ReactPlayer from "react-player";

function VideoPlay() {
  const { currentAttachment, playNextAttachment } = usePlaylist();

  return (
    <>
      {currentAttachment && (
        <DraggableCard
          h={380}
          w={600}
          x={50}
          y={window.innerHeight / 2}
          isVisible={currentAttachment == null ? false : true}
        >
          <div className="aspect-video">
            <ReactPlayer
              class=".react-player"
              controls
              playing
              width="100%"
              height="100%"
              url={currentAttachment?.link}
              onEnded={playNextAttachment}
            />
          </div>
        </DraggableCard>
      )}
    </>
  );
}

export default VideoPlay;
