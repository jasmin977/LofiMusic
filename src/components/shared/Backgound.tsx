import React, { ReactNode, useEffect, useState } from "react";
import { bg4, bg5, bg6 } from "../../assets";

const backgroundImages: string[] = [bg4, bg5, bg6];

interface BackgroundProps {
  children: ReactNode;
}
function Background({ children }: BackgroundProps): JSX.Element {
  const [bgValue, setBgValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgValue((v) => {
        return v === backgroundImages.length - 1 ? 0 : v + 1;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImages[bgValue]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        width: "100vw",
        minHeight: "100vh",
        transition: "all 1.5s ease-in-out",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
