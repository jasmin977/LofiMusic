import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { DraggableCard } from "../../../components/shared";
import { usePlaylist, useSignalRContext } from "../../../context";

function VideoPlay() {
  const { connection } = useSignalRContext();
  const { currentAttachment, playNextAttachment } = usePlaylist();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const playerRef = React.useRef<ReactPlayer>(null);
  React.useEffect(() => {
    if (playerRef.current) {
      console.log("internal player", playerRef.current.getInternalPlayer());
    }
  }, []);

  useEffect(() => {
    connection?.on("ReceivePlayVideo", () => {
      setIsPlaying(true);
    });
    connection?.on("ReceivePauseVideo", () => {
      setIsPlaying(false);
    });
    return () => {
      console.log("remove video event listeners");
      connection?.off("ReceivePlayVideo");
      connection?.off("ReceivePauseVideo");
    };
  }, [connection]);

  const onPlay = () => {
    console.log("onPlay");
    connection?.invoke("PlayVideo");
  };
  const onPause = () => {
    console.log("onPause");
    connection?.invoke("PauseVideo");
  };
  const onProgress = () => {
    console.log("onProgress");
  };

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
              ref={playerRef}
              class=".react-player"
              controls
              playing={isPlaying}
              width="100%"
              height="100%"
              url={currentAttachment?.link}
              onEnded={playNextAttachment}
              onPlay={onPlay}
              onPause={onPause}
              onSeek={(seconds) => {
                console.log("seek to minite", seconds / 60);
              }}
              // onProgress={({ loadedSeconds, playedSeconds }) =>
              //   console.log(
              //     `on Progress: loadedSeconds: ${loadedSeconds} / playedSeconds: ${playedSeconds}`
              //   )
              // }
            />
          </div>
        </DraggableCard>
      )}
    </>
  );
}

export default VideoPlay;
