import React, { useEffect, useState } from "react";
import { DraggableCard } from "../../components/shared";
import { useAppState } from "../../context";
import { Palette } from "../../themes";

function ChatCard() {
  const { isChatCardVisible, toggleChatCardVisibility } = useAppState();

  const [messages, setMessages] = useState([
    {
      text: "Hi there! This is a message from you.",
      sender: "You",
      time: new Date(),
      isYou: true,
    },
    {
      text: "Hello! I'm doing well, thank you.",
      sender: "Bobo",
      time: new Date(),
      isYou: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        text: newMessage,
        sender: "You",
        time: new Date(),
        isYou: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages when a new message is added
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <DraggableCard
      h={450}
      w={400}
      isVisible={isChatCardVisible}
      onToggleVisibility={toggleChatCardVisibility}
      title="Chat"
    >
      <div className="flex flex-col h-full mx-auto">
        <div
          id="message-container"
          className="flex-1 px-2 pt-2 mb-[70px] overflow-y-auto custom-scrollbar"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col py-2 items-${
                message.isYou ? "end" : "start"
              } space-y-2`}
            >
              <div
                style={{
                  backgroundColor: message.isYou
                    ? Palette.minicard
                    : Palette.background,
                  borderColor: Palette.border,
                  color: Palette.text,
                }}
                className="max-w-xs p-2 text-lg font-normal border-2 rounded-lg"
              >
                {message.text}
              </div>
              <span style={{ color: Palette.text }} className="text-sm ">
                {message.sender} •{" "}
                {message.time.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
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
            placeholder="Type your message..."
            className="w-full p-3 text-lg border rounded"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
      </div>
    </DraggableCard>
  );
}

export default ChatCard;
