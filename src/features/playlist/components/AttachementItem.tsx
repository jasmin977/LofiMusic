// AttachmentItem.tsx
import React, { useState } from "react";
import { usePlaylist } from "../../../context";
import { youtube } from "../../../assets";
import { Palette } from "../../../themes";
import { Trash2 } from "lucide-react";

interface AttachmentItemProps {
  attachment: {
    link: string;
    title?: string;
  };
}

const AttachmentItem: React.FC<AttachmentItemProps> = ({ attachment }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { currentAttachment, setCurrentAttachment, removeFromPlaylist } =
    usePlaylist();
  return (
    <div
      key={attachment.link}
      className={`p-2  flex items-center relative ${
        attachment.link === currentAttachment?.link
          ? "border border-[#F3A952]"
          : ""
      } justify-between text-white w-full rounded-md cursor-pointer bg-[#1E1B18]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex flex-row gap-2"
        onClick={() => setCurrentAttachment(attachment)}
      >
        <img className="pr-2" src={youtube} alt="youtube" width={30} />

        {attachment.title && (
          <span
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              paddingRight: 10,
            }}
          >
            {attachment.title}
          </span>
        )}
      </div>
      <span
        className="text-gray-500"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {attachment.link.slice(0, 30)}..
      </span>
      {isHovered && (
        <div
          style={{
            backgroundColor: Palette.primary,
            color: Palette.background,
          }}
          className="flex items-center h-full px-2 font-semibold rounded-md "
          onClick={() => removeFromPlaylist(attachment.link)}
        >
          <Trash2 size={15} color={Palette.background} />
        </div>
      )}
    </div>
  );
};

export default AttachmentItem;
