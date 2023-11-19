import React, { ReactNode, useEffect, useRef } from "react";
import { outside, outside_rain } from "../../assets";
import { useAppState } from "../../context";

interface BackgroundProps {
  children: ReactNode;
}

const VideoBackground = ({ children }: BackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { rainIsPlaying } = useAppState();

  useEffect(() => {
    const video = videoRef.current;

    video?.play()?.catch((error) => {
      console.error("Error playing video:", error);
    });

    return () => {
      video?.pause();
    };
  }, [rainIsPlaying]);
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        padding: 20,
        height: "100vh",
        overflow: "hidden",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="transition-transform ease-in-out"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: rainIsPlaying ? 0 : 1,
          pointerEvents: rainIsPlaying ? "none" : "auto",
        }}
      >
        <source type="video/mp4" src={outside} />
      </video>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="transition-transform ease-in-out"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: rainIsPlaying ? 1 : 0,
          pointerEvents: rainIsPlaying ? "auto" : "none",
        }}
      >
        <source type="video/mp4" src={outside_rain} />
      </video>
      {children}
    </div>
  );
};

export default VideoBackground;
