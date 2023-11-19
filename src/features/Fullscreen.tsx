import { Maximize, Minimize } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Palette } from "../themes";

const Fullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div onClick={toggleFullscreen}>
      {isFullscreen ? (
        <Minimize size={25} color={Palette.text} />
      ) : (
        <Maximize size={25} color={Palette.text} />
      )}
    </div>
  );
};

export default Fullscreen;
