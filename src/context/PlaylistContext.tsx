import React, { createContext, useContext, useState, ReactNode } from "react";
import { BooleanLiteral } from "typescript";

interface Attachement {
  link: string;
  title?: string;
}

// Define the context type
interface PlaylistContextType {
  attachments: Attachement[];
  isPlaying: boolean;
  setAttachments: React.Dispatch<React.SetStateAction<Attachement[]>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  addToPlaylist: (attachment: Attachement) => void;
  playNextAttachment: () => void;
  removeFromPlaylist: (attachmentId: string) => void;
  currentAttachment: Attachement | null;
  setCurrentAttachment: (attachment: Attachement | null) => void;
}

// Create the context
const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

// Define the Props for the PlaylistProvider
interface PlaylistProviderProps {
  children: ReactNode;
}

// Create the PlaylistProvider component
const PlaylistProvider: React.FC<PlaylistProviderProps> = ({ children }) => {
  const [attachments, setAttachments] = useState<Attachement[]>([]);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [currentAttachment, setCurrentAttachment] =
    useState<Attachement | null>(null);

  const addToPlaylist = (attachment: Attachement) => {
    setAttachments((prevAttachments) => [...prevAttachments, attachment]);
  };

  const playNextAttachment = () => {
    if (currentAttachment) {
      const currentIndex = attachments.findIndex(
        (attachment) => attachment.link === currentAttachment.link
      );
      if (currentIndex !== -1 && currentIndex < attachments.length - 1) {
        setCurrentAttachment(attachments[currentIndex + 1]);
      } else {
        setCurrentAttachment(attachments[0]);
      }
    }
  };

  const removeFromPlaylist = (attachmentLink: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((a) => a.link !== attachmentLink)
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        attachments,
        setAttachments,
        currentAttachment,
        setCurrentAttachment,
        addToPlaylist,
        removeFromPlaylist,
        playNextAttachment,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

// Create a custom hook for using the PlaylistContext
const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};

export { PlaylistProvider, usePlaylist };
