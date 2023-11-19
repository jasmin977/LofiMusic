import React, { ReactNode, useState } from "react";

import { X } from "lucide-react";
import { Palette } from "../../themes";
import { Rnd } from "react-rnd";
interface DraggableCardProps {
  children: ReactNode;
  title?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  isVisible: boolean;
  onToggleVisibility?: (v: boolean) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  children,
  title,
  isVisible,
  onToggleVisibility,
  x,
  y,
  h,
  w,
}) => {
  const [zIndex, setZIndex] = useState(1);

  const handleCardClick = () => {
    // setZIndex((prevZIndex) => prevZIndex + 1);
  };
  const handleClickClose = () => {
    if (onToggleVisibility !== undefined) {
      onToggleVisibility(!isVisible);
    }
  };
  return isVisible ? (
    <Rnd
      bounds="parent"
      allowAnyClick
      minWidth={w}
      minHeight={h}
      default={{
        x: x || 0,
        y: y || 0,
        width: w || 350,
        height: h || 150,
      }}
      className={`     flex bg-[#292017ef]    rounded-xl border border-[#4D4337] pt-10 p-2  cursor-move  `}
      style={{
        backdropFilter: "blur(5px)",
        //  zIndex: zIndex,
      }}
      cancel=".no-drag"
      onDrag={handleCardClick}
    >
      <div className="absolute flex flex-row justify-between w-full px-4 top-2 ">
        <div></div>
        {title && (
          <span className="font-bold text-center text-yellow-100 capitalize ">
            {title}
          </span>
        )}
        <div className="cursor-pointer top-2" onClick={handleClickClose}>
          <X size={25} color={Palette.text} />
        </div>
      </div>
      <div className="w-full h-full cursor-default no-drag ">{children}</div>
    </Rnd>
  ) : null;
};

export default DraggableCard;
